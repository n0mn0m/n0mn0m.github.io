"""
Unit test for MermaidFencedBlockPreprocessor in isolation.
"""

from markdown import Markdown
from minigen.mermaid import MermaidExtension


def test_mermaid_block_isolation():
    md = Markdown(extensions=[MermaidExtension()])
    mermaid_md = """```mermaid\ngraph TD;\nA-->B;\nB-->C;\n```"""
    html = md.convert(mermaid_md)
    assert '<div class="mermaid">' in html
    assert "graph TD;" in html
    # Should not contain <pre> or <code> for mermaid
    assert "<pre>" not in html
    assert "<code>" not in html


def test_non_mermaid_block_isolation():
    md = Markdown(extensions=[MermaidExtension()])
    python_md = """```python\ndef foo():\n    return "bar"\n```"""
    html = md.convert(python_md)
    assert "<pre>" in html
    assert '<code class="language-python">' in html or "<code>" in html
    assert "def foo():" in html
