---
Title: Roll your own pre-commit with git
Published: 2020-10-15
Tags:
- Git
- CI
---

As part of setting up [tools](/posts/resharper-ci.md) to run in our CI
pipeline I also setup a git pre-commit [hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
to run the same tools automatically in the local context. Git provides
a variety of hooks as documented in the scm book, and they can be used to
reliably automate parts of your workflow.

*In addition to the official docs [this](https://githooks.com)
page has a nice summary*

## Code

The pre-commit hook I built for our project looks like:

```bash

```

The first thing that might stand out is that this is just a script file.
Git hooks are just that, making it easy to use shell, python, powershell
or other tools with your hook.

## Script Breakdown

In this script the first thing I do is find the root of our project. This
makes it easy to reference various paths in a manner compatible with scripts
and tools that are used throughout the project.

## Install

Since the hook above is just a shell script I like to keep it (and other hooks)
in a `tools` subdirectory in the root project directory. Because `git` expects
hooks to be under `.git` we can make it executable, create a symlink and we
are good to go.

```bash

```

With this setup we get feedback before each commit so we don't have to
correct linting issues later, and we know our commit will build and test
successfully.

## Wrapping Up

While you may have heard of projects like [pre-commit](https://pre-commit.com)
or [husky](https://typicode.github.io/husky/#/) rolling your own hook is
relatively straight forward. While wrappers may help with complex hook setups
I personally like the low amount of indirection and abstraction that helps with
debugging when rolling your own.
