---
title: Roll your own git hook
date: 2020-10-18
page.meta.tags: git, shell, programming
page.meta.categories: programming
---

As part of setting up [tools](https://burningdaylight.io/posts/resharper-global-tools/) to run in our CI pipeline I also
setup a git pre-push[hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to run the same tools automatically
in the local context. Git provides a variety of hooks as documented in the scm book, and they can be used to reliably
automate different parts of your workflow.

*In addition to the official docs *[*this*](https://githooks.com/)* page has a nice summary*

### Code

The pre-push hook I built for our project looks like:

```shell
#!/bin/sh
PROJECTROOT=$(git rev-parse --show-toplevel)
echo "Running pre-push hook for${PROJECTROOT}"
dotnet restore $PROJECTROOTecho "Running resharper formatter"
dotnet jb cleanupcode --verbosity=ERROR --config=$PROJECTROOT/.config/cleanup --settings=$PROJECTROOT/.editorconfig --no-buildin-settings $PROJECTROOT/AMS.sln
formatted=$(git status --porcelain=v1 2>/dev/null | wc -l)

$formatted
echo "Running dotnet resharper inspector"
dotnet jb inspectcode --verbosity=ERROR AMS.sln -p=$PROJECTROOT/.editorconfig -o=$PROJECTROOT/reports/resharperInspect.xmlpwsh $PROJECTROOT/tools/CheckResharperInspection.ps1

if [[ $? -eq 0 ]]
then
 echo "Running resharper dupe finder"
else
 echo "Inspector Errors Found"
 exit $?
fi

dotnet jb dupfinder --verbosity=ERROR AMS.sln -o=$PROJECTROOT/reports/resharperDupFinder.xmlpwsh $PROJECTROOT/tools/CheckDupeFinder.ps1

if [[ $? -eq 0 ]]
then
 echo "Running dotnet test"
else
 echo "Dupe Errors Found"
 exit $?
fi

dotnet cake --target=docker-bg
dotnet cake --target=dotnet-test

if [[ $? -eq 0 ]]
then
 dotnet cake --target=docker-down
 echo "Go go go!"
else
 dotnet cake --target=docker-down
 echo "Test failed"
 exit 1
fi
```

The first thing that should stand out is that this is just a shell script. Git hooks are just that, making it easy to
use shell, python, powershell or other tools with your hook. Write the script, link it to .git/hooks.

### Script Breakdown

In this script the first thing I do is find the root of our project. This makes it easy to reference paths in a manner
compatible with scripts and tools that are used throughout in other parts of our workflow.

### Install

Since the hook above is just a shell script I like to keep it (and other hooks) in a tools subdirectory in the root
project directory. Because git expects hooks to be under .git/hooks we can make it executable with a symlink.

```shell
ln -s -f ../../tools/pre-push.sh .git/hooks/pre-pushWith this in place we get feedback before each push so that we don’t have to correct linting issues later, and we have can be confident our commit(s) will run through CI successfully.
```

### Wrapping Up

While you may have heard of projects like [pre-commit](https://pre-commit.com/)
or [husky](https://typicode.github.io/husky/#/) rolling your own hook is relatively straight forward. While wrappers may
help with complex hook setups I personally like the low amount of indirection and abstraction that helps with debugging
when rolling your own.
