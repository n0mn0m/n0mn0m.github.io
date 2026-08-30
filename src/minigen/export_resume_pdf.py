"""Export the live resume page to a PDF while keeping the output in static/pdfs."""

from __future__ import annotations

import shutil
import socket
import subprocess
import sys
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DIST_DIR = PROJECT_ROOT / "dist"
PDF_DIR = PROJECT_ROOT / "static" / "pdfs"
PDF_PATH = PDF_DIR / "resume.pdf"


def _pick_free_port() -> int:
    """Return a free localhost port for a temporary HTTP server."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def _wait_for_server(url: str, timeout_seconds: float = 20.0) -> None:
    """Wait until a local URL starts responding."""
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        try:
            with urlopen(url, timeout=2) as response:
                if response.status < 400:
                    return
        except (URLError, OSError):
            time.sleep(0.2)
    raise RuntimeError(f"Timed out waiting for local server at {url}")


def _render_resume_pdf(url: str) -> None:
    """Use a headless browser to print the resume page to PDF."""
    try:
        from playwright.sync_api import sync_playwright
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "Playwright is not installed. Run `uv sync` and then retry."
        ) from exc

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            try:
                page = browser.new_page(
                    viewport={"width": 1280, "height": 1800},
                    device_scale_factor=2,
                )
                page.goto(url, wait_until="networkidle")
                PDF_DIR.mkdir(parents=True, exist_ok=True)
                page.pdf(
                    path=str(PDF_PATH),
                    format="A4",
                    print_background=True,
                    prefer_css_page_size=True,
                    margin={
                        "top": "0.5in",
                        "right": "0.5in",
                        "bottom": "0.5in",
                        "left": "0.5in",
                    },
                )
            finally:
                browser.close()
    except Exception:  # noqa: BLE001 - install the missing browser runtime and retry
        subprocess.run(
            [sys.executable, "-m", "playwright", "install", "chromium"],
            cwd=str(PROJECT_ROOT),
            check=True,
        )
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            try:
                page = browser.new_page(
                    viewport={"width": 1280, "height": 1800},
                    device_scale_factor=2,
                )
                page.goto(url, wait_until="networkidle")
                PDF_DIR.mkdir(parents=True, exist_ok=True)
                page.pdf(
                    path=str(PDF_PATH),
                    format="A4",
                    print_background=True,
                    prefer_css_page_size=True,
                    margin={
                        "top": "0.5in",
                        "right": "0.5in",
                        "bottom": "0.5in",
                        "left": "0.5in",
                    },
                )
            finally:
                browser.close()


def main() -> None:
    """Build the site, render the resume, and save a PDF copy."""
    subprocess.run(
        [sys.executable, "-m", "minigen.cli", "build"],
        cwd=str(PROJECT_ROOT),
        check=True,
    )

    port = _pick_free_port()
    url = f"http://127.0.0.1:{port}/programming/resume/"

    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port)],
        cwd=str(DIST_DIR),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        _wait_for_server(url)
        _render_resume_pdf(url)
        dist_pdf_dir = DIST_DIR / "static" / "pdfs"
        dist_pdf_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(PDF_PATH, dist_pdf_dir / PDF_PATH.name)
        print(f"Resume PDF exported to {PDF_PATH}")
    finally:
        server.terminate()
        try:
            server.wait(timeout=10)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait(timeout=10)


if __name__ == "__main__":
    main()
