---
title: EdgeRouter X PiHole Setup
date: 2019-10-18
page.meta.tags: homelab, raspberrypi, programming
page.meta.categories: programming
---

I’ve seen a few post from people asking for help adding a PiHole to their network with an EdgeRouter. One solution I’ve
seen is to use [brittanics black-list](https://github.com/britannic/blacklist). This is nice for those wanting to run
software on their router, but I didn’t want the load, and I want the functionality that the PiHole provides. Hopefully
this guide help those looking to add a PiHole in the future.

### Setting up the PiHole

I’m going to assume you’ve already installed PiHole on your device. If not
the [docs](https://github.com/pi-hole/pi-hole) are a great place to start. If you set this up on a Raspberry Pi I
encourage you to disable autologin, add a new user, add the user to the sudo group and enable ssh. For more information
checkout the RaspberryPi [docs](https://www.raspberrypi.org/documentation/remote-access/ssh/).

### Configuring EdgeRouter to use the PiHole

**I’m assuming your edgerouter is the DHCP server on your network.**

With PiHole installed, connect the device to your network (preferably wired) and login to the Ubiquity web ui. Click on
the Services tab.

![](../../img/blog/0oJpLVsMSHYQc8A9M.png)

On this tab you should see an action button on the right side of the screen across from your DHCP information. Click it,
and select configure. In the pop up window select Leases, and you should see the device your PiHole is on. Click the
Static MAC/IP Mapping tab and give this device a static IP.

While we are here click the details tab and add the IP as DNS 1.

![](../../img/blog/0eVNmSkynpiX4nUYh.png)

Return to the main web ui Dashboard. At the bottom of the screen you should see a system tab with an arrow on the far
right.

![](../../img/blog/0rwz9tJdMQwzQPbei.png)

Click it and on the right side of the pop up add the IP you just assigned the PiHole as your Name Server.

![](../../img/blog/0A7OE7Ka5iL7knB_D.png)

With this in place login to your PiHole, navigate to network and you should see your router listed. The device should be
highlighted green with a query count indicating that traffic is flowing through the PiHole as expected.
