---
title: Connected Roomba - SMS
date: 2019-08-03
page.meta.tags: python, hackaday, hardware, circuitpython, programming
page.meta.categories: programming
---

As I mentioned before one of the primary reasons for starting this project was to let my wife and I start the Roomba
when we are not at home. One device that most of us take everywhere is our phone. An easy way to to send information
from your phone without a custom app, stack and hassle is SMS. While it’s easy to broadcast receiving that message can
take a little work.

### Twilio

Luckily monitoring a number for messages is pretty much a solved problem. Twilio offers an easy way to setup number with
an attached webhook for receiving and sending messages. They also have a
nice [Python tutorial](https://www.twilio.com/docs/quickstart/python)that had me up and running in about 10 minutes.
Since I was already using the Pi Zero to send commands to the Roomba setting up a script to watch for an SMS message and
pass on the new command was simple enough.

```python
import busio
import board
import adafruitrfm9x
from digitalio import DigitalInOut
from flask import Flask, request
from twilio.twiml.messagingresponse import MessagingResponseCS = DigitalInOut(board.CE1)

RESET = DigitalInOut(board.D25)
spi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)
rfm9x = adafruitrfm9x.RFM9x(spi, CS, RESET, 433.0)
rfm9x.txpower = 23app = Flask(name)

@app.route("/sms", methods=["GET", "POST"])
def smsstartroomba():
  """
  When a message is received determine which
  signal to send the Roomba and reply
  to the sender.
  """** *txt = request.values.get("Body").lower() if txt == "start":
  msg = "Starting the Roomba."
  cmd = bytes("1", "ascii")
  elif txt == "halt":
  msg = "Stopping the Roomba."
  cmd = bytes("0", "ascii")
  elif txt == "dock":
  msg = "Roomba beginning to dock."
  cmd = bytes("2", "ascii")
  else:
  msg = "Unknown command. Continuing."
  cmd = None if cmd:
  rfm9x.send(cmd) resp = MessagingResponse()
  resp.message(msg) return str(resp)

if name == "main":
 app.run(debug=False)
```

And with that the same board I had used to test sending messages in response to button clicks can now receive SMS
payloads and translate that into a command that the Feather will use to start, stop or dock the Roomba.

### Next Steps

With all the pieces assembled and working the last thing to do for version 1 was setup some redundancy, restart
everything and make sure it all worked as expected without my intervention.
