#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


DEFAULT = ["chair", "risk", "bias_auditor", "thesis_breaker"]
RULES = {
    "methods_ethics": ("study", "thesis", "research", "ethics"),
    "user_outcomes": ("client", "user", "patient", "customer", "experience"),
    "operations": ("workflow", "process", "implementation", "vendor"),
    "finance": ("allocation", "portfolio", "fund", "investment"),
    "security": ("attack", "exploit", "privacy", "security"),
    "compliance": ("regulated", "compliance", "policy", "legal"),
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--brief", type=Path, required=True)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    brief = json.loads(args.brief.read_text(encoding="utf-8"))
    text = json.dumps(brief).lower()
    seats = list(DEFAULT)
    reasons = {seat: "default process, downside, or bias-control seat" for seat in seats}
    for seat, words in RULES.items():
        if any(word in text for word in words):
            seats.append(seat)
            reasons[seat] = "activated by the decision topic"
    payload = {"decision_id": brief["decision_id"], "primary_seats": list(dict.fromkeys(seats)), "selection_reasons": reasons, "human_decision_required": True}
    rendered = json.dumps(payload, indent=2) + "\n"
    if args.output:
        args.output.write_text(rendered, encoding="utf-8")
    else:
        print(rendered, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
