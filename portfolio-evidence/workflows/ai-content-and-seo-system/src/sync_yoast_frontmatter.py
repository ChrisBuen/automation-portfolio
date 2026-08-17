#!/usr/bin/env python3
"""
Backfill explicit Yoast analysis fields into article frontmatter.

This does not write to WordPress. It updates local article packages so the
required Yoast analysis inputs travel with each article and can be used for
admin-side entry after publishing.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Dict, List, Tuple


ROOT_DIR = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT_DIR / "articles"


def split_frontmatter(markdown_text: str) -> Tuple[str, str]:
    if not markdown_text.startswith("---\n"):
        raise SystemExit("Article is missing YAML frontmatter.")
    parts = markdown_text.split("\n---\n", 1)
    if len(parts) != 2:
        raise SystemExit("Could not find closing frontmatter delimiter.")
    return parts[0][4:], parts[1]


def extract_scalar(frontmatter: str, key: str) -> str:
    match = re.search(rf"^{re.escape(key)}:\s*(.*)$", frontmatter, re.MULTILINE)
    if not match:
        return ""
    value = match.group(1).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def extract_list(frontmatter: str, key: str) -> List[str]:
    lines = frontmatter.splitlines()
    items: List[str] = []
    in_block = False
    base_indent = None

    for line in lines:
        if not in_block:
            if re.match(rf"^{re.escape(key)}:\s*$", line):
                in_block = True
                base_indent = None
            continue

        if not line.strip():
            break
        if base_indent is None:
            if not line.startswith("  - "):
                break
            base_indent = 2
        if not line.startswith("  - "):
            break

        value = line[4:].strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        items.append(value)

    return items


def yaml_scalar_line(key: str, value: str) -> str:
    escaped = value.replace('"', '\\"')
    return f'{key}: "{escaped}"'


def yaml_list_block(key: str, values: List[str]) -> List[str]:
    lines = [f"{key}:"]
    if values:
        for value in values:
            escaped = value.replace('"', '\\"')
            lines.append(f'  - "{escaped}"')
    else:
        lines.append('  - ""')
    return lines


def build_yoast_block(frontmatter: str) -> List[str]:
    primary_keyword = extract_scalar(frontmatter, "primaryKeyword")
    secondary_keywords = [item for item in extract_list(frontmatter, "secondaryKeywords") if item]
    meta_title = extract_scalar(frontmatter, "metaTitle")
    meta_description = extract_scalar(frontmatter, "metaDescription")

    return [
        yaml_scalar_line("yoastFocusKeyphrase", primary_keyword),
        *yaml_list_block("yoastRelatedKeyphrases", secondary_keywords),
        *yaml_list_block("yoastSynonyms", []),
        yaml_scalar_line("yoastMetaTitle", meta_title),
        yaml_scalar_line("yoastMetaDescription", meta_description),
    ]


def upsert_yoast_block(frontmatter: str) -> str:
    if re.search(r"^yoastFocusKeyphrase:", frontmatter, re.MULTILINE):
        return frontmatter

    block = "\n".join(build_yoast_block(frontmatter))
    author_match = re.search(r"^author:.*$", frontmatter, re.MULTILINE)
    if author_match:
        insert_at = author_match.start()
        prefix = frontmatter[:insert_at].rstrip("\n")
        suffix = frontmatter[insert_at:]
        return prefix + "\n" + block + "\n" + suffix

    return frontmatter.rstrip("\n") + "\n" + block + "\n"


def iter_article_files(scope: str) -> List[Path]:
    if scope == "posted":
        roots = [ARTICLES_DIR / "posted"]
    elif scope == "draft":
        roots = [ARTICLES_DIR / "draft"]
    else:
        roots = [ARTICLES_DIR / "posted", ARTICLES_DIR / "draft"]

    files: List[Path] = []
    for root in roots:
        if not root.exists():
            continue
        files.extend(sorted(root.glob("*/index.md")))
    return files


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Backfill Yoast frontmatter fields into article files.")
    parser.add_argument(
        "--scope",
        choices=["posted", "draft", "all"],
        default="all",
        help="Which article folders to update.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    updated = 0

    for article_path in iter_article_files(args.scope):
        original = article_path.read_text(encoding="utf-8")
        frontmatter, body = split_frontmatter(original)
        updated_frontmatter = upsert_yoast_block(frontmatter)
        if updated_frontmatter == frontmatter:
            continue

        article_path.write_text(
            "---\n" + updated_frontmatter + "\n---\n" + body,
            encoding="utf-8",
        )
        updated += 1
        print(article_path)

    print(f"Updated {updated} article file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
