---
title: Dealing with NULL in PySpark transformations
date: 2018-10-27
page.meta.tags: python, pyspark, programming
page.meta.categories: programming
---

Lately I’ve been dealing with nested data on a semi regular basis with PySpark. One of the scenarios that tends to come
up a lot is to apply transformations to semi/unstructured data to generate a tabular dataset for consumption by data
scientist. When processing and transforming data I’ve previously found it beneficial to make use of the RDD data
structure so that I have the ability to easily apply custom transformations the same way I would if I was interacting
with normal Python data structures, but with the benefit of Spark and the functionality provided by the RDD API.

With my most recent project though I decided to spend more time working with the Spark Dataframe data structure
specifically for the potential performance gains from Catalyst and Tungeston. Along with this Spark offers a set of
complex types for Spark Dataframe columns to make interaction with collection types a little bit easier.

Diving in I immediately used the [Databricks XML](https://github.com/databricks/spark-xml) library to load some data
into my dataframe which had a similar shape (although different contents) to this:

```python
from pyspark.sql import Row
from pyspark.sql.functions import explode, first, col, monotonicallyincreasingid, when, array, lit
from pyspark.sql.column import Column, tojavacolumn

df = spark.createDataFrame([
 Row(dataCells=[Row(posx=0, posy=1, posz=.5, value=1.5, shape=[Row(type='square', len=1)]),
 Row(posx=1, posy=3, posz=.5, value=4.5, shape=[]),
 Row(posx=2, posy=5, posz=.5, value=7.5, shape=[Row(type='circle', len=.5)])
 ])
])

df.printSchema()

 root
 |-- dataCells: array (nullable = true)
 | |-- element: struct (containsNull = true)
 | | |-- posx: long (nullable = true)
 | | |-- posy: long (nullable = true)
 | | |-- posz: double (nullable = true)
 | | |-- shape: array (nullable = true)
 | | | |-- element: struct (containsNull = true)
 | | | | |-- len: long (nullable = true)
 | | | | |-- type: string (nullable = true)
 | | |-- value: double (nullable = true)df.show()

 +--------------------+
 | dataCells|
 +--------------------+
 |[[0, 1, 0.5, [[1,...|
 +--------------------+
```

Perfect. Nothing too crazy, but I wanted to transform the nested array of structs into column representing the members
of each struct type. So I started by looking at the options available to flatten my array column and I came across which
appeared to do exactly what I needed. Next I needed to take the member attributes of the structs and turn those into
columns. I wasn’t able to find a built in function for this, but using the select syntax available on dataframes along
with the\* wildcard available on structs I was able to write my own function to do this.

```python
def flattenstructcols(df):
 flatcols = [column[0] for column in df.dtypes if 'struct' not in column[1][:6]]
 structcolumns = [column[0] for column in df.dtypes if 'struct' in column[1][:6]]

 df = df.select(flatcols +
 [col(sc + '.' + c).alias(sc + '' + c)
 for sc in structcolumns
 for c in df.select(sc + '.*').columns])

 return dfAnd with that out of the way I’m ready to go.

flatdf = df.withColumn('dataCells', explode(col('dataCells')))
flatdf = flattenstructcols(flatdf)
flatdf.show(3)

 +--------------|--------------|--------------|---------------|---------------+
 |dataCellsposx|dataCellsposy|dataCellsposz|dataCellsshape|dataCellsvalue|
 +--------------|--------------|--------------|---------------|---------------+
 | 0| 1| 0.5| [[1, square]]| 1.5|
 | 1| 3| 0.5| []| 4.5|
 | 2| 5| 0.5| [[, circle]]| 7.5|
 +--------------|--------------|--------------|---------------|---------------+
 flatdf.printSchema()

 root
 |-- dataCellsposx: long (nullable = true)
 |-- dataCellsposy: long (nullable = true)
 |-- dataCellsposz: double (nullable = true)
 |-- dataCellsshape: array (nullable = true)
 | |-- element: struct (containsNull = true)
 | | |-- len: long (nullable = true)
 | | |-- type: string (nullable = true)
 |-- dataCellsvalue: double (nullable = true)So far so good. Let’s try it again, and if all goes well we can throw this in a loop, flatten nested columns and be on our way.

flatdf = flatdf.withColumn('dataCellsshape', explode(col('dataCellsshape')))
flatdf = flattenstructcols(flatdf)
flatdf.show(3)

 +--------------|--------------|--------------|---------------|--------------------|---------------------+
 |dataCellsposx|dataCellsposy|dataCellsposz|dataCellsvalue|dataCellsshapelen|dataCellsshapetype|
 +--------------|--------------|--------------|---------------|--------------------|---------------------+
 | 0| 1| 0.5| 1.5| 1| square|
 | 2| 5| 0.5| 7.5| null| circle|
 +--------------|--------------|--------------|---------------|--------------------|---------------------+
```

And now we have a problem. After back tracking I found that explode is silently dropping out my row with null in it.
Let's check
the [docs](https://spark.apache.org/docs/2.2.0/api/python/pyspark.sql.html?highlight=date#pyspark.sql.functions.explode).
Interestingly I didn't see anything about this. So I checked the latest docs and just so happened to
notice[explodeouter](https://spark.apache.org/docs/latest/api/python/pyspark.sql.html?highlight=date#pyspark.sql.functions.explode_outer)
listed right below this. It turns out in 2.2.0 a set ofouter functions where added that retain null for certain
operations such as explode. Unfortunately some of these are not available in PySpark until 2.3 and I didn't have the
option to migrate from 2.2.x to 2.3.x.

[StackOverflow](https://stackoverflow.com/questions/52747258/pyspark-2-2-explode-dropping-null-rows-how-to-implement-explode-outer)
to the rescue. After reviewing the PySpark tag I didn't find any solutions with accepted answers so I went ahead and
wrote my own question. Thanks to that I learned a lot about PySpark/JVM interop and about some of the disparities
between the JVM API and other language APIs.

### Otherwise()

```python
flatdf = df.withColumn('dataCells', explode(col('dataCells')))
flatdf = flattenstructcols(flatdf)
flatdf.withColumn('dataCellsshapetest', explode(when(col('dataCellsshape').isNotNull(), col('dataCellsshape'))
 .otherwise(array(lit(None).cast(flatdf.select(col('dataCellsshape')
 .getItem(0))
 .dtypes[0][1]))))).show()

+--------------|--------------|--------------|---------------|---------------|--------------------+
|dataCellsposx|dataCellsposy|dataCellsposz|dataCellsshape|dataCellsvalue|dataCellsshapetest|
+--------------|--------------|--------------|---------------|---------------|--------------------+
| 0| 1| 0.5| [[1, square]]| 1.5| [1, square]|
| 2| 5| 0.5| [[, circle]]| 7.5| [, circle]|
+--------------|--------------|--------------|---------------|---------------|--------------------+
```

Based on some responses to my question I found another question that provided a scala solution involving .otherwise and
casting the nested structure with a null literal. None in Python. This seemed like the more direct solution without
making use of private functionality in the library, so I opted to try implementing the scala solution in PySpark first.

But unfortunately it appears that the explode may have a precedence behind the scenes that drops the row before
otherwise is evaluated. With a quickly approaching deadline I unfortunately did not have time to dig deep into why this
was with other options on the table.

### Into the JVM

```python
def explodeouter(col):
 """
 Calling the explodeouter Java function from PySpark
 """
 explodeouter = sc.jvm.org.apache.spark.sql.functions.explodeouter
 return Column(explodeouter(tojavacolumn(col)))flatdfwithnull = df.withColumn('dataCells', explode(col('dataCells')))
flatdfwithnull = flattenstructcols(flatdfwithnull)
flatdfwithnull = flatdfwithnull.withColumn("dataCellsshape", explodeouter(col("dataCellsshape")))
flatdfwithnull.show()

 +--------------|--------------|--------------|---------------|---------------+
 |dataCellsposx|dataCellsposy|dataCellsposz|dataCellsshape|dataCellsvalue|
 +--------------|--------------|--------------|---------------|---------------+
 | 0| 1| 0.5| [1, square]| 1.5|
 | 1| 3| 0.5| null| 4.5|
 | 2| 5| 0.5| [, circle]| 7.5|
 +--------------|--------------|--------------|---------------|---------------+
 flatdfwithnull = flattenstructcols(flatdfwithnull)
flatdfwithnull.show()

 +--------------|--------------|--------------|---------------|--------------------|---------------------+
 |dataCellsposx|dataCellsposy|dataCellsposz|dataCellsvalue|dataCellsshapelen|dataCellsshapetype|
 +--------------|--------------|--------------|---------------|--------------------|---------------------+
 | 0| 1| 0.5| 1.5| 1| square|
 | 1| 3| 0.5| 4.5| null| null|
 | 2| 5| 0.5| 7.5| null| circle|
 +--------------|--------------|--------------|---------------|--------------------|---------------------+
```

While reviewing suggested solutions I found out that SparkContext has ajvm object that provides access to org.apache.\*
functionality. Along with this I also noticed that Databricks has an entire "private" api used with Python and Java.
Part of this API istojavacolumn which makes it possible to transform a PySpark column to a Java column to match Java
method signatures.
Learning all of this, and knowing that the Java API already had `explodeouter` implemented I reviewed the
Java [explodeouter](https://spark.apache.org/docs/2.3.0/api/java/index.html) method to verify the type signature and
built my own function in Python to call the Java function and return the column with null in place.

And it works! With that I am able to flatten out arbitrarily nested collections in PySpark dataframes while retaining
nulls when using Spark 2.2.x.

### Wrapping Up

A couple of things to note; if you have an array with more than one struct as a member this will fail, and if you have a
deeply nested structure the growth of this transformation is typically not sustainable on a large dataset.

I have questions that I hope to continue spending time on. For instance why are rows with null dropped at all? I wonder
if the operation makes a new dataframe from the column to apply the operation to and then joins it back on an index and
along the way that join loses nulls. Why are functions that are lossy not identified as such? Is there always a version
lag between the JVM api and the PySpark api? I'm also curious how Catalyst handles denesting operations and adding new
columns from the result of exploding arrays or flattening structs.

Finally instead of adding new columns I want to try using the MapType to instead create a new column of key, value pairs
that allows me to flatten out arbitrarily deep collections into a MapType so that I can use the same methodology on much
deeper structures without adding a lot of columns that are mostly null.
