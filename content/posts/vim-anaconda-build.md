+++
title = "Building Vim with Anaconda Python Support"
date = 2019-01-02
[taxonomies]
tags = ["python","vim","conda","anaconda","rhel","linux"]
+++

This morning I was setting up a RHEL 7 box for development using my normal dot
files, but when I was ready to sit down and start working on my project I
noticed I got an error from `You Complete Me` letting me know that the version
of vim that was installed wasn't compatible. After checking EPEL for a more up
to date install I decided to try pulling vim from source and building it
myself.

Luckily this wasn't too hard, but I did run into a small issue related to the
vim `.config --with-python*` flags since I'm using `conda` as my Python
environment manager. The short story is the vim needs some information from the
Python config directory to enable `python` and `python3` support. When you use
Anaconda or Minionda to manage your environments these are in slightly
different locations than the normal `/usr` or `/lib64` paths you may find in
vim build documentation. Instead they will be in your conda environment lib as
seen below.

Install additional build dependencies.

```bash
sudo yum install cmake gcc-c++ make ncurses-devel
```

Clone vim source, configure and build. Specifically pay attention to the
--with-python\* flags and the config directory they use in your `conda`
environment.

```bash
git clone https://github.com/vim/vim.git

pushd ~/vim/src

./configure --with-features=huge \
--enable-multibyte \
--enable-rubyinterp=yes \
--enable-pythoninterp=yes \
--with-python-config-dir=/work/alex/miniconda3/envs/py27/lib/python2.7/config \
--enable-python3interp=yes \
--with-python3-config-dir=/work/alex/miniconda3/lib/python3.6/config-3.6m-x86_64-linux-gnu \
--enable-perlinterp=yes \
--enable-luainterp=yes \
--enable-cscope \
--prefix=/home/alex/.local/vim | grep -i python

make && make install

popd
```

Finally if you use a custom prefix as seen above (prevents system level changes
and conflicts impacting others) you probably want to add the below to you
`.bashrc` file.

```bash
if [ -d "$HOME/.local/vim/bin/" ] ; then
  PATH="$HOME/.local/vim/bin/:$PATH"
fi
```

And that's it. You should now have an up to date vim install with Python.


