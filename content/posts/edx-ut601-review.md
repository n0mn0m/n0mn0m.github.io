+++
title = "Review EdX UT601 Embedded Systems"
date = 2019-12-01
[taxonomies]
tags = ["embedded","hardware","education"]
+++

I recently completed my first EdX course
[Embedded Systems Shape the World](https://courses.edx.org/courses/course-v1:UTAustinX+UT.6.10x+3T2019/course/)
and wanted to share a little bit about the experience.

For a while now I've been exploring various venues for continuing education.
The longer I'm in my field the more I learn and then that leads to me realizing
how much more I want to learn in new areas. That said I've never been great at
taking courses that are not self paced partially because week to week my
schedule can change dramatically between work and family. Because of this over
time I've tried out multiple platforms of learning such as Pluralsight, Khan
Academy, formal online masters programs etc. All of them have their pros and
cons ranging of cost to quality to engaging content.

Last year I started learning more about SoC type hardware via Circuit
Playground. This has lead me on an adventure to learn more and more about
embedded systems, C and hardware. Most of this has been stitched together from
various sources and ad hoc as the need arose in a personal project. Towards the
end of summer I decided I wanted to formalize this learning and started to look
around. There are online programs from universities like TESU, and individuals
offering classes, but I stumbled across the UT 601 class on EdX and realized
the setup would be a good fit for me. Additionally EdX offers verified courses
with certificates which I thought might be nice in the future.

Signing up and getting verified with EdX was easy. I was able to use my laptop
and phone to complete all the task in under 30 minutes. The layout of EdX is
very similar to other online learning platforms that I've used.

## UT 601

Once I started UT 601 I started to run into a few more barriers. The course
requires the purchase of a Texas Instruments kit for use throughout, which
makes sense this is an embedded systems course. What I wasn't expecting was the
use of Keil. To complete the course I needed to be able to install Keil `4.2`,
and a simulator DLL (which was pretty neat) on a Windows platform. A couple
annoyances there. This is an online course with the goal of global education
opportunities, but immediately I'm locked into a platform, and additionally Arm
places Keil behind a personal information collection form. I was happy that
Microsoft provides a Windows 10 ISO that I could use within a VM to work on the
course. After downloading that though I found that VirtualBox didn't pass
through the board USB connection so that I could make use of the Stellaris
Debugging software/firmware that I would need. After some time fiddling with it
I ended up switching to VMWare, and after switching the USB connection to pass
through as 2.0 was able to get everything packaged up into a Windows VM with
Keil, the Stellaris software, the simulator DLL and the appropriate Keil
registry edits. In case it would ever help anybody my VMWare config file is
[here](https://github.com/n0mn0m/snippets/tree/main/Windows%2010%20x64.vmx).

After spending a couple days getting the IDE, hardware and VM all setup and
playing well together I dove into the course. Overall I enjoyed it. It exposed
me to PIN programming and doing a lot of GPIO work that I haven't done in the
past. Additionally it was a good refresh on concepts at the beginning like
pipelining. One thing I did notice is there was a big jump from lab 5 to 6. We
went from editing template projects to writing most of the project from the
ground. Each section provded a different amount of direction (not gradually
declining, but instead seemingly random) on how to complete the lab. New
concepts were quickly introduced and some lacking explination such as using the
Keil Oscilliscope and Analyzer. Overall it was a good course, but I would
suggest dedicating a couple weeks and doing it all at once due to how much it
ramps up half way through. The accompanying book is made available in each
section and I highly recommend reading it as the videos act more as highlights
than covering the material at a level that prepares you for the labs.

The one thing that was a minor annoyance throughout was the reliance on Keil
(IDE's have a place but often hide what the compiler and tools are doing
creating a gap in knowing how stuff works) and the problems experienced by
taking this course in a VM. Other than that the course was interesting and
challenging.

### Wrapping up

Overall I'm glad I took and [completed](/static/certifications/Embedded_601.pdf)
UT601. I learned a fair amount, and look forward to taking
[part 2](https://courses.edx.org/courses/course-v1:UTAustinX+UT.6.20x+3T2019/course/)
after the the new year. EdX is a platform I see myself continuing to use as it's
been super simple, has a range of interesting content, and the course
facilitators are really responsive.
