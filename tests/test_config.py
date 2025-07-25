"""Tests for configuration module."""

from minigen.config import Config


def test_nested_config_loading(tmp_path):
    """Test loading config from nested TOML structure."""
    config_file = tmp_path / "test_config.toml"
    config_file.write_text(
        """
[site]
title = "Nested Site"
description = "A nested site"
author = "Nested Author"
url = "http://nested.test"

[build]
content_dir = "mycontent"
static_dir = "mystatic"
dist_dir = "mydist"

[feed]
rss_path = "rss.xml"
atom_path = "atom.xml"
"""
    )

    config = Config.from_file(config_file)
    assert config.site_title == "Nested Site"
    assert config.site_description == "A nested site"
    assert config.site_author == "Nested Author"
    assert config.site_url == "http://nested.test"
    assert config.content_dir.name == "mycontent"
    assert config.static_dir.name == "mystatic"
    assert config.output_dir.name == "mydist"
    assert config.rss_path == "rss.xml"
    assert config.atom_path == "atom.xml"


def test_feed_config_validation(tmp_path):
    """Test feed configuration validation."""
    config = Config(
        root_dir=tmp_path,
        content_dir=tmp_path / "content",
        static_dir=tmp_path / "static",
        output_dir=tmp_path / "dist",
        # Override defaults to test validation
        site_title="",
        site_description="",
        site_url="",
        site_author="",
    )

    # Test with default empty values
    validation = config.validate_feed_config()
    assert not validation.is_valid
    assert "site_title" in validation.error_message

    # Test with just title
    config.site_title = "Test Site"
    validation = config.validate_feed_config()
    assert not validation.is_valid
    assert "site_description" in validation.error_message

    # Test with title and description
    config.site_description = "Test Description"
    validation = config.validate_feed_config()
    assert not validation.is_valid
    assert "site_url" in validation.error_message

    # Test with title, description, and url
    config.site_url = "http://test.com"
    validation = config.validate_feed_config()
    assert not validation.is_valid
    assert "site_author" in validation.error_message

    # Test with all required fields
    config.site_author = "Test Author"
    validation = config.validate_feed_config()
    assert validation.is_valid
    assert validation.error_message == ""
