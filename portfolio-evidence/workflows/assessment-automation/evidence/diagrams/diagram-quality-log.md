# Diagram quality log — assessment-automation

## Quality decision tree — 2026-08-13

| Pass | Review | Decision |
| --- | --- | --- |
| 1 | Applicant routing, early human gates, evidence-lane failures, case-specific fan-in, concurrency control, four human outcomes, and prerequisite-controlled activation are visible. Pass/fail paths remain legible at GitHub width. | Accepted |

Artifacts: `assessment-quality-decision-tree.excalidraw` and `assessment-quality-decision-tree.png`.

## Overview rescan — 2026-08-13

| Pass | Review | Decision |
| --- | --- | --- |
| 0 | Earlier overview compressed three early reviews into one label, stopped visually at the DD decision, and left downstream stages and concrete evidence outside the flow. | Rejected |
| 1 | Rebuilt with early reviews, applicant-specific routing, three evidence lanes, exactly-once fan-in, four human outcomes, downstream prerequisites, failure ownership, and workflow evidence. | Accepted |

## Evidence basis

README, instructions, source map, implementation filenames, workflow definitions, schemas, tests, and fixtures represented in the package manifest.

## Non-negotiable gates

1. Factual topology
2. Evidence boundary
3. Visual hierarchy
4. Connector routing
5. Label fit and accessibility
6. GitHub-width readability
7. Reproducible source and output

## Render review record

| Pass | Observation | Decision |
| --- | --- | --- |
| 0 | Semantic draft generated from the evidence manifest; publication render not yet inspected. | Rejected |
| 1 | Shared failure routing was too long or ambiguous, and convergence outputs needed clearer separation. | Rejected |
| 2 | Explicit stop nodes, separated outputs, clean routing, and original-size / 1050 px checks passed. | Accepted |
| 3 | Rejected: the earlier visual explained the control plane but understated pre-DD reviews and the controlled engagement/onboarding lifecycle. | Rejected |
| 4 | Accepted: revised lifecycle adds human triage, case-specific evidence plan, collection reconciliation, CR/RA evidence, DD decision, and proceeding-only downstream handoff. | Accepted |
