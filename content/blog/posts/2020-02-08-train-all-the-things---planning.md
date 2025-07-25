---
title: Train All the Things - Planning
date: 2020-02-08
page.meta.tags: hackaday, programming
page.meta.categories: programming
---

Earlier this year Hackaday announced
the [Train all the Things](https://hackaday.io/contest/169421-train-all-the-things#j-discussions-title) contest. I
immediately knew I wanted to submit something, but figuring out what to build took me a little bit. For my side projects
I like to make something that is useful to me, or somebody I know; while also learning something new. A few days after
the contest was announced my daughter was in the basement playing outside my office/homelab when I remembered my wife
had asked me if there was a way for her to know when I was working with somebody so that they could avoid coming down in
the basement. I thought a voice driven display could be a fun solution.

### Choosing Tools

After deciding on the project the next thing I wanted to figure out was what new boards I would need (if any) and how I
would build my model. After doing some research I landed
on [Tensorflow](https://www.tensorflow.org/lite/microcontrollers) as my path forward for deploying a model to a
microcontroller. Having used Tensorflow the barrier for model creation is a bit lower, but I am really curious about
Tensorflow Lite and the potential it provides. Additionally a relatively new book [TinyML](https://tinymlbook.com/)
looks like a good resource to use along the way.

After settling on TF Lite the next thing was picking a board. Most of my embedded experience has been with CircuitPython
and Rust. For this project I thought it would be fun to learn something new. The Espressif ESP-EYE caught my eye as an
interesting board known to work with TF Lite. I’ve seen the ESP32 and 8266 in a lot of other projects, so learning the
ESP toolchain seems valuable. Additionally a lot of the Espressif ecosystem seems to be built around FreeRTOS which
provides a whole other avenue of learning and hacking.

Finally I will need a way to let somebody know when the model has picked up voice activity, to signal that I’m currently
busy in the lab. The ESP32 has a WiFi chip providing the ability to send and receive signals via TCP if we want. The
ESP-EYE has that built in, and I happend to have a PyPortal (with an ESP32) that could make a great display checking for
a status using WiFi too. To signal from one to the other I decided to have some fun and use Cloudflare Workers K/V to
set a bit from the ESP-EYE that would be read by the PyPortal at a given time interval to set the display.

Putting it all together the initial idea looks something like this:

![](../../img/blog/07Ex2dh4NkgBHiLFg.jpg)

Which allows me to have a small board in my homelab listening and the display above the stairwell where somebody can get
a status update before they ever come down.

The code, docs, images etc for the project can be found [here](https://github.com/n0mn0m/on-air) and I’ll be posting
updates as I continue along to [HackadayIO](https://hackaday.io/project/170228-on-air) and this blog. If you have any
questions or ideas reach [out](mailto:n0mn0m@burningdaylight.io).
