"""Site builder module for generating static HTML sites."""

from dataclasses import dataclass
from datetime import datetime, timezone
import shutil
from typing import Dict, Any, List

import frontmatter
import markdown
from feedgen.feed import FeedGenerator
from minigen.config import Config
from minigen.logger import logger


@dataclass
class Post:
    """Represents a blog post."""

    content: str
    metadata: Dict[str, Any]


class Builder:
    def generate_feeds(self) -> None:
        """Generate RSS and Atom feeds."""
        logger.info("Generating RSS and Atom feeds...")

        # Validate feed configuration
        validation = self.config.validate_feed_config()
        if not validation.is_valid:
            logger.error(f"Feed configuration error: {validation.error_message}")
            logger.warning("Feed generation skipped.")
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
                    logger.error(f"Error adding entry: {e}")
                    continue

            # Generate both RSS and Atom feeds
            rss_path = self.config.output_dir / self.config.rss_path
            atom_path = self.config.output_dir / self.config.atom_path
            logger.info(f"Writing RSS feed to {rss_path}")
            fg.rss_file(str(rss_path))
            logger.info(f"Writing Atom feed to {atom_path}")
            fg.atom_file(str(atom_path))
            logger.info("Feed generation complete!")
        except Exception as e:
            logger.error(f"Error generating feeds: {e}")

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
        logger.info("Cleaning output directory...")
        self.clean()

        logger.info("Copying static files...")
        self.copy_static()

        logger.info("Loading and processing posts...")
        self.load_posts()

        logger.info("Creating pages...")
        self._create_index()
        self._create_blog_index()
        self._create_posts()
        self._create_pages()
        self._create_blog_tag_views()
        self._create_blog_category_views()
        # Date view removed for now

        logger.info("Generating feeds...")
        logger.debug(f"Posts to include in feed: {len(self.posts)}")
        self.generate_feeds()

        logger.info("Build complete!")

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
                    post.metadata[field] = [
                        t.strip() for t in val.split(",") if t.strip()
                    ]

            self.posts.append(
                Post(content=self.md.convert(post.content), metadata=post.metadata)
            )
        # Sort posts by date descending
        self.posts.sort(
            key=lambda p: p.metadata.get("date", datetime.now()), reverse=True
        )
        # Validate feed configuration

    def _render_template(self, template_name: str, context: dict) -> str:
        """Render a Jinja2 template with the given context."""
        from jinja2 import Environment, FileSystemLoader
        import os

        templates_path = os.path.join(os.path.dirname(__file__), "templates")
        env = Environment(loader=FileSystemLoader(templates_path), autoescape=True)
        template = env.get_template(template_name)
        return str(template.render(**context))

    def _wrap_content(self, content: str, *, title: str, description: str = "") -> str:
        """Render a generic page using the page.html template."""
        context = {
            "site": {
                "title": self.config.site_title,
                "description": description or self.config.site_description,
                "author": self.config.site_author,
                "url": self.config.site_url,
                "rss_path": self.config.rss_path,
                "atom_path": self.config.atom_path,
            },
            "now": datetime.now(),
            "title": title,
            "content": content,
        }
        return self._render_template("page.html", context)

    def _create_index(self) -> None:
        """Create the main index page."""
        index_md_path = self.config.content_dir / "index.md"
        if index_md_path.exists():
            post = frontmatter.load(index_md_path)
            intro_content = self.md.convert(post.content)
        else:
            intro_content = f"<h1>{self.config.site_title}</h1>"
            if self.config.site_description:
                intro_content += f"<p>{self.config.site_description}</p>"
        # Convert Post objects to dicts for template compatibility
        latest_posts = []
        for post in self.posts[:5] if self.posts else []:
            meta = post.metadata
            latest_posts.append(
                {
                    "date": meta.get("date"),
                    "title": meta.get("title"),
                    "url": meta.get("url"),
                    "tags": meta.get("tags", []),
                    "categories": meta.get("categories", []),
                    "author": meta.get("author", self.config.site_author),
                }
            )
        context = {
            "site": {
                "title": self.config.site_title,
                "description": self.config.site_description,
                "author": self.config.site_author,
                "url": self.config.site_url,
                "rss_path": self.config.rss_path,
                "atom_path": self.config.atom_path,
            },
            "now": datetime.now(),
            "intro_content": intro_content,
            "posts": latest_posts,
        }
        index_html = self._render_template("index.html", context)
        index_path = self.config.output_dir / "index.html"
        index_path.write_text(index_html)

    def _create_blog_index(self) -> None:
        """Create paginated blog index pages."""
        per_page = 5
        total_posts = len(self.posts)
        total_pages = (total_posts // per_page) + (1 if total_posts % per_page else 0)
        blog_path = self.config.output_dir / "blog"
        blog_path.mkdir(exist_ok=True)
        pagination_base = "page-"
        for page in range(1, total_pages + 1):
            start = (page - 1) * per_page
            end = start + per_page
            page_posts = self.posts[start:end]
            context = {
                "site": {
                    "title": self.config.site_title,
                    "description": self.config.site_description,
                    "author": self.config.site_author,
                    "url": self.config.site_url,
                    "rss_path": self.config.rss_path,
                    "atom_path": self.config.atom_path,
                },
                "now": datetime.now(),
                "posts": page_posts,
                "page": page,
                "per_page": per_page,
                "total_posts": total_posts,
                "total_pages": total_pages,
                "pagination_base": "/blog/" + pagination_base,
            }
            if page == 1:
                out_path = blog_path / "index.html"
            else:
                out_path = blog_path / f"{pagination_base}{page}.html"
            blog_html = self._render_template("blog.html", context)
            out_path.write_text(blog_html)

    def _create_posts(self) -> None:
        """Create individual post pages."""
        posts_path = self.config.output_dir / "blog" / "posts"
        posts_path.mkdir(parents=True, exist_ok=True)

        for post in self.posts:
            context = {
                "site": {
                    "title": self.config.site_title,
                    "description": self.config.site_description,
                    "author": self.config.site_author,
                    "url": self.config.site_url,
                    "rss_path": self.config.rss_path,
                    "atom_path": self.config.atom_path,
                },
                "now": datetime.now(),
                "post": post.metadata,
                "post_html": post.content,
            }
            post_html = self._render_template("post.html", context)
            post_path = self.config.output_dir / post.metadata["url"].lstrip("/")
            post_path.parent.mkdir(parents=True, exist_ok=True)
            post_path.write_text(post_html)
