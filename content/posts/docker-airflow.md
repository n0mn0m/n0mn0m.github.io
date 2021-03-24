+++
title = "docker-airflow"
date = 2018-12-22
[taxonomies]
tags = ["python","docker","conda","airflow"]
+++

If you've spent time using Python for ETL processes or working with data
pipelines using tools from the Apache ecosystem then you've probably heard
about [Apache Airflow](https://airflow.apache.org/). In this post I'm going
to briefly write about why I'm using Airflow, show how you can get started with
Airflow using docker and I will show how I customized this setup so that you
can do the same. Finally at the end I'll talk about a couple of issues I ran
into getting started with Airflow and docker.

## What is  [Apache Airflow](https://airflow.apache.org/)

From the home page:

- Airflow is a platform to programmatically author, schedule and monitor
 workflows.

**Programatically** being a key part so that you can create and orchestrate
worflows/data pipelines using the same processes and tools that let you create
reliable, scaling software.

## Why  [Airflow](https://airflow.apache.org/)

I don't plan to write much on this subject since it's been covered in depth
else where, but at work and often times when talking about Airflow the question
of why Airflow versus X traditional solution where X is something like:

- SSIS
- Informatica
- Streamsets
- Snaplogic

inevitably comes up. The primary reason I prefer a solution like Airflow to
more traditional solutions is because my ETL is code. While there are numerous
benefits to ETL as code my talking points are:

- Your data pipes/workflows go through the same processes that helps you create
 better products like TDD
- Your ETL development and production can be integrated with your CI/CD process
- Better debugging tools
- Flexibility

That's not to say the traditional tools don't have their place, but my
experience is that any significantly complex data pipeline ends up making use
of that tools script task (C# for SSIS, Java for Informatica) and now you have
an amalgamation of GUI product and untested, undocumented and non versioned
code in production data pipelines.

## Why [conda](https://docs.conda.io/en/latest/)

- Conda is a cross-platform, Python-agnostic binary package manager. It is the
 package manager used by Anaconda installations, but it may be used for other
 systems as well. Conda makes environments first-class citizens, making it easy
 to create independent environments even for C libraries.

By day I'm a data engineer helping to build platforms, applications and
pipelines to enable data scientist. Because of this conda is a tool I've become
familiar with and it let's me work across languages, but easily integrate those
various languages into my Airflow dags.

## [docker-airflow](https://github.com/puckel/docker-airflow)

To get started with Airflow I highly recommend reading
[the homepage](https://airflow.apache.org/index.html) and
[tutorial](https://airflow.apache.org/tutorial.html) to get an idea of the core
concepts and pick up on the vocabulary used within the framework.

After that there is a great project called
[docker-airflow](https://github.com/puckel/docker-airflow) that you can get
started with. This provides a quick way to get started with Airflow in an
environment with sane defaults making use of Postgres and Redis.

This project provides an example dag and also allows you to load the Airflow
example dags via the `LOAD_EX` environment variable. Additionally you might
want to open up the Airflow dashboard and checkout the Connections tab where
you can setup things such as SSH an SSH connection to reference in your dags.

## Customizing the setup

The [docker-airflow](https://github.com/puckel/docker-airflow) project is a
great start, but it makes assumptions that may not be true of your environment
such as which database you plan to use, use of environment variables, etc.

If all you're needing to tweak is the behavior of the environment or Airflow
your first stop should be `airflow.cfg` in the `/config` directory. This is a
centralized location for Airflow settings and is checked after any settings
from the environment are loaded. If you're trying to change settings related to
work pools, ssl, kerberos, etc this is probably the best place to get started.

If you're looking to change things related to your containers such as when to
restart, dependencies, etc then your going to want to checkout either the
`LocalExecutor` or `CeleryExecutor` docker-compose files.

Finally you might want to make bigger changes like I did such as using a
different database, base docker image etc. Doing this requires changing quite a
few items. The changes I made were:

- switch to miniconda for my base image to use Intel Dist Python
- switch to Microsoft SQL Server for the database
- switch the task queue to RabbitMQ

Most of this was driven by a desire to experiment and to learn more about tools
that I use day to day. Since I work in a data engineering shop there are
packages from `conda-forge` that I like to use driving the miniconda switch,
I've used MS SQL for the last 8 years professionally and I've been working on
scaling with RabbitMQ over the last year.

The switch to miniconda was a one liner in the Dockfile:

```bash
FROM continuumio/miniconda3
```

Then to use IDP (Intel Distribution of Python) within the container I added
this towards the bottom:

```bash
RUN conda config --add channels intel\
    && conda config --add channels conda-forge \
    && conda install  -y -q intelpython3_core=2019.1 python=3 \
&& conda clean --all \
```

And with that I can make use of conda packages alongside traditional Python
packages within my Airflow environment.

Next up I wanted to switch to MSSQL. Doing this was a matter of switching
from Postgres in docker-compose and adding the MSSQL Linux drivers to the base
docker-airflow Dockerfile.

```bash
#docker-compose

    mssql:
        image: microsoft/mssql-server-linux:latest
        environment:
            - ACCEPT_EULA=Y
            - SA_PASSWORD=YourStrong!Passw0rd
        ports:
            - 1433:1433
        volumes:
            - /var/opt/mssql
```

You may or may not want to preserver your database volume so keep that in mind.

Setting up the MSSQL Linux drivers is fairly straight forward following the
[documentation](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017)
from Microsoft.

```bash
#Dockerfile

# MS SQL EULA
ENV ACCEPT_EULA=Y

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | tee /etc/apt/sources.list.d/msprod.list

RUN apt-get update -yqq \
&& apt-get install -yqq mssql-tools unixodbc-dev
```

One thing to note if you're using a Debian based image is that Microsoft has a
somewhat obscure dependency on `libssl1.0.0`. Without that installed you will
get some obscure `unixodbc` error connecting to MSSQL with sql-alchemy. To
remedy this add the below to your Dockerfile.

```bash
#Dockerfile

RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
RUN echo "deb http://httpredir.debian.org/debian jessie main contrib non-free\n\
deb-src http://httpredir.debian.org/debian jessie main contrib non-free\n\
\n\
deb http://security.debian.org/ jessie/updates main contrib non-free\n\
deb-src http://security.debian.org/ jessie/updates main contrib non-free" >> /etc/apt/sources.list.d/jessie.list

RUN apt update \
&& apt install libssl1.0.0
```

Finally setup your connection string either in `airflow.cfg` or an Airflow
[environment variable](https://airflow.readthedocs.io/en/stable/howto/set-config.html)
. I like to use the Airflow environment variables and pass them in from a `.env`
file with docker-compose.

```bash
#docker-compose

        environment:
            - LOAD_EX=n
            - FERNET_KEY=46BKJoQYlPPOexq0OhDZnIlNepKFf87WFwLbfzqDDho=
            - EXECUTOR=Celery
            - AIRFLOW__CELERY__BROKER_URL=${CELERY_RABBIT_BROKER}
            - AIRFLOW__CORE__SQL_ALCHEMY_CONN=${SQL_ALCHEMY_CONN}
            - AIRFLOW__CELERY__RESULT_BACKEND=${CELERY_RESULTS_BACKEND}
```

And finally the last big change I implemented was the switch to RabbitMQ
instead of Redis. Similar to the MSSQL switch this was just an update to the
docker-compose file.

```bash
    rabbitmq:
        image: rabbitmq:3-management
        hostname: rabbitmq
        environment:
        - RABBITMQ_ERLANG_COOKIE=${RABBITMQ_ERLANG_COOKIE}
        - RABBITMQ_DEFAULT_USER=${RABBITMQ_DEFAULT_USER}
        - RABBITMQ_DEFAULT_PASS=${RABBITMQ_DEFAULT_PASS}
        - RABBITMQ_DEFAULT_VHOST=${RABBITMQ_DEFAULT_VHOST}
```

And setting up the right connection string for Celery to talk with rabbitmq.
Similar to the MSSQL connection string I put this in my `.env` file and
reference it in my docker-compose file as seen above.

```bash
# .env

CELERY_RABBIT_BROKER=amqp://user:pass@host:port/
```

One thing to note is anytime you are referencing the host and running with
docker-compose you can reference the service id in this case rabbitmq as the
host name.

And with that I have a nice Airflow environment that lets me make use of the
database I'm familiar with, a durable queue and packages across the Python and
Data Science ecosystems via `conda`.

You can find these changes in my fork of the
[docker-airflow](https://github.com/n0mn0m/airflow-docker) project. I've also
opened a [GitHub issue](https://github.com/puckel/docker-airflow/issues/289)
with the goal of creating some way to track other community variations of
docker-airflow with the hope of helping others discover setups specific to
their need.

## Issues so far

I've been using the setup above for a couple weeks now with pretty good results.
I've made use of some libraries like hdfs3 that have their latest releases in
conda-forge and my familiarity with MSSQL has saved me some maintenance time.
The experience hasn't been without it's issues. The highlights are:

- [Airflow packages](https://airflow.apache.org/installation.html#extra-packages)
 may not be what you want. See `librabbitmq` and celery. It's best to manage a
 requirements.txt or conda.txt with your dependencies still.
- Dependency management across multiple dags. In short with a standard setup
 you need one package version and it needs to be installed everywhere. For an
 interesting approach to this read
 [We’re All Using Airflow Wrong and How to Fix It](https://medium.com/bluecore-engineering/were-all-using-airflow-wrong-and-how-to-fix-it-a56f14cb0753)
- Silent failures. Be aware of all the reasons why a worker may provide exit
 code 0 especially with docker. This took a minute to catch when an NFS mount
 stopped showing new files being available, but the exit code 0 made things
 seem ok. This isn't Airflows fault, but just something to keep in mind when
 using Airflow in an environment with docker and remote resources.

### Reaching out

Hopefully this post helps you get started with
[docker-airflow](https://github.com/puckel/docker-airflow). If you have
questions or want to share something cool that you end up doing feel free to
open up an [issue](https://todo.sr.ht/~n0mn0m/Airflow-Bugs) on Sourcehut or
reach out to me <n0mn0m@burningdaylight.io>.
