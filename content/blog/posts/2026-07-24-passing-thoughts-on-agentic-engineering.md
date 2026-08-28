---
title: Passing thoughts on Software Engineering with Agents
date: 2026-07-24
page.meta.categories: programming
page.meta.tags: AI, teams, practices
---

Since the end of last year using agents as part of the software development cycle has become a given for many teams. I’ve had the fortune to work adjacent to the ML/AI field for many years prior to my current role, and to use various approaches to automated software development as part of that. I do think that how we produce software has changed, and while I don’t think “code is cheap” (check your token bill), I do think the cost has shifted. I’m capturing a few thoughts about this here to look back on in another year or three.

- Feedback loops are tighter.
  - This is exposing areas of organizational dysfunction that had a release when the software development process took longer.
  - This means everybody is being asked to review more code while still doing their work.
  - Even if you trust the AI to code the team still needs the systems concepts and behavior in their head to move the project forward and perform support.
- Your company probably doesn’t have the stomach for token spend like the highly public projects on the internet. Plan accordingly.
  - I'm waiting for the on call reports of a system down fix looped blocked mid fixed by spend limits with no plan to increase the limit and it being "off hours".
- These tools when used effectively can clear the chaff from your backlog.
- Use agents to explore what you don’t know.
- Lean into “boring” technology for more benefits.
  - But also realize many “boring” technologies have unsafe defaults that make building in the agentic era prone to more security issues.
- Setup agentic workflows and guidelines early. Structure work so agents have clear goals and project conventions.
  - Setup work to keep the engineer in the loop. The machines don’t understand the broader organizational goals and horizons, but the team should.
  - What works for one person may not work for another. These tools rely on effective communication.
- Use the tools daily to know what does and doesn’t work. They are changing with each release, keep up, and dont get suck in transient practices that are now inefficient.
