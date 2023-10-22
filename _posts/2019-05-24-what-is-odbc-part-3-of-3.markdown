---
layout:	post
title:	"What is ODBC Part 3 of 3"
date:	2019-05-24
hide_hero: true
tags: odbc, database, python, programming
categories: programming
---

### For more information see [part one](https://burningdaylight.io/posts/what-is-odbc/) and [part two](https://burningdaylight.io/posts/what-is-odbc-pt2/)

### Setting Up

Just like any other piece of software we can make use of debuggers to step through our application code and see what is happening with ODBC. To do this with Python you should be running a version with debug symbols included. You can do this via:

```python
git clone git@github.com:python/cpython.git  
mkdir debug  
cd debug  
../configure --with-pydebug  
make  
make testAdditionally you will want to clone pyodbc so that we can make use of symbols.

git clone git@github.com:mkleehammer/pyodbc.git  
CFLAGS='-Wall -O0 -g' python setup.py build
```

Finally you’ll need some code and a database to interact with. If you want I have an example [repo](https://gitlab.com/n0mn0m/what-is-odbc) which uses docker to start Postgres and/or MSSQL. It also contains some python example code and pyodbc in the repo for debugging.

One final note, if you wish to explore code all the way into the driver manager and/or driver you will need a debug version of each. For Mac and Linux you can do this with unixodbc found [here](http://www.unixodbc.org/) or [here](https://github.com/lurcher/unixODBC) and specify debug with make similar to CPython above. For a debug driver build checkout [Postgres psqlodbc](https://odbc.postgresql.org/).

### Stepping through

I’m writing this on OSX, but the concepts are the same regardless of platform. On OSX you can use LLDB or GDB (I used LLDB as a learning exercise), on Linux GDB is probably your go to and on Windows you can use WinGDB or the debugger built into Visual Studio for C/C++.

From the command line start your debugger, or if using GDB/LLDB call your tool with the -f flag specifying you want to load a file and call Python with your debugger so the Python interpreter will run the file inside your debugger.

```bash
lldb -f python -- -m pdb main.py
```

From here you can execute the application, use normal step, thread and frame functions to inspect the stack at different steps or get additional dump file information. Some breakpoints I found interesting can be set with:

```bash
breakpoint set --file connection.cpp --line 232  
breakpoint set --file connection.cpp --line 52  
breakpoint set --file cursor.cpp --line 1100  
breakpoint set --file getdata.cpp --line 776runIn case it is helpful you can find an lldb to gdb map [here](https://lldb.llvm.org/use/map.html).
```

### Contact

If you have experience with ODBC internals, want to correct something I’ve written or just want to reach out feel free to follow up via [email](mailto:n0mn0m@burningdaylight.io) or on .

I also have a [repo](https://github.com/n0mn0m/presentations) with the material I used for a presentation on this at the [Louisville DerbyPy](https://www.meetup.com/derbypy/) meetup in March of 2019.
