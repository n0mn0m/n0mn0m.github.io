"""Site builder module for generating static HTML sites."""

from dataclasses import dataclass
from datetime import datetime, timezone
import shutil
from typing import Dict, Any, List

import frontmatter
import markdown
from feedgen.feed import FeedGenerator
from .config import Config


@dataclass
class Post:
    """Represents a blog post."""

    content: str
    metadata: Dict[str, Any]


class Builder:
    def generate_feeds(self) -> None:
        """Generate RSS and Atom feeds."""
        print("Generating RSS and Atom feeds...")

        # Validate feed configuration
        validation = self.config.validate_feed_config()
        if not validation.is_valid:
            print(f"Error: {validation.error_message}")
            print("Feed generation skipped.")
            return

        try:
            fg = FeedGenerator()
            fg.id(self.config.site_url)  # Required feed ID
            fg.title(self.config.site_title)
            fg.description(self.config.site_description)
            fg.author({"name": self.config.site_author})
            fg.link(href=self.config.site_url)
            fg.language("en")

            for post in self.posts:
                try:
                    fe = fg.add_entry()
                    fe.title(post.metadata["title"])
                    fe.description(post.content)

                    # Add link to the post
                    post_url = self.config.site_url.rstrip("/") + post.metadata.get(
                        "url", ""
                    )
                    fe.id(post_url)  # Required entry ID
                    fe.link(href=post_url)

                    # Set published date
                    if "date" in post.metadata:
                        fe.published(post.metadata["date"])

                    # Add author information
                    fe.author(
                        {"name": post.metadata.get("author", self.config.site_author)}
                    )

                    # Add tags and categories as feed categories
                    tags = post.metadata.get("tags", [])
                    for tag in tags:
                        fe.category(term=tag)
                    categories = post.metadata.get("categories", [])
                    for cat in categories:
                        fe.category(term=cat)
                except Exception as e:
                    print(f"Error adding entry: {e}")
                    continue

            # Generate both RSS and Atom feeds
            rss_path = self.config.output_dir / self.config.rss_path
            atom_path = self.config.output_dir / self.config.atom_path
            print(f"Writing RSS feed to {rss_path}")
            fg.rss_file(str(rss_path))
            print(f"Writing Atom feed to {atom_path}")
            fg.atom_file(str(atom_path))
            print("Feed generation complete!")
        except Exception as e:
            print(f"Error generating feeds: {e}")
    """Static site generator that converts markdown content to HTML."""

    def __init__(self, config: Config):
        """Initialize the builder with configuration."""
        self.config = config
        self.posts: List[Post] = []
        self.md = markdown.Markdown(
            extensions=["meta", "fenced_code", "footnotes", "tables", "toc"]
        )

    def clean(self) -> None:
        """Remove the output directory."""
        if self.config.output_dir.exists():
            shutil.rmtree(self.config.output_dir)
        self.config.output_dir.mkdir(parents=True)

    def copy_static(self) -> None:
        """Copy static files to the output directory."""
        if self.config.static_dir.exists():
            dest = self.config.output_dir / "static"
            shutil.copytree(self.config.static_dir, dest, dirs_exist_ok=True)

    def build(self) -> None:
        """Build the complete site."""
        print("Cleaning output directory...")
        self.clean()

        print("Copying static files...")
        self.copy_static()

        print("Loading and processing posts...")
        self.load_posts()

        print("Creating pages...")
        self._create_index()
        self._create_blog_index()
        self._create_posts()
        self._create_pages()
        self._create_blog_tag_views()
        self._create_blog_category_views()
        # Date view removed for now

        print("Generating feeds...")
        print(f"Posts to include in feed: {len(self.posts)}")
        self.generate_feeds()

        print("Build complete!")
    def _create_blog_tag_views(self) -> None:
        """Create tag-based blog views."""
        tag_map = {}
        for post in self.posts:
            tags = post.metadata.get("tags", [])
            if isinstance(tags, str):
                tags = [tags]
            for tag in tags:
                if tag:
                    tag_map.setdefault(tag, []).append(post)
        for tag in tag_map:
            tag_dir = self.config.output_dir / "blog" / "tags" / tag
            tag_dir.mkdir(parents=True, exist_ok=True)
            content = f"<h1>Posts tagged '{tag}'</h1>\n<ul>"
            for post in tag_map[tag]:
                content += f'<li><a href="{post.metadata["url"]}">{post.metadata["title"]}</a></li>'
            content += "</ul>"
            html = self._wrap_content(content=content, title=f"Tag: {tag}")
            (tag_dir / "index.html").write_text(html)

    def _create_blog_category_views(self) -> None:
        """Create category-based blog views."""
        cat_map = {}
        for post in self.posts:
            cats = post.metadata.get("categories", [])
            if isinstance(cats, str):
                cats = [cats]
            for cat in cats:
                if cat:
                    cat_map.setdefault(cat, []).append(post)
        for cat in cat_map:
            cat_dir = self.config.output_dir / "blog" / "categories" / cat
            cat_dir.mkdir(parents=True, exist_ok=True)
            content = f"<h1>Posts in category '{cat}'</h1>\n<ul>"
            for post in cat_map[cat]:
                content += f'<li><a href="{post.metadata["url"]}">{post.metadata["title"]}</a></li>'
            content += "</ul>"
            html = self._wrap_content(content=content, title=f"Category: {cat}")
            (cat_dir / "index.html").write_text(html)

    def _create_blog_date_views(self) -> None:
        """Create date-based blog views."""
        # Date view removed for now

    def _create_pages(self) -> None:
        """Create static pages from content/pages/."""
        pages_dir = self.config.content_dir / "pages"
        if not pages_dir.exists():
            return
        # Map page filenames to output subpaths
        page_url_map = {
            "portfolio.md": ["programming", "portfolio"],
            "resume.md": ["programming", "resume"],
            "books.md": ["lists", "books"],
            "podcast.md": ["lists", "podcast"],
            "me.md": ["me"],
        }
        for page_file in pages_dir.glob("*.md"):
            page = frontmatter.load(page_file)
            page_html = self._wrap_content(
                content=self.md.convert(page.content),
                title=page.metadata.get("title", page_file.stem.title()),
                description=page.metadata.get(
                    "description", self.config.site_description
                ),
            )
            # Determine output path
            rel_parts = page_url_map.get(page_file.name, [page_file.stem])
            out_dir = self.config.output_dir
            for part in rel_parts:
                out_dir = out_dir / part
            out_dir.mkdir(parents=True, exist_ok=True)
            out_path = out_dir / "index.html"
            out_path.write_text(page_html)

    def load_posts(self) -> None:
        """Load and parse all blog posts."""
        self.posts = []
        posts_dir = self.config.content_dir / "blog" / "posts"

        if not posts_dir.exists():
            return

        for post_file in posts_dir.glob("*.md"):
            post = frontmatter.load(post_file)

            # Generate filename-based URL
            url = f"/blog/posts/{post_file.stem}.html"
            if "url" not in post.metadata:
                post.metadata["url"] = url

            # Set title from metadata or filename
            if "title" not in post.metadata:
                post.metadata["title"] = post_file.stem.replace("-", " ").title()

            # Convert date to datetime if it's a date object
            if "date" in post.metadata and hasattr(post.metadata["date"], "year"):
                date = post.metadata["date"]
                post.metadata["date"] = datetime.combine(
                    date, datetime.min.time(), timezone.utc
                )

            # Handle page.meta.* fields
            to_delete = []
            to_add = {}
            for key, value in post.metadata.items():
                if key.startswith("page.meta."):
                    real_key = key.replace("page.meta.", "")
                    to_add[real_key] = value
                    to_delete.append(key)

            for key in to_delete:
                del post.metadata[key]
            post.metadata.update(to_add)

            # Split tags/categories if they are comma-separated strings
            for field in ["tags", "categories"]:
                val = post.metadata.get(field)
                if isinstance(val, str):
                    post.metadata[field] = [t.strip() for t in val.split(",") if t.strip()]

            self.posts.append(
                Post(content=self.md.convert(post.content), metadata=post.metadata)
            )
        # Sort posts by date descending
        self.posts.sort(key=lambda p: p.metadata.get("date", datetime.now()), reverse=True)
        # Validate feed configuration
    def _wrap_content(self, content: str, *, title: str, description: str = "") -> str:
        """Wrap content in HTML boilerplate."""
        meta_tags = [
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            f'<meta name="description" content="{description}">',
            f'<meta name="author" content="{self.config.site_author}">',
        ]

        css_links = [
            '<link rel="stylesheet" href="/static/css/styles.css">',
            '<link rel="stylesheet" href="/static/css/portfolio.css">',
            '<link rel="stylesheet" href="/static/css/resume.css">',
        ]

        nav_links = [
            '<a href="/">Home</a>',
            '<a href="/blog/">Blog</a>',
            '<a href="/programming/portfolio/">Portfolio</a>',
            '<a href="/programming/resume/">Resume</a>',
            '<a href="/lists/books/">Books</a>',
            '<a href="/lists/podcast/">Podcast</a>',
        ]

        # Only center content on homepage, reduce gap between menu and title, add space above menu
        center_style = """
    <style>
        body { display: flex; flex-direction: column; align-items: center; margin: 0; }
        main { width: 100%; max-width: 700px; margin: 1rem auto; text-align: center; }
        header nav { margin: 1em 0 0.5em 0; } /* 1em top margin, 0.5em bottom */
    </style>
""" if title == "Home" else ""

        # Add RSS/Atom feed links below copyright, centered
        feed_links = f'<div class="feeds" style="margin-top:0.5em;font-size:0.95em;text-align:center;">'
        feed_links += f'<a href="/{self.config.rss_path}">RSS Feed</a> | '
        feed_links += f'<a href="/{self.config.atom_path}">Atom Feed</a>'
        feed_links += '</div>'
        html = f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
    <title>{title} - {self.config.site_title}</title>
    {chr(10).join(meta_tags)}
    {chr(10).join(css_links)}
    {center_style}
