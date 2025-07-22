"""Base test configuration and fixtures."""

import pytest
from pathlib import Path


@pytest.fixture
def test_config():
    """Create test configuration."""
    config_path = Path("tests/test_config.toml")
    return config_path


@pytest.fixture
def test_base_dir(tmp_path):
    """Create test directory structure."""
    # Create content dir
    content_dir = tmp_path / "content"
    content_dir.mkdir()

    # Create static dir
    static_dir = tmp_path / "static"
    static_dir.mkdir()

    # Create output dir
    output_dir = tmp_path / "dist"
    output_dir.mkdir()

    return tmp_path
