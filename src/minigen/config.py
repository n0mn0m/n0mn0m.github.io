"""Configuration module for the site generator."""
from dataclasses import dataclass
from pathlib import Path
from typing import Union, NamedTuple
import tomli


class ValidationResult(NamedTuple):
    """Result of a configuration validation check."""
    is_valid: bool
    error_message: str


@dataclass
class Config:
    """Application configuration."""
    root_dir: Path
    content_dir: Path
    static_dir: Path
    output_dir: Path
    site_title: str = "My Site"
    site_description: str = ""
    site_author: str = ""
    site_url: str = ""
    rss_path: str = "feed.xml"
    atom_path: str = "atom.xml"

    def __post_init__(self):
        """Initialize paths relative to root directory."""
        self.root_dir = Path(self.root_dir)

    def validate_feed_config(self) -> ValidationResult:
        """Validate feed configuration.

        Returns:
            ValidationResult: Result containing validation status and any error message
        """
        if not self.site_title:
            return ValidationResult(False, "Feed generation requires site_title to be set in config")
        if not self.site_description:
            return ValidationResult(False, "Feed generation requires site_description to be set in config")
        if not self.site_url:
            return ValidationResult(False, "Feed generation requires site_url to be set in config")
        if not self.site_author:
            return ValidationResult(False, "Feed generation requires site_author to be set in config")

        return ValidationResult(True, "")

    @classmethod
    def from_file(cls, path: Union[str, Path]) -> "Config":
        """Load configuration from a TOML file.

        Args:
            path: Path to the TOML configuration file

        Returns:
            Config: A new Config instance initialized from the TOML file
        """
        path = Path(path)
        root_dir = path.parent

        with open(path, "rb") as f:
            data = tomli.load(f)

        # Get required paths with defaults
        build_data = data.get("build", {})
        content_dir = root_dir / (build_data.get("content_dir") or "content")
        static_dir = root_dir / (build_data.get("static_dir") or "static")
        output_dir = root_dir / (build_data.get("dist_dir") or "dist")

        # Get site data from [site] section
        site_data = data.get("site", {})

        # Get feed data from [feed] section
        feed_data = data.get("feed", {})

        return cls(
            root_dir=root_dir,
            content_dir=content_dir,
            static_dir=static_dir,
            output_dir=output_dir,
            site_title=site_data.get("title", "My Site"),
            site_description=site_data.get("description", ""),
            site_author=site_data.get("author", ""),
            site_url=site_data.get("url", ""),
            rss_path=feed_data.get("rss_path", "feed.xml"),
            atom_path=feed_data.get("atom_path", "atom.xml")
        )
