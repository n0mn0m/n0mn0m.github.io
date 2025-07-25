---
title: Use data structures for your business logic
date: 2020-12-28
page.meta.tags: data, systems, programming
page.meta.categories: programming
---

A few months ago I was reviewing a PR that handled relationships between entities. As I was working through the code I
started to notice a pattern that made me go back to the original feature ticket for a quick review of the acceptance
criteria. As I suspected there was a list of around 10 “if this then that” scenarios detailed, all of which manifested
as conditions in the code. Grabbing a pen and paper I started to draw out the criteria and as I suspected all the
scenarios were captured by relationships and operations for
a [Tree](https://en.wikipedia.org/wiki/Tree_%28data_structure%29).

Going back with this information I paired with the team on an update to the PR where we reduced the amount of conditions
tied directly to the business domain, and refactored names so that future maintainers could interact with the code
understanding a tree, but maybe not understanding all the business logic around the entities.

> \*in case it’s helpful the *[*C5*](https://github.com/sestoft/C5/)* project has some collections not found in the .NET
> Standard library for interacting with Trees. In general an interesting project I’m glad I learned about.\*A similar
> opportunity emerged on the same project when we needed to make sure a value was unique over a series of operations. In
> this scenario while working on a collection of objects we were able to use
> a [HashSet](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1?view=net-5.0)to exit
> if [Add](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1.add?view=net-5.0#System_Collections_Generic_HashSet_1_Add__0_)
> returned false instead of setting up a LINQ query. This resulted in less nesting, less code, and a simplified condition.

### The Point

The reason I am writing this is that we should be using data structures to represent the business logic of our
applications. This seems obvious, but too often I have seen implementations brute force conditions leaving data
structures as an optimization, or a concern for “technical” projects. While we can use a series of conditions and
predicates to meet requirements in a crude way, using data structures provides an abstraction that can elevate terse
business logic to a construct future maintainers can derive extra meaning from.
