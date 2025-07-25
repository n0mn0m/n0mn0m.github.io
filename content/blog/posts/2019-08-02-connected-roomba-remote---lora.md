---
title: Connected Roomba Remote - LoRa
date: 2019-08-02
page.meta.tags: python, hackaday, hardware, programming
page.meta.categories: programming
---

With a basic setup working the next thing I wanted to do was make communication wireless. Thinking about my options I
ruled out using WiFi pretty quick since I didn’t want to worry about discovery and router issues. I thought about
Bluetooth since I could send commands from my phone to the board on the Roomba, but decided against it due to my lack of
mobile programming experience and not wanting to add yet another new thing to learn. (Side note I’ve since learned about
the [Bluefruit app](https://learn.adafruit.com/bluefruit-le-connect/features)) Looking at the
other [Feather](https://www.adafruit.com/feather) options I decided to make use
of [LoRa](https://learn.adafruit.com/adafruit-feather/lora-radio-feathers) for my communication layer since it would be
easy to use, my packets are tiny and I didn’t have to worry about software beyond CircuitPython.

### The boards

With the protocol determined and sticking with CircuitPython I found a [Feather](https://www.adafruit.com/product/3179)
with LoRa built in, and a [Pi Zero Bonnet](https://www.adafruit.com/product/4074) with some buttons and a small display
that would make testing easier. After reading through
the[docs](https://learn.adafruit.com/adafruit-feather-m0-radio-with-lora-radio-module)
and [tutorials](https://learn.adafruit.com/lora-and-lorawan-radio-for-raspberry-pi/rfm9x-raspberry-pi-setup) for both
boards I began work on signalling the Roomba to start with the push of a button.

One of the first road blocks I ran into was of my own creation. The Roomba library I wrote for prototyping was too big
for the Feather. The good news was OpenInterface was still useful, and there was plenty of room for the base class after
removing the debug and abstraction code, so I only compiled the commands I knew I was going to use for version 1 and
continued moving forward.

```python
class OpenInterface:
 def init(self, txpin, rxpin, brcpin, baudrate=115200):
 self.board = busio.UART(txpin, rxpin, baudrate=baudrate)
 self.txpin = txpin
 self.rxpin = rxpin
 self.brcpin = brcpin
 self.brcpin.direction = digitalio.Direction.OUTPUT
 self.baudrate = baudrate
 self.stopped = True def start(self):
 if self.stopped:
 self.wakeup() for command in (b"\x80", b"\x83", b"\x87"):
 self.board.write(command) def stop(self):
 for command in (b"\x85", b"\xAD"):
 self.board.write(command)
 self.stopped = True def wakeup(self):
 for i in range(3):
 self.brcpin.value = False
 time.sleep(0.5)
 self.brcpin.value = True
 time.sleep(0.5)
 self.brcpin.value = False
 time.sleep(0.5) self.stopped = False
```

After stripping things down and getting the Feather to start and stop the Roomba from the REPL I turned my attention to
the Pi.

![](../../img/blog/0-Bss4nUz1dBKFSCf.jpg)

With the Pi Zero providing more resources installing the OS, setting up SSH and compiling Python 3.7 took more time then
getting the Circuit Python libraries working. [Blinka](https://pypi.org/project/Adafruit-Blinka/) worked like a charm
and following the docs from above I had a
quick [script](https://github.com/n0mn0m/bot_commander/tree/main/pi/button_listener.py) to send start and stop packets
via LoRa working in no time.

```python
while True:
 try:
 if not startbutton.value:
 msg = "Starting Roomba."
 logger.info(msg)
 rfm9x.send(bytes("1", "ascii"))
 display.fill(0)
 display.text(msg, 25, 15, 1)
 elif not stopbutton.value:
 msg = "Stopping Roomba."
 logger.info(msg)
 rfm9x.send(bytes("0", "ascii"))
 display.fill(0)
 display.text(msg, 25, 15, 1)
```

The display on the bonnet was a nice touch so that I could watch the Feather in a terminal while the Pi let me know
immediately which button was pressed and which command I should expect the Feather to receive.

![](../../img/blog/0mRuGD7rVD6u5Oenv.jpg)

### Next Steps

With the boards talking to each other and the ability to start/stop the Roomba with the press of a button the last thing
to do was make this work when we are not at home. While LoRa has a pretty good range I wanted this to work for my wife
and I without having to worry about where we are. In part 3 I look at making this work with SMS.
