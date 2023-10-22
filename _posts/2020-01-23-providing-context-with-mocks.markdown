---
layout:	post
title:	"Providing Context with Mocks"
date:	2020-01-23
hide_hero: true
tags: python, testing, programming
categories: programming
---

Day to day I spend a lot of time interacting with database systems. While this is super useful it can also create issues with testing that have been covered many many times in many other articles.

In some languages isolating database interactions comes from dependency injection and swapping out the interface while testing. I’ve seen this approach when working with C# for instance, but in Python I typically see code bases mocking out these interface points rather than passing in interfaces to functions and classes.

### Mocking context

One of my favorite constructs in Python is the [context manager](https://docs.python.org/3/reference/datamodel.html#context-managers). These are incredibly useful objects for defining what the creation and destruction of different interfaces should do viaenter and exit. (Append a for async context managers)

While useful they can be a bit tricky for mocking out in your test, and recently when I started doing just that I couldn’t find any good examples for accomplishing this. Below I’ve provided an example of mocking out a context manager in your test, showing when you are interacting with different parts of your mock and the mocked context manager API.

```python
def updateentity(k, v):  
 with pyodbc.connect(cnxnstr, autocommit=True): as cnxn:  
  with cnxn.cursor() as crsr:  
   crsr.execute()  
```

```python
from unittest import TestCase  
from unittest.mock import patchclass InterfaceTest(TestCase):  
 @patch("mod.pyodbc.connect")  
 def testupdateentity(self, mockcnxn):  
 # result of pyodbc.connect  
 mockcnxncontextmanager = mockcnxn.returnvalue  
 # object assigned to in with ... as con  
 mockcm = mockcnxncontextmanager.enter.returnvalue  
 # result of with ... as crsr, note the extra enter.returnvalue  
 # from the context manager  
 mockcrsr = mockcm.cursor.returnvalue.enter.returnvalue  
 mockcrsr.fetchone.returnvalue = (1,)  
```

Or if you want to test a sideeffect:

```python
mockcrsr.fetchone.sideeffect** 
*self.assertEqueal(....)
```

Good luck mocking, context is what you make it.

### Additional Reading

If you want to know more about context managers in Python checkout:

* [PEP 343](https://www.python.org/dev/peps/pep-0343/)
* [contextlib](https://docs.python.org/3/library/contextlib.html)
