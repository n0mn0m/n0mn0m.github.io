---
title: DerbyPy Introduction to Python Modules and Packages
date: 2018-10-09
page.meta.tags: python, programming
page.meta.categories: programming
---

Most programming languages offer ways to organize your code into namespaces. These namespaces are logical containers
that group different names and behaviors together and isolate them to that namespace. By organizing your code with
namespaces it makes it easier to structure your application without naming collisions and it can make it easier for you
and others to maintain your code by adding some additional organization to your project.

In Python we can use modules and packages to create namespaces that we can then reference in other modules as we build
our application.

A Python module is a .py file containing Python definitions and statements. The file name is the module name with the
suffix.py appended.

As with all things in Python when we import a module it is an object, and just like other objects it has dunder (double
underscore) attributes that define additional data about that module. We can use that to learn more about the module
before we ever start to use it.

```python
import pprintext

print(pprintext.doc)
print(dir(pprintext))
 A module providing extensions to pretty print structures that pprint may not handle well.

 ['builtins', 'cached', 'doc', 'file', 'loader', 'name', 'package', 'spec', 'listdirectory', 'os']From the output of dir() we can see there is a function called listdirectory that is part of this module.

pprintext.listdirectory("plugins")

 plugins/
 ipynb/
 init.py
 liquid.py
 markup.py
 requirements.txt
 .git
 README.md
 ipynb.py
 LICENSE
 .gitignore
 core.py
 pycache/
 core.cpython-36.pyc
 init.cpython-36.pyc
 markup.cpython-36.pyc
 ipynb.cpython-36.pyc
 tests/
 pelican/
 pelicanconfmarkup.py
 pelicanconfliquid.py
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

Finally, we can see where we are importing this module from with .file and we see that this is a module local to our
application.

```python
pprintext.file '/home/alex/projects/alexhagerman.github.io/pprintext.py'### Packages
```

For the sake of brevity and simplicity tonight we can say that a Python package is a collection of Python modules. It is
a folder that contains .py file and provides a parent namespace for the modules in the folder.

Another way of saying this is:

Just like we did with our module we can call dir() on our package to see associated attributes and objects.

```python
import pprintextension
dir(pprintextension)

 ['all',
 'builtins',
 'cached',
 'doc',
 'file',
 'loader',
 'name',
 'package',
 'path',
 'spec',
 'network',
 'pprintextension']
```

Additionally, we can call help which may provide more information about the package defined in init.py. You can think of
init.py as a place to put initialization behavior and documentation for your package. In the way thatinit handles
initializing your class init.py handles the initialization of your package during import.init.py used to be required to
make a directory a package, but as of Python 3.3 thanks to pep-420 it is no longer required. More links and information
are provided at the end of the notebook.

```python
help(pprintextension)

 Help on package pprintextension:

 NAME
 pprintextension

 DESCRIPTION
 A package providing functions to pretty print structures that may have alternative renderings from the standard
 pprint package.

 PACKAGE CONTENTS
 filesystem
 network

 DATA
 all = ['filesystem']

 FILE
 /home/alex/projects/modules-and-packages-into/pprintextension/init.pyAdditionally we can import modules from packages and refer to them directly instead of using the fully qualified namespacing syntax <package>.<module>.<object>

from pprintextension import filesystem
filesystem.listhiddendirectory()

 ./
 .ipynbcheckpoints/
 .git/
 .idea/Packages go way beyond what we have covered here. As you build packages you want to consider their structure relative to the public API you’re creating. Publishing and distributing packages is a talk or series of talks on its own. For now what we have covered is how we can group modules together in a package and some basics for how to control the initialization behavior of a package.
```

### Finishing up

Now that we know what a Python module and package is next month we will look at the import statement. As a sneak peak
I'll leave you with sys.path and you can begin exploring how this relates to our own packages and modules that make up
our application as well as those we might install with tools such as pip or conda.

```python
import sys
sys.path

 ['',
 '/home/alex/miniconda3/envs/blogging/lib/python36.zip',
 '/home/alex/miniconda3/envs/blogging/lib/python3.6',
 '/home/alex/miniconda3/envs/blogging/lib/python3.6/lib-dynload',
 '/home/alex/miniconda3/envs/blogging/lib/python3.6/site-packages',
 '/home/alex/miniconda3/envs/blogging/lib/python3.6/site-packages/IPython/extensions',
 '/home/alex/.ipython']<https://docs.python.org/3/library/sys.html#sys.path>
```

### Additional Reading
