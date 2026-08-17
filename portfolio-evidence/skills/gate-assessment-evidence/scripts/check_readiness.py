#!/usr/bin/env python3
"""Classify a fictional or sanitized assessment case by evidence readiness."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


BASE_REQUIRED = {"identity", "intended_activity", "core_documents", "screening"}
TYPE_REQUIRED = {
    "individual": {"career_history"},
    "corporate": {"entity", "ownership", "controllers"},
    "fund": {"entity", "ownership", "mandate", "constitutional_documents", "service_providers"},
}
ROUTING = {
    "individual": ["individual_background", "formal_background_checks"],
    "corporate": ["company_research", "controller_background", "formal_background_checks"],
    "fund": ["company_research", "asset_class_market", "legal_counsel", "infrastructure", "principal_background"],
}


def classify(case: dict) -> dict:
    applicant_type = str(case.get("applicant_type", "")).lower()
    evidence = case.get("evidence", {})
    if applicant_type not in TYPE_REQUIRED:
        return {"status": "not_ready", "blocking_gaps": ["applicant_type"], "routines": [], "human_decision_required": True}
    required = BASE_REQUIRED | TYPE_REQUIRED[applicant_type]
    blocking = sorted(field for field in required if evidence.get(field) not in {"present", "verified"})
    routines = []
    outputs = set(case.get("completed_routines", []))
    for routine in ROUTING[applicant_type]:
        routines.append({"name": routine, "state": "already_present" if routine in outputs else ("blocked_by_missing_inputs" if blocking else "runnable_now")})
    if blocking:
        status = "not_ready"
    elif any(item["state"] == "runnable_now" for item in routines):
        status = "research_in_progress"
    else:
        status = "ready_for_human_review"
    return {"status": status, "blocking_gaps": blocking, "routines": routines, "human_decision_required": True}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("case", type=Path)
    args = parser.parse_args()
    result = classify(json.loads(args.case.read_text(encoding="utf-8")))
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
