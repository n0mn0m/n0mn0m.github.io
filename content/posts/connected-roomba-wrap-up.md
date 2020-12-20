+++
title = "Connected Roomba - Wrapping Up"
date = 2019-08-04
[taxonomies]
tags = ["circuitpython","python","hardware","irobot","roomba","adafruit"]
+++

With everything working I wanted to make sure I didn't have to reset everything
anytime an odd decode error occurs, something loses and regains power, etc. For
the Feather attached to the Roomba handling this is pretty straight forward.
Everything is already running in a super loop, so all I need to add is a
`try/except` block to the `while` loop and discard errors. Doing the same thing
for the Pi was again straight forward, but since it is running Linux I needed
to make sure the applications handled failures, and that the scripts restart if
the board restarts, the OS bounces, etc.

Similar to the Feather code I wrapped everything in a while loop, added
exception handlers, but I also added logging so that I could understand if
errors are created by the OS, the code or something else:

```python
import logging
...

LOG_FORMAT = "%(asctime)s:%(levelname)s:%(message)s"
logging.basicConfig(
    filename="/home/pi/logs/button.log",
    level=logging.INFO,
    format=LOG_FORMAT,
    datefmt="%m/%d/%Y %I:%M:%S %p",
)
logger = logging.getLogger(__name__)

...

if __name__ == "__main__":
    while True:
        try:
            ...
        except BaseException as e:
            logger.exception(e)
            pass

```

And since this is running on Linux setting up `cron` to handle starting the
applications after reboot was one command away.

```bash
sudo crontab -e

@reboot cd /home/pi/ && /home/pi/.virtualenvs/lora-pi/bin/python /home/pi/projects/roomba_supervisor/button_listener.py 2>&1 >> /home/pi/logs/button.log
@reboot cd /home/pi/ && /home/pi/.virtualenvs/lora-pi/bin/python /home/pi/projects/roomba_supervisor/sms_listener.py 2>&1 >> /home/pi/logs/sms.log
@reboot sleep 10 && cd /home/pi/ && /home/pi/ngrok http 5000 2>&1 >> /home/pi/logs/ngrok.log
@reboot sleep 20 && curl http://127.0.0.1:4040/api/tunnels 2>&1 > /home/pi/logs/ngrok_details.log
```

![Remote Roomba Demo](/images/connected-roomba-demo.gif "Remote Roomba Demo")

## Wrapping Up

Since this was my first project interacting with an embedded system I learned
quite a bit along the way. Abstractions are something that are useful, but can
add bloat and load that won't work in constrained environments. I wasn't able
to use the Roomba library I built with the Circuit Playground on the Feather
that I connected to the Roomba. CircuitPython made learning and prototyping
easy with a REPL and constant connection to the Open Interface. It also allowed
me to focus on learning more about the boards and data interactions since I
wasn't busy rebuilding my software toolchain for a new environment. That said
it has also inspired me to learn more and dig deeper into the embedded world
since there are a lot of things I can't user (interupts). There is a lot that
I don't know or understand yet, but with the help of some books and boards I
am sure I will be busy expanding my understanding for the next few years.

### Contact

I really enjoyed working on this project. If you want to reach out feel free
to follow up via [email](mailto:n0mn0m@burningdaylight.io) or on
.

