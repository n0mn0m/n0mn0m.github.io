---
title: Connected Roomba - Possibilities
date: 2019-08-01
page.meta.tags: python, hackaday, hardware, programming
page.meta.categories: programming
---

A couple years ago at PyCon I received a kit from Adafruit containing
the [Circuit Playground Express](https://www.adafruit.com/product/2769). After going through the Hello World examples I
boxed it up I didn’t have a project ready to go. Fast forward to the winter of 2018 when I decided I would like to be
able to start our Roomba away from home because of the noise it makes, and suddenly I had the project I was looking for.
Digging around I found out about
the [Roomba Open Interface](https://www.irobotweb.com/%7E/media/MainSite/PDFs/About/STEM/Create/iRobot_Roomba_600_Open_Interface_Spec.pdf)
and set out to start talking to my Roomba with [CircuitPython](https://circuitpython.org/).

### Will this work

After reading through the Open Interface spec I decided it should be possible for me to control the Roomba by using the
Circuit Playground Express that I had waiting on the shelf. Getting the kit out and using the clips available I
connected the Playground Express TX to the Roomba RX, opened a REPL and tried to wake the Roomba, but received no
response.

After some more searching
I [found out](https://robotics.stackexchange.com/questions/18302/irobot-600-series-oi-wake-from-sleep-via-brc) that
certain series firmware will not respond to wake commands after 5 minutes without a signal. Knowing this, and pressing
the power button once to wake the Roomba, I was able to START, STOP and DOCK the Roomba with controller code running on
the Playground Express.

![](../../img/blog/1b31hiO4ynbDLRrXWEFF4aQ.png)

### Next steps

After spending some more time confirming command structures, documentation and behavior between CircuitPython and the
Roomba Open Interface I decided to make things easier by building a [package](https://pypi.org/project/circuitroomba/)
to abstract the interactions. With basic wiring and command functionality confirmed I decided it was time to start
looking at making remote signalling covered in part 2.
