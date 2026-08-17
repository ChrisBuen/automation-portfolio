# Diagram quality log — advice-document pipeline

## Quality decision tree — 2026-08-13

| Pass | Review | Decision |
| --- | --- | --- |
| 1 | Strategy ownership, source-layer repair, unresolved blockers, DOCX integrity, variant separation, rendered review, adviser release, and post-issue audit are represented without implying autonomous advice. | Accepted |

Artifacts: `advice-quality-decision-tree.excalidraw` and `advice-quality-decision-tree.png`.

## Purpose

This log is the acceptance record for the public workflow visual. A diagram is not accepted because it renders; it must communicate the documented operating model accurately and be readable as a portfolio artifact.

## Evidence basis

| Diagram claim | Verified source |
| --- | --- |
| Structured fact-find and decision inputs are the first source layer | `instructions/pipeline-and-release-controls.md` |
| Nested fields are flattened; markers are rendered and unknown ones retained | `src/template_engine.py`, `tests/test_template_engine.py` |
| Generated advice Markdown, record Markdown, and merged-input snapshot are review artifacts | `instructions/pipeline-and-release-controls.md` |
| Direct DOCX fill is the release path and preserves document structures | `instructions/pipeline-and-release-controls.md`, `src/document_qa.py` |
| Package, visible-text, preservation, variant, rendered-page, and named-human controls govern release | `README.md`, `instructions/pipeline-and-release-controls.md`, `src/document_qa.py` |

## Non-negotiable review gates

1. **Topology:** normal, blocked, and human-controlled paths have unambiguous connectors.
2. **Evidence:** the visual shows actual artifacts and checks; it does not substitute generic labels.
3. **Hierarchy:** one dominant reading path, meaningful shape vocabulary, and no uniform-card grid.
4. **Readability:** labels fit, arrows land on their target, contrast is sufficient, and the image works at GitHub width.
5. **Truthfulness:** no implied automation of licensed review, compliance, business decision, or release authority.

## Render review record

| Pass | Result | Decision |
| --- | --- | --- |
| 0 — initial SVG | Semantically correct but too abstract; insufficient process detail. | Rejected |
| 1 — first Excalidraw render | Evidence content added, but hierarchy, spacing, and connector routing were not portfolio quality. | Rejected |
| 2 — publication redesign | Rendered successfully, but the source-review artifacts were too text-heavy, the DOCX boundary dominated, and the failure path was visually detached from repair. | Rejected |
| 3 — publication redesign | Stronger visual hierarchy, but it still omitted the trigger, run lifecycle, queued work items, explicit decisions, and execution logic. | Rejected |
| 4 — public-safe execution workflow | Added explicit trigger, run identifier, state store, version/manifest/input decisions, work queue, deterministic conditional rule, review artifacts, source gate, DOCX checks, human gate, release receipt, and defect-return bus. Generic identifiers replace company-specific system details. Rendered from source and inspected at original and GitHub content width; full-size SVG/PNG links provide label-level review. | Accepted |
| 5 — simplified execution-and-repair redraw | Replaced the global exception bus with one explicit local repair convention. Separated the single run lifecycle from the repeated per-item path. Corrected the post-source-gate sequence so it only descends into governed DOCX fill and verification; the main execution order no longer reverses. | Accepted |
| 6 — source-backed production flow | Withdrawn automation assumptions. Rebuilt from `workflow-specification.md`: structured inputs, deterministic source assembly, three review artifacts, source control, direct governed DOCX fill, documented release controls, filled DOCX, and highest-source correction rule only. Mermaid parsing, SVG XML, PNG renders, README references, and package tests passed. | Accepted |
| 7 — visual-argument reset | Rebuilt as an editable Excalidraw source. The composition now mirrors the process: source convergence, an internal transformation timeline, evidence fan-out and reconvergence, governed DOCX release, and one non-automated correction rule. Two render passes corrected phase-heading collision, evidence-text clipping, and output-label fit. Reviewed again at GitHub width. | Accepted |

| 8 - client-delivery revision | Rejected: the current production visual stopped at a filled DOCX and did not communicate the adviser-controlled intake, delivery, and post-advice review boundary. | Rejected |
| 9 - adviser-controlled delivery | Accepted: revised labels show reviewed client/adviser intake, content/audit fan-out, direct DOCX fill, adviser review, delivery, and recorded review without exposing client material. | Accepted |

## Acceptance rule

Only replace the README visual when all five gates pass. If any pass exposes thin content, ambiguous flow, bad spacing, clipping, or a generic appearance, record the issue here and redraw rather than patching around it.

The reusable method extracted from these passes is maintained in the portfolio [workflow visualization recreation guide](../../../../docs/workflow-visualization-recreation-guide.md) and the [`workflow-visualizaer`](../../../../skills/workflow-visualizaer/) skill.
