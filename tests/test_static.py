"""Tests for static asset handling."""

import pytest
from pathlib import Path
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
    css_file.write_text("""
body {
    font-family: sans-serif;
}
""")

    # Create JS file
    js_dir = static_dir / "javascripts"
    js_dir.mkdir()
    js_file = js_dir / "main.js"
    js_file.write_text("""
console.log('Hello World');
""")

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
    css_file.write_text("""
body {
    font-family: serif;
}
""")

    builder.build()

    # Check updated content
    with open(config.output_dir / "static" / "css" / "styles.css") as f:
        assert "font-family: serif;" in f.read()
