# End-to-end client-delivery operating model

## What this package represents

This public package represents the working production system behind a digital-asset advice-document program. It does not publish client records, commercial templates, policy wording, or personal advice. It does preserve the important engineering and operating choices: a staged source-to-document pipeline, version isolation, direct template fill, visible release blockers, and evidence for every value carried into the final document.

## Operating sequence

### 1. Engagement and intake

The process begins with the client risk/decision process and an adviser-led engagement scope. Client and adviser fact-find material establish objectives, financial position, holdings, relevant knowledge and experience, risk profile, constraints, and open questions. The adviser decides whether the file is sufficiently complete to progress; this is not a generator decision.

### 2. Structured client workspace

Each client has a separate workspace with an input and output boundary:

```text
clients/<client-slug>/
  INTAKE_NOTES.md
  inputs/
    fact_find.json
    decision_matrix.json
  outputs/
    <prefix>_Advice_Statement.md
    <prefix>_Advice_Record_ROA.md
    <prefix>_Merged_Input.json
    <prefix>_Advice_Statement_vN.docx
    <prefix>_Advice_Record_ROA_vN.docx
```

`INTAKE_NOTES.md` records OCR uncertainty, outstanding information, and adviser actions. The two JSON files are the structured basis for generation. The merged-input snapshot makes derived values reviewable without requiring a reviewer to reverse-engineer generator logic.

### 3. Content generation and source review

The generator combines the fact-find, decision matrix, source templates, and deterministic derivation rules. It performs calculations and creates reusable prose blocks, then applies conditions that remove inapplicable sections rather than leaving blank headings or internal placeholders. It emits three review artifacts:

- Advice Statement Markdown, the editable content source;
- ROA Markdown, the editable record source; and
- merged-input JSON, the complete raw-and-derived audit snapshot.

The source-of-truth order is intentionally strict:

```text
reviewed JSON -> deterministic derivation -> Markdown source template
  -> governed DOCX template -> generated Markdown/audit snapshot -> filled DOCX
```

When a result is wrong, the team fixes the highest responsible layer and regenerates. Hand-editing a final DOCX conceals the defect and is not an acceptable recurring solution.

### 4. Controlled version progression

The source workspace maintained active, staged, and superseded template versions separately. A technically successful batch did not automatically become the production standard. Promotion required the unresolved commercial, legal, and compliance decisions to be closed explicitly.

This matters because the system can prove template integrity and placeholder clearance, but it cannot manufacture confirmed fee data, legal-entity names, consent wording, or a suitability decision. Those remain visible release blockers.

### 5. Direct branded Word assembly

The released path fills placeholders inside the pre-designed Word template. It preserves the features a fresh Markdown-to-DOCX conversion cannot faithfully reproduce: cover treatment, header bands, callout tables, table styles, page geometry, headers, footers, media, and named Word styles.

Template readiness is itself checked. In the source system, OOXML whitespace behaviour was corrected before client-path use, and later template work added support for real Word tables, controlled client/internal variants, and table-row pagination safeguards. Those are document-engineering controls, not cosmetic edits.

### 6. Release controls and delivery

Before release, the package must reconcile the merged input, detect unresolved placeholders and internal references, inspect the DOCX ZIP parts and relationships, confirm the intended clean/internal variant, and pass a rendered-page review. A passing technical check does not waive an unresolved policy or advice issue.

After adviser review and explanation, the client reaches a clear implementation decision. Implementation and the post-advice review record are downstream human-controlled stages. This package demonstrates how advice documents were produced and checked; it never represents a system that autonomously recommends, approves, or implements financial advice.

## Evidence boundary

The public sample is fictional. Specific client names, real fact-finds, decision matrices, final advice, proprietary templates, provider terms, and internal policy wording are excluded. The public Python extracts and tests remain runnable so a reviewer can inspect the key assembly and QA mechanics.
