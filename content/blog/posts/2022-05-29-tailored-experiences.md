---
title: Tailored Experiences
date: 2022-05-29
page.meta.tags: ux
page.meta.categories: experience
---

A couple of months ago I got to spend a few days hacking on an idea involving client side Tensorflow.js. Having spent
much of my career in what I call ML adjacent roles I was really surprised at the opportunities TF.js seem to open up.

One of the things that stood out to me is that the full training and deployment cycle can happen in real time client
side. As I was using the tool I was able to load my models starting point and start feeding it data seeing the behavior
and predictions from the model change immediately. I could even hop into dev tools to patch and tweak different settings
of the model just to see what happened. I didn’t have to wait long cycles, I didn’t have to insert a new notebook cell
and disrupt the flow. I was able to launch my web app, load in a checkpoint and go. Based on what I did the model was
able to learn in real time (and make some admittedly hilarious mistakes along the way).

This makes me wonder what kind of experiences this is waiting to unlock. I don’t need to send data back to a centralized
service for all of my data to be mixed in with the data of other individuals waiting for a new training cycle or model
deployment my data was on my device, the model was on my device the update was immediate. Obviously there are risk
here (filter bubble, convergence etc) to address, but the opportunity for useful new experiences appears strong.

While I haven’t had much time to explore TF.js since this initial interaction I hope to return to it sometime in the
near future. I think that projects like [automerge](https://github.com/automerge)
and [tensorflow.js](https://www.tensorflow.org/js) represent potential futures where our data is local to us. We can
collaborate, share and build all without phoning home or opening the app store if we continue to push what is possible
in our browser and devices.
