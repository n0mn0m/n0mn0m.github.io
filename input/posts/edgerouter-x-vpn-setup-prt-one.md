---
Title: EdgeRouter X Home VPN Setup Pt 1
Published: 2019-10-18
Tags:
- vpn
- edgerouter
- networking
- sys admin
---

Recently I got the itch to setup a VPN for my home network to access my device
lab on the go, or share with others. My home setup isn't too complicated, but
it's a bit different from other setups I found when I started down this path.

**Network Components: Arris Surfboard SB6141, Ubiquiti EdgeRouter X, Ubiquiti
AmplifiHD**

**I am not a network or sysadmin by day. This is something I'm actively
learning on and figuring out. If you see something wrong or have suggestions I
would love to hear about it. [Reach out.](mailto:n0mn0m@burningdaylight.io)**

## Preparing the network

As my starting point I had used the EdgeRouter wizard for initial setup way
back when. The default places the network in the 192.168.1.0/24 range which
should be changed to prevent a conflict for devices on remote networks. To add
a new dhcp server handing out address in a new range we will use the ubiquiti
ui.

To start login to the ubiquiti ui and navigate to the `Services` tab.

![Ubiquity OS Services Tab](/assets/images/ubq-services.png)

From here you can see `+ Add DHCP Server` on the left side of the screen.

![Ubiquity OS dhcp add button](/assets/images/add-dhcp.png)

Select `Add` and configure a new DHCP server leasing addresses in a new range
(`192.168.<x>.0`).

![Ubiquity OS add dhcp button](/assets/images/dhcp-config.png)

With this setup the next thing to do is test it works before removing the old
DHCP server settings.

Return to your Dashboard, and locate the `switch0` interface. To the far right
you should see an actions button.

![Ubiquity OS actions button](/assets/images/ubq-action.png)

Click, select config, and add a manually configured IP for the dhcp server you
just configured (192.168.x.1). With switch0 talking to our new network range
return to the `Services` tab. Click `actions` on the original DHCP server,
select disable, and then logout.

Now you can log back in on the new network range `192.168.x.1`. Login, select
`switch0` from the `Dashboard` tab as we did earlier, and remove the original
DHCP server. For any devices on your network that were active you will need to
do a `dhclient -r; dhclient` to refresh your device (on *nix) ip and lease in
the new range.

## Next Steps

With the network configured we are now ready to install and setup wireguard
Since this has already ran a bit long in the tooth part 2 can be found
[here](/posts/edgerouter-x-vpn-setup-prt-two).
