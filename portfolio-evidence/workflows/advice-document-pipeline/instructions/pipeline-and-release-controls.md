# Pipeline and release controls

## Active architecture

```text
fact-find JSON + decision JSON
    -> deterministic derivation and conditional rules
    -> advice Markdown + record Markdown + merged-input audit snapshot
    -> fill the preserved branded DOCX templates
    -> structural QA and rendered-page review
```

The direct DOCX fill path is the release path because it preserves tables, headers, footers, images, named styles, and cover geometry. Markdown-to-DOCX conversion is useful for source review and batch experiments, but it is not equivalent to filling the governed Word template.

## Source-of-truth order

1. Structured input JSON.
2. Deterministic derivation code.
3. Source Markdown template.
4. Branded DOCX template.
5. Generated Markdown and merged-input snapshot.
6. Filled DOCX.

Fix the highest source layer responsible for a repeated defect. Do not rewrite generated files by hand.

## Version and release gates

Keep active, staged, and superseded states separate. A technically validated staged version must not silently become a production policy decision.

Require the manifest, merged-input consistency, zero unresolved markers or internal codes, intact DOCX relationships/styles/media, correct clean/internal variants, rendered-page review, and explicit blockers for unresolved business or compliance decisions.
