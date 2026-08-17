#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path


def decision_type(question: str) -> str:
    text = question.lower()
    rules = {
        "allocation": ("allocate", "allocation", "rebalance", "portfolio"),
        "strategy": ("strategy", "approach", "launch", "enter"),
        "risk_event": ("risk", "incident", "failure", "crash"),
        "product": ("product", "offering"),
        "operations": ("workflow", "process", "vendor", "operations"),
        "governance": ("policy", "governance", "committee"),
        "research": ("research", "study", "thesis"),
    }
    return next((kind for kind, words in rules.items() if any(word in text for word in words)), "other")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--question", required=True)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    slug = re.sub(r"[^a-z0-9]+", "-", args.question.lower()).strip("-")[:60] or "decision"
    payload = {
        "decision_id": f"{slug}-{datetime.now(timezone.utc).date().isoformat()}",
        "question_asked": args.question.strip(),
        "question_to_debate": args.question.strip(),
        "decision_type": decision_type(args.question),
        "decision_owner": "human judge",
        "stakes": "Specify the concrete consequences.",
        "success_definition": "Specify measurable success.",
        "failure_definition": "Specify unacceptable failure.",
        "time_horizon": "unspecified",
        "constraints": [],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    text = json.dumps(payload, indent=2) + "\n"
    if args.output:
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
