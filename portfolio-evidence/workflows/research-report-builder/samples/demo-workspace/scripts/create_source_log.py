#!/usr/bin/env python3
"""Create an empty source log CSV."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


HEADERS = [
    "source_id",
    "title",
    "publisher",
    "author",
    "url_or_path",
    "publication_date",
    "access_date",
    "source_type",
    "reliability",
    "notes",
]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", nargs="?", default="context/source_log.csv")
    args = parser.parse_args()

    path = Path(args.output)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        csv.writer(handle).writerow(HEADERS)
    print(path)


if __name__ == "__main__":
    main()
