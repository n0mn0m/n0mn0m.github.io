---
Title: Train All the Things - Speed bumps
Published: 2020-03-30
Tags:
- hackaday
- maker
- dependency management
- bugs
- esp-idf
- esp
- tensorflow
- train all the things
---

As part of getting started on my project a couple months back I took a look at
what boards were supported by
[Tensorflow lite](https://www.tensorflow.org/lite/microcontrollers#supported_platforms)
. Seeing an esp board I went that route since I've heard alot from the
maker/hacker community and thought it would be a good opportunity to learn more.
Additionally it's been quite a while since I had a project that was primarily
`C/C++` so that was exciting. Like any good project I ran into multiple
unexpected bumps, bugs and issues. Some were minor, others were frustrating. I'm
capturing some of those here for anybody else that may be starting down the path
of using Tensorflow Lite and an ESP32 board.

## Tensorflow speed bumps

Getting started with TF Lite is easy enough, but something I noticed as I
continued to work on the project is just how little things are designed specific
to the platform. Instead the examples are setup with Arduino as a default, and
then work is done to make that run on X target. In the case of the `ESP-EYE`
this looks like packing everything into an Arduino compatible loop, and handling
that in a single FreeRTOS task. I get the reason for this, but it's also a bit
of a headache later on as it feels like an anti pattern when addin in new task
and event handlers.

Another bump you are likely to notice is that the TF Lite examples rely on
functionality present in the TF `1.x` branch for training, but require TF
`>= 2.2` for micro libs. Not the end of the world, but it means your going to
manage multiple environts. If managing this using `venv`/`virtualenv` keep in
mind you're going to need the `esp-idf` requirements in the 2.x environment, or
just install in both as you may find yourself switching back and forth. In
addition to python lib versions the examples note `esp-idf 4.0`, but you will
want to use `>=4.0` with [this](https://github.com/espressif/esp-idf/pull/4251)
commit or you will run into compiler failures. I ended up using `4.1`
eventually, but something to note.

Finally interaction with the model feels flaky. It's an example so this kind of
makes sense, but I found that while the word detected was pretty accurate the
`new_command` and some of the attributes of the keyword being provided by the
model weren't matching my expectation/use. I ended up using the `score` value
and monitoring the model to setup the conditionals for responding to commands in
my application.

Overall the examples are great to have, and walking you through the train, test
and load cycle is really helpful. The main thing I wish I had known was that the
TF Arduino path for ESP was pretty much the same as the ESP native path with
regards to utility and functionality just using the `esp-idf` toolchain.

## ESP speed bumps

From the ESP side of things the core `idf` tooling is nice. I like how open it
is and how much I can understand the different pieces. This helped a few times
when I ran into unexpected behavior. One thing to note is if you follow the
documented path of cloning `esp-idf` you will want to consider how you manage
the release branch you use and when you merge updates. Updates are not pushed
into minor/bug fix branches instead they go into the release branch targeted on
merge.

Being new to the esp platform something I didn't know when I got started was
that [`esp-idf 4.x`](https://github.com/espressif/esp-idf/releases/tag/v4.0)
released in February of 2020. Because of this alot of the documentation and
examples such as [`ESP-WHO`](https://github.com/espressif/esp-who) and
[`esp-skainet`](https://github.com/espressif/esp-skainet) are still based on
`3.x` which has a variety of differences and changes in things like
the TCP/network stack. Because of this checking the version used in various
docs, examples etc is (as usual) important. Since the TF examples reference
version 4 that's where I started, but a lot of what's out there is based on v3.

One other bump somebody may run into is struct initialization in a modern
toolchain when calling the underlying esp C libraries from C++. I spent some
time digging around after transitioning the http request example into the TF C++
`command_responder` code and the compiler told me I was missing uninitialized
struct fields and their order made them required.

The example code:

```c
esp_http_client_config_t config = {
        .url = "http://httpbin.org/get",
        .event_handler = _http_event_handler,
        .user_data = local_response_buffer,
};
esp_http_client_handle_t client = esp_http_client_init(&config);
esp_err_t err = esp_http_client_perform(client);
```

And how I had to do it in C++:

```c++
esp_http_client_config_t* config = (esp_http_client_config_t*)calloc(sizeof(esp_http_client_config_t), 1);
config->url = URL;
config->cert_pem = burningdaylight_io_root_cert_pem_start;
config->event_handler = _http_event_handler;

esp_http_client_handle_t client = esp_http_client_init(config);
esp_http_client_set_method(client, HTTP_METHOD_PUT);
esp_err_t err = esp_http_client_perform(client);
```

I had a similar issue with wifi and you can see the solution
[here](https://git.burningdaylight.io/on-air/tree/master/voice-assistant/smalltalk/main/http/wifi.cc#L40).

I really enjoyed my lite trip into `idf`. It's an interesting set of components
and followed a workflow that I use and appreciate. I wrote a couple aliases
that somebody might find useful:

```bash
alias adf="export ADF_PATH=$HOME/projects/esp-adf"
alias idf-refresh="rm -rf $HOME/projects/esp-idf && git clone --recursive git@github.com:espressif/esp-idf.git $HOME/projects/esp-idf && $HOME/projects/esp-idf/install.sh"
alias idf=". $HOME/projects/esp-idf/export.sh"
alias idf3="pushd $HOME/projects/esp-idf && git checkout release/v3.3 && popd && . $HOME/projects/esp-idf/export.sh"
alias idf4x="pushd $HOME/projects/esp-idf && git checkout release/v4.0 && popd && . $HOME/projects/esp-idf/export.sh"
alias idf4="pushd $HOME/projects/esp-idf && git checkout release/v4.1 && popd && . $HOME/projects/esp-idf/export.sh"
alias idf-test="idf.py --port /dev/cu.SLAB_USBtoUART flash monitor"
```

And I look forward to writing more about esp as I continue to use it in new
projects.

Approaching the end of this project it's been a larger undertaking than I
expected, but I've learned a lot. It's definitely generated a few new project
ideas. The code, docs, images etc for the project can be found
[here](https://git.burningdaylight.io/on-air) and I'll be posting updates as I
continue along to [HackadayIO](https://hackaday.io/project/170228-on-air) and
this blog. If you have any questions or ideas reach
[out](mailto:n0mn0m@burningdaylight.io).
