---
title: Some notes and observations from using llms
date: 2025-08-25
page.meta.tags: programming, practices, llm, machine-learning, "ai"
page.meta.categories: programming
---

I've been using some form of LLM code assist since GitHub Co-Pilot entered beta.
Over the years that's included various GPT, Gemini and Claude versions along with
trying different editor and CLI based assistants. How I integrate and use these
tools is something that continues to change for personal and professional projects,
but I thought it might be time to write down a few thoughts.

- This one should be obvious, but in case it's not you need to try different
  models with different projects and teams to find which is the most efficient
  in that context. Right now I've have found Claude Sonnet 4 to be the model
  that provides the code I prefer to maintain, but it helps to have evaluation
  criteria that you use to check the results of each new model release, and for
  testing models across different vendors (Anthropic, OpenAI, Google, etc).
- Fundamentally these tools can change how you work if you let them, but:
  - It's particularly important when using these tools to consider how different
    "modes" (agent, agent + mcp, ask, etc) trade off agency and how that impacts
    yourself, and your team.
  - For many of us code is only part of the project, and sometimes not even the
    hardest part, but consider that the LLM is more than happy to generate pages
    of code. That can be a burden to maintain, and if operating in agent mode
    I will wager when the agent runs off and implements a full feature that you
    don't know it the same way you would if you used the LLM to provide suggestions/
    snippets and or you implemented it yourself. There is a cost there, short
    and long term.
  - There is a larger team and [organization](https://news.ycombinator.com/item?id=44972151)
    conversation going on right now that you need to engage in. These tools can
    boost and harm moral, and strong teams are foundational to success short
    and long term.
- I go back and forth between how I use agents depending on the structure of my
  week. Some weeks I'm spending a lot of time pairing, meeting or doing task that
  don't provide hours at a time to be head down focused on the code in a flow state.
  When that happens I'm happy to have tools like LLM agents that I can prompt and
  check back on, but "with great power comes great responsibility". Don't check
  in that code without doing a thorough review on your end first (including a very
  detailed review of any generated tests). Your team will thank you for it, and
  you won't find people (like myself) leaving frustrated review comments about
  generated nonsensical code.
  - LLMs are very verbose, tame this with your prompts if you expect to thoroughly
    review and integrate their output.
- Be careful when allowing LLMs to generate tests. I've heard so many people talk
  about how great it is they can use these tools to write test for code that doesn't
  have any, or to have it write test with the new feature they are implementing.
  That's not wrong, LLMs can generate test, but just like building maintainable
  systems is a skill writing good test is also a skill. I would wager that the
  code training datasets are not curated to projects such as [AOSA](https://aosabook.org/en/index.html).
  We would probably disappointed to see where most projects sit on a quality curve
  for training data sets. I can personally share that time and again LLMs will
  generate test that erroneously pass. They will remove assertions, write assertions
  that never fail, or write test that never call the function or DUT. Yes, you
  can have an LLM generate good test, but it takes work, and be cautious, our test
  are one of our strongest signal points in a project. Failing to keep their
  integrity strong will only lead to bugs, and likely create a code base that
  nobody wants to be responsible for.
- If using these tools in a team setting engage with them as a team. Share prompts,
  agree on a set of minimal instructions. Make sure everybody understands context
  and default prompts. Set guidelines and expectations for how the team uses
  the tools and what quality markers are expected to be present and maintained.

There are hundreds of blog post out there about LLMs. If I had to sum up my thoughts:
The latest LLM generation is impressive, and can transform how we work, but they
can also change the level of agency that individuals exhibit. Use the tool, but
don't turn off your brain, and [recognize](https://www.researchgate.net/profile/Tamera-Schneider-2/publication/334344580_The_Measurement_of_the_Propensity_to_Trust_Automation/links/5e501f76a6fdcc2f8f552ba8/The-Measurement-of-the-Propensity-to-Trust-Automation.pdf)
our bias to [trust](https://www.tandfonline.com/doi/epdf/10.1080/10447318.2024.2307691?needAccess=true)
these tools.
