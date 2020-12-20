+++
title = "Publishing with Pelican on Windows"
date = 2018-05-17
[taxonomies]
tags = ["python","pelican","blogging"]
+++

Before jumping in here are the links I used while setting this up. I recommend
at least reading through the Pelican and Github pages documentation before
jumping in.

## Reference Material

- [http://docs.getpelican.com/en/3.6.3/install.html](http://docs.getpelican.com/en/3.6.3/install.html)
- [http://docs.getpelican.com/en/3.6.3/publish.html](http://docs.getpelican.com/en/3.6.3/publish.html)
- [http://docs.getpelican.com/en/3.6.3/tips.html#publishing-to-github](http://docs.getpelican.com/en/3.6.3/tips.html#publishing-to-github)
- [https://pages.github.com/](https://pages.github.com/)
- [https://help.github.com/articles/user-organization-and-project-pages/](https://help.github.com/articles/user-organization-and-project-pages/)
- [https://help.github.com/articles/setting-up-an-apex-domain/](https://help.github.com/articles/setting-up-an-apex-domain/)
- [https://wiki.gandi.net/en/dns/zone/a-record](https://wiki.gandi.net/en/dns/zone/a-record)

## Getting Started

To get things started I thought it might be a good idea to document using
Pelican on Windows with Github and Gandi for blog publishing. I'll start by
configuring Pelican and Github. Once that's working I'll then talk about
configuring Gandi so you can use a custom domain. If you're using a different
domain provider you may need to use different settings, but Github has plenty
of documentation around this that I'll provide links for. Using Pelican on
Windows isn't that much different than macOS or Linux, but you won't find as
many tutorials or be able to use the quickstart makefile.

## Github Pages Setup

The first thing you should do is login to Github and then setup a Github pages
repo. You can read more detailed istructions here:
[https://pages.github.com/](https://pages.github.com/) or create a repo that
follows the pattern:

```bash
    <reponame>.github.io
```

I followed a pattern for User Github pages. This will be important when
publishing with Pelican.

[https://help.github.com/articles/user-organization-and-project-pages/](https://help.github.com/articles/user-organization-and-project-pages/)

## Pelican Local

With that out of the way we want to move on to setting up our project on
Windows. I'm using Anaconda and I will be creating a new conda environment for
this project.

```bash
    cd C:\Users\<username>\source\repos
    mkdir pelican_blog
    conda create -n blogging python=3.6
    conda activate blogging
    pip install pelican ghp-import markdown
    cd pelican_blog
    pelican-quickstart
```

The main thing to pay attention to when you go through the quickstart prompts
is that you won't need or be able to use the makefile with Windows. Once you
have completed the quikstart there are a couple things to pay attention to.

1. Your articles should be markdown documents in the content folder.
2. pelicanconf.py contains various settings related to you blog.
3. publishconf.py can be left alone because we are using ghp-import

## Publishing

Go ahead and create a file under content. Something like getting_started.md
and add some text. Once you've done that switch back to the terminal prompt.

```bash
    pelican content -o output -s pelicanconf.py
    git add .
    git commit -m "initial commit"
    ghp-import output
    git push git@github.com:alexhagerman/alexhagerman.github.io.git gh-pages:main
```

## Custom Domain URL

Ok, now that we have Github setup and we can see our blog pages I want to
look at the steps required to use my custom domain hosted by Gandi with the
Github pages. With Gandi we want to modify our A Records to allow routing to
Github. Logging into your Gandi dashboard, select domains from the menu and
then DNS records. On this page you should be able to edit your DNS record and
add the following:

[https://wiki.gandi.net/en/dns/zone/a-record](https://wiki.gandi.net/en/dns/zone/a-record)

```bash
    @ 10800 IN A 185.199.108.153
    @ 10800 IN A 185.199.109.153
    @ 10800 IN A 185.199.110.153
    @ 10800 IN A 185.199.111.153
```

Ok finally navigate back to your Github repo and go to the settings page. Under
settings scroll down until you see Github pages. You should see a textbox
allowing you to enter a custom domain. Add that, and if possible I recommend
checking the enforce https box below this.

### Wrapping Up

With that done you should be good to go. Whenever you want to write a new
article create a markdown document in the content folder and follow the same
steps above for publishing. One last note if this doesn't work immediately you
might want to wait before beginning to change settings since your A record
changes can take some time to replicate.
