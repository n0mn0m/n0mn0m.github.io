---
Title: Creating a Con Badge with PyPortal
Published: 2019-07-14
Tags:
- circuitpython
- python
- hardware
- adafruit
- GenCon
---

Recently I've heard about multiple people working on con badges and decided to
try my hand at a simple take on the idea. Since I had just recently received my
PyPortal Adabox I thought I would use that as my first platform to get started.

From the product [page](https://www.adafruit.com/product/4116) the PyPortal is:

> An easy-to-use IoT device that allows you to create all the things for the
> “Internet of Things” in minutes. Make custom touch screen interface GUIs,
> all open-source, and Python-powered using tinyJSON / APIs to get news, stock,
> weather, cat photos, and more – all over Wi-Fi with the latest technologies.
> Create little pocket universes of joy that connect to something good. Rotate
> it 90 degrees, it’s a web-connected conference badge #badgelife.

Like many other CircuitPython powered devices the PyPortal has a great
[Explore and Learn](https://learn.adafruit.com/adafruit-pyportal) page
available that walks you through getting the right firmware installed as well
as providing hardware breakdowns, code demos and FAQ.

Once I had the PyPortal up to date and had gone through a couple demos I landed
on having my first badge being a simple menu systems. While many badges will
contain easter eggs or ways to interact with other badges I decided to keep it
simple for this first run. I wanted my badge to be able to display a couple
pieces of static data and have a couple interactive options.

I landed on a `Button` menu that would show a couple maps, a photo of my
badge, a countdown to Gen Con, and a simple D20 roller.

![Gen Con 2019 PyPortal Badge](/images/con-portal.jpg "Gen Con 2019 PyPortal Badge")

Along the way I made extensive use of the
[docs](https://circuitpython.readthedocs.io/en/latest/) and
[source code](https://github.com/adafruit) that
[Adafruit](https://www.adafruit.com/) provides.

I also found it easy to find documentation for the module I would pull in from
the library modules by referencing the list of submodules on
[Read the Docs](https://readthedocs.org/projects/circuitpython/)

## Curiosities

While building my badge I ran into some interesting edges that I hope to
explore further. I'm sharing these here just in case somebody else reads this
and can avoid similar pitfalls or suggest a different direction.

- Large buttons seem to lead to performance and OOM errors
  - Originally my menu had 8 buttons (one with information about Adafruit,
  another with information about the project), but that wasn't stable.
  After 3 or 4 clicks `gc` or something else couldn't keep up with the
  memory allocation and the badge would crash with a `MemoryError`
  - My schedule was also a menu of buttons originally. This let me setup a
  `list` of `tuples` I could manipulate in code, but when I had 5 buttons
  span the screen render time was visibly slow, and lead to inconsistent
  `OOM` errors.
- Different fonts have different performance characteristics
  - Looking back this makes sense. Different glyphs will have different
  structures. Depending on that a glyph can place different loads on the
  system. I tried a few of the "performance" font from GoogleFonts, but
  ultimately landed on Arial Bold for a font that looked consistent,
  rendered quickly and didn't have a large file size.
- Better ways to sleep?
  - My badge spends a lot of time in the main super loop polling if a
  button has been pressed. At this time I don't think CircuitPython
  supports interrupts. I hope in the future i can figure out a better was to
  let the device sleep, but capture an interrupt type event such as the
  display being touched.
- PDB for CircuitPython
  - I spent a lot of time running snippets in the REPL. This is a nice
  experience to have for an embedded device, but I do miss having PDB or
  WebPDB to drop a breakpoint in my code, let it run and then inspect the
  stack, heap etc from a given point in my program. I believe MicroPython
  contains this functionality so I'm guessing it's possible with
  CircuitPython I just haven't dug in to make it happen yet.

## Lessons Learned

Similar to the interesting behaviors I found above I learned a bit about
developing with CircuitPython and how it can differ from my day to day Python
development along the way.

- Python data structure sizes
  - Many code bases make liberal use of dictionaries. In fact some say that
  Python is built on top of the `dict` data structure. It's incredibly useful
  to look items up by key, and provides some human readability over indexing
  into a collection with no reference beyond position. That said Dictionaries
  are one of the [largest](https://stackoverflow.com/questions/1331471/in-memory-size-of-a-python-structure/1331541#1331541)
  builtin Python objects. One of the reasons for this is something called a
  load factor that I won't go into now, but suffice to say as you add more
  objects to a dictionary and it approaches a given load factor it will
  automatically grow in size. Because of this in a memory constrained
  environment I found myself removing dictionaries or list of dicts and using
  more tuples and list of tuples.
- Take out the garbage
  - Python Garbage Collection is handled via reference counting. Because of
  this it's important to think about when an object (especially large objects
  ) you are using come in scope, and when they leave scope. In an environment
  like CircuitPython you may also want to call `gc.collect()` when you leave
  scopes with large objects to make sure they are garbage collected before
  you carry on. This can help avoid some OOM errors.
- Careful wih that indirection.
  - I found myself removing helper functions and other pieces of code that
  helped keep things "clean". Often times I  did this because I was hitting
  performance of OOM errors that would go away when I put the functionality
  in the parent scope. Because of this I have repeated code, and code that
  isn't what I would expect to pass code review day to day, but it works,
  achieved stability and gave the performance I'm looking for on my badge.
- Testing and profiling for this environment is still a challenge for me.
  - I would love to be able to write a test for my function and then profile
  that test to capture things like stack depth, object sizes, timing, etc.
  And since I have a test I could do this `N` times to see what kind of
  behaviors emerge. Instead right now I manually make a change and validate.
  Because of this I think I'm building an intuition of what is happening, but
  I can't verify it which leads me to assume my understanding has gaps, and
  potentially wrong assumptions today. Making this better can help me address
  the point above.

## Next Steps

So with v1 of the badge prepared and ready for Gen Con 2019 I'm going to step
back and work on some other items in this  space. While working on the project
I found out that labels don't support an orientation flag. After mentioning
this in discord I opened an [issue](https://github.com/adafruit/Adafruit_CircuitPython_Display_Button/issues/9)
on Github with some encouragement from @ladyada. Hopefully I can spend some
cycles working on that.

I also continue to think about how to write tests for CircuitPython. Since the
runtime is tied to the boards it's not as simple as running the code in a
CPython `unittest` environment. While there is a lot of overlap in the API and
behavior it's not a one to one match. I think being able to test the code would
lead to faster development cycles and would open the door to better profiling
and understanding of my applications behavior.

Finally I plan to back up and read `Making Embdedded Systems` by Elicia White
and visit some other embedded getting started materials. While I had a lot of
ideas for this project (and I'm happy with how it turned out) I realized that
since I'm not as familiar with this type of hardware environment I struggled at
times to get the functionality I was looking for with the performance I needed.

### Acknowledgements

Thanks to the team at Adafruit. The devices they build and the creation of
CircuitPython has lead me to pick up  a hobby that continues to be fun and
encourages me to think in new ways about hardware and the programs I'm writing.
Additionally Adafruit has a
[discord](https://blog.adafruit.com/2017/07/20/adafruit-is-on-discord-discordapp-adafruit-discord-adafruit/)
where many people have been incredibly patient and helpful as I learn and ask
questions.

### Contact

I've really enjoyed working on this project. If you want to reach out feel free
to follow up via [email](mailto:n0mn0m@burningdaylight.io) or on.

You can find out more about the badge and source code in the
[repo](https://git.burningdaylight.io/gencon-portal)

#### More Photos

Some additional photos of the portal. I've ordered a case off
[thingiverse](https://www.thingiverse.com/search?q=pyportal&dwh=345d2cd0845a6f9)
, but using the Adabox case while I wait.

![Gen Con 2019 PyPortal Home](/images/con-portal-with-case-home.jpg)
![Gen Con 2019 PyPortal D20](/images/con-portal-with-case-d20.jpg)
![Gen Con 2019 PyPortal Con Badge](/images/con-portal-with-case-badge.jpg)
![Gen Con 2019 PyPortal Countdown](/images/con-portal-with-case-countdown.jpg)
