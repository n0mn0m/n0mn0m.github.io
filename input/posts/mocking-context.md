---
Title: Providing Context with Mocks
Published: 2020-01-23
Tags:
- python
- mocking
- testing
- database
---

Day to day I spend a lot of time interacting with database systems.
While this is super useful it can also create issues with testing that
have been covered many many times in many other articles.

In some languages isolating database interactions comes from dependency
injection and swapping out the interface while testing. I've seen this
approach when working with C# for instance, but in Python I typically
see code bases mocking out these interface points rather than passing
in interfaces to functions and classes.

## Mocking context

One of my favorite constructs in Python is the
[`context manager`](https://docs.python.org/3/reference/datamodel.html#context-managers).
These are incredibly useful objects for defining what the creation and
destruction of different interfaces should do via`__enter__` and `__exit__`.
(Append `a` for async context managers)

While useful they can be a bit tricky for mocking out in your test, and
recently when I started doing just that I couldn't find any good examples
for accomplishing this. Below I've provided an example of mocking out
a context manager in your test, showing when you are interacting with
different parts of your mock and the mocked context manager API.

```python
def update_entity(k, v):
    with pyodbc.connect(cnxn_str, autocommit=True): as cnxn:
        with cnxn.cursor() as crsr:
            crsr.execute(#Update")
            ...
```

```python
from unittest import TestCase
from unittest.mock import patch

class InterfaceTest(TestCase):
  @patch("mod.pyodbc.connect")
  def test_update_entity(self, mock_cnxn):
      # result of pyodbc.connect
      mock_cnxn_context_manager = mock_cnxn.return_value
      # object assigned to in with ... as con
      mock_cm = mock_cnxn_context_manager.__enter__.return_value
      # result of with ... as crsr, note the extra __enter__.return_value
      # from the context manager
      mock_crsr = mock_cm.cursor.return_value.__enter__.return_value
      mock_crsr.fetchone.return_value = (1,)
      # Or if you want to test a side_effect mock_crsr.fetchone.side_effect

      self.assertEqueal(....)

```

Good luck mocking, context is what you make it.

### Additional Reading

If you want to know more about `context managers` in Python checkout:

- [PEP 343](https://www.python.org/dev/peps/pep-0343/)
- [`contextlib`](https://docs.python.org/3/library/contextlib.html)