</head>
<body>
    <header>
        <nav>
            {chr(10).join(nav_links)}
        </nav>
    </header>
    <main>
        {content}
    </main>
    <footer>
        <p>&copy; {datetime.now().year} {self.config.site_author}</p>
        {feed_links}
    </footer>
</body>
</html>"""
        return html

    def _create_index(self) -> None:
        """Create the main index page."""
        # Load index.md if it exists, otherwise generate one
        index_md_path = self.config.content_dir / "index.md"
        if index_md_path.exists():
            post = frontmatter.load(index_md_path)
            index_content = self.md.convert(post.content)
        else:
            # Generate simple index with latest posts
            index_content = f"<h1 style='margin-bottom:0.5em'>{self.config.site_title}</h1>"
            if self.config.site_description:
                index_content += f"<p>{self.config.site_description}</p>"

            # Place navigation links below site title
            nav_links = [
                '<a href="/">Home</a>',
                '<a href="/blog/">Blog</a>',
                '<a href="/programming/portfolio/">Portfolio</a>',
                '<a href="/programming/resume/">Resume</a>',
                '<a href="/lists/books/">Books</a>',
                '<a href="/lists/podcast/">Podcast</a>',
            ]
            index_content += f"<div style='margin:1em 0;'>{' | '.join(nav_links)}</div>"

            if self.posts:
                index_content += "\n<h2>Latest Posts</h2>\n<ul>"
                for post in self.posts[:5]:  # Show last 5 posts
                    index_content += f'\n    <li><a href="{post.metadata["url"]}">{post.metadata["title"]}</a></li>'
                index_content += "\n</ul>"

        # Write index.html
        index_html = self._wrap_content(
            content=index_content,
            title="Home",
            description=self.config.site_description,
        )
        index_path = self.config.output_dir / "index.html"
        index_path.write_text(index_html)

    def _create_blog_index(self) -> None:
        """Create the blog index page."""
        blog_content = "<h1>Blog Posts</h1>"

        # Add links to tags and categories only
        tag_dir = "/blog/tags/"
        cat_dir = "/blog/categories/"
        blog_content += "\n<div class='blog-views'>"
        blog_content += f'<a href="{tag_dir}">Tags</a> | '
        blog_content += f'<a href="{cat_dir}">Categories</a>'
        blog_content += "</div>"

        if self.posts:
            blog_content += "\n<ul>"
            for post in self.posts:
                blog_content += f'\n    <li><a href="{post.metadata["url"]}">{post.metadata["title"]}</a></li>'
            blog_content += "\n</ul>"
        else:
            blog_content += "\n<p>No posts yet.</p>"

        # Write blog/index.html
        blog_html = self._wrap_content(
            content=blog_content,
            title="Blog",
            description=f"Blog posts from {self.config.site_title}",
        )
        blog_path = self.config.output_dir / "blog"
        blog_path.mkdir(exist_ok=True)
        (blog_path / "index.html").write_text(blog_html)

    def _create_posts(self) -> None:
        """Create individual post pages."""
        posts_path = self.config.output_dir / "blog" / "posts"
        posts_path.mkdir(parents=True, exist_ok=True)

        for post in self.posts:
            # Add post title/header above content
            post_content = f"<h1>{post.metadata['title']}</h1>\n{post.content}"
            post_html = self._wrap_content(
                content=post_content,
                title=post.metadata["title"],
                description=post.metadata.get("description", ""),
            )

            # Write post file
            post_path = self.config.output_dir / post.metadata["url"].lstrip("/")
            post_path.parent.mkdir(parents=True, exist_ok=True)
            post_path.write_text(post_html)
