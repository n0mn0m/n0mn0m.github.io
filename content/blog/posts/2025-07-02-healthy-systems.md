---
title: Healthy Systems
date: 2025-07-02
page.meta.tags: programming
page.meta.categories: programming
---

A friend once told me that a complicated system that works is made up of many simple systems that work. It's something that rings true to me and I think about every time I interact with a digital system.

To help build those simple system that we compose into complex systems I want to share a few items that help me measure how healthy a simple system is, or isn't.

## Testing

This is my first step these days. Show me your test. If they are not there, then that tells me most of what I need to know about the state of the project. If they are there then I have a natural starting point for onboarding, and understanding. I have a way to execute and inspect at least parts of the system, and depending on the scope and levels of the test maybe the whole system.

It may be over stating it, but testing to me is one of the best skills a software engineer can develop, and the presence/scope or lack of automated test give me most of the information I need to know when considering the health of a project.

I think it's hard to over state how much you can learn from a good test suite, and how fast you can go with a robust reliable test suite. Over the years I've had many engineers ask me how they can know wether or not they are using the right abstractions and designs. I struggled to answer this for a long time (often recommending various [books](https://burningdaylight.io/lists/books/)). These days I tell them to write the test. If it's hard to test, or the test sucks to write, then you're probably not on the right track with your design. Step back and reconsider your approach and what other options exist.

## Publishing

What good is writing code if you can't ship it. Ultimately we are building these things to do something in the physical world right? Maybe there isn't a tangible change to the physical world, but somebody is interacting with or getting some form of utility from this thing we are building right? When we make changes we need a way to reliably ship those changes to their destination host system to run.

There are many ways to package up software and get it to a host system today (containers, debs, msi, app store artifacts, etc). Pick the one that makes the most sense for your project, use tools that help generate the target artifact (cpack, buildx, etc) and then build a publishing process (anything from a script that makes this a reproducible process to a fully automated pipeline) that makes this something that is easy to do (with appropriate permissions) once a change has been signed off on.

When publishing is hard I have found that it discourages work from getting finished. A lot of WIP builds up, or everything just takes longer. It's harder to keep up with what is or isn't done. The more you reduce the time between somebody deciding to implement a change, having it reviewed and then shipping it the better. This also helps make it easier to identify and fix bugs, because let's face it there will be bugs, there will be unknowns, the faster we can address them the better.

## Docs

There are multiple forms of docs that a project might generate. There are two primary forms of documentation that I'm interested in while working on a project.

### Decision Records

README and other developer guides are nice for helping me setup an environment, but if those don't exist hopefully I can get the information I need from pipelines, scripts and other files. What I will never be able to gain context on without docs (or word of mouth from project elders that have been around long enough to know, and have an accurate recollection) is why the project exist in it's current state. That's something [Architecture Decision Records](https://github.com/joelparkerhenderson/architecture-decision-record) or similar documents can help with. Why were certain decisions made (what problem was being solved), what options were considered, and why did the team go with the solution that I'm looking at today.

### User Docs

User docs help me understand what somebody using the system can expect. What have we communicated to our users that this tool/application/system can do. What guidance have we provided to them? How have we encouraged users to engage with our team and project if they have questions, need support, etc. The state of user docs conveys context about our system and how much we care about the people using our system.

## Wrap up

I thought about including other items on this list. Abstractions, data structures, dependency management, build systems, etc but honestly I think that those roll up into the three points above. If you're able to publish your project reliably then you probably have build systems and dependency management covered. If you have a well orchestrated and reliable test harness then you likely have healthy(ish) abstractions, though maybe this doesn't extend to choosing the "best" data structures. And while you could have a healthy publishing and test system without docs I think that only works at a small scale. Ultimately we need to communicate across time, space and individuals and docs are a great way to do that, and there is not reason they can't be part of your publishing system so that your docs live with the project, and as the system evolves your docs evolve with it.

See also [12 steps to better code](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/).
