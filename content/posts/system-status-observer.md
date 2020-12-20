+++
title = "A Simple Status Page"
date = 2020-02-18
[taxonomies]
tags = ["cloudflare","systemd","faas","serverless","monitoring"]
+++

I have a bad habit of creating side projects for my side projects.

A couple months ago I switched from running my blog with Pelican and Gitlab
Pages to Zola and Cloudflare Workers. I didn't do a write up on it, but if
you're interested there's a good
[post by Steve Klabnik](https://words.steveklabnik.com/porting-steveklabnik-com-to-workers-sites-and-zola)
to get you started. It was a surprisingly easy switch, and gaps between
writing haven't been as difficult with the better tools. After getting that
setup I read about
[Cloudflare Workers KV](https://developers.cloudflare.com/workers/reference/storage)
, thought it sounded really neat and started to think about what I might build.

On another [project](@/posts/train-all-the-things-planning.md) I need to signal
between different systems a simple status. Naturally that lead to me building a
status page. I setup a Cloudflare Worker that receives `POST` from `N` systems,
stores the date of the last `POST` uses that to provide a status when asked.

```javascript
const setCache = (key, data) => LOCAL_STATUS.put(key, data);
const getCache = key => LOCAL_STATUS.get(key);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dateToStatus(dateTime) {
    var isoDateNow = Date.now();
    var dateDiff = (isoDateNow - dateTime);
    if (dateDiff < 180000) {
    return 1
    } else {
    return 0
    }
}

async function getStatuses() {
    const cacheKeys = await LOCAL_STATUS.list();
    while (!(cacheKeys.list_complete === true)) {
    sleep(5)
    }

    const numKeys = cacheKeys.keys.length;
    var statuses = [];

    for (var i = 0; i < numKeys; i++) {
    var c = cacheKeys.keys[i];
    var epcDate = await getCache(c.name);
    var data = {date: Number(epcDate), name: c.name};
    data.strDate = new Date(data.date).toISOString();
    data.status = dateToStatus(data.date);
    data.statusIndicator = getStatusIndicator(data.status);
    statuses.push(data);
    }

    const body = html(JSON.stringify(statuses || []));

    return new Response(body, {
    headers: { 'Content-Type': 'text/html' },
    });
}

async function getStatus(cacheKey) {
    var cacheDate = await getCache(cacheKey);

    if (!cacheDate) {
    return new Response('invalid status key', { status: 500 });
    } else {
    var status = dateToStatus(cacheDate);
    return new Response(status, {status: 200});
    }
}

async function updateStatus(cacheKey) {
    try {
    var isoDate = Date.now();
    await setCache(cacheKey, isoDate);
    var strDate = new Date(isoDate).toISOString();
    return new Response((cacheKey + " set at " + strDate + "\n"), { status: 200 });
    } catch (err) {
    return new Response(err, { status: 500 });
    }
}

async function handleRequest(request) {
    let statusKey = new URL(request.url).searchParams.get('service');
    let queryType = new URL(request.url).searchParams.get('query');

    if (request.method === 'POST') {
    return updateStatus(statusKey);
    } else if (queryType === 'simple') {
    return getStatus(statusKey);
    } else {
    return getStatuses();
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
```

With that anything that can `POST` can "check in" with the endpoint. You can
see it working [here](https://status.burningdaylight.io/). I also went ahead
and wrote a simple `systemd` service that I can drop on to different machines
I want to have report in to the endpoint.

```bash
[Unit]
Description=Regular check in
Wants=check-in.timer

[Service]
Type=oneshot
ExecStart=/usr/bin/curl -X POST https://status.burningdaylight.io/?service=JETSON

[Install]
WantedBy=multi-user.target
```

And a timer for the service.

```bash
[Unit]
Description=Run checkin every 2 minutes
Requires=check-in.service

[Timer]
Unit=check-in.service
OnUnitInactiveSec=1m

[Install]
WantedBy=timers.target
```

This was a fun "Serverless/FaaS" experiment that actually let me know my ISP
was having an outage one morning before work. I've used other Functions as a
service on other cloud platforms and while they all provide slightly different
functionality (For instance Cloudflare being a CDN and the V8 isolate setup)
Cloudflare Workers has been really easy to work with and a lot of fun to build
experiments on. They even have a [web playground](https://cloudflareworkers.com)
that you can start with.

Two things I do wish were easier are interacting with K/V from Rust. This is
probably partially related to how new I am to Rust, but working with K/V from
JS is super easy, while this
[thread](https://www.reddit.com/r/rust/comments/fdmzyh/serverless_rust_i_tried_it_with_cloudflare_workers/)
documents another experience with Workers and Rust in more detail. Another mild
annoyance is working with different workers from the same machine and how API
keys are handled. There are some suggestions for this, but non of them feel
ergonomic at this time. Other than that my experience with Workers and K/V has
been great and I've already got more ideas for future experiments.

The code, docs, etc for the project can be found
[here](https://git.burningdaylight.io/system-status). If you have any questions or
ideas reach [out](mailto:n0mn0m@burningdaylight.io).
