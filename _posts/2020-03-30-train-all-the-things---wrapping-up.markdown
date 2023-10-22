---
layout:	post
title:	"Train All the Things — Wrapping Up"
date:	2020-03-30
hide_hero: true
tags: python, programming, hackaday
categories: programming
---

And now I’m at v0.1 of the [on-air](https://github.com/n0mn0m/on-air) project. I was able to achieve what I was hoping to along the way. I learned more about model development, tensorflow and esp. While this version has some distinct differences from what I outlined for the logic flow (keywords, VAD) it achieves the functional goal. The code, docs, images etc for the project can be found in [this](https://github.com/n0mn0m/on-air) repo, and the project details live on [HackadayIO](https://hackaday.io/project/170228-on-air). When I get back to this project and work on v1.x I'll make updates available to each.

![](/assets/img/blog/012tf1MTuiXAahexs.gif)

![](/assets/img/blog/0lx6jwWNAwZhzb5vB.gif)

A couple thoughts having worked through this in the evening for a couple months:

* I really should have outlined the states that the esp program was going to cycle through, and then mapped those into task on the FreeRTOS event loop. While the high level flow captures the external systems behavior the esp has the most moving parts at the applications level, and is where most of the state is influenced.
* I want to spend some more time with C++ 14/17 understanding the gotchas of interfacing with C99. I ran into a few different struct init issues and found a few ways to solve them. I’m sure there is a good reason for different solutions, but it’s not something I’ve spent a lot of time dealing with so I need to learn.
* While continuing to learn about esp-idf I want to look into some of the esp hal work too. I briefly explored esp-adf and skainet while working through on-air. Both focus on a couple boards but seems to have functionality that would be interesting for a variety of devices. Understanding the HAL and components better seems to be where to start.
* Data, specifically structured data is going to continue to be a large barrier for open models and for anybody to be able to train a model for their own want/need. While sources like Kaggle, arvix, data.world and others have worked to help this there’s still a gulf between what I can get at home and what I can get at work. Additionally many open datasets are numeric or text datasets while video, audio and other sources are still lacking.
* Document early, document often. Too many times I got so caught up in writing code, or just getting one more thing done that by the time I did that getting myself to do a thorough write up of issues I experienced, interesting findings, or even successful moments was difficult. I know that I put this off sometimes, and different parts of the project are not as well documented, or details have been lost to the days in between.
* There’s a lot of fun stuff left to explore here I can see why I’ve heard a lot about esp and look forward to building more.
