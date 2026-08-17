# Workflow evidence specification — advice-document pipeline

**Status:** approved source-only model. It is the evidence basis for the public production-flow diagram, not a reconstruction of private infrastructure.

## Scope and source rule

This specification treats the following as authoritative:

1. [`instructions/pipeline-and-release-controls.md`](../instructions/pipeline-and-release-controls.md) for the documented production and release process.
2. [`src/template_engine.py`](../src/template_engine.py) and [`src/document_qa.py`](../src/document_qa.py) for public, runnable mechanics.
3. [`tests/`](../tests/) for publicly tested behaviour.
4. [`tests/test-receipt.md`](../tests/test-receipt.md) for recorded private-release outcomes only.

The README and every existing diagram are excluded as workflow evidence because the diagrams were created during this review effort and include illustrative material. This document is the approval point for any replacement visual.

## Evidence classification

| Marker | Meaning |
| --- | --- |
| **R** | Runnable in the public package |
| **D** | Documented control or production behaviour; implementation is not published here |
| **H** | Recorded historical result from private evidence |
| **N** | Not evidenced in the public package; must not appear as fact in a diagram |

## Verified workflow model

### 0. Preconditions and governed sources

| ID | Verified fact | Evidence | Classification |
| --- | --- | --- |
| P1 | Production uses a fact-find JSON and a decision JSON as structured inputs. | `pipeline-and-release-controls.md`, Active architecture | D |
| P2 | The authoritative source order is: structured input JSON → derivation code → source Markdown template → branded DOCX template → generated Markdown/snapshot → filled DOCX. | `pipeline-and-release-controls.md`, Source-of-truth order | D |
| P3 | Active, staged, and superseded versions must remain separate; technical validation does not itself make staged content a production policy. | `pipeline-and-release-controls.md`, Version and release gates | D |
| P4 | A manifest is required before release. | `pipeline-and-release-controls.md`, Version and release gates | D |

**Boundary:** the package does not say what event begins a run, who selects a version, or how a manifest is assembled. These are preconditions, not a proven trigger sequence.

### 1. Build the source material

| ID | Verified step | Inputs → outputs | Evidence | Classification |
| --- | --- | --- | --- | --- |
| B1 | Flatten nested structured data. | Mapping → flat key/value mapping | `template_engine.flatten()` | R |
| B2 | Apply deterministic derivation and conditional rules. | Structured source → values/sections for document assembly | `pipeline-and-release-controls.md`, Active architecture; `template_engine.remove_section()` | D + R for section removal |
| B3 | Render known placeholder values and retain markers that do not have supplied values. | Source text + values → rendered source text | `template_engine.render_placeholders()`; `test_template_engine.py` | R |
| B4 | Remove an optional Markdown section from its heading through the next peer-or-higher heading. | Markdown + heading → updated Markdown | `template_engine.remove_section()`; `test_template_engine.py` | R |
| B5 | Produce three source-review artifacts. | Derived/conditional source → advice Markdown + record Markdown + merged-input audit snapshot | `pipeline-and-release-controls.md`, Active architecture | D |

### 2. Source and release controls

| ID | Verified control | Pass condition / consequence | Evidence | Classification |
| --- | --- | --- | --- | --- |
| C1 | Check merged-input consistency. | Required for release; implementation is not published. | `pipeline-and-release-controls.md`, Version and release gates | D |
| C2 | Detect unresolved placeholder markers. | `unresolved_placeholders()` returns marker strings; the documented release rule requires zero unresolved markers. | `template_engine.unresolved_placeholders()`; pipeline controls | R + D |
| C3 | Detect release-blocking visible text. | `check_visible_text()` blocks known unresolved placeholders, internal reference codes, and empty documents. | `document_qa.check_visible_text()`; `test_document_qa.py` | R |
| C4 | Direct-fill the preserved branded DOCX template. | This, not Markdown-to-DOCX conversion, is the documented release path because it preserves Word structures. | `pipeline-and-release-controls.md`, Active architecture | D |
| C5 | Inspect DOCX package health. | Valid DOCX ZIP; required `[Content_Types].xml`, `word/document.xml`, and `word/styles.xml`; records table/header/footer/media counts. | `document_qa.inspect_docx()` | R |
| C6 | Preserve DOCX relationships, styles, and media; select correct clean/internal variant; conduct rendered-page review. | Required before release; public implementations are not published. | `pipeline-and-release-controls.md`, Version and release gates | D |
| C7 | Block unresolved business or compliance decisions. | Explicit blocker required; the public package does not name an approver or approval mechanism. | `pipeline-and-release-controls.md`, Version and release gates | D |

### 3. Correction rule and recorded outcomes

| ID | Verified fact | Evidence | Classification |
| --- | --- | --- | --- |
| R1 | For a repeated defect, correct the highest responsible source layer. Generated files must not be rewritten by hand. | `pipeline-and-release-controls.md`, Source-of-truth order | D |
| R2 | A private v9 batch recorded 12 work items, 24 DOCX files, and passed batch QA. | `tests/test-receipt.md` | H |
| R3 | Private v11 records report preservation of styles, tables, headers, footers, and embedded images, and cleared visible placeholders. | `tests/test-receipt.md` | H |

## Source-backed flow to visualise

This is the complete flow that the public evidence supports:

```text
Governed preconditions
  fact-find JSON + decision JSON + manifest + controlled version state
        ↓
Deterministic source assembly
  flatten structured data
  → derive values and apply conditional rules
  → render known placeholders; retain unknown markers
  → remove inapplicable heading-bounded sections
        ↓
Source-review artifacts
  advice Markdown + record Markdown + merged-input audit snapshot
        ↓
Release path
  direct-fill preserved branded DOCX template
        ↓
Release controls
  merged-input consistency
  → no unresolved markers or internal reference codes
  → intact DOCX parts / relationships / styles / media
  → correct clean/internal variant
  → rendered-page review
  → unresolved business or compliance decision blocks release
        ↓
Filled DOCX released only when all required controls are satisfied

Repeated defect: repair the highest responsible source layer; do not hand-edit generated output.
```

## Exclusions — do not draw these as verified system components

The following appeared in earlier diagrams but cannot be represented as factual workflow nodes from this public package:

| Excluded claim | Why it cannot be drawn as fact |
| --- | --- |
| Manual, scheduled, or API trigger | No trigger, endpoint, schedule, or invocation source is published. |
| `RUN_TRIGGER_URL` | Illustrative identifier only; not present in package evidence. |
| `WORK_QUEUE` and one queued work item per manifest entry | A historical batch and a manifest are documented, but no queue implementation or dispatch behaviour is published. |
| `DOCUMENT_STORE`, run ID, case ID, or lifecycle states | No persistent store, schema, or run-record mechanism is published. |
| Automatic retry | The documented repair rule is corrective guidance, not an automated retry implementation. |
| `RELEASE_OWNER` or a named human approval API | The package documents release blockers and policy separation, but no named role or approval workflow. |
| `DOCX_TEMPLATE_ID` | Branded DOCX templates are documented; an identifier/resolution mechanism is not. |
| Exact relationships between all checks and generated artifacts | Some controls are documented but their private orchestration is not included. |

## Decisions needed before any diagram is drawn

1. Is the intended visual a **source-backed document-production flow** (the model above), or a **proposed target automation architecture** that explicitly labels the missing trigger, queue, state, and approval components as proposed?
2. Should the diagram show the source-of-truth hierarchy as a side panel, or reserve it for a separate supporting visual?
3. Should the historically recorded v9/v11 batch results appear as evidence callouts, or stay out of the main flow?

No diagram should be created until these choices are approved.
