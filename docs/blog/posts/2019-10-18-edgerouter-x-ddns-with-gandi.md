---
title: "EdgeRouter X DDNS with Gandi"
date: 2019-10-18
page.meta.tags: homelab, dns, programming
page.meta.categories: programming
---

I recently [setup](https://burningdaylight.io/posts/edgerouter-x-vpn-setup-prt-one/) a VPN for my home network. To make
use of it from remote networks I need to be able to resolve the public IP of my router. Instead of hard coding the IP I
setup an domain with Gandi and created an A Record that I update from my router.

### Fetching and reporting your IP

This part was fairly easy. With a quick search I found that somebody else had already solved the problem of reporting
the public IP from an Ubiquiti router to Gandi! Checkout their
work [here](https://github.com/georgr/erx-gandi-nat-ddns). Their README provides a nice easy walk through of the setup.

### Scheduling it

With the above script updated and working on my router the next thing to do was schedule it.


> *Quick note only specific directories persist between firmware updates on the EdgeRouter. Because of this I suggest
> putting the script above in **config/scripts/** or **config/user-data**.*The EdgeRouter OS provides a helper utility
> called task-scheduler which wraps cron. The benefit of task-schedule is that is saves our commands to config so they
> persist through upgrades. ssh into your router:

```bash
ssh <user>@<router>  
configure  
set system task-scheduler task ddnsupdate  
set system task-scheduler task ddnsupdate crontab-spec '0 5 * * 0'  
set system task-scheduler task ddnsupdate executable path '/config/user-data/'  
commit  
save  
cat /etc/cron.d/vyatta-crontab
```
  