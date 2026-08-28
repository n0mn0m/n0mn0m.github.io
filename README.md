# Site and generator

This repo contains my personal site (slower.earth) and the
static site generator (`minigen`) I built for it.

## Features

- Simple configuration via `config.toml`
- Content organization in `content/` and `static/` folders

## Quick Start

Install [uv](https://docs.astral.sh/uv/getting-started/installation/) if it is
not already available. Then sync the development and test dependencies:

```sh
uv sync --all-extras
```

Build the site:

```sh
uv run minigen build
```

Serve locally:

```sh
uv run minigen serve
```

## Project Structure

- `src/minigen/` - Static site generator source code
- `content/` - Markdown content and pages
- `static/` - Static assets (CSS, images, etc.)
- `config.toml` - Site configuration

## Exporting site photos

The site and profile pages each render one static photo from the Apple Photos
album named `site`. The homepage and `/me/` page are currently the only pages
that use these exported photos. On macOS, grant Terminal access to Photos when prompted, then run:

The script itself is a macOS shell script and should normally be run directly:

```sh
./scripts/export-site-photos.sh
```

It uses AppleScript and `sips` rather than Python, so `uvx` is not required
for this command. It exports every album photo to `content/img/site` as JPEGs with
640px, 1280px, and 2400px variants. The generated filenames are deterministic
(`site-0001`, `site-0002`, and so on); choose the image used on each page in
`config.toml`:

```toml
[images]
homepage = "site-0001"
me = "site-0002"
```

The build copies those files to `/img/site` and emits responsive `srcset`
markup. Images retain their original orientation and aspect ratio, so portrait
and landscape photos display without cropping at different screen sizes.

### Git LFS

The exported images are tracked with
[Git Large File Storage](https://git-lfs.com/) using `.gitattributes`. Install
Git LFS once on your development machine, then initialize it:

```sh
brew install git-lfs
git lfs install
```

After exporting photos, add and commit them normally. Git LFS will store the
image contents outside the regular Git objects:

```sh
git add .gitattributes content/img/site
git commit -m "Update site photos"
git push
```

GitHub Actions is configured to fetch LFS objects during both CI and deployment.

If the export command reports an AppleScript syntax or Photos error, confirm
that the album is named exactly `site`, Photos is installed and has been opened
at least once, and Terminal has permission under **System Settings > Privacy &
Security > Automation > Terminal > Photos**. The script replaces the existing
contents of `content/img/site`, so commit or back up any manually added files
before exporting again.

## Running Tests

```sh
uv run pytest -v
```

## Contributing

See `CONTRIBUTING.md` for guidelines.

## License

See `LICENSE` for details.
