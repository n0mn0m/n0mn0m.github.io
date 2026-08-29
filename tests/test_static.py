"""Tests for static asset handling."""

from pathlib import Path

import pytest

from minigen.builder import Builder
from minigen.config import Config


@pytest.fixture
def test_static(tmp_path):
    """Create test static assets structure."""
    static_dir = tmp_path / "static"
    static_dir.mkdir()

    # Create CSS file
    css_dir = static_dir / "css"
    css_dir.mkdir()
    css_file = css_dir / "styles.css"
    css_file.write_text(
        """
body {
    font-family: sans-serif;
}
"""
    )

    # Create JS file
    js_dir = static_dir / "javascripts"
    js_dir.mkdir()
    js_file = js_dir / "main.js"
    js_file.write_text(
        """
console.log('Hello World');
"""
    )

    return tmp_path


def test_static_copy(test_static, test_config):
    """Test that static files are copied correctly."""
    config = Config.from_file(test_config)
    config.content_dir = test_static / "content"
    config.static_dir = test_static / "static"
    config.output_dir = test_static / "dist"
    config.templates_dir = test_static / "templates"

    builder = Builder(config)
    builder.build()

    assert (config.output_dir / "static" / "css" / "styles.css").exists()
    assert (config.output_dir / "static" / "javascripts" / "main.js").exists()

    # Check file contents
    with open(config.output_dir / "static" / "css" / "styles.css") as f:
        assert "font-family: sans-serif;" in f.read()

    with open(config.output_dir / "static" / "javascripts" / "main.js") as f:
        assert "console.log('Hello World');" in f.read()


def test_static_update(test_static, test_config):
    """Test that static files are updated when changed."""
    config = Config.from_file(test_config)
    config.content_dir = test_static / "content"
    config.static_dir = test_static / "static"
    config.output_dir = test_static / "dist"
    config.templates_dir = test_static / "templates"

    builder = Builder(config)
    builder.build()

    # Modify CSS file
    css_file = Path(config.static_dir) / "css" / "styles.css"
    css_file.write_text(
        """
body {
    font-family: serif;
}
"""
    )

    builder.build()

    # Check updated content
    with open(config.output_dir / "static" / "css" / "styles.css") as f:
        assert "font-family: serif;" in f.read()


def test_site_photos_are_copied_and_rendered_responsively(test_static, test_config):
    """Test content photos and per-page responsive image markup."""
    config = Config.from_file(test_config)
    config.content_dir = test_static / "content"
    config.static_dir = test_static / "static"
    config.output_dir = test_static / "dist"
    config.templates_dir = test_static / "templates"
    config.site_images = {"homepage": "site-0001", "me": "site-0002"}

    site_dir = config.content_dir / "img" / "site"
    site_dir.mkdir(parents=True)
    for stem in ("site-0001", "site-0002"):
        for width in (640, 1280, 2400):
            (site_dir / f"{stem}-{width}.jpg").write_bytes(b"photo")

    (config.content_dir / "index.md").write_text("[site-photo:homepage]")
    pages_dir = config.content_dir / "pages"
    pages_dir.mkdir()
    (pages_dir / "me.md").write_text("[site-photo:me]")

    Builder(config).build()

    homepage = (config.output_dir / "index.html").read_text()
    profile = (config.output_dir / "me" / "index.html").read_text()

    assert (config.output_dir / "img" / "site" / "site-0001-640.jpg").exists()
    assert '<figure class="site-photo">' in homepage
    assert 'src="/img/site/site-0001-2400.jpg"' in homepage
    assert (
        'srcset="/img/site/site-0001-640.jpg 640w, /img/site/site-0001-1280.jpg 1280w, /img/site/site-0001-2400.jpg 2400w"'
        in homepage
    )
    assert 'src="/img/site/site-0002-2400.jpg"' in profile
    assert "site-0001-2400.jpg" not in profile


def test_resume_css_keeps_timeline_without_list_overrides():
    """The resume timeline should not change the site's default list styling."""
    css = (
        Path(__file__).parents[1] / "static" / "css" / "resume.css"
    ).read_text()

    assert "line-height: 1.4;" in css
    assert "article.resume-page .work-history::before" in css
    assert "article.resume-page .job::before" not in css
    assert "article.resume-page li" not in css
    assert "article.resume-page ul" not in css
    assert "article.resume-page ol" not in css
