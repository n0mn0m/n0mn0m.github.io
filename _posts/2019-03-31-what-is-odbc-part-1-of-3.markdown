---
layout:	post
title:	"What is ODBC Part 1 of 3"
date:	2019-03-31
hide_hero: true
tags: odbc, databases, programming
categories: programming
---

At my last job we used pyodbc to manage database interactions in a few different projects. We did this because we interacted with 5 different relational databases, and not all of them had native driver libraries for Python. In addition to this our use of pyodbc meant that we had a nice consistent database API for on-boarding, or when somebody needed to interact with a database that might be new to them for their project. Recently though I had somebody ask me what ODBC was, and to be honest I didn’t have a good answer. I’ve used ODBC libraries in multiple languages, but I hadn’t really dug into the nuts and bolts of what it was because I hadn’t needed to. I knew enough to use it, it worked well and there were bigger problems to solve. It’s a good question though. What is ODBC?

At a high level ODBC (Open Database Connectivity) is a specification for a database API creating a standard way for applications to interact with various databases via a series of translation and application layers. It is independent of any specific database, language or operating system. The specification lays out a series of functions that expose database functionality across systems. It’s an interesting, and I would say fairly successful abstraction since many programmers know how to connect, query and process data (via ODBC) in their language, but maybe they have never read sql.h or the SQLBrowseConnect function. For the full API Reference check [here](https://docs.microsoft.com/en-us/sql/odbc/reference/syntax/odbc-api-reference?view=sql-server-2017).

### API vs Protocol

Quick side note. You may have heard about wire protocols and databases. ODBC is not a protocol; it is an API. This is important because databases tend to define their own wire protocols (some share this now with things like the Postgres wire protocol being OSS) that dictate the sequence in which events or bytes must happen for communication to work. ODBC as an API doesn’t dictate this kind of detail, instead it describes how to expose the database functionality to the programmer consistently independent of the database.

API: describes all valid functionality and interactions Protocol: defines the sequence of operations and bytes.

### Why ODBC

If databases define their own protocols and have their own way of communicating why should we worry about ODBC? Turns out there are a [lot](https://hpi.de/naumann/projects/rdbms-genealogy.html) of databases you can use. Factor in an explosion of languages and operating systems and suddenly you have as many developers writing low level wrappers for database drivers as you do building your actual product. Instead ODBC provides a standard for database developers to expose functionality without developers having to reinvent new bindings for each new language, database, operating system combination. You can read more [here](https://docs.microsoft.com/en-us/sql/odbc/reference/why-was-odbc-created?view=sql-server-2017)

### Next Up

Now that we know ODBC is an API I want to look at the architecture of ODBC. In my next post I will cover the driver manager, ODBC drivers and the ODBC API. After that I plan on exploring ODBC from the application layer through the driver layer with Python and pyodbc looking to trace internals and see exactly how and where different layers connect.

### Contact

If you have experience with ODBC internals, want to correct something I’ve written or just want to reach out feel free to follow up via [email](mailto:n0mn0m@burningdaylight.io) or on .

I also have a [repo](https://github.com/n0mn0m/presentations) with the material I used for a presentation on this at the [Louisville DerbyPy](https://www.meetup.com/derbypy/) meetup in March of 2019.
