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
        output_dir=root_dir / "dist",
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
        output_dir=root_dir / "dist",
    )
    builder = Builder(config)
    builder.build()

    assert (config.output_dir / "index.html").exists()
    assert (config.output_dir / "blog").exists()

    with open(config.output_dir / "index.html") as f:
        content = f.read()
        assert "Welcome to test site" in content
        # Check navigation links
        assert '<a href="/">Home</a>' in content
        assert '<a href="/blog/">Blog</a>' in content
        assert '<a href="/programming/portfolio/">Portfolio</a>' in content
        assert '<a href="/programming/resume/">Resume</a>' in content
        assert '<a href="/lists/books/">Books</a>' in content
        assert '<a href="/lists/podcast/">Podcast</a>' in content


def test_mermaid_block_rendering(test_content, test_config):
    """Test that mermaid code blocks are rendered as <div class='mermaid'>...</div>."""
    root_dir = test_content
    config = Config(
        root_dir=root_dir,
        content_dir=root_dir / "content",
        static_dir=root_dir / "static",
        output_dir=root_dir / "dist",
    )
    # Add a post with both mermaid and python code blocks
    posts_dir = config.content_dir / "blog" / "posts"
    post_md = posts_dir / "2025-07-23-mermaid-test.md"
    post_md.write_text("""---
title: Mermaid Test
date: 2025-07-23
---
# Mermaid Test
```mermaid
graph TD;
    A-->B;
    B-->C;
```

```python
def foo():
    return 'bar'
```
""")
    builder = Builder(config)
    builder.build()
    post_html_path = (
        config.output_dir / "blog" / "posts" / "2025-07-23-mermaid-test.html"
    )
    assert post_html_path.exists()
    with open(post_html_path) as f:
        html = f.read()
        # Mermaid block should be rendered as a div
        assert '<div class="mermaid">' in html
        assert "graph TD;" in html
        # Python block should remain a code block
        assert (
            '<pre><code class="language-python">' in html
            or '<code class="language-python">' in html
        )
        assert "def foo():" in html
        # Check navigation links (use the same content we already read)
        assert '<a href="/">Home</a>' in html
        assert '<a href="/blog/">Blog</a>' in html
        assert '<a href="/programming/portfolio/">Portfolio</a>' in html
        assert '<a href="/programming/resume/">Resume</a>' in html
        assert '<a href="/lists/books/">Books</a>' in html
        assert '<a href="/lists/podcast/">Podcast</a>' in html


def test_static_pages_generation(test_content, test_config):
    """Test that static pages are generated from content/pages/."""
    root_dir = test_content
    config = Config(
        root_dir=root_dir,
        content_dir=root_dir / "content",
        static_dir=root_dir / "static",
        output_dir=root_dir / "dist",
    )
    # Create pages directory and markdown files
    pages_dir = config.content_dir / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    pages = [
        ("portfolio.md", "Portfolio Page"),
        ("resume.md", "Resume Page"),
        ("books.md", "Books Page"),
        ("podcast.md", "Podcast Page"),
    ]
    for fname, title in pages:
        (pages_dir / fname).write_text(
            f"---\ntitle: {title}\n---\n# {title}\nSome content for {title.lower()}."
        )

    builder = Builder(config)
    builder.build()

    # Check that each page is generated at the correct subpath
    page_url_map = {
        "portfolio.md": ["programming", "portfolio"],
        "resume.md": ["programming", "resume"],
        "books.md": ["lists", "books"],
        "podcast.md": ["lists", "podcast"],
    }
    for fname, title in pages:
        rel_parts = page_url_map.get(fname, [fname.replace(".md", "")])
        out_dir = config.output_dir
        for part in rel_parts:
            out_dir = out_dir / part
        out_path = out_dir / "index.html"
        assert out_path.exists(), f"{out_path} was not generated"
        with open(out_path) as f:
            html = f.read()
            assert title in html


def test_blog_views_generation(test_content, test_config):
    """Test that tag, category, and date-based blog views are generated."""
    root_dir = test_content
    config = Config(
        root_dir=root_dir,
        content_dir=root_dir / "content",
        static_dir=root_dir / "static",
        output_dir=root_dir / "dist",
    )
    # Create a blog post with tags, categories, and date
    posts_dir = config.content_dir / "blog" / "posts"
    posts_dir.mkdir(parents=True, exist_ok=True)
    post_md = posts_dir / "2025-07-21-test-post.md"
    post_md.write_text("""---
title: Test Post
date: 2025-07-21
tags: [testtag, another]
categories: [testing, python]
---
# Test Post
Test content
""")

    builder = Builder(config)
    builder.build()

    # Check tag views
    assert (config.output_dir / "blog" / "tags" / "testtag" / "index.html").exists()
    assert (config.output_dir / "blog" / "tags" / "another" / "index.html").exists()
    # Check category views
    assert (
        config.output_dir / "blog" / "categories" / "testing" / "index.html"
    ).exists()
    assert (
        config.output_dir / "blog" / "categories" / "python" / "index.html"
    ).exists()
    # Date view removed, so no assertion for date view
