---
title: Productive tools can be observed
date: 2022-03-28
page.meta.tags: programming, tools
page.meta.categories: programming
---

Last year I started working on a new React app. I was late to the React game, having only started using it with React 16
I had experience with some existing React projects, but this was an opportunity to start something new. Additionally, I
was starting out small with one focused use case, but if that was successful \[it was!\] the app would grow to encompass
quite a few screens and tools.

In the process of determining how state would be managed I wanted to test out using useContext and useReducer to see how
far I could get before reaching for a state store. For the initial use case this worked great, and to this day I still
make use of context for a few key parts of the app. Eventually though as the app grew, and as I wrote more custom
reducers I decided it was time to explore my state store options. Along the way I looked at the latest versions of
mobx-state-tree , redux (specifically RTK) , relay and others.

Ultimately I ended up choosing Redux Toolkit (for a variety of reasons), because it’s opinionated and easy to observe.
The languages we use to solve problems today are not precise and encompassing enough to build systems that cover the
universe of execution paths. Because of this it’s important that the tools you use help you understand the system when
it behaves in an unexpected manner.

This is pretty trivial in Redux when using Redux Dev Tools. Add in using RTK Query and suddenly you might feel like you
have superpowers for understanding the state patterns in your app. With the time travel and state sharing capabilities
built right into Redux Dev Tools you can snapshot a session, share it and walk back through each dispatched action in a
way that almost feels like magic compared to other debugging experiences I’ve had over the
years \[writing to the console, re-constructing state manually, browser debugger step by step\].

And that’s one of the primary reasons I ended up using Redux in 2022. There are plenty of valid reasons to use other
tools, but after all these years I accept that bugs and edge cases are going to happen. Knowing that I want tools that
help me explain and understand them, so I can move on to the next step of determining a fix and shipping it.
