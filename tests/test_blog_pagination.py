import pytest
from bs4 import BeautifulSoup
from minigen.builder import Builder
from minigen.config import Config


@pytest.fixture
def tmp_dist(tmp_path):
    # Create a temporary dist directory for output
    dist = tmp_path / "dist"
    dist.mkdir()
    return dist


def test_blog_pagination_links(tmp_dist):
    # Create a minimal config
    config = Config(
        root_dir=tmp_dist,
        content_dir=tmp_dist / "content",
        static_dir=tmp_dist / "static",
        output_dir=tmp_dist / "dist",
        site_title="Test Blog",
        site_description="",
        site_author="",
        site_url="http://localhost:8000",
    )
    # Create content/blog/posts dir and dummy posts
    posts_dir = config.content_dir / "blog" / "posts"
    posts_dir.mkdir(parents=True, exist_ok=True)
    for i in range(1, 21):
        post_path = posts_dir / f"post-{i}.md"
        post_path.write_text(f"---\ntitle: Post {i}\n---\nContent {i}")
    # Build the site
    builder = Builder(config)
    builder.build()
    # Check page 2 pagination links
    page2 = config.output_dir / "blog" / "page-2.html"
    assert page2.exists(), "Page 2 should exist"
    soup = BeautifulSoup(page2.read_text(), "html.parser")
    pagination = soup.find("div", class_="pagination")
    assert pagination is not None, "Pagination div should exist"
    links = pagination.find_all("a")
    # There should be a link for page 1
    page1_link = [a for a in links if a.text.strip() == "1"]
    assert page1_link, "There should be a link for page 1"
    href = page1_link[0].get("href")
    assert href == "/blog/", f"Page 1 link should be /blog/, got {href}"
    # There should NOT be a link to page-1.html
    assert not any(
        "1.html" in (a.get("href") or "") for a in links
    ), "Should not link to 1.html for page 1"
