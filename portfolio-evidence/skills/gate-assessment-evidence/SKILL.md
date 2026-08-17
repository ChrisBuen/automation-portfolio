---
name: gate-assessment-evidence
description: Classify an assessment file as not ready, ready for bounded research, or ready for human review; identify missing evidence; route applicable specialist routines; and block automated approval or decline. Use for due-diligence, onboarding, vendor, applicant, or regulated assessment workflows that require traceable evidence and human decision authority.
---

# Evidence Completeness and Human-Control Assessment Gate

<!-- portfolio-diagram:start -->

> **Workflow diagram:** [View the source-backed flow](references/diagrams/gate-assessment-evidence-skill-diagram.png) · [Editable source](references/diagrams/gate-assessment-evidence-skill-diagram.excalidraw) · [Evidence specification](references/workflow-specification.md)  
> A case advances from inventory to bounded research to human review only when required evidence and routine outputs are accounted for.

<!-- portfolio-diagram:end -->

## What this skill does

This skill answers a narrow but consequential question: is the case ready to move forward? It separates supplied claims from independent verification, identifies the precise missing evidence, accounts for required specialist routines, and prevents an incomplete file from becoming a polished but unsupported recommendation. The final approval or decline remains with an identified human.

## Procedure

1. Inventory every supplied input as `present`, `partial`, `missing`, or `not_applicable`.
2. Separate subject claims from independent verification. Record the source and access date for every material verification.
3. Run `python scripts/check_readiness.py <case.json>`.
4. If identity, entity/ownership, intended activity, core documents, or required screening is missing, stop at `not_ready`. Return a concrete request list; do not generate a final recommendation.
5. If the file can support bounded research, classify each specialist routine as `already_present`, `runnable_now`, `blocked_by_missing_inputs`, or `not_applicable`.
6. Run only the applicable routines with the narrowest sufficient context. Preserve their confidence, limitations, and citations.
7. Reconcile contradictions. Put unresolved material claims in an outstanding-items register instead of treating absence as a clean finding.
8. Move to `ready_for_human_review` only when required evidence exists, routine outputs are accounted for, and every serious finding has an evidence trail and response condition.
9. Leave `approve`, `decline`, and equivalent final decisions to an identified human reviewer.

## Output

Return readiness state, blocking gaps, runnable routines, completed routines, unresolved contradictions, evidence provenance, and the human decision required.

Read [references/gate-model.md](references/gate-model.md) for state transitions and [references/source-map.md](references/source-map.md) for the original-derived architecture.
