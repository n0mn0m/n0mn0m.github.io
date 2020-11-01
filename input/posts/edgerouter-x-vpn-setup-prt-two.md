---
Title: EdgeRouter X Home VPN Setup Pt 2
Published: 2019-10-18
Tags:
- vpn
- edgerouter
- networking
- sysadmin
---

**I am not a network or sysadmin by day. This is something I'm actively
learning on and figuring out. If you see something wrong or have suggestions
I would love to [hear about it](mailto:n0mn0m@burningdaylight.io).**

In [part one](/posts/edgerouter-x-vpn-setup-prt-one) we configured the
network. Now we are ready to install Wireguard and create our interface. Before
I jumped into doing this I referenced these post and docs.

- [Wireguard](https://www.wireguard.com/quickstart/)
- [Charles R. Portwood || Wireguard on Ubiquity OS](https://www.erianna.com/wireguard-ubiquity-edgeos/)
- [David Wireguard Home Network](https://www.erianna.com/wireguard-ubiquity-edgeos/)

To get started `ssh` into the EdgeRouter device.

```bash
ssh <user>@<edgerouterip>
```

Once logged in we need to pull, install the Wireguard `.deb`.

```bash
cd /tmp

# Download the appropriate version, pay special attention here, if you are using the Ubiquity v2 firmware
# you will need the wireguard-v2-*
curl -qLs https://github.com/Lochnair/vyatta-wireguard/releases/download/0.0.20190913-1/wireguard-v2.0-e50-0.0.20190913-1.deb

sudo dpkg -i wireguard.deb
```

An important note from the source repo

**Note that since Wireguard is not software bundled with the EdgeOS firmware,
firmware upgrades necessitate re-installing the Wireguard debian package. Once
the wireguard package is re-installed re-applying the existing Vyatta config
file, or rebooting will restore your interfaces.**

First things first we need to generate a private key for the router, and a
public key to share with clients.

```bash
$ wg genkey | tee /dev/tty | wg pubkey
123ddgqeqe123123
```

This will output two lines. The first is your private key, the second is your
public key. Keep these secure, but ready since you will need to provide the
public key to all clients.

With our keys generated we can now configure the Wireguard interface. Ours
will be `wg0`. In the terminal:

```bash
configure

set interfaces wireguard wg0 address 192.168.55.1/24
set interfaces wireguard wg0 listen-port 51820
set interfaces wireguard wg0 route-allowed-ips true
set interfaces wireguard wg0 private-key <private-key-from above-output>

commit
save
```

This created a new wireguard network on `192.168.55.1/24`; listening to port
`51820` and will route all the traffic through `wg0`.

Now keeping our public key ready we can configure a client.

## Configuring Wireguard on Ubuntu

If you're using Ubuntu 19.10 wireguard should be available from `apt` by
default:

```bash
sudo apt-get update
sudo apt-get install wireguard
```

With prior versions:

```bash
sudo add-apt-repository ppa:wireguard/wireguard
sudo apt-get update
sudo apt-get install wireguard
```

Once again we need to generate our keys, now on the client:

```bash
wg genkey | tee /dev/tty | wg pubkey
```

Now, create the wireguard interface, still on the client.

```bash
touch /etc/wireguard/wg0.conf
chown root:root /etc/wireguard/wg0.conf
chmod 600 /etc/wireguard/wg0.conf

sudo vim /etc/wireguard/wg0.conf

<--------wg0.conf-------->
[Interface]
Address = 192.168.55.5/32
PrivateKey = <client-private-key>

[Peer]
PublicKey = <router-public-key>
AllowedIPs = 192.168.55.0/24
Endpoint = public_ip_of_router:51820
```

## Peering the router and client

With the client configured and keeping the public key it generated, return to
the  router. `ssh` and run:

```bash
set interfaces wireguard wg0 peer <client-public-key> allowed-ips 192.168.55.5/32
commit
save
```

## Starting your client VPN

With `wg0` configured and ready bring up the VPN on our client.

```bash
sudo wg-quick up wg0
```

And verify connectivity by running `sudo wg` on the client, and router.

### Next Steps

With VPN setup I'm now able to access and provide access to my device lab. This
also  keeps devices using this router that are not part of the lab separated.

Finally if you're doing this for the first time some next steps you might want
to take include:

- Switch devices to only allowing ssh via keys.
- Switch to a non default ssh port.
- Setup fail2ban.
- Pickup from [here](https://opensource.com/article/19/10/linux-server-security)
