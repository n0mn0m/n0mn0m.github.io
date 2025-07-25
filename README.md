# Site and generator

This repo contains my personal site (burningdaylight.io) and the
static site generator (`minigen`) I built for it.

## Features

- Simple configuration via `config.toml`
- Content organization in `content/` and `static/` folders

## Quick Start

1. Create a virtual environment and install dependencies

   ```sh
   python -m venv venv
   source venv/bin/activate
   pip install -e '.[dev,test]'
   ```

1. Build the site

   ```sh
   minigen build
   ```

1. Serve locally

   ```sh
   minigen server
   ```

## Project Structure

- `src/minigen/` - Static site generator source code
- `content/` - Markdown content and pages
- `static/` - Static assets (CSS, images, etc.)
- `config.toml` - Site configuration

## Running Tests

```sh
python -m pytest -v
```

## Contributing

See `CONTRIBUTING.md` for guidelines.

## License

See `LICENSE` for details.
