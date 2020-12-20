+++
title = "Train All the Things - Version 0.1"
date = 2020-03-28
[taxonomies]
tags = ["hackaday","maker","machine learning","tensorflow","esp","train all the things"]
+++

My first commit to `on-air` shows March 3, 2020. I know that the weeks leading
up to that commit I spent some time reading through the TF Lite documentation,
playing with Cloudflare Workers K/V and getting my first setup of `esp-idf`
squared away. After that it was off to the races. I outlined my original goal
in the [planning](@/posts/train-all-the-things-planning.md) post. I didn't quite
get to that goal. The project currently doesn't have a VAD to handle the
scenario where I forget to activate the display before starting a call or
hangout. Additionally I wasn't able to train a custom keyword as highlighted in
the [custom model](@/posts/train-all-the-things-custom-model.md) post. I was
however able to get a functional implementation of the concept. I am able to
hang the display up, and then in my lab with the `ESP-EYE` plugged in I can use
the wake word `visual` followed by `on/off` to toggle the display status.

![Voice Display Demo](/images/transition_one.gif)
![Voice Display Demo Two](/images/transition_two_speed.gif)

While it's not quite what I had planned it's a foundation. I've got a lot more
tools and knowledge under my belt. Round 2 will probably involved
[Skainet](https://github.com/espressif/esp-skainet) just due to the limitations
in voice data that's readily available. Keep an eye out for a couple more post
highlighting some bumps along the way and summary of lessons learned.

The code, docs, images etc for the project can be found
[here](https://git.burningdaylight.io/on-air) and I'll be posting any further updates
to [HackadayIO](https://hackaday.io/project/170228-on-air). For anybody that
might be interested in building this the instructions below provide a brief
outline. Updated versions will be hosted in the
[repo](https://git.burningdaylight.io/on-air/tree/main/docs). If you have any
questions or ideas reach [out](mailto:n0mn0m@burningdaylight.io).

**Required Hardware:**

1. [ESP-EYE](https://www.espressif.com/en/products/hardware/esp-eye/overview)
    1. Optional [ESP-EYE case](https://www.thingiverse.com/thing:3586384)
2. [PyPortal](https://www.adafruit.com/product/4116)
    1. Optional [PyPortal case](https://www.thingiverse.com/thing:3469747)
3. Two 3.3v usb to outler adapters and two usb to usb mini cables

OR

1. Two 3.3v micro usb wall outlet chargers

Build Steps:

1. Clone the [on-air](https://git.burningdaylight.io/on-air) repo.

Cloudflare Worker:

1. Setup [Cloudflare](https://www.cloudflare.com/dns/)
 DNS records for your domain and endpoint, or setup a new [domain](https://www.cloudflare.com/products/registrar/)
 with Cloudflare if you don&#39;t have one to resolve the endpoint.
2. Setup a [Cloudflare workers](https://workers.cloudflare.com/) account with
 worker K/V.
3. Setup the [Wrangler](https://developers.cloudflare.com/workers/tooling/wrangler)
 CLI tool.
4. `cd` into the `on-air/sighandler` directory.
5. Update `[toml](https://git.burningdaylight.io/on-air/tree/main/sighandler/wrangler.toml)`
6. Run `wrangler preview`
7. `wrangler publish`
8. Update `[Makefile](https://git.burningdaylight.io/on-air/tree/main/sighandler/Makefile)`
 with your domain and test calling.

PyPortal:

1. Setup CircuitPython 5.x on the [PyPortal](https://circuitpython.org/board/pyportal/).
    1. If you&#39;re new to CircuitPython you should [read](https://learn.adafruit.com/welcome-to-circuitpython/circuitpython-essentials)
     this first.
2. Go to the directory where you cloned on-air.
3. `cd` into display.
4. Update [secrets.py`](https://git.burningdaylight.io/on-air/tree/main/display/secrets.py)
 with your wifi information and status URL endpoint.
5. Copy `code.py`, `secrets.py` and the bitmap files in `screens/` to the root
 of the PyPortal.
6. The display is now good to go.

ESP-EYE:

1. Setup `[esp-idf](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/)`
 using the 4.1 release branch.
2. Install [espeak](http://espeak.sourceforge.net/) and [sox](http://sox.sourceforge.net/).
3. Setup a Python 3.7 virtual environment and install Tensorflow 1.15.
4. `cd` into `on-air/voice-assistant/train`
5. `chmod +x orchestrate.sh` and `./orchestrate.sh`
6. Once training completes `cd ../smalltalk`
7. Activate the `esp-idf` tooling so that `$IDF_PATH` is set correctly and all
 requirements are met.
8. `idf.py menuconfig` and set your wifi settings.
9. Update the URL in `[toggle\_status.cc](https://git.burningdaylight.io/on-air/tree/main/voice-assistant/smalltalk/main/http/toggle_status.cc)`
    1. This should match the host and endpoint you deployed the Cloudflare
     worker to above
10. `idf.py build`
11. `idf.py --port \&lt;device port\&gt; flash monitor`
12. You should see the device start, attach to WiFi and begin listening for the
 wake word &quot;visual&quot; followed by &quot;on&quot; or &quot;off&quot;.

