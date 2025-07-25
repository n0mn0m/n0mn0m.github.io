---
title: Postgres Advisory Locks with Asyncio
date: 2019-08-08
page.meta.tags: python, postgres, sql, programming
page.meta.categories: programming
---

Recently, here on the Cloud team at Elastic we started working on building a new service in Python 3.7. This service
fetches data from a Postgres database, transforms it, and then submits that data to another service. Like many
cloud-based services, ours runs in an orchestrated container environment where N instances can be running at any time.
Often that’s a good thing, but our service has a few critical sections where only one instance should be able to process
data. Since we are retrieving data from Postgres, we decided to go ahead and make use of advisory locks to control these
critical sections. In this article I want to explain what advisory locks are, provide an implementation, and test to
verify functionality.

### Advisory locks

Postgres provides the ability to create locks that only have meaning within the context of your application. These
are [advisory locks](https://www.postgresql.org/docs/9.4/explicit-locking.html#ADVISORY-LOCKS). You use advisory locks
to control an application’s ability to process data. Anytime your application is about to enter a critical path, you
attempt to acquire the lock. When you acquire the lock, you can safely continue processing.

async with AdvisoryLock("goldleader", dbconfig) as connection:If it fails, then your application may retry, wait, or
exit. Since this lock is external to the application, this allows for multiple instances of the application to run while
providing safe critical path concurrency.

### Building the lock

As part of our work, we wanted to make using advisory locks easy. To do this, we created the PostgresAdvisoryLock
context manager. Since this is meant to be used with asyncio and asyncpg, we control the acquisition and release of the
lock via aenter and aexit.

```python
class AdvisoryLock:
 async def aenter(self) -> asyncpg.connection.Connection:
 self.lockedconnection = await asyncpg.connect(...)
 await self.setlock()
 if self.gotlock:
 return self.lockedconnection
 else:
 if self.lockedconnection:
 await self.lockedconnection.close()
 raise AdvisoryLockException async def aexit(self, exctype, excval, exctb):
 await self.release()Now this can be called like any other async context manager.

async with AdvisoryLock(config, "appname") as connection:
 val = await connection.fetchrow("SELECT 1")
```

### Testing the lock

Now that the PostgresAdvisoryLock class is implemented, we need to test it. To start we verify the base functionality by
acquiring the lock, running a query, and validating we can't get the lock inside the same scope. I recommend using the
asynctest library to help work with asyncio inside unittest.

```python
async def testgetresultswithlock(self):
 async with AdvisoryLock("goldleader", dbconfig) as connection:
 val = await connection.fetchrow("SELECT 1;")
 self.assertEqual(val[0], 1) async def testlockpreventssecondlock(self):
 with self.assertRaises(AdvisoryLockException):
 async with AdvisoryLock("goldleader", dbconfig) as connection:
 await connection.fetchrow("SELECT 1;")
 async with AdvisoryLock("goldleader", dbconfig) as secondconnection:
 await secondconnection.fetchrow("SELECT 1;")
```

Since we are going to use this to control the execution of code across many processes, we also need to verify external
process behavior. To do this we use the asyncio subprocess.createsubprocessexec function to create a new process. This
process attempts to get the lock our main process already has, and it should fail.

```python
async def testadvisorylockpreventsaccessfromseparateprocess(self):
 with self.assertRaises(AdvisoryLockException):
 async with AdvisoryLock("goldleader", dbconfig) as connection:
 proc = await asyncio.subprocess.createsubprocessexec(
 sys.executable,
 "-c",
 executable,
 stderr=asyncio.subprocess.PIPE,
 )
```

### Wrapping up

When we started to build our new application, we knew we would be waiting on the network and database. Since we also had
work that could happen during the wait, we decided to use asyncio. Additionally we identified a critical path where we
used Postgres to achieve concurrency control. To make critical path control easier we created a module and a series of
tests. Once finished we realized this might be helpful to others looking for the same control, or as a reference for
those learning to test with asyncio.

You can find the full implementation and Docker setup [on Sourcehut](https://github.com/n0mn0m/PostgresAdvisoryLock).
