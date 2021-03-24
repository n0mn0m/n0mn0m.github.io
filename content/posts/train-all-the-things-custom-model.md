+++
title = "Train All the Things - Model Training"
date = 2020-03-24
[taxonomies]
tags = ["hackaday","maker","machine learning","training","train all the things","tensorflow","esp"]
+++

Recently I spent some time learning how to generate synthetic voices using
[espeak](@/posts/train-all-the-things-data-generation.md). After working with the
tools to aligning with the Tensorflow keyword models expectations I was ready
for training, and to see how well the synthetic data performed. TLDR: not well
:)

I started by training using the keywords `hi`, `smalltalk` and `on`. This let me
have a known working word while testing two synthetic words. Although training
went well:

```text
INFO:tensorflow:Saving to "/Users/n0mn0m/projects/on-air/voice-assistant/train/model/speech_commands_train/tiny_conv.ckpt-18000"
I0330 10:34:28.514455 4629171648 train.py:297] Saving to "/Users/n0mn0m/projects/on-air/voice-assistant/train/model/speech_commands_train/tiny_conv.ckpt-18000"
INFO:tensorflow:set_size=1445
I0330 10:34:28.570324 4629171648 train.py:301] set_size=1445
WARNING:tensorflow:Confusion Matrix:
 [[231   3   3   0   4]
 [  2 178   6  29  26]
 [  3  12 146   2   2]
 [  4  17   2 352  21]
 [  2  16   7  16 361]]
W0330 10:34:32.116044 4629171648 train.py:320] Confusion Matrix:
 [[231   3   3   0   4]
 [  2 178   6  29  26]
 [  3  12 146   2   2]
 [  4  17   2 352  21]
 [  2  16   7  16 361]]
WARNING:tensorflow:Final test accuracy = 87.8% (N=1445)
W0330 10:34:32.116887 4629171648 train.py:322] Final test accuracy = 87.8% (N=1445)
```

The model didn't respond well once it was loaded onto the ESP-EYE. I tried a
couple more rounds with other keywords and spectrogram samples with similar
results.

Because of the brute force nature that I used to generate audio the synthetic
training data isn't very representative of real human voices. While the
experiment didn't work out, I do think that generating data this way could be
useful with the right amount of time and research. Instead of scaling parameters
in a loop I think researching the characteristic of various human voices and
using those to tune the data generated via espeak could actually work out well.
That said it's possible the model may pick up on characteristics of the espeak
program too. Regardless, voice data that is ready for training is still a hard
problem in need of more open solutions.

Along with the way I scaled the espeak parameters another monkey wrench is that
the microspeech model makes use of a CNN and spectrogram of the input audio
instead of full signal processing. This means it's highly likely the model will
work with voices around the comparison spectrogram well, but not generalize.
This makes picking the right spectrogram relative to the user another key task.

Because of these results and bigger issues I ended up tweaking my approach and
used
[`visual`](https://github.com/n0mn0m/on-air/tree/main/voice-assistant/smalltalk/main/main_functions.cc)
as my wake word followed by on/off. All of these are available in the TF command
words dataset, and visual seems like an ok wake word when controlling a display.
For somebody working on a generic voice assistant you will want to work on audio
segmentation since many datasets are sentences, or consider using something like
[Skainet](https://github.com/espressif/esp-skainet). All of this was less fun
than running my own model from synthtetic data, but I needed to continue
forward. After a final round of training with all three words I followed the TF
[docs](https://www.tensorflow.org/lite/microcontrollers?hl=he) to represent the
model as a C array and then flashed it onto the board with the rest of the
program. Using `idf monitor` I was able to observe the model working as
expected:

```text
I (31) boot: ESP-IDF v4.1
I (31) boot: compile time 13:35:43
I (704) wifi: config NVS flash: enabled
I (734) WIFI STATION: Setting WiFi configuration SSID Hallow...
I (824) WIFI STATION: wifi_init_sta finished.
I (1014) TF_LITE_AUDIO_PROVIDER: Audio Recording started
Waking up
Recognized on
I (20434) HTTPS_HANDLING: HTTPS Status = 200, content_length = 1
I (20434) HTTPS_HANDLING: HTTP_EVENT_DISCONNECTED
I (20444) HTTPS_HANDLING: HTTP_EVENT_DISCONNECTED
Going back to sleep.
Waking up
Recognized off
I (45624) HTTPS_HANDLING: HTTPS Status = 200, content_length = 1
I (45624) HTTPS_HANDLING: HTTP_EVENT_DISCONNECTED
I (45634) HTTPS_HANDLING: HTTP_EVENT_DISCONNECTED
```

This was an educational experiment. It helped me put some new tools in my belt
while thinking further about the problem of voice and audio processing. I
developed some
[scripts](https://github.com/n0mn0m/on-air/tree/main/voice-assistant/train) to
run through the full data generation, train and export cycle. Training will need
to be done based on the architecture somebody is using, but hopefully it's
useful.

The code, docs, images etc for the project can be found
[here](https://github.com/n0mn0m/on-air) and I'll be posting updates as I
continue along to [HackadayIO](https://hackaday.io/project/170228-on-air) and
this blog. If you have any questions or ideas reach
[out](mailto:n0mn0m@burningdaylight.io).
