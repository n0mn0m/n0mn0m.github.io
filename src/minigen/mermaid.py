"""
Mermaid fenced code block support for Python-Markdown (markdown==3.4.3).
"""

import re
from markdown.extensions import Extension
from markdown.extensions.fenced_code import FencedBlockPreprocessor


class MermaidFencedBlockPreprocessor(FencedBlockPreprocessor):
    def run(self, lines):
        text = "\n".join(lines)
        while True:
            m = self.FENCED_BLOCK_RE.search(text)
            if m:
                lang = None
                if m.group("attrs"):
                    # Try to extract language from attrs
                    attrs = m.group("attrs")
                    lang_match = re.search(r"\.([\w#.+-]+)", attrs)
                    if lang_match:
                        lang = lang_match.group(1)
                else:
                    lang = m.group("lang")
                code = m.group("code")
                if lang and lang.strip().lower() == "mermaid":
                    # Render as <div class="mermaid">...</div>
                    div = f'<div class="mermaid">{self._escape_mermaid_html(code.strip())}</div>'
                    placeholder = self.md.htmlStash.store(div)
                    text = f"{text[: m.start()]}\n{placeholder}\n{text[m.end() :]}"
                else:
                    # Delegate to original logic for other blocks
                    code_block = super().run([m.group(0)])
                    # code_block returns a list of lines, join and stash
                    code_html = "\n".join(code_block)
                    placeholder = self.md.htmlStash.store(code_html)
                    text = f"{text[: m.start()]}\n{placeholder}\n{text[m.end() :]}"
            else:
                break
        return text.split("\n")

    @staticmethod
    def _escape_mermaid_html(txt):
        # Only escape <, >, and & for mermaid blocks
        txt = txt.replace("&", "&amp;")
        txt = txt.replace("<", "&lt;")
        txt = txt.replace(">", "&gt;")
        return txt


class MermaidExtension(Extension):
    def extendMarkdown(self, md):
        md.registerExtension(self)
        # Register our preprocessor instead of the default
        md.preprocessors.register(
            MermaidFencedBlockPreprocessor(md, {}), "fenced_code_block", 25
        )


def makeExtension(**kwargs):
    return MermaidExtension(**kwargs)
