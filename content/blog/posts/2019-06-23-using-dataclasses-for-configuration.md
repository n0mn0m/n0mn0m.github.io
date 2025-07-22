---
title: "Using Dataclasses for Configuration"
date: 2019-06-23
page.meta.tags: python, programming
page.meta.categories: programming
---

Introduced in Python 3.7 dataclasses are normal Python classes with some extra features for carrying around data and
state. If you find yourself writing a class that is mostly attributes it's a dataclass.

Dataclasses have some other nifty features out of the box such as default double underscore methods, type hinting, and
more.

For more information checkout the [docs](https://docs.python.org/3/library/dataclasses.html).

### Dataclasses as configuration objects

Recently I’ve had the opportunity to work on a couple of Python 3.7 projects. In each of them I was interacting with
many databases and API Endpoints. Towards the beginning of one of the projects I did something like this:

```python
elasticconfig = {"user": os.environ["ESUSER"],  
 "endpoint": os.environ["ESENDPOINT"],  
 ...  
 }When I checked in the code I had been working on one of the reviewers commented that this pattern was normal, but since we were using 3.7 let’s use a dataclass.

import os  
from dataclasses import dataclass@dataclass  
class ElasticConfiguration:  
 user: str = os.environ["ESUSER"]  
 endpoint: str = os.environ["ESENDPOINT"]  
```

...Makes sense, but what’s the practical benefit? Before I wasn’t defining a class and carrying around the class model
that I’m not really using.

1. Class attribute autocomplete. I can’t tell you how many times I used to check if I had the right , casing,
   abbreviation etc for the key I was calling. Now it's a class attribute, no more guessing.
2. Hook up mypy and find some interesting errors.
3. Above you’ll notice I used os.environ[]. A lot of people like to use an alternative .get(<key>)pattern with
   dictionaries. The problem is often times a default of None gets supplied and you're dealing with Optional[T], but
   still acting like it's str everywhere in your code.
4. postinit
5. Dataclasses have an interesting method
   called [postinit](https://docs.python.org/3/library/dataclasses.html#post-init-processing) that gets called by init.
   On configuration objects this is a handy place to put any validation function/method calls you might build around
   attributes.
6. Subjectively elastic.user is faster to type, and more appealing to the eyes than elastic["user"].
   So the next time you find yourself passing around configuration information remember dataclasses may be a useful and
   productive alternative to passing around a dictionary.

### Additional Resources

Beyond the docs here are some links I found useful when learning about Python dataclasses.

* [Real Python: Dataclasses](https://realpython.com/python-data-classes/)
* [Stack Overflow: What’s the difference between a class and data class](https://stackoverflow.com/questions/47955263/what-are-data-classes-and-how-are-they-different-from-common-classes)
* [Hackernoon: Dataclasses tour](https://hackernoon.com/a-brief-tour-of-python-3-7-data-classes-22ee5e046517)
