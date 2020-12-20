+++
title = "Create and Apply a Git Patch"
date = 2020-02-04
[taxonomies]
tags = ["git", "version control", "source control"]
+++

I've been using Source Hut as my primary host for source control and builds for
a few months. I really enjoy it, but one of the main things I had to learn up
front was how to apply a patch in git. Unlike Github and many other git host
Source Hut makes use of the git patch work flow instead of PRs. At first I
found this to be a bit frustrating, but I've actually come to see the value in
the email and patch workflow that is different from the IM and PR work flow
that many of us are used to. Hopefully this helps somebody else that is
learning to use patches in the future.

Build your feature or modify your code on a separate branch:

```bash
git checkout -b ...
git add ...
git commit
git push
```

Prepare a patchset:

```bash
git format-patch main

# Alternative for a patch directory

git format-patch main -o patches
```

Or login and find the link to download the patch:

```bash
curl -O https://git.burningdaylight.io/circuitroomba/commit/ae635ce6533e33ff5277a0428a59c736a98649d6.patch

ls | grep ".patch"
ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

Switch back to main:

```bash
git checkout main
```

Check the patchset changes

```bash
git apply --stat ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

Check for errors

```bash
git apply --check ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

Assuming the above command doesn't generate any errors you are ready to apply a
clean patch. The `git am` command below includes the `--signoff` flag for
others to view.

```bash
git am --signoff < ae635ce6533e33ff5277a0428a59c736a98649d6.patch
```

And with that the patch has been applied to your main branch. Run your test
again for sanity sake and push main.


