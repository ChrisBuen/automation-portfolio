---
name: orchestrate-decision-council
description: Pressure-test a consequential decision with independent specialist seats, evidence bundles, explicit cross-examination, bias controls, and dissent-preserving synthesis. Use when a user asks for a council, competing views, a red team, strongest arguments for and against, blind spots, or a decision memo that should not collapse disagreement prematurely.
---

# Multi-Perspective Evidence-Based Decision Council

<!-- portfolio-diagram:start -->

> **Workflow diagram:** [View the source-backed flow](references/diagrams/orchestrate-decision-council-skill-diagram.png) · [Editable source](references/diagrams/orchestrate-decision-council-skill-diagram.excalidraw) · [Evidence specification](references/workflow-specification.md)  
> A common decision brief fans out to non-overlapping independent seats, then reconverges through explicit cross-examination without erasing dissent.

<!-- portfolio-diagram:end -->

## What this skill does

This skill pressure-tests a consequential choice through independent, deliberately non-overlapping perspectives. Each seat receives the same evidence, develops its view before seeing the others, and then participates in structured cross-examination. The synthesis identifies the strongest case, weakest assumptions, open evidence, and material dissent without manufacturing consensus.

Keep the user or named accountable owner as the judge.

## Procedure

1. Build a decision brief with `python scripts/build_decision_brief.py --question "<decision>" --output brief.json`.
2. Separate the question asked from the question that should be debated. Name success, failure, constraints, stakes, time horizon, and decision owner.
3. Select the smallest set of non-overlapping seats that covers the decision. Include one domain seat, one downside/control seat, and one bias-reduction seat when the decision is consequential.
4. Give every seat the same brief. Keep independent views separate until each returns its assessment, strongest argument, strongest warning, underweighted angle, confidence, evidence basis, and open questions.
5. Mark evidence, inference, freshness, and missing evidence explicitly. Do not let a polished narrative substitute for a source trail.
6. Cross-examine: identify the strongest case, weakest assumption, hidden dependency, neglected second-order effect, and point all seats missed.
7. Synthesize without inventing consensus. Preserve material dissent and state what evidence would change the view.
8. Match the final shape to the request: direct recommendation, comparison, plan, memo, short debate, or full council brief.
9. Do not commit, push, send, or notify anyone unless the user separately authorizes that external action.

Use `python scripts/select_seats.py --brief brief.json --output seats.json` for a deterministic first pass. Read [references/output-shapes.md](references/output-shapes.md) when choosing the deliverable and [references/source-map.md](references/source-map.md) for provenance.
