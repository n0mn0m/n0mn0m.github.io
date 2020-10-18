---
Title: Roll your own git hook
Published: 2020-10-18
Tags:
- Git
- CI
---

As part of setting up [tools](/posts/resharper-global-tools.md) to run in
our CI pipeline I also setup a git pre-push[hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
to run the same tools automatically in the local context. Git provides
a variety of hooks as documented in the scm book, and they can be used to
reliably automate different parts of your workflow.

*In addition to the official docs [this](https://githooks.com)
page has a nice summary*

## Code

The pre-push hook I built for our project looks like:

```bash
#!/bin/sh

PROJECT_ROOT=$(git rev-parse --show-toplevel)
echo "\033[32;1mRunning pre-push hook for${PROJECT_ROOT}\033[0m"

dotnet restore $PROJECT_ROOT

echo "\033[34;1mRunning resharper formatter\033[0m"
dotnet jb cleanupcode --verbosity=ERROR --config=$PROJECT_ROOT/.config/cleanup --settings=$PROJECT_ROOT/.editorconfig --no-buildin-settings $PROJECT_ROOT/AMS.sln
formatted=$(git status --porcelain=v1 2>/dev/null | wc -l)
exit $formatted

echo "\033[34;1mRunning dotnet resharper inspector\033[0m"
dotnet jb inspectcode --verbosity=ERROR AMS.sln -p=$PROJECT_ROOT/.editorconfig -o=$PROJECT_ROOT/reports/resharperInspect.xml

pwsh $PROJECT_ROOT/tools/CheckResharperInspection.ps1
if [[ $? -eq 0 ]]
then
    echo "\033[34;1mRunning resharper dupe finder\033[0m"
else
    echo "\033[31;1mInspector Errors Found\033[0m"
    exit $?
fi

dotnet jb dupfinder --verbosity=ERROR AMS.sln -o=$PROJECT_ROOT/reports/resharperDupFinder.xml

pwsh $PROJECT_ROOT/tools/CheckDupeFinder.ps1
if [[ $? -eq 0 ]]
then
    echo "\033[34;1mRunning dotnet test\033[0m"
else
    echo "\033[31;1mDupe Errors Found\033[0m"
    exit $?
fi

dotnet cake --target=docker-bg
dotnet cake --target=dotnet-test
if [[ $? -eq 0 ]]
then
    dotnet cake --target=docker-down
    echo "\033[34;1mGo go go!\033[0m"
else
    dotnet cake --target=docker-down
    echo "\033[31;1mTest failed\033[0m"
    exit 1
fi
```

The first thing that should stand out is that this is just a shell script.
Git hooks are just that, making it easy to use shell, python, powershell
or other tools with your hook. Write the script, link it to `.git/hooks`.

## Script Breakdown

In this script the first thing I do is find the root of our project. This
makes it easy to reference paths in a manner compatible with scripts
and tools that are used throughout in other parts of our workflow.

## Install

Since the hook above is just a shell script I like to keep it (and other hooks)
in a `tools` subdirectory in the root project directory. Because `git` expects
hooks to be under `.git/hooks` we can make it executable with a symlink. 

```bash
ln -s -f ../../tools/pre-push.sh .git/hooks/pre-push
```

With this in place we get feedback before each push so that we don't have
to correct linting issues later, and we have can be confident our commit(s)
will run through CI successfully.

## Wrapping Up

While you may have heard of projects like [pre-commit](https://pre-commit.com)
or [husky](https://typicode.github.io/husky/#/) rolling your own hook is
relatively straight forward. While wrappers may help with complex hook setups
I personally like the low amount of indirection and abstraction that helps with
debugging when rolling your own.
