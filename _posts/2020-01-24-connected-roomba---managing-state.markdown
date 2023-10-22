---
layout:	post
title:	"Connected Roomba - Managing State"
date:	2020-01-24
hide_hero: true
tags: python, programming, roomba, hackaday
categories: programming
---

  Last year I started work and completed the first prototype for managing a roomba via sms and radio. Overall the prototype was a successful, but over time highly unreliable in the face of failure. Most of this came down to state management for the API endpoint and the Roomba OI (Open Interface) code running on the Feather. This week I had the opportunity to sit down and fix some of that.

The latest version of the project can be found [here](https://github.com/n0mn0m/bot_commander).

### Roomba

In previous version of the application that ran on the Feather listening for messages over radio I had managed the application state in this class:

```python
class OpenInterface:  
 def init(self, txpin, rxpin, brcpin, baudrate=115200):  
 self.board = busio.UART(txpin, rxpin, baudrate=baudrate)  
 self.txpin = txpin  
 self.rxpin = rxpin  
 self.brcpin = brcpin  
 self.brcpin.direction = digitalio.Direction.OUTPUT  
 self.baudrate = baudrate  
 self.stopped = True
```

I had done this so that I couldn’t send the Roomba signals that were invalid for a given state based on the Open Interface documentation. The [circuitroomba](https://github.com/n0mn0m/circuitroomba) project were I originally implemented this actually did a lot more state management. Overall maybe this would be helpful during application development, but I found it made code on the board unreliable due to the size of the class object in memory and other work going on causing the board to eventually crash over an extended period of time.

The more I thought about this I also realized I had caused an even larger issue. The Roomba itself manages state internally. It has all of the logic laid out in the OI document impelmented internally keeping things “safe” and tracking if a given signal is valid or not. By adding my own state management layer on top of this I opened the door for all kinds of trouble. First if the internal Roomba logic differed from the OI documentation, or I implemented the OI logic incorrectly I would be sending the application developer down all kinds of paths trying to figure out why state transistion and command signals were not exhibiting the expected behavior. Why setup 2 FSMs when one will do, and only one ends up being the true dispatch? If we did this at the sms API layer we could have 3, all with the potential for bugs, unexpected behavior, logic mismatches, timing issues etc. It’s a combinatorial explosion of state management issues.

So stepping back, considering the separation of concerns I determined all the board needed to do was listen for a given signal flag and pass that on to the Roomba. From there the Roomba can determine if the signal should be acted on based on it’s internal state.

The new implementation discards the class object and instead just uses a super loop and signal functions.

```python
while True:  
 try:  
 packet = rfm9x.receive(1) if packet is not None:  
 packettxt = str(packet, "ascii")  
 print(packettxt) if packettxt == "0":  
 commandreceived(led)  
 led.value = True  
 stop(bot)  
 led.value = False  
 elif packettxt == "1":  
 commandreceived(led)  
 wakeup(brc)  
 start(bot)  
 led.value = True  
 else:  
 print("\nUnknown packet: {}\n".format(packettxt))  
 except:  
 pass
```

Additionally from time to time signals can have issues that previously caused hanging in the application. Now the logic inside the super loop is wrapped in a try/except to prevent corrupt date from completely crashing the application. Instead failures are ignored and we keep listening for the next signal. While this isn't always a viable solution in the case of signaling the Roomba the stakes are low and this is something I'm comfortable with.

### Pi Zero

After fixing up the Feather board code I moved onto the Pi applications. Previously I had setup a Flask application to act as the SMS webhook for Twilio. This worked pretty well and was consistent over time, but there was the occasional hang running on the Zero that led me to look into managing the Python and Ngrok application with systemd. Converting from crontab was fairly easy. I created a few *.service files and placed them in /etc/systemd/system.

```systemd
[Unit]  
Description=sms listener  
After=ngrok.service[Service]  
Type=simple  
User=pi  
WorkingDirectory=/home/pi  
ExecStart=/home/pi/.virtualenvs/lora-pi/bin/python /home/pi/projects/roombasupervisor/smslistener.py  
Restart=on-failure[Install]  
WantedBy=multi-user.target
```

Once the files were created I ran the following commands:

```bash
systemctl enable smslistener.service  
systemctl start smslistener.service
```

And now all of the required applications (ngrok, sms listener, button listener) are managed by systemd. This controls their startup better than the previous crontab setup and has the added benefit of restarting the service if it fails our.

### Wrapping up

By observing and understanding the ways in which the prototyped system failed I was able to identify areas where behavior and functionality could be simplified resulting in an overall more reliable system. If you have any other tips to share [reach out](mailto:n0mn0m@burningdaylight.io) and good luck hacking.
