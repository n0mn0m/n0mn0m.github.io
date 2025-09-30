---
title: Make it Count
date: 2025-09-30
page.meta.tags: programming, practices, code-review
page.meta.categories: programming
---

Code review is part of daily life for many software engineers. It's a great way
to learn and share what you know. Code review is the time for a team to take
a breath, look at an implementation and navigate changes before the PR merges
and becomes part of the teams public responsibility.

> Every team does code review different. If you're new to code review, or want
> https://google.github.io/eng-practices/review/reviewer/ to see a well documented
> process to the practice maybe take a second to checkout [Google's review practices](https://google.github.io/eng-practices/review/reviewer/).

While I think code review is critical to maintaining a healthy codebase, project
and team, I've also started to notice the trend of "nits" in the last few years.
Nits are small comments that don't really add value to the code review. They
are largely subjective, and for the most part, don't really help the code.

> For doc PRs these are typically grammar or spelling, which should be called
> out, and ideally corrected using existing tools pre review.

Instead they riddle the review with noise possibly masking more important comments,
and typically indicate a lack of understanding the architecture or context of
the PR. Alternatively they can be a sign that a reviewer feels like they have to
say something, or find something that needs to be changed. While any given PR
probably has something that could be improved (depending on the level of pedantry
we want to apply) it's important to consider the goal of code review, if the
comment truly improves the project/team, or if it's inconsequential. These
inconsequential comments don't move the project forward, and in some ways impede
the project by burdening the team, and causing unnecessary review loops. Instead
as a reviewer consider the teams goals and the PR's goals, and focus on comments
that help achieve those goals, benefit the project and grow the team. Make it
count.
