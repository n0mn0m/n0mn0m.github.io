---
Title: Resharper in CI
Published: 2020-10-11
Tags:
- Resharper
- CI
- C#
- Code Quality
---

For a while now I've been interested in build tools, CI and code quality. I
think I got a taste for it as a member of the PyMSSQL project and it has
continued on from there. Recently I worked on the initial CI setup for a C#
project. As part of the setup I took the time to look at what lint and
analysis tools we wanted to integrate into our project.

For C# some of the more common tools appear to be:

- [Roslyn Analyzers](https://github.com/dotnet/roslyn-analyzers)
- [Sonarsource](http://www.sonarsource.com)
- [NDepend](https://www.ndepend.com)
- [Jetbrains Resharper](https://www.jetbrains.com/resharper/)

I won't go into the full criteria for our choice of Resharper (I'll update this post
if I end up writing that up one day), instead I'll summarize that Resharper provided:

- easy cross platform setup
- ide/editor and shell agnostic
- works the same locally and in CI.
- opinionated by default

## Resharper Command Line Tools

From the [docs](https://www.jetbrains.com/help/resharper/ReSharper_Command_Line_Tools.html)

```text
ReSharper Command Line Tools is a set of free cross-platform standalone tools
that help you integrate automatic code quality procedures into your CI, version
control, or any other server.

You can also run coverage analysis from the command line.

The Command Line Tools package includes the following tools:

- InspectCode, which executes hundreds of ReSharper code inspections
- dupFinder, which detects duplicated code in the whole solution or narrower
scope
- CleanupCode, which instantly eliminates code style violations and ensures a
uniform code base
```

## Install

To get started with Resharper tools (assuming you already have .NET Core
installed) run

```bash
cd <project>
dotnet new tool-manifest
dotnet tool install JetBrains.ReSharper.GlobalTools --version 2020.2.4
```

Which installs the [Resharper Global Tools](https://www.nuget.org/packages/JetBrains.ReSharper.GlobalTools/2020.2.4)
at the project level. This then allows CI and other contributors to use
`dotnet tool restore` in the future.

## Configuration

Out of the box inspect, format, and dupefinder all have default configurations
that work well. That said each team has there own needs and preferences you
may want these tools to follow. While there are a few ways documented I found
using [editorconfig](https://www.jetbrains.com/help/resharper/Using_EditorConfig.html)
to be the most straight forwad and human readable approach.

For additional details on the editorconfig format [see](https://editorconfig.org).

## Running

Running the tools is relatively easy:

```bash

```

One thing to note is that by default the autoformatting will attempt to enforce
line endings. If you have a team working across multiple platforms and using `git`
to automatically handle line endings these can come into conflict. It's up to
you and your team to decide if you want to handle this by tweaking `git` behavior,
`editorconfig` or another method.

## CI

*If your using Team City see [this](https://www.jetbrains.com/help/resharper/Detect_code_issues_in_a_build_using_ReSharper_and_TeamCity.html)
doc for details.*

With everything running in our shell locally we can also set things up to run
in our CI pipeline. Running the tools is easy as long as your CI platform has
a shell like task/step/operator:

```bash
dotnet tool restore

```

The trick is detecting when these tools find an issue. I'll share what I did in
case it's helpful, but long term it would be great if Jetbrains had the tools exit
with documented status codes for different issues. As it stands the tools only
exit with an error if the tool fails, not if issues are detected.

### CleanupCode

Since `CleanupCode` will format our file rewriting it on disk we can use git to
detect the change.

```bash
```

### dupFinder

`dupFinder` outputs an XML file highlighting any issues found. Powershell's
built in XML support makes it easy enough to query this file and see if any
issues exist.

```bash
```

### InspectCode

Similar to `dupFinder` `InspectCode` documents issues with an XML file, and
once again we can use Powershell to detect if there are any issues to fix.

```bash
```

And since `dupFinder` and `InspectCode` output XML it can be useful to save
these as CI artifacts for review. In Azure Pipelines this looks like:

```bash

```

## Wrapping Up

We've been using the ReSharper tools for a few months now and I have to say they
provided exactly what I was looking for in the beginning. The tools have been easy
to use, help us maintain our code and haven't boxed us in or required a lot
of extra time on configuration and unseen gotchas. The only criticism I have is
cold start time is pretty slow, and the return exit codes could be better. Both
of these would also help with CI, and our pre-commit setup. Otherwise I think
these will continue to serve us well and let us focus on our project delivery.
