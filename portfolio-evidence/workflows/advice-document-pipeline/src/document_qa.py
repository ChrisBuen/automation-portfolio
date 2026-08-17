"""Document QA controls for a structured advice pipeline."""

from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


WORD_NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
PLACEHOLDER = re.compile(r"\{\{.*?\}\}|\[(?:CONFIRM|REVIEW|INSERT)(?::|\s).*?\]", re.I)
INTERNAL_REFERENCE = re.compile(r"\b(?:INT|CASE|CLIENT)-[A-Z0-9-]{4,}\b", re.I)


def check_visible_text(text: str) -> list[str]:
    """Return release-blocking issues without returning sensitive source text."""
    issues: list[str] = []
    placeholder_count = len(PLACEHOLDER.findall(text))
    reference_count = len(INTERNAL_REFERENCE.findall(text))
    if placeholder_count:
        issues.append(f"unresolved_placeholders:{placeholder_count}")
    if reference_count:
        issues.append(f"internal_reference_codes:{reference_count}")
    if not text.strip():
        issues.append("empty_document")
    return issues


def inspect_docx(path: Path) -> dict[str, object]:
    """Inspect package integrity and preservation features in a DOCX file."""
    if not path.exists() or not zipfile.is_zipfile(path):
        raise ValueError("Input is not a valid DOCX package")

    with zipfile.ZipFile(path) as archive:
        names = set(archive.namelist())
        required = {"[Content_Types].xml", "word/document.xml", "word/styles.xml"}
        missing = sorted(required - names)
        if missing:
            raise ValueError("Missing DOCX parts: " + ", ".join(missing))
        root = ET.fromstring(archive.read("word/document.xml"))
        visible_text = "\n".join(node.text or "" for node in root.findall(".//w:t", WORD_NS))
        result = {
            "valid_zip": True,
            "visible_text_issues": check_visible_text(visible_text),
            "table_count": len(root.findall(".//w:tbl", WORD_NS)),
            "header_parts": len([name for name in names if name.startswith("word/header")]),
            "footer_parts": len([name for name in names if name.startswith("word/footer")]),
            "media_files": len([name for name in names if name.startswith("word/media/")]),
            "styles_present": "word/styles.xml" in names,
        }
    result["passed"] = not result["visible_text_issues"]
    return result
