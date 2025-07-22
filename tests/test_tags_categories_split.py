from minigen.builder import Builder
from minigen.config import Config

def test_tags_and_categories_are_split(tmp_path):
    # Create minimal config and post
    config = Config(
        root_dir=tmp_path,
        content_dir=tmp_path / "content",
        static_dir=tmp_path / "static",
        output_dir=tmp_path / "dist",
    )
    posts_dir = config.content_dir / "blog" / "posts"
    posts_dir.mkdir(parents=True, exist_ok=True)
    post_md = posts_dir / "2025-07-22-test.md"
    post_md.write_text("""---
title: Test Post
tags: python, bash, programming, hackaday
categories: programming, devops
---
# Test Post
Test content
""")
    builder = Builder(config)
    builder.load_posts()
    post = builder.posts[0]
    assert post.metadata["tags"] == ["python", "bash", "programming", "hackaday"]
    assert post.metadata["categories"] == ["programming", "devops"]
