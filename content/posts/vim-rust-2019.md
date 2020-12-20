+++
title = "Vim and Rust in 2019"
date = 2019-01-18
[taxonomies]
tags = ["rust","vim"]
+++

I've been using Vim as my primary editor for a few months now. Recently I
wanted to revisit some project work in Rust, but I hadn't setup any tooling in
Vim for rust yet. The first couple of hits I got on Google were great resources
that I'll provide links to, but they were also over a year old, so while using
them as a starting point I'm documenting my setup since some things have
changed from 2017.

# Tooling

Core Installs:

- [Rust with rustup](https://www.rust-lang.org/tools/install)
- [Racer](https://github.com/racer-rust/racer)

Autocomplete:

- [YouCompleteMe](https://github.com/Valloric/YouCompleteMe)

Language Server Protocol

- [vim-lsp](https://github.com/prabirshrestha/vim-lsp)
- [RLS - Rust Language Server](https://github.com/rust-lang/rls)

So far this has been a fairly pain free experience. As I use this (and vim)
more I will likely add some updates related to packaging, compiling and
debugging in Vim, but for now these are the tools that got me started. One
thing to note is that I recommend installing in the order above and following
the install directions (especially for the lsp) since those appear to have
made some QoL changes in the last year.

Source Articles:
<https://kadekillary.work/post/rust-ide/>
<https://ddrscott.github.io/blog/2018/getting-rusty-with-vim/>
