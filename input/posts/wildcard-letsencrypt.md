---
Title: Subdomain SSL with Gitlab Pages
Published: 2019-02-10
Tags:
- gitlab
- ssl
- pelican
- python
---

**This is out of date, I have since switched to self hosting gitea and AWS.**

A few months ago I decided to migrate my Pelican site from Github to Gitlab.
This was motivated largely by that fact that Gitlab has CI/CD built in by
default. During this migration I also decided it was time to setup my own
SSL certificate for [burningdaylight.io](https://burningdaylight.io). Since this
was new I looked around to see if there was any documentation readily available
, and I found
[this](https://fedoramagazine.org/gitlab-pelican-lets-encrypt-secure-blog/)
wonderful tutorial from Fedora Magazine.

Between that and the Gitlab
[custom domain and ssl](https://docs.gitlab.com/ee/user/project/pages/getting_started_part_three.html)
I was able to get up and running pretty quickly. I had accomplished my goals:

- migrate to Gitlab
- setup CI/CD of the Pelican site project
- setup ssl

Good to go, done in an afternoon with plenty of time to work on a new post.
I thought.

About a week later I was on a different computer and instead of browsing to
<https://burningdaylight.io> I went to <https://www.burningdaylight.io> and Firefox
blocked my request citing an SSL certificate error. Wondering what I had done
wrong I started tracing back through what I had done and realized that I had
only setup SSL certificate for my primary domain. Luckily last year lets
encrypt added support for
[wildcard](https://community.letsencrypt.org/t/certbot-0-22-0-release-with-acmev2-and-wildcard-support/55061)
certificates to certbot. Unfortunately that has not been included in a
[release](https://community.letsencrypt.org/t/certbot-the-currently-selected-acme-ca-endpoint-does-not-support-issuing-wildcard-certificates/55667/8)
so there's a couple steps that differ from the original Fedora article above.

## Setup Instructions

Below are the steps to use certbot, gitlab pages and your domain management
console to setup SSL for your subdomains. This assumes you are using a Debian
based OS (I'm using Ubuntu 18.04) to install Certbot. If not swap out the
certbot install steps for your OS and continue.

**If you read the Fedora article linked above you do not need another key in
`.well-known`. Instead for your subdomain you will validate with certbot by a
DNS record setup via your Domain Management Console.**

```bash
sudo aptget install certbot
```

```bash
certbot certonly -a manual -d *.<yourdomainhere>.<topleveldomainhere> \
--config-dir ~/letsencrypt/config --work-dir ~/letsencrypt/work \
--logs-dir ~/letsencrypt/logs \
--server https://acme-v02.api.letsencrypt.org/directory
```

Follow the instructions entering your email, reviewing ToS, etc

You will then see this prompt:

```bash
Please deploy a DNS TXT record under the name
_acme-challenge.burningdaylight.io with the following value:
```

Login to your domain management console and setup a txt record similar to:

| NAME | TYPE | TTL | VALUE |
|:----:|:----:|:----:|:----:|
| _acme-challenge | TXT | 1800 | your code from the terminal prompt above |

Once you have this setup it's a good idea to wait a couple minutes since this
record will populate via DNS and then return to your console and hit enter.

Once certbot validates the `TXT` record is available as part of your domain it
will provide you the new location of your `fullchain.pem` and `privkey.pem`
files for use with Gitlab pages.

With these files ready to go browse to your Gitlab page settings and setup your
subdomains as documented here and
[here](https://docs.gitlab.com/ee/user/project/pages/getting_started_part_three.html).

I highly recommend reading the Gitlab documentation above, but to summarize:

- In your Gitlab pages project settings click add a new site
- Enter the url
- Add the data from your `fullchain.pem` and `privkey.pem` files generated via
 certbot
- Copy the `gitlab-pages-verfication-code=` section from the Gitlab validation
 record box
- Login to your domain management console
- Setup a new `TXT` record for your subdomain:

| NAME | TYPE | TTL | VALUE |
|:----:|:----:|:----:|:----:|
| WWW | TXT | 1800 | gitlab-pages-verification-code=<gitlabcode> |

- Setup a new `A` record for

[Gitlab](https://docs.gitlab.com/ee/user/project/pages/getting_started_part_three.html)

| NAME | TYPE | TTL | VALUE |
|:----:|:----:|:----:|:----:|
| WWW | A | 1800 | 35.185.44.232 |

- Return to your Gitlab Pages settings console and click the verify button.

## Wrapping Up

With that you pages should show green and verified. If you browse to the
different subdomains you setup then you should get through without any SSL
problems.

One thing to note is that you will need to renew your certbot certificate
every 90 days. This is done via the `certbot renew` command. I've setup an
Airflow dag to take care of this since I have Airflow managing various other
things for me. You can see that [here](https://gitlab.com/n0mn0m/docker-airflow)

Hopefully you find the above helpful. If you run into issues I recommend:

- Make sure you used the `*` wildcard in the domain cert setup
- Setup your _acme-challenge record correctly in your domain management console
 and left it there
- Setup the right `TXT` and `A` records for Gitlab
