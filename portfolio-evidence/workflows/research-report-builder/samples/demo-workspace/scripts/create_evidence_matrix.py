#!/usr/bin/env python3
"""Create an empty evidence matrix CSV."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


HEADERS = [
    "claim_id",
    "section",
    "claim",
    "evidence_summary",
    "source_id",
    "source_date",
    "confidence",
    "needs_refresh",
    "notes",
]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", nargs="?", default="context/evidence_matrix.csv")
    args = parser.parse_args()

    path = Path(args.output)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        csv.writer(handle).writerow(HEADERS)
    print(path)


if __name__ == "__main__":
    main()
