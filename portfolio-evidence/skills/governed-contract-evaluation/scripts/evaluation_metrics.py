"""Public evaluation core derived from a governed contract drafting system.

The module intentionally contains no precedent text. It demonstrates how fixed cases
and zero-tolerance controls were scored before a generated document could advance.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class EvaluationCase:
    expected_family: str
    returned_family: str
    expected_topics: frozenset[str]
    top_three_topics: frozenset[str]
    provenance_covered: bool
    cross_matter_leakage: bool
    invented_material_facts: int = 0


def score_cases(cases: Iterable[EvaluationCase]) -> dict[str, float | int]:
    records = list(cases)
    if not records:
        raise ValueError("At least one fixed evaluation case is required")

    classifications = sum(case.expected_family == case.returned_family for case in records)
    retrieval_hits = sum(bool(case.expected_topics & case.top_three_topics) for case in records)
    provenance_hits = sum(case.provenance_covered for case in records)
    leakage_count = sum(case.cross_matter_leakage for case in records)
    invented_count = sum(case.invented_material_facts for case in records)

    total = len(records)
    return {
        "case_count": total,
        "classification_accuracy": classifications / total,
        "retrieval_precision_at_3": retrieval_hits / total,
        "provenance_coverage": provenance_hits / total,
        "cross_matter_leakage_rate": leakage_count / total,
        "invented_material_fact_count": invented_count,
    }


def release_gates(metrics: dict[str, float | int]) -> dict[str, bool]:
    """Return explicit gates; passing does not remove the human-review requirement."""
    return {
        "classification": metrics["classification_accuracy"] >= 0.95,
        "retrieval": metrics["retrieval_precision_at_3"] >= 0.90,
        "provenance": metrics["provenance_coverage"] == 1.0,
        "no_cross_matter_leakage": metrics["cross_matter_leakage_rate"] == 0.0,
        "no_invented_material_facts": metrics["invented_material_fact_count"] == 0,
        "human_legal_review_required": True,
        "operational_reliance_allowed": False,
    }


def can_enter_human_review(gates: dict[str, bool]) -> bool:
    technical_gates = (
        "classification",
        "retrieval",
        "provenance",
        "no_cross_matter_leakage",
        "no_invented_material_facts",
    )
    return all(gates.get(name) is True for name in technical_gates)

