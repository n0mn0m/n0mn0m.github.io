"""Development server for the static site."""

import http.server
import os
import socketserver
from pathlib import Path
from typing import Optional


class Server:
    """Development server for serving the static site."""

    def __init__(self, root_dir: Path, host: str = "localhost", port: int = 8000):
        """Initialize the server.

        Args:
            root_dir: Directory containing files to serve
            host: Host to bind to
            port: Port to bind to
        """
        self.root_dir = Path(root_dir)
        self.host = host
        self.port = port
        self._httpd: Optional[socketserver.TCPServer] = None

    def serve(self):
        """Start the development server."""
        # Change to the directory we want to serve
        current_dir = Path.cwd()
        try:
            # Change to the directory containing files to serve
            os.chdir(self.root_dir)

            # Create handler that serves files from current directory
            handler = http.server.SimpleHTTPRequestHandler

            # Create and start the server
            self._httpd = socketserver.TCPServer((self.host, self.port), handler)
            print(f"Serving at http://{self.host}:{self.port}")
            self._httpd.serve_forever()
        finally:
            # Always change back to original directory
            os.chdir(current_dir)

    def shutdown(self):
        """Stop the development server."""
        if self._httpd:
            self._httpd.shutdown()
            self._httpd.server_close()
            self._httpd = None
