"""State-transition rules for a human-approved assessment workflow."""

from __future__ import annotations


TRANSITIONS = {
    "intake": {"readiness_check"},
    "readiness_check": {"evidence_gap", "research_in_progress"},
    "evidence_gap": {"readiness_check"},
    "research_in_progress": {"evidence_gap", "ready_for_human_review"},
    "ready_for_human_review": {"research_in_progress", "approved", "declined"},
    "approved": set(),
    "declined": set(),
}


def transition(current: str, target: str, actor_type: str) -> str:
    if current not in TRANSITIONS or target not in TRANSITIONS[current]:
        raise ValueError(f"Transition not allowed: {current} -> {target}")
    if target in {"approved", "declined"} and actor_type != "human_reviewer":
        raise PermissionError("Only a human reviewer can make the final case decision")
    return target


def readiness(missing_fields: list[str]) -> dict[str, object]:
    blocking = sorted(set(missing_fields) & {"identity", "entity", "ownership", "mandate", "intended_activity"})
    return {
        "status": "evidence_gap" if blocking else "research_in_progress",
        "blockingFields": blocking,
        "humanReviewRequired": True,
    }
