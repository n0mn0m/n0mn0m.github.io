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
    """Static site generator that converts markdown content to HTML."""

    def __init__(self, config: Config):
        """Initialize the builder with configuration."""
        self.config = config
        self.posts: List[Post] = []
        self.md = markdown.Markdown(extensions=[
            'meta',
            'fenced_code',
            'footnotes',
            'tables',
            'toc'
        ])

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

        print("Generating feeds...")
        print(f"Posts to include in feed: {len(self.posts)}")
        self.generate_feeds()

        print("Build complete!")

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
            if 'url' not in post.metadata:
                post.metadata['url'] = url

            # Set title from metadata or filename
            if 'title' not in post.metadata:
                post.metadata['title'] = post_file.stem.replace('-', ' ').title()

            # Convert date to datetime if it's a date object
            if 'date' in post.metadata and hasattr(post.metadata['date'], 'year'):
                date = post.metadata['date']
                post.metadata['date'] = datetime.combine(date, datetime.min.time(), timezone.utc)

            # Handle page.meta.* fields
            to_delete = []
            to_add = {}
            for key, value in post.metadata.items():
                if key.startswith('page.meta.'):
                    real_key = key.replace('page.meta.', '')
                    to_add[real_key] = value
                    to_delete.append(key)

            for key in to_delete:
                del post.metadata[key]
            post.metadata.update(to_add)

            self.posts.append(Post(
                content=self.md.convert(post.content),
                metadata=post.metadata
            ))

        # Sort posts by date if available
        self.posts.sort(
            key=lambda p: p.metadata.get('date', datetime.now()),
            reverse=True
        )

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
            fg.author({'name': self.config.site_author})
            fg.link(href=self.config.site_url)
            fg.language('en')

            for post in self.posts:
                try:
                    fe = fg.add_entry()
                    fe.title(post.metadata['title'])
                    fe.description(post.content)

                    # Add link to the post
                    post_url = self.config.site_url.rstrip('/') + post.metadata.get('url', '')
                    fe.id(post_url)  # Required entry ID
                    fe.link(href=post_url)

                    # Set published date
                    if 'date' in post.metadata:
                        fe.published(post.metadata['date'])

                    # Add author information
                    fe.author({'name': post.metadata.get('author', self.config.site_author)})
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

    def _wrap_content(self, content: str, *, title: str, description: str = "") -> str:
        """Wrap content in HTML boilerplate."""
        meta_tags = [
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            f'<meta name="description" content="{description}">',
            f'<meta name="author" content="{self.config.site_author}">'
        ]

        css_links = [
            '<link rel="stylesheet" href="/static/css/styles.css">',
            '<link rel="stylesheet" href="/static/css/portfolio.css">',
            '<link rel="stylesheet" href="/static/css/resume.css">'
        ]

        nav_links = [
            '<a href="/">Home</a>',
            '<a href="/blog/">Blog</a>'
        ]

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <title>{title} - {self.config.site_title}</title>
    {chr(10).join(meta_tags)}
    {chr(10).join(css_links)}
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
    </footer>
</body>
</html>"""

        return html

    def _create_index(self) -> None:
        """Create the main index page."""
        # Load index.md if it exists, otherwise generate one
        index_path = self.config.content_dir / "index.md"
        if index_path.exists():
            with open(index_path) as f:
                content = f.read()
            index_content = self.md.convert(content)
        else:
            # Generate simple index with latest posts
            index_content = f"<h1>{self.config.site_title}</h1>"
            if self.config.site_description:
                index_content += f"<p>{self.config.site_description}</p>"

            if self.posts:
                index_content += "\n<h2>Latest Posts</h2>\n<ul>"
                for post in self.posts[:5]:  # Show last 5 posts
                    index_content += f'\n    <li><a href="{post.metadata["url"]}">{post.metadata["title"]}</a></li>'
                index_content += "\n</ul>"

        # Write index.html
        index_html = self._wrap_content(
            content=index_content,
            title="Home",
            description=self.config.site_description
        )
        index_path = self.config.output_dir / "index.html"
        index_path.write_text(index_html)

    def _create_blog_index(self) -> None:
        """Create the blog index page."""
        blog_content = "<h1>Blog Posts</h1>"

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
            description=f"Blog posts from {self.config.site_title}"
        )
        blog_path = self.config.output_dir / "blog"
        blog_path.mkdir(exist_ok=True)
        (blog_path / "index.html").write_text(blog_html)

    def _create_posts(self) -> None:
        """Create individual post pages."""
        posts_path = self.config.output_dir / "blog" / "posts"
        posts_path.mkdir(parents=True, exist_ok=True)

        for post in self.posts:
            # Create post HTML
            post_html = self._wrap_content(
                content=post.content,
                title=post.metadata['title'],
                description=post.metadata.get('description', '')
            )

            # Write post file
            post_path = self.config.output_dir / post.metadata['url'].lstrip('/')
            post_path.parent.mkdir(parents=True, exist_ok=True)
            post_path.write_text(post_html)
