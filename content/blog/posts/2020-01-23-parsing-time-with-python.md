---
title: Parsing Time with Python
date: 2020-01-23
page.meta.tags: python, programming
page.meta.categories: programming
---

I recently had the need to measure time and performance on an application that interacted with a lot of on disk files.
Most of the time when talking about timing and measurement in Python we see the use of timeitand various built in timing
techniques. For this work I wanted a little more information about how the application was interacting with the system,
and what the performance looked like from outside the application. Getting a rough view of this is pretty easy on a nix
using [/usr/bin/time](http://man7.org/linux/man-pages/man1/time.1.html).

### Parsing Time

To make use of time you simply call it with your application as an argument. You can find the time args with man time,
but on useful one is the -v flag for more system information in the output, and an --output file path. Doing this you
get a fair amount of page, time and system information in your output packaged up in a file that you can parse. In my
script I'm also including some information in the file name so I can know what source file my application was parsing
relating to that time information.

```bash
#!/bin/bash

SRCDIRPATH=/data
RESULTS=/profilefor file in $SRDDIRFILES; do
 filename=$(basename -- "$file")
 filebase="${filename%.*}"
 echo $filebase
 /usr/bin/time -v --output=$PROFILERESULTSDIR$filebase.txt cmd args
 echo "done"
donels -1sh $SRCDIRPATH &> profileddirectory.size
```

Once the application has ran you can see the output of time in your file, but you will also probably notice that it’s
just a text blob not ready for aggregation. Overall parsing time is relatively straight forward with one gotcha. I use
the below to translate the blob into rows and columns:

```python
import os
from typing import Tuple, List, Any, Union

def formattimeprofileoutput(fpath, fobject) -> List[Any]:
 """
 Takes a directory of files containing the output of /usr/bin/time
 and transforms the time blob data to a series of rows and columns.
 """
 f = os.path.join(fpath, fobject)
 timemetrics = [fobject] with open(f, "r") as tfile:
 for line in tfile:
  if "Elapsed" not in line:
   cleanline = line.lstrip()
   metric, sep, value = cleanline.rpartition(":")
   timemetrics.append(value.strip())
  else:
   # Handling the special case of the Elapsed time
   # format using : in the time formatting.
   cleanline = line.lstrip()
   metric, sep, seconds = cleanline.rpartition(":")
   # we now have something like val = 43.45
   # metric = Elapsed (Wall Clock) time (H:MM:SS or M:ss) 1
   # partition again on metric, then combine back our time.
   metric, sep, minutes = metric.rpartition(":")
   # put time back into metrics
   value = f"{min}:{secs}"
   timemetrics.append(value.strip())
   # setup tool second metric for easier evaluation of
   # time metrics
   minutes = float(int(minutes) * 60)
   seconds = float(seconds)
   seconds += minutes
   timemetrics.append(seconds)
 return timemetrics
```

Notice the one edge case in Elapsed (wall clock) time...). All other rows end with \\n and seperate the metric name from
the value with :. Elapsed wall clock time however throws in a couple extra colons for fun. Overall not a big deal, but a
little gotcha waiting in the details when going from a string to another object/format.

Using the script above you end up with a collection of rows and columns that you can then use to find out how your
application performed for that run instance.

A quick bonus script, since my application was reading in and writing out new files I wanted to include the size of the
input files so I could begin to understand the impact of the input file size on the applications time metrics.

```python
import osdef formatsizeoutput(fpath, fobject) -> List[List[str]]:
 f = os.path.join(fpath, fobject)
 sizemetrics = [] with open(f, "r") as sfile:
 for line in sfile:
 metric, sep, filename = line.rpartition(" ")
 sizemetrics.append([metric.strip(), filename.strip()])
 return sizemetrics[1:]
```

With this and the above time parsing we have the input file size, name, application command, page and time information.
More than enough to begin looking at what our application is doing from the outside.
