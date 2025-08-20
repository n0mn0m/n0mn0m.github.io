---
title: Provide default values with care
date: 2025-08-20
page.meta.tags: programming, practices
page.meta.categories: programming
---

Something that comes up from time to time in code review is the use of default
arguments for function parameters. Typically the line of reasoning for their
inclusion involves making it easier for users of the function signature by
requiring them to pass less arguments. I'm not a fan of this line of reasoning
for a few reasons:

1. If the function signature has become so long and convoluted that it's a burden
   to the caller then the function should probably be refactored. Not only is it
   a burden for the caller, it's probably difficult to test.
1. Default values are a leaky abstraction. Clearly the argument is important to
   the internal mechanics of our function. It also may be important to the caller.
   What if we decide the default value should change? Is that a major breaking
   change (yes)? What state is the caller in if we change the default. Does everything
   keep working for them with the new default, did they come to rely on our leaky
   abstraction beyond the call boundary and now their code breaks with the change?

Sometimes default argument values make sense. If you're writing an HTTP or ODBC
library then a default timeout makes sense. When building applications or libraries
that are specific to your company or project be careful. Context changes, people
change, time moves forward and what once made sense as a default value
will probably change. If it does it's hard to know the full impact.
