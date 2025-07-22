---
title: "The Structure and Interpretation of Computer Programs in 2020"
date: 2020-02-02
page.meta.tags: sicp, lisp, programming, abstraction
page.meta.categories: programming
---

Last week I had the opportunity to attend a course by [David Beazley](https://www.dabeaz.com/sicp.html)
on [SICP](https://mitpress.mit.edu/sites/default/files/sicp/index.html) (The Structure and Interpretation of Computer
Programs). SICP is a book that was first published in 1985 and has grown to have a bit of a reputation in various
circles of software engineering. The book itself explores many areas of computer science with a language called Scheme (
a lisp). For the course we made use of Racket and Python to explore those same concepts working through the book with an
eye to it’s impact on modern language and design.

A quick note. This course was unlike any other I have been in so far. David is really good at giving learners the time
and space to think as he lays out really dense material and like a tour guide provides interesting insights about the
landscape. Another great part of the class was the size and how Dave gives people time to engage each other. Each
morning we shared ideas, experiences and other stories over breakfast before throwing ourselves into the material
breaking for lunch to contemplate what we had just built or discovered rounded off with an afternoon coffee. Overall
this was a fantastic educational experience and I hope I get the opportunity to repeat it with some of Dave’s other
courses in the future.

Throughout the week we engaged with various problems in the book such as evaluation models, abstraction, symbolic data
and more. Each time we approached a problem we were encouraged to think as language designers and implementors rather
than language users. In doing so we put ourselves in a different state approaching problem solving by extending the
features of our language. This led us to implementing object hierarchy and evaluation models, dispatching state handling
and creating custom interpreters with domain specific features to solve problems.

One part of SICP book that stood out was the use of ‘wishful thinking’ as our programming model. We would look at a
problem (for instance a constraints issue for assigning tenants to floors) and ask ourselves what a procedure or feature
would look like for accepting the data and solving said problem. We would then implement this procedure and even mock
calling other procedures that did not exist yet to model what we felt like an optimal interface might look like. From
there we would build down implementing each new layer with wishful thinking. This came in contrast to a lot of my day to
day experience approaching problems bottom up implementing low level details and data processing logic on our way to an
isolated solution. In some ways it felt similar to TDD if you mock out all the functionality you don’t have yet, but
again with the top down mindset of I want the langauge to do X for me.

Many other topics are covered throughout SICP. The book itself is very top down starting with the language and going all
the way down to implementing a VM/register machine by the end of the book. Over time I may write some more about those
topics. All in all the course was incredibly interesting. The conversations around lunch about the nature and philosophy
of computing were a lot of fun and spawned by the material being covered as well as the various backgrounds we all had
in our day to day work. You don’t leave the course with a new package or framework in your toolbelt. Instead you’ve
examined of of the underlying fundamentals of languages, computing and software. This equips you with new models for
thinking that will hopefully impact any future computing that you take part in. While the material is dense I think
anybody that truly enjoys engaging with our craft would benefit from engaging with the SICP material in this setting.

If anybody has questions about the course I’d be more than happy to talk about the material. For those of you who don’t
know [David Beazley](https://www.youtube.com/user/dabeazllc/videos) I would encourage you to visit his site or search
his name on YouTube as he has a lot of interesting material that encourages the learner to engage the material.
