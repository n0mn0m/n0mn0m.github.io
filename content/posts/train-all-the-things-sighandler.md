+++
title = "Train All the Things - Signaling"
date = 2020-03-01
[taxonomies]
tags = ["hackaday","machine learning","train all the things","edge","javascript","serverless","faas"]
+++

After [figuring out](@/posts/train-all-the-things-planning.md) what I was
going to use for my project I started work with things I know. I already had
some experience with Cloudflare workers building a
[home system status](@/posts/system-status-observer.md) page, and Workers K/V
makes storing and fetching data quick and easy. I ended up with a simple
endpoint that I `POST` to set a bit after keyword detection, and the PyPortal
retrieves that status to determine what to display:

```javascript
const setCache = (key, data) => SIGNALS.put(key, data);
const getCache = key => SIGNALS.get(key);

async function getStatus(cacheKey) {
    var serviceStat = await getCache(cacheKey);

    if (!serviceStat) {
        return new Response('invalid status key', { status: 500 });
    } else {
        return new Response(serviceStat, {status: 200});
    }
}

async function setStatus(cacheKey, cacheValue) {
    try {
        await setCache(cacheKey, cacheValue);
        return new Response((cacheKey + " set to " + cacheValue + "\n"), { status: 200 });
    } catch (err) {
        return new Response(err, { status: 500 });
    }
}

async function handleRequest(request) {
    var psk = await getCache("PSK")
    let presharedKey = new URL(request.url).searchParams.get('psk');
    let statusKey = new URL(request.url).searchParams.get('service');
    let statusValue = new URL(request.url).searchParams.get('status');

    if (presharedKey === psk) {
        if (request.method === 'POST') {
            return setStatus(statusKey, statusValue);
        } else if (request.method === 'GET' && statusKey) {
            return getStatus(statusKey);
        } else {
            return new Response("\n", { status: 418 });
        }
    } else {
        return new Response("Hello")
    }
}


addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
```

Nothing tricky happening above, just checking the request, and calling the
appropriate function to store or fetch the status bit. With the function
deployed to my Cloudflare Worker and verified with some `GET` and `POST` calls
I was ready to move on to the [display](@/posts/train-all-the-things-display.md).

The code, docs, images etc for the project can be found
[here](https://github.com/n0mn0m/on-air) and I'll be posting updates as I
continue along to [HackadayIO](https://hackaday.io/project/170228-on-air) and
this blog. If you have any questions or ideas reach
[out](mailto:n0mn0m@burningdaylight.io).
