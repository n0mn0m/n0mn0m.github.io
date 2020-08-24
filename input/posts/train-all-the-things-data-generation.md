---
Title: Train All the Things - Synthetic Generation
Published: 2020-03-19
Tags:
- hackaday
- maker
- machine learning
- train all the things
- data
- synthesis
---

After getting the display and worker up and running I started down the path of
training my model for keyword recognition. Right now I've settled on the wake
words `Hi Smalltalk`. After the wake word is detected the model will then
detect `silence`, `on`, `off`, or `unknown`.

My starting point for training the model was the
[`micro_speech`](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/micro/examples/micro_speech)
and
[`speech_commands`](https://github.com/tensorflow/docs/blob/master/site/en/r1/tutorials/sequences/audio_recognition)
tutorials that are part of the Tensorflow project. One of the first things I
noticed while planning out this step was the lack of good wake words in the
speech command dataset. There are
[many](https://github.com/jim-schwoebel/voice_datasets) voice datasets available
online, but many are unlabeled or conversational. Since digging didn't turn up
much in the way of open labeled word datasets I decided to use `on` and `off`
from the speech commands
[dataset](https://ai.googleblog.com/2017/08/launching-speech-commands-dataset.html)
since that gave me a baseline for comparison with my custom words. After
recording myself saying `hi` and `smalltalk` less then ten times I knew I did
not want to generate my own samples at the scale of the other labeled keywords.

Instead of giving up on my wake word combination I started digging around for
options and found an interesting
[project](https://github.com/JohannesBuchner/spoken-command-recognition) where
somebody had started down the path of generating labeled words with text to
speech. After reading through the repo I ended up using
[espeak](http://espeak.sourceforge.net/) and [sox](http://sox.sourceforge.net/)
to generate my labeled dataset.

The first step was to generate the
[phonemes](https://en.wikipedia.org/wiki/Phoneme) for the wake words:

```bash
$ espeak -v en -X smalltalk
 sm'O:ltO:k
```

I then stored the phoneme in a word file that will be used by `generate.sh`.

```bash
$ cat words
hi 001 [[h'aI]]
busy 002 [[b'Izi]]
free 003 [[fr'i:]]
smalltalk 004 [[sm'O:ltO:k]]
```

After modifying `generate.sh` from the spoken command repo (eliminating some
extra commands and extending the loop to generating more samples) I had
everything I needed to synthetically generate a new labeled word dataset.

```bash
#!/bin/bash
# For the various loops the variable stored in the index variable
# is used to attenuate the voices being created from espeak.

lastwordid=""

cat words | while read word wordid phoneme

do
    echo $word
    mkdir -p db/$word

    if [[ $word != $lastword ]]; then
        versionid=0
    fi

    lastword=$word

    # Generate voices with various dialects
    for i in english english-north en-scottish english_rp english_wmids english-us en-westindies
    do
        # Loop changing the pitch in each iteration
        for k in $(seq 1 99)
        do
            # Change the speed of words per minute
            for j in 80 100 120 140 160; do
                echo $versionid "$phoneme" $i $j $k
                echo "$phoneme" | espeak -p $k -s $j -v $i -w db/$word/$versionid.wav
                # Set sox options for Tensorflow
                sox db/$word/$versionid.wav -b 16 --endian little db/$word/tf_$versionid.wav rate 16k
                ((versionid++))
            done
        done
    done
done
```

After the run I have samples and labels with a volume comparable to the other
words provided by Google. The pitch, speed and tone of voice changes with each
loop which will hopefully provide enough variety to make this dataset useful in
training. Even if this doesn't work out learning about `espeak` and `sox` was
interesting. I've already got some future ideas on how to use those. If it does
work the ability to generate training data on demand seems incredibly useful.

Next up, training the model and loading to the ESP-EYE. The code, docs, images
etc for the project can be found [here](https://git.sr.ht/~n0mn0m/on-air) and
I'll be posting updates as I continue along to
[HackadayIO](https://hackaday.io/project/170228-on-air) and this blog. If you
have any questions or ideas reach [out](mailto:alexander@unexpextedeof.net).
