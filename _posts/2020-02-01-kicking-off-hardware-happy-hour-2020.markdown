---
layout:	post
title:	"Kicking off Hardware Happy Hour 2020"
date:	2020-02-01
hide_hero: true
tags: python, programming, hardware, embedded, adafruit, circuitpython
categories: programming
---

Last year we kicked off the first Hardware Happy Hour in Louisville Kentucky, USA. We had a lot of fun sharing our projects with each other and hearing about all the things being built in our own back yard. If you’re building something you should try looking for an [event](https://hardwarehappyhour.com/events/) in your [area](https://www.google.com/search?client=firefox-b-1-d&q=hardware+happy+hour) as more and more are popping up around the world.

### Circuit Playground Workshop

This year we wanted to start things off by inviting everybody to build and learn together with the [Circuit Playground Express](https://www.adafruit.com/product/3333). On January 29th we got together [15 makers and hackers](https://flic.kr/s/aHsmL8818Z) to have some fun with Arduino and Circuit Python making LEDs blink and speakers buzz. To kick things off Auystn introduced the group to the Arduino IDE, getting it to recognize your board setup, and receiving feedback via the serial console. As with any workshop we had plenty of fun figuring out why this and that didn’t work on whatever OS, but in many ways I think that was exposure for those new to working with the boards and tools that unexpected behavior may occur, but we can find a solution.

Once everybody had a board up and working [Austyn](https://flic.kr/p/2inNG6V) spent some time getting everybody comfortable with the Arduino syntax and constructs. That turned into showing how to make some [noise](https://github.com/h3-louisville/HardwareLou_CircuitPlayground/blob/main/cricket/lightsensor_cricket.ino) followed by a quick on/off switch demo. With a couple more code demos and showing off the Arduino code library we decided to switch gears and look at Circuit Python before having some general open make time.

With Circuit Python we had the same demos with a different approach. Instead of using an IDE and editor we showed how you could put the board into bootloader mode and drag and drop the UF2 and code files directly on the board for loading. Along with that we demo’d the ability to use REPL driven development on the boards for quick prototyping and feedback.

Armed with Arduino and Circuit Python we decided it was time for us to step back and let people hack. Some had fun with accelerometer libraries while others scanned colors and lit up LEDs. By the end of the night I was rick rolled by a Circuit Playground.

![](/assets/img/blog/0XTsz57C6GeEzfHAq.jpg)

![](/assets/img/blog/08ByegkU1kkUpsb18.jpg)

![](/assets/img/blog/0n87_-bSCN0DDeIuU.jpg)

More photos from the event [here](https://flic.kr/ps/3R1NR2)

### Louisville Hardware Happy Hour 2020

As 2020 continues we have 3 more H3 events planned in Louisville. Similar to our 2019 event we are planning to have a Q2 and Q4 social. If you’re in the area we would love to see or hear about your project over some food and drink at [Great Flood](https://www.greatfloodbrewing.com/). In Q3 we are hoping to acquire some scopes to run a scope tutorial making use of the Circuit Playground boards and teaching attendees how they can see their programs in a new way.

### Sponsors

We (Austyn, Brad and I) want to give a huge shout out and thank you to the [Louisville Civic Data Alliance](https://civicdataalliance.org/). Without their support and sponsorship we would not be able to provide boards for all of the attendees to use. They have helped us kickstart a set of hardware that we can use to drive future workshops and education experiences. Thank you for providing us with the [Code.org Circuit Playground Express Educators’ Pack](https://www.adafruit.com/product/3399).

Thank you to [LVL1](https://www.lvl1.org/about/) for hosting. LVL1 is an amazing local resource in the area. If you haven’t checked it out you should definitely try to make it to one of the [Open Meeting and Making](https://www.lvl1.org/events/) events on Tuesday nights.

Thanks to [Tindie](https://www.tindie.com/) for some awesome stickers and swag.

And thank you to the various [code.org](https://code.org/about/donors) donors who made the [Adafruit Educators Pack](https://www.adafruit.com/product/3399) possible for us to purchase and use.

### Sponsorship Assistance

As I previously mentioned we are looking to run a scopes workshop this fall. If you or an organization you know is interested in sponsoring this event we are looking for help in acquiring digital scopes to provide attendees with. If you are interested in helping please reach [out](mailto:contact@h3lou.org).

#### Where to follow

To keep up with future H3 Louisville events we have a group setup on [gettogether.community](https://gettogether.community/hardware-happy-hour/) and we are active in the #hardware channel for [Louisville Slack](https://louisville.slack.com/).

Events will also be published to the [Louisville Tech](https://louisvilletech.org/) and [H3 Louisville](https://calendar.google.com/calendar?cid=YW51ajMyMmxlY3RzdDRqN2Zsb2xwN3J2dmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ) calendars.

You can find our code and presentations on [Github](https://github.com/Hardware-Happy-Hour-Louisville).
