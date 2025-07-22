"""Tests for development server."""

import pytest
import threading
import time
import requests
from pathlib import Path
from minigen.server import Server

def test_server_initialization(tmp_path):
    """Test server initialization with directory."""
    server = Server(tmp_path)
    assert server.root_dir == tmp_path
    assert server.host == "localhost"
    assert server.port == 8000

def test_server_custom_host_port(tmp_path):
    """Test server initialization with custom host and port."""
    server = Server(tmp_path, host="127.0.0.1", port=8080)
    assert server.root_dir == tmp_path
    assert server.host == "127.0.0.1"
    assert server.port == 8080

def test_server_serves_files(test_content):
    """Test that server serves files from the dist directory."""
    server = Server(test_content / "dist", port=8888)

    # Create a test file in dist
    test_file = test_content / "dist" / "test.html"
    test_file.write_text("<html>Test Content</html>")

    # Start server in a thread
    thread = threading.Thread(target=server.serve)
    thread.daemon = True
    thread.start()

    # Give server time to start
    time.sleep(1)

    try:
        # Test file serving
        response = requests.get("http://localhost:8888/test.html")
        assert response.status_code == 200
        assert response.text == "<html>Test Content</html>"
    finally:
        server.shutdown()
        thread.join()
