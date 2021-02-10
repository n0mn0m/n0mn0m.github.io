+++
title = "Setting up a CI pipeline for Rust in Teamcity"
date = 2021-02-10
[taxonomies]
tags = ["rust", "ci", "pipeline", "jetbrains", "teamcity"]
+++

Towards the end of last year I started working on a [project](https://git.burningdaylight.io/artemis/)
in rust that would listen to a message queue and send an email. Additionally it
used [rocket](https://rocket.rs/) to expose some diagnostic endpoints to check
on the health of the service, change log levels, etc. When starting new projects
I default to setting up a build pipeline for them to. For this project I setup
pipelines in teamcity which was overall pretty easy, but sharing here for anybody
else that may go down this path.

## [cargo-make](https://github.com/sagiegurari/cargo-make)

For new projects I like to capture the build, admin and CI steps in a way that makes
it convenient for others to run on their local machine. Make and it's derivatives
(cmake, cake, etc) provide a useful task abstraction and Rust has the powerful
[cargo-make](https://github.com/sagiegurari/cargo-make) project that lets us capture
task and mix together inline simple commands with scripts, dependencies etc.

For this project you can find my cargo make file [here](https://git.burningdaylight.io/artemis/tree/Makefile.toml).
I also experimented with using Powershell for my [scripts/wrappers](https://git.burningdaylight.io/artemis/tree/tools).
I've been using this in my day job where our projects run on Win, macOS and Linux.
Overall I'm pretty happy with the experience, but it is another tool to install and
maintain along with various platforms missing support.

## cargo test

Rust comes with a build tool and test runner built in via cargo. Running test
is easy out of the box, but I needed to make use of a couple tools to get the
cargo test output into a format that a CI tool parses. I ended getting test and
coverage data in the junit and lcov formats that way various tools and platforms
can be used across time and projects.

- [grcov](https://github.com/mozilla/grcov)
- [cargo2junit](https://github.com/johnterickson/cargo2junit)

## Teamcity

With those tools orchestrated via `cargo make` it's time to setup the build and
test steps in Teamcity. Overall the process was pretty easy, but I ran into a couple
bumps I'll highlight.

- The `cargo` step doesn't support custom commands, so I don't use that by default
  - I wrote [CI.ps1](https://git.burningdaylight.io/artemis/tree/tools/CI.ps1)
    as a wrapper to use in each [step](https://git.burningdaylight.io/artemis/tree/.teamcity/settings.kts#n88).
- Enable the [xml-report-plugin](https://git.burningdaylight.io/artemis/tree/.teamcity/settings.kts#n186)

And with those two things the [pipeline](https://git.burningdaylight.io/artemis/tree/.teamcity/settings.kts)
is ready to [go](https://teamcity.burningdaylight.io/). From there you may want
to add your own environment variables, plugin, agent deps etc.

## Next steps

With this pipeline up an running the next steps are:

- Setup build caching with something like [sccache](https://github.com/mozilla/sccache)
- Work on local and CI build times
  - This has been [written](https://endler.dev/2020/rust-compile-times/) about
  a [number](https://blog.mozilla.org/nnethercote/2020/04/24/how-to-speed-up-the-rust-compiler-in-2020/)
  of [times](https://pingcap.com/blog/rust-compilation-model-calamity)

I would need to make both of these better before taking the project further. As
the project grows these would only get worse, and make the project unpleasant for
others to work on.

## Done

That's it for now. I learned a lot along the way about Rust, cargo, and hooking
it up with Teamcity. I'm not sure I'll have a write up on artemis anytime soon.
It was a good project, but I ultimately took another path. Hopefully this helps
somebody, and as always feel free to [reach out](mailto:alexander@burningdaylight.io).
