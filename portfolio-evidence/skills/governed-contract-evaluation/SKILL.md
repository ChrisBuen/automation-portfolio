---
name: governed-contract-evaluation
description: Evaluate precedent-driven contract automation before it enters human legal review. Use when testing contract-family classification, clause retrieval, provenance coverage, missing-fact handling, cross-matter leakage, historical blind replay, clean/review DOCX separation, rendering, audit reproducibility, or operational-reliance gates. Passing permits review, never legal approval or autonomous external release.
---

# Contract Automation Governance and Risk Evaluation

<!-- portfolio-diagram:start -->

> **Workflow diagram:** [View the source-backed flow](references/diagrams/governed-contract-evaluation-skill-diagram.png) · [Editable source](references/diagrams/governed-contract-evaluation-skill-diagram.excalidraw) · [Evidence specification](references/workflow-specification.md)  
> Fixed blind cases, provenance, leakage controls, document separation, and rendered QA converge before a system may enter legal review.

<!-- portfolio-diagram:end -->

## What this skill does

This skill determines whether a precedent-driven contract system is safe to enter human legal review. It evaluates classification, retrieval, clause provenance, missing-fact handling, cross-matter separation, document integrity, rendering, and reproducibility. Passing the evaluation permits review only; it does not turn technical performance into legal approval or operational reliance.

1. Freeze a versioned evaluation set before changing the system.
2. Read [references/evaluation-protocol.md](references/evaluation-protocol.md).
3. Keep evaluator-only references withheld from the generator during blind replay.
4. Score classification, required-topic coverage, retrieval, provenance, invented material facts, and cross-matter leakage.
5. Validate clean/review separation, OOXML integrity, audit hashes, and rendered pages.
6. Require legal-owner review regardless of technical results.
7. Leave operational reliance blocked until a separately governed qualifying live-shadow review passes.

Use `scripts/evaluation_metrics.py` for the public fixed-case metric contract. Do not publish precedent text or matter identifiers to make the evaluation look complete.
