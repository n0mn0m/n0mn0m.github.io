"""Tests for feed generation."""

import shutil
from minigen.builder import Builder
from minigen.config import Config

def test_feed_generation(test_content, test_config):
    """Test that RSS and Atom feeds are generated correctly."""
    config = Config.from_file(test_config)
    config.content_dir = test_content / "content"
    config.static_dir = test_content / "static"
    config.output_dir = test_content / "dist"
    config.output_dir.mkdir(parents=True, exist_ok=True)

    # Clear and recreate post directory
    posts_dir = config.content_dir / "blog" / "posts"
    if posts_dir.exists():
        shutil.rmtree(posts_dir)
    posts_dir.mkdir(parents=True, exist_ok=True)

    post1 = posts_dir / "post1.md"
    post1.write_text("""---
title: Test Post 1
date: 2025-01-01
---
# Test Post 1
""")

    post2 = posts_dir / "post2.md"
    post2.write_text("""---
title: Test Post 2
date: 2025-02-01
---
# Test Post 2
""")

    builder = Builder(config)
    builder.build()

    # Check feed files exist
    assert (config.output_dir / config.rss_path).exists()
    assert (config.output_dir / config.atom_path).exists()

    # Check RSS feed content
    with open(config.output_dir / config.rss_path) as f:
        rss_content = f.read()
        assert config.site_title in rss_content
        assert config.site_description in rss_content
        assert "Test Post 1" in rss_content
        assert "Test Post 2" in rss_content

    # Check Atom feed content
    with open(config.output_dir / config.atom_path) as f:
        atom_content = f.read()
        assert config.site_title in atom_content
        assert config.site_description in atom_content
        assert "Test Post 1" in atom_content
        assert "Test Post 2" in atom_content

def test_feed_order(test_content, test_config):
    """Test that feeds are ordered by date correctly."""
    config = Config.from_file(test_config)
    config.content_dir = test_content / "content"
    config.output_dir = test_content / "dist"

    # Clear and recreate post directory
    posts_dir = config.content_dir / "blog" / "posts"
    if posts_dir.exists():
        shutil.rmtree(posts_dir)
    posts_dir.mkdir(parents=True, exist_ok=True)
    config.output_dir.mkdir(parents=True, exist_ok=True)

    post1 = posts_dir / "post1.md"
    post1.write_text("""---
title: Test Post 1
date: 2025-01-01
---
# Test Post 1
""")

    post2 = posts_dir / "post2.md"
    post2.write_text("""---
title: Test Post 2
date: 2025-02-01
---
# Test Post 2
""")

    builder = Builder(config)
    builder.build()

    # Check post order in memory
    assert len(builder.posts) == 2
    dates = [p.metadata["date"] for p in builder.posts]
    assert dates == sorted(dates, reverse=True)
