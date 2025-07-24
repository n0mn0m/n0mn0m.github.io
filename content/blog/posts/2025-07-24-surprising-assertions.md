---
title: Surprising Assertions
date: 2025-07-02
page.meta.tags: programming, python, c
page.meta.categories: programming
---

Recently during code review (for a Python application). I asked somebody if they
intentionally used the `assert` keyword rather than an `if` check outside of
test, and if they were aware that calling the Python interpreter with the `-O`
[option](https://docs.python.org/3/using/cmdline.html#cmdoption-O) would disable
their assertions. This came as a surprise to the author (and rightfully so IMO,
not many teams use the interpreter options and just take the default) who assumed
they could safely take the pattern they used in test and apply it to some validation
functions in the application.

A similar thing happens in C if `NDEBUG` [is defined](https://www.gnu.org/software/libc/manual/html_node/Consistency-Checking.html)
catching some engineers by surprise when their validation functions are no longer
behaving as expected once their application moves from debug to release builds
(or other optimized environments).

It's interesting (surprising?) behavior, and it makes me wonder what the history
or context of the decision was around `assert` and how it can be removed from
execution in both languages. Surprises like this are part of what makes engineering
hard. If you expectations/mental model don't actually line up with the execution
context and model your application can enter into surprising states that become
harder to debug because you have to figure out that your mental model is disconnected
from the actual state of the program.
