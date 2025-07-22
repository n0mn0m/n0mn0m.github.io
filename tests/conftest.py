"""Test configuration and fixtures."""

import pytest

@pytest.fixture
def test_base_dir(tmp_path):
    """Create a base directory for tests."""
    return tmp_path

@pytest.fixture
def test_config(test_base_dir):
    """Create a test configuration."""
    # Create and write test config file
    config_file = test_base_dir / "test_config.toml"
    config_file.write_text("""
[site]
title = "Test Site"
description = "A test site"
author = "Test Author"
url = "http://test.com"

[build]
content_dir = "content"
static_dir = "static"
dist_dir = "dist"

[feed]
rss_path = "feed.xml"
atom_path = "atom.xml"
""")

    return config_file

@pytest.fixture
def test_content(tmp_path):
    """Create test content structure."""
    content_dir = tmp_path / "content"
    content_dir.mkdir()

    # Create static dir
    static_dir = tmp_path / "static"
    static_dir.mkdir()

    # Create templates dir
    templates_dir = tmp_path / "templates"
    templates_dir.mkdir()

    # Create output dir
    output_dir = tmp_path / "dist"
    output_dir.mkdir()

    # Create index.md
    index_md = content_dir / "index.md"
    index_md.write_text("""---
title: Test Site
---
# Welcome to test site
This is a test site.""")

    # Create blog posts directory
    posts_dir = content_dir / "blog" / "posts"
    posts_dir.mkdir(parents=True)

    # Create a test post
    post_md = posts_dir / "2025-07-21-test-post.md"
    post_md.write_text("""---
title: Test Post
date: 2025-07-21
page.meta.tags: test
page.meta.categories: testing
---
# Test Post

This is a test post.""")

    return tmp_path
