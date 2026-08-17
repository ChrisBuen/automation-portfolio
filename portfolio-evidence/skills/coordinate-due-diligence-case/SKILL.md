---
name: coordinate-due-diligence-case
description: Coordinate a multi-source due-diligence case from readiness inventory through specialist research routing, claim triangulation, flagging, conditions, supervision recommendations, and a human-reviewable synthesis. Use when a user wants a full DD run, case gap analysis, research-agent coordination, or a final evidence pack without allowing the agent to make the accountable approval decision.
---

# Multi-Stream Due-Diligence Case Coordination

<!-- portfolio-diagram:start -->

> **Workflow diagram:** [View the source-backed flow](references/diagrams/coordinate-due-diligence-case-skill-diagram.png) · [Editable source](references/diagrams/coordinate-due-diligence-case-skill-diagram.excalidraw) · [Evidence specification](references/workflow-specification.md)  
> Case evidence routes only to applicable specialists, then reconverges for contradiction-aware synthesis while the decision remains human.

<!-- portfolio-diagram:end -->

## What this skill does

This skill coordinates a complete due-diligence case without collapsing specialist work into one opaque answer. It inventories readiness, selects only applicable research streams, preserves the provenance and limits of each result, reconciles contradictions, and hands a named reviewer a synthesis that shows coverage, gaps, flags, conditions, and the decision still required.

Use [`$gate-assessment-evidence`](../gate-assessment-evidence/SKILL.md) before substantive synthesis.

## Procedure

1. Inventory the case header, subject identity, intended activity, source documents, screening results, interviews, references, specialist outputs, and policy/control context.
2. Classify the file as `not_ready`, `ready_for_research`, or `ready_for_human_review`. If it is not ready, return a tailored upload/request list and stop before recommendation.
3. Build a routing matrix for each specialist routine: `already_present`, `runnable_now`, `blocked_by_missing_inputs`, or `not_applicable`.
4. Run runnable routines in parallel only when they are independent. Preserve each output's sources, confidence, limitations, and data gaps.
5. Triangulate every material subject claim against independent evidence. Treat absence as outstanding evidence, not a clean verification.
6. Reconcile contradictions across forms, interviews, references, public records, formal checks, and service-provider evidence.
7. Surface concerns explicitly. Distinguish blocking flags, mitigable concerns, and ordinary outstanding items. Give every flag a source, evidence statement, severity, and owner/action where applicable.
8. Connect each condition to a named finding. Make supervision actions specific, owned, and cadenced.
9. Run the consistency checks in [references/quality-gates.md](references/quality-gates.md).
10. Produce a synthesis that states evidence coverage, unresolved gaps, source quality, recommended next step, and the human decision required. Do not represent the draft as legal, regulatory, clinical, or investment approval.

Read [references/routing-model.md](references/routing-model.md) when selecting specialists and [references/source-map.md](references/source-map.md) for provenance.
