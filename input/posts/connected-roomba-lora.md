---
Title: Connected Roomba Remote - LoRa
Published: 2019-08-02
Tags:
- circuitpython
- python
- hardware
- adafruit
- iRobot
- roomba
- LoRa
---

With a basic setup working the next thing I wanted to do was make communication
wireless. Thinking about my options I ruled out using WiFi pretty quick since I
didn't want to worry about discovery and router issues. I thought about
Bluetooth since I could send commands from my phone to the board on the Roomba,
but decided against it due to my lack of mobile programming experience and not
wanting to add yet another new thing to learn. (Side note I've since learned
about the
[Bluefruit app](https://learn.adafruit.com/bluefruit-le-connect/features))
Looking at the other [Feather](https://www.adafruit.com/feather) options I
decided to make use of
[LoRa](https://learn.adafruit.com/adafruit-feather/lora-radio-feathers)
for my communication layer since it would be easy to use, my packets are tiny
and I didn't have to worry about software beyond CircuitPython.

## The boards

With the protocol determined and sticking with CircuitPython I found a
[Feather](https://www.adafruit.com/product/3179) with LoRa built in, and a
[Pi Zero Bonnet](https://www.adafruit.com/product/4074) with some buttons and a
small display that would make testing easier. After reading through the
[docs](https://learn.adafruit.com/adafruit-feather-m0-radio-with-lora-radio-module)
and
[tutorials](https://learn.adafruit.com/lora-and-lorawan-radio-for-raspberry-pi/rfm9x-raspberry-pi-setup)
for both boards I began work on signalling the Roomba to start with the push of
a button.

One of the first road blocks I ran into was of my own creation. The Roomba
library I wrote for prototyping was too big for the Feather. The good news was
`OpenInterface` was still useful, and there was plenty of room for the base
class after removing the debug and abstraction code, so I only compiled the
commands I knew I was going to use for version 1 and continued moving forward.

```python
class OpenInterface:
    def __init__(self, tx_pin, rx_pin, brc_pin, baud_rate=115200):
        self._board = busio.UART(tx_pin, rx_pin, baudrate=baud_rate)
        self._tx_pin = tx_pin
        self._rx_pin = rx_pin
        self._brc_pin = brc_pin
        self._brc_pin.direction = digitalio.Direction.OUTPUT
        self._baud_rate = baud_rate
        self._stopped = True

    def start(self):
        if self._stopped:
            self.wake_up()

        for command in (b"\x80", b"\x83", b"\x87"):
            self._board.write(command)

    def stop(self):
        for command in (b"\x85", b"\xAD"):
            self._board.write(command)
        self._stopped = True

    def wake_up(self):
        for i in range(3):
            self._brc_pin.value = False
            time.sleep(0.5)
            self._brc_pin.value = True
            time.sleep(0.5)
            self._brc_pin.value = False
            time.sleep(0.5)

        self._stopped = False

```

After stripping things down and getting the Feather to start and stop the
Roomba from the REPL I turned my attention to the Pi.

![Interface Connections](/assets/images/connected-roomba-full.jpg)

With the Pi Zero providing more resources installing the OS, setting up SSH and
compiling Python 3.7 took more time then getting the Circuit Python libraries
working. [Blinka](https://pypi.org/project/Adafruit-Blinka/) worked like a
charm and following the docs from above I had a quick
[script](https://git.burningdaylight.io/bot_commander/tree/master/pi/button_listener.py)
to send `start` and `stop` packets via LoRa working in no time.

```python
while True:
    try:
        if not start_button.value:
            msg = "Starting Roomba."
            logger.info(msg)
            rfm9x.send(bytes("1", "ascii"))
            display.fill(0)
            display.text(msg, 25, 15, 1)
        elif not stop_button.value:
            msg = "Stopping Roomba."
            logger.info(msg)
            rfm9x.send(bytes("0", "ascii"))
            display.fill(0)
            display.text(msg, 25, 15, 1)
```

The display on the bonnet was a nice touch so that I could watch the Feather in
a terminal while the Pi let me know immediately which button was pressed and
which command I should expect the Feather to receive.

![Pi Bonnet Display](/assets/images/connected-roomba-pi-start.jpg)

### Next Steps

With the boards talking to each other and the ability to start/stop the Roomba
with the press of a button the last thing to do was make this work when we are
not at home. While LoRa has a pretty good range I wanted this to work for my
wife and I without having to worry about where we are. In part 3 I look at
making this work with SMS.
