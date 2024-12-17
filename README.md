# BurningDaylight

Source repo for my content at [burningdaylight.io](https://burningdaylight.io). Content maintained using [Obsidian](http://obsidian.md) and
published using [Obsidian Publish mkdocs](https://github.com/jobindjohn/obsidian-publish-mkdocs).

## Serving locally

1. `git clone` the repo
2. Set up a project `venv`
 
    `python3 -m venv venv`

1. Source the `venv`
 
    > Update pip `pip install -U pip` after the first activation, and as needed after.
 
1. Install requirements 
 
   `pip install -r requirements.txt`
 
1. Serve the docs 
 
   `mkdocs serve`

Full steps assuming python3 is installed, but no venv setup

```shell
python3 -m venv venv
source ./venv/bin/activate
pip install -U 
pip install -r requirements.txt
mkdocs serve
```