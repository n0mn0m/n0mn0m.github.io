---
Title: Recursive Search with Python
Published: 2018-06-29
Tags:
- python
- recursion
---

Recently I received from JSON like data that I needed to transform into a
tabular dataset. As part of that there was a specific key that could occur as a
child of different keys at different depths in the structure. Not only could
the key I needed appear at different locations and depths, but when it was
located it was possible that it would have N sibling occurrences I needed to
retrieve at the same location. Finally for all of these there were a set of id
and date keys at the top level of the structure that I was asked to include
with each search key result.

I took a couple different paths on my way to solving this. One of the first
things I found was the total depth was inconsistent across the structures. Not
only that, but it wasn't uncommon to find the key scattered across depths up
to 5 or 6 levels deep. The function below is what I ended up using. It's a
recursive search that relies on the fact that the data is JSON like. Instead
of trying to pull the parent keys out as part of the search I have a function
that parses out the id and date keys passing those into this function as base.
Then a search is performed on the input object checking the dictionary
collections for all instances of the search key and when located appending the
search keys value to the base data, which is then added to a list of results
which is returned when the entire collection has been searched.

## Gotchas

- This needed to be Python 2 and 3 compatible so pay attention to iterating
 dictionary keys and values when you have this requirement. There are
 different ways to handle this. I used `future`.
- The way that Python appends to list can be tricky. This bit me when I found
 that results contained the right number of results, but all of my results
 where the same and where based on the last hit. This is because I was calling
 `append` on base which was creating bindings that I mutated on each search
 result. Luckily Python has a `copy` module in the standard library to help
 with this scenario.

## Problem Solved

The function below represents my final result. This worked well on the sample
data, and eventually was used on PySpark RDDs to process hundreds of millions
of structures quickly.

```python
import copy
from future.utils import iteritems

def search(input, row_base, search_key, results):

"""
A search function to help transform nested JSON like objects into tabular rows.

The function takes a JSON like object as input along with a search key and
returns a row for each occurrence of the key in the object.

row_base is expected to be a list containing any base data you would like associated
with the search_key data.
"""

    if input:
        for i in input:
            # If input contains a list run it through search again since it
            # may contain dictionaries with the key being searched
            if isinstance(i, list):
                search(i, row_base, search_key, results)
            # If input contains a dictionary check if it contains the search_key
            # Also check if any of the values are list or dictionaries that need
            # to be searched
            if isinstance(i, dict):
                for k, v in iteritems(i):
                    # If the search_key is located deepcopy row_base to prevent changing
                    # row_base on future hits. Create full row and append to results
                    if k == search_key:
                        row = copy.deepcopy(row_base)
                        row.append(i)
                        results.append(row)
                        continue
                    elif isinstance(v, list):
                        search(v, row_base, search_key, results)
                    elif isinstance(v, dict):
                        search(v, row_base, search_key, results)

    # Search has been exhausted return search results to caller.
    # Results will be a list of list.
    return results
```

### Next Steps

Since this works there are a couple of ideas I want to explore with it.

- This seems like a good place to gain experience with Python type annotations.
- Since this needs to work in a pure Python environment as well as a PySpark
 environment I want to do some profiling, but I'm not sure how tools like
 Cython or Numba will work/interact with the PySpark piece of this. That will
 be interesting to explore.
- It would be interesting to add depth tracking and see if there are any
 levels where the search key never occurs so that the function could
 potentially skip `iteritems` at that level.

### Docs

For more information documentation on `copy` and `future` you can
check out the documentation.

- [https://docs.python.org/3.6/library/copy.html](https://docs.python.org/3.6/library/copy.html)
- [http://python-future.org/](http://python-future.org/)

### Contact

I'm sure others will have different ideas and approaches to something like
this. Or you might have suggestions on something that could be done to make
this faster or easier to read. If you have feedback or suggestion feel free to
send them my way via up via [email](mailto:n0mn0m@burningdaylight.io).
