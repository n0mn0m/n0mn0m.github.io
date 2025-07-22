---
title: "Cleaning Airflow Logs"
date: 2019-12-01
page.meta.tags: airflow, python, programming
page.meta.categories: programming
---

At home and work I make use of Airflow to automate various batch/time based task. I’ve even setup a container based
Airflow [environment](https://github.com/n0mn0m/airflow-docker) to make it easy to bring this up and down.

One of the things you quickly find with Airflow is that while it doesn’t need a lot of resources to run, it can quickly
eat up whatever disk space you provide it with logs. When this happens the first knobs to look at turning are your log
level and your schedulers dag bag refresh rate. While you may not be refreshing dags often your may want to keep your
log level low to capture more data and use your log store to put a TTL on things at the INFO level. Unfortunately you
can't completely turn off Airflows disk logging without building in some custom functionality today. To help manage this
I wrote a small Python script that handles cleaning up the local logs on a given interval. Note if you're running
Airflow in a setup other than LocalExecutor you will want to handle this with something like Cron instead of a dag since
you need to clean logs up on the Scheduler, Worker and Webserver.

```python
def truncateprocessmanagerlog(logbasepath):  
 """  
 The scheduler records all acitivty related to dag processing in the same file.  
 This file can grow large fast, and is actively in use. Intead of unlinking the  
 file and pulling it out from under the scheduler truncate.  
 """  
 dagprocessmanagerlog = os.path.join(  
 logbasepath, "dagprocessormanager", "dagprocessormanager.log"  
 )  
 open(dagprocessmanagerlog, "w").close()  
  
def traverseandunlink(fobject):  
 """  
 Traverse the log directory on the given airflow instance (webserver, scheduler,  
 worker, etc) and remove any logs not modified in the last hour.  
 """  
 for entry in os.scandir(fobject):  
  newfobject = os.path.join(fobject, entry)  
  if os.path.isfile(newfobject):  
   lastmodified = os.stat(newfobject).stmtime  
   delta = datetime.utcnow().timestamp() - lastmodified  
  if delta > HOURSINMILLISECONDS:  
   print(  
    f"{newfobject} has not been used in the last hour. \  
   \nCleaning up."  
   )  
   os.unlink(newfobject)  
  elif os.path.isdir(newfobject):  
   traverseandunlink(newfobject)
```

The full script is available [here](https://github.com/n0mn0m/snippets/tree/main/airflow-log-cleanup.py).
