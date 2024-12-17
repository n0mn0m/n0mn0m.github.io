---
title: "What is ODBC Part 2 of 3"
date: 2019-05-18
page.meta.tags: odbc, database, programming
page.meta.categories: programming
---

In the first article I mentioned that ODBC (Open Database Connectivity) is a specification for a database API creating a
standard way for applications to interact with various databases via a series of translation and application layers. To
create this standard abstraction ODBC has two components, the driver and the driver manager.

### ODBC Driver

Within ODBC the driver encapsulates the functionality needed to map various functions to underlying system calls. This
functionality spans calls to connect, query, disconnect and more depending on what the target data source provides.
While almost all drivers provide the prior basic interactivity others many expose more advanced functionality like
concurrent cursors, query translation, encryption and more. It’s worth reviewing your ODBC driver docs to see what
features you might use specific to your data source. While ODBC provides a useful abstraction for connecting to data
sources it’s worth using whatever additional functionality is available to make your application perform it’s best and
keep your data secure on the wire.

### ODBC Driver Manager

Ok so the ODBC driver encapsulates the functionality for interacting with our data source what do we need a driver
manager for? First it’s not uncommon that you may want your application to interact with various different data sources
of the same type. When this happens the driver manager provides the management and concept of the DSN. The DSN (data
source name) contains the information required to connect to the data source (host, port, user etc for more information
checkout [connection strings](https://www.connectionstrings.com/) since the driver manager can save these to a name you
specify. This way you can have one driver (for instance Postgres or Elasticsearch) that can be used to connect to
various different data sources from the same vendor. In addition to this the driver manager is responsible for keeping
up with what drivers are available on the system and exposing that information to applications. By knowing what drivers
and DSNs are available the driver manager can sit in between your application and the ODBC driver making sure the
connection information and data passed back and forth is mapped to the right system and that return calls from the
driver get mapped back for use by applications.

### Next Up

Last up in post 3 I plan on exploring ODBC from the application layer to the driver layer with Python and pyodbc looking
to trace internals and see exactly how and where different layers connect.

### Contact

If you have experience with ODBC internals, want to correct something I’ve written or just want to reach out feel free
to follow up via [email](mailto:n0mn0m@burningdaylight.io) or on .

I also have a [repo](https://github.com/n0mn0m/presentations) with the material I used for a presentation on this at
the [Louisville DerbyPy](https://www.meetup.com/derbypy/) meetup in March of 2019.
