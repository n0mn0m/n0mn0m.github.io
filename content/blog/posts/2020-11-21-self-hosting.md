---
title: Self Hosting
date: 2020-11-21
page.meta.tags: homelab, dns, programming
page.meta.categories: programming
---

Over the last few years I built up a sprawling list of dependencies for my home project and blog workflow. Earlier this
year I decided it was time to cut down on that list and host my service dependencies locally where I could. While it
took me a while I reached a point where I no longer tweak the setup week to week and decided it was time to write up the
process.

A quick list of the tools I used for orchestration:

- shell
- DNS
- Traefik2
- docker/docker-compose
- alpine linux

### (D)DNS

The first thing I needed to do was make my services easy to reach local and remote. Since this is all running behind my
home router that also means that my IP can change from time to time. To handle this I made use of Gandi’s DNS API, and
setup a [shell script](https://github.com/georgr/erx-gandi-nat-ddns) to run with cron on my router to keep my DNS
records up to date. With DNS ready I moved on to Traefik.

### Traefik

[Traefik](https://traefik.io/) is a really nice routing/proxy service that can inspect container labels and setup route
forwarding while handling certificate management, traffic metrics and more. The main callout (other than what you will
find in the [docs](https://doc.traefik.io/traefik/v2.3/) ) is to keep an eye on what version you are using versus what
others used in examples, and that non http based traffic (for instance ssh) requires a little more setup. Beyond that
Traefik has been really nice to use and made adding/removing various services easy when coupled with docker.

### docker-compose

While k8s is the current hot orchestration tool I wanted to keep things simple. I don’t have a need to cluster any of my
home tools, and while distributed systems are interesting they also require a lot of work. I left those at my day job
and use compose + [duplicity](https://github.com/n0mn0m/duplicity-helpers.git/) for my home setup. This makes service
management easy, the labels allow traefik to detect and handle traffic management while
my [duplicty](http://duplicity.nongnu.org/) ensures I won’t lose much work and can quickly restore my data and restart
any services in a few minutes on any box with docker.

### Services

A quick list of the services I’m hosting:

- git
- cgit
- minio
- teamcity
- youtrack
- rust home services API

The service management can be found [here](https://github.com/n0mn0m/arcade.git/tree/).

### Wrap Up

I’ve started to self host a few times in the past and backed away. This time I think it’s here to stay. With my current
setup I’m not worried about what happens when something crashes, certificate management is automated away and everything
just works. I’ve linked to my orchestration code above, but if you have any questions, or suggestions send
them [my way](mailto:alexander.hagerman@icloud.com). If you are starting out on your own self hosted setup, good luck, have
fun it’s easier now than ever and I imagine it will continue to get better.
