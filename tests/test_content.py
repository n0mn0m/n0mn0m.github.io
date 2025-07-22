"""Tests for content processing."""

import pytest
from datetime import datetime, timezone
from minigen.builder import Builder
from minigen.config import Config

@pytest.fixture
def test_content(test_base_dir):
    """Create test content structure."""
    content_dir = test_base_dir / "content"
    content_dir.mkdir(parents=True, exist_ok=True)

    # Create index.md
    index_md = content_dir / "index.md"
    index_md.write_text("""---
title: Test Site
---
# Welcome to test site
""")

    # Create a blog post
    posts_dir = content_dir / "blog" / "posts"
    posts_dir.mkdir(parents=True)
    post_md = posts_dir / "2025-07-21-test-post.md"
    post_md.write_text("""---
title: Test Post
date: 2025-07-21
page.meta.tags: test
page.meta.categories: testing
---
# Test Post
Test content
""")

    return test_base_dir

def test_content_loading(test_content, test_config):
    """Test that content is loaded and processed correctly."""
    root_dir = test_content
    config = Config(
        root_dir=root_dir,
        content_dir=root_dir / "content",
        static_dir=root_dir / "static",
        output_dir=root_dir / "dist"
    )
    builder = Builder(config)
    builder.load_posts()

    assert len(builder.posts) == 1
    post = builder.posts[0]
    assert post.metadata["title"] == "Test Post"
    assert isinstance(post.metadata["date"], datetime)
    assert post.metadata["date"].tzinfo == timezone.utc
    assert "test" in post.metadata["tags"]
    assert "testing" in post.metadata["categories"]

def test_content_generation(test_content, test_config):
    """Test that HTML is generated correctly."""
    root_dir = test_content
    config = Config(
        root_dir=root_dir,
        content_dir=root_dir / "content",
        static_dir=root_dir / "static",
        output_dir=root_dir / "dist"
    )
    builder = Builder(config)
    builder.build()

    assert (config.output_dir / "index.html").exists()
    assert (config.output_dir / "blog").exists()
    with open(config.output_dir / "index.html") as f:
        content = f.read()
        assert "Welcome to test site" in content
