---
title: Train All the Things — Display
date: 2020-03-05
page.meta.tags: python, circuit-python, hackaday
page.meta.categories: programming
---

Continuing my project with things I know the PyPortal display was up next. Last year I spent a few weeks playing with
the portal to make a badge at Gen Con and had a lot of fun with it. Since that
time [CircuitPython 5](https://circuitpython.org/downloads) has been released and the portal now expects a few
new [modules](https://circuitpython.org/libraries) which were easy enough to download and send to the board. The
PyPortal makes it incredibly easy to point at an endpoint to fetch data:

```python
import board
from adafruit import PyPortalpyportal

pyportal = PyPortal(
 url=<your url here>,
 default="green.bmp"
)

status = pyportal.fetch()
print(status)
```

With that small snippet we have our status, and all we need to do is put that in a loop to set the background depending
on the bit returned.

```python
import board
from time import sleep
from adafruitpyportal import PyPortaltry:
from secrets import secrets * # noqa

except ImportError:
 print("WiFi secrets are kept in secrets.py, please add them there!")

raisepyportal = PyPortal(
 url=secrets["signal"],
 defaultbg="green.bmp"
)

current = 0

while True:
 status = int(pyportal.fetch())
 if status == 0 and status == current:
     pass
 elif status == 0 and status != current:
     pyportal.setbackground("green.bmp")
 current = 0
     elif status == 1 and status != current:
 pyportal.setbackground("red.bmp")
     current = 1
 elif status == 1 and status == current:
     pass
 sleep(30)
```

Even though it’s a small snippet I want to point out a couple things. First I’m wrapping the return from fetch in a cast
to int. If you use Python, but you are new to CircuitPython this may seem odd. If you don't do this and try to compare a
string to an int you're probably not going to get the result you expect. Try it out in a repl and then follow up
with [CircuitPython Essentials](https://learn.adafruit.com/circuitpython-essentials/circuitpython-essentials) . Also I'm
only changing the background if the status we fetch is different than the current status. While repainting the screen is
fast, it's noticeable and there's no reason to do it every 30 seconds if nothing is different.

That’s it. Now whenever the endpoint receives an update the portal will see that status change and update the display.

![](../../img/blog/03CX8xYl9jomuqB3y.jpg)

![](../../img/blog/0-oqB9-pFVqxL1xWc.jpg)

Thanks to Adafruit for publishing the [case](https://www.thingiverse.com/search?q=pyportal&dwh=915e616a3fbda6e) above.
The logo on display is the Jolly Wrencher of [Hackaday](https://hackaday.com/about/).

With the [endpoint](https://burningdaylight.io/posts/train-all-the-things-sighandler/) and display done I’m off into the
unknown. I’ll be setting up the ESP-EYE to update the endpoint, training the voice model and finally running it all with
FreeRTOS.

The code, docs, images etc for the project can be found [here](https://github.com/n0mn0m/on-air) and I’ll be posting
updates as I continue along to [HackadayIO](https://hackaday.io/project/170228-on-air) and this blog. If you have any
questions or ideas reach [out](mailto:n0mn0m@burningdaylight.io).
