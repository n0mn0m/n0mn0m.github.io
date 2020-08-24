---
Title: DerbyPy Introduction to Python Modules and Packages
Published: 2018-10-09
Tags:
- python
- packaging
- modules
- DerbPy
---

Most programming languages offer ways to organize your code into namespaces.
These namespaces are logical containers that group different names and
behaviors together and isolate them to that namespace. By organizing your code
with namespaces it makes it easier to structure your application without naming
collisions and it can make it easier for you and others to maintain your code
by adding some additional organization to your project.

In Python we can use modules and packages to create namespaces that we can then
reference in other modules as we build our application.

A Python module is a `.py` file containing Python definitions and statements.
The file name is the module name with the suffix `.py` appended.

- <https://docs.python.org/3/tutorial/modules.html#modules>

As with all things in Python when we import a module it is an object, and just
like other objects it has dunder (double underscore) attributes that define
additional data about that module. We can use that to learn more about the
module before we ever start to use it.

```python
import pprint_ext

print(pprint_ext.__doc__)
print(dir(pprint_ext))

    A module providing extensions to pretty print structures that pprint may not handle well.

    ['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'list_directory', 'os']
```

From the output of `dir()` we can see there is a function called
`list_directory` that is part of this module.

```python
pprint_ext.list_directory("plugins")

    plugins/
        ipynb/
            __init__.py
            liquid.py
            markup.py
            requirements.txt
            .git
            README.md
            ipynb.py
            LICENSE
            .gitignore
            core.py
            __pycache__/
                core.cpython-36.pyc
                __init__.cpython-36.pyc
                markup.cpython-36.pyc
                ipynb.cpython-36.pyc
            tests/
                pelican/
                    pelicanconf_markup.py
                    pelicanconf_liquid.py
                    theme/
                        templates/
                            base.html
                    content/
                        with-meta-file.ipynb-meta
                        with-liquid-tag.ipynb
                        with-metacell.ipynb
                        with-meta-file.ipynb
                        with-liquid-tag.md
```

Finally we can see where we are importing this module from with `.__file__` and
we see that this is a module local to our application.

```python
pprint_ext.__file__

    '/home/alex/projects/alexhagerman.github.io/pprint_ext.py'
```

## Packages

For the sake of brevity and simplicity tonight we can say that a Python package
is a collection of Python modules. It is a folder that contains .py file and
provides a parent namespace for the modules in the folder.

Another way of saying this is:

- Python packages are a way of structuring Python’s module namespace by using
 “dotted module names” <https://docs.python.org/3/tutorial/modules.html#packages>

Just like we did with our module we can call `dir()` on our package to see
associated attributes and objects.

```python
import pprint_extension
dir(pprint_extension)

    ['__all__',
     '__builtins__',
     '__cached__',
     '__doc__',
     '__file__',
     '__loader__',
     '__name__',
     '__package__',
     '__path__',
     '__spec__',
     'network',
     'pprint_extension']
```

Additionally we can call help which may provide more information about the
package defined in `__init__.py`. You can think of `__init__.py` as a place to
put initialization behavior and documentation for your package. In the way that
`__init__` handles initializing your class `__init__.py` handles the
initialization of your package during import. `__init__.py` used to be required
to make a directory a package, but as of Python 3.3 thanks to `pep-420` it is
no longer required. More links and information are provided at the end of the
notebook.

```python
help(pprint_extension)

    Help on package pprint_extension:

    NAME
        pprint_extension

    DESCRIPTION
        A package providing functions to pretty print structures that may have alternative renderings from the standard
        pprint package.

    PACKAGE CONTENTS
        file_system
        network

    DATA
        __all__ = ['file_system']

    FILE
        /home/alex/projects/modules-and-packages-into/pprint_extension/__init__.py
```

Additionally we can import modules from packages and refer to them directly
instead of using the fully qualified namespacing syntax
`<package>.<module>.<object>`

```python
from pprint_extension import file_system
file_system.list_hidden_directory()

    ./
        .ipynb_checkpoints/
        .git/
        .idea/
```

Packages go way beyond what we have covered here. As you build packages you
want to consider their structure relative to the public API you're creating.
Publishing and distributing packages is a talk or series of talks on its own.
For now what we have covered is how we can group modules together in a package
and some basics for how to control the initialization behavior of a package.

### Finishing up

Now that we know what a Python `module` and `package` is next month we will
look at the `import` statement. As a sneak peak I'll leave you with `sys.path`
and you can begin exploring how this relates to our own packages and modules
that make up our application as well as those we might install with tools such
as `pip` or `conda`.

<https://docs.python.org/3/library/sys.html#sys.path>

```python
import sys
sys.path

    ['',
     '/home/alex/miniconda3/envs/blogging/lib/python36.zip',
     '/home/alex/miniconda3/envs/blogging/lib/python3.6',
     '/home/alex/miniconda3/envs/blogging/lib/python3.6/lib-dynload',
     '/home/alex/miniconda3/envs/blogging/lib/python3.6/site-packages',
     '/home/alex/miniconda3/envs/blogging/lib/python3.6/site-packages/IPython/extensions',
     '/home/alex/.ipython']
```

### Additional Reading

- <https://docs.python.org/3/tutorial/modules.html>
- <https://packaging.python.org/guides/packaging-namespace-packages/>
- <https://www.python.org/dev/peps/pep-0420/>
- <https://realpython.com/python-modules-packages/>
