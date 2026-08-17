#!/usr/bin/env python3
"""
Run the article-specific article-visual builder for a v2 article.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

from article_visual_starter_lib import resolve_article_dir


def parse_args() -> tuple[argparse.Namespace, list[str]]:
    parser = argparse.ArgumentParser(
        description="Run the article-specific article-visual builder for a v2 article."
    )
    parser.add_argument(
        "article",
        help="Path to the posts/articles/draft/<slug> or posts/articles/posted/<slug> folder, or its index.md file.",
    )
    return parser.parse_known_args()


def main() -> int:
    args, passthrough = parse_args()
    article_dir = resolve_article_dir(args.article)
    builder_path = article_dir / "build_article_visuals.py"
    if not builder_path.exists():
        raise SystemExit(
            f"Article-specific builder not found: {builder_path}\n"
            "Create one with `python posts\\scripts\\create_article_v2.py \"Your Title\"` or add the file manually."
        )

    command = [sys.executable, str(builder_path), *passthrough]
    completed = subprocess.run(command, check=False)
    return int(completed.returncode)


if __name__ == "__main__":
    raise SystemExit(main())
