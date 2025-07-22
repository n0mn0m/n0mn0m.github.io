---
title: "Create and Apply a Git Patch"
date: 2020-02-04
page.meta.tags: git, programming
page.meta.categories: programming
---

I’ve been using Source Hut as my primary host for source control and builds for a few months. I really enjoy it, but one
of the main things I had to learn up front was how to apply a patch in git. Unlike Github and many other git host Source
Hut makes use of the git patch work flow instead of PRs. At first I found this to be a bit frustrating, but I’ve
actually come to see the value in the email and patch workflow that is different from the IM and PR work flow that many
of us are used to. Hopefully this helps somebody else that is learning to use patches in the future.

Build your feature or modify your code on a separate branch:

```shell
git checkout -b ...  
git add ...  
git commit  
git push
```

Prepare a patchset:

```shell
git format-patch main
```

Alternative for a patch directory

```shell
git format-patch main -o patches
```

Or login and find the link to download the patch:

```shell
curl -O https://github.com/n0mn0m/circuitroomba/commit/ae635ce6533e33ff5277a0428a59c736a98649d6.patchls | grep ".patch"  
```

Switch back to main:

```shell
git checkout main
```

Check the patchset changes

```shell
git apply --stat ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

Check for errors

```shell
git apply --check ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

Assuming the above command doesn’t generate any errors you are ready to apply a clean patch. The git amcommand below
includes the --signoff flag for others to view.

```shell
git am --signoff < ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

And with that the patch has been applied to your main branch. Run your test again for sanity sake and push main.
