# Quality decision specification — advice document production

## Decision tree

| Gate | Pass condition | Failure or uncertainty route | Evidence created |
| --- | --- | --- | --- |
| Engagement and entity scope | Advice scope, client/entity identity, permissions, custody/execution path, fees, consent, and review obligation are known | Adviser or operations resolves the named intake gap | Reviewed fact-find and decision record |
| Strategy sense-check | Proposed strategy fits the recorded risk, capacity, permissions, and product constraints | Return to adviser; generator cannot invent suitability | Adviser flag and revised decision matrix |
| Derived-field guardrails | Dates, grades, allocation bands, risk blocks, funds flow, and conditional sections calculate consistently | Correct JSON or derivation logic and regenerate | Generated Markdown and merged-input snapshot |
| Authority and unresolved-field gate | No unresolved policy, fee, legal-entity, consent, suitability, or override-authority item remains | Block document release; assign the unresolved item | Explicit open-item register |
| Source consistency | Advice Statement, ROA, and merged-input snapshot agree with governed sources | Repair the lowest responsible truth layer | Rebuilt source artifacts and manifest |
| DOCX structural integrity | Package opens; OOXML relationships, styles, tables, headers, footers, images, and content order remain valid | Repair filler/template layer and rebuild | Validated Word package |
| Variant separation | Client output contains no internal-only notes, codes, or drafting material | Correct variant logic and regenerate | Clean/internal variant record |
| Visible and rendered QA | No unresolved placeholders, broken tables, missing sections, bad pagination, or visual defects | Return to JSON, derivation, source template, or DOCX template based on root cause | QA result and rendered pages |
| Adviser release | Adviser reviews, explains, and authorises issue | Hold delivery | Adviser release record |
| Post-issue audit | Issued file matches final, exceptions are approved, and repeat defects are logged | Remediate and update the recurring-error register | Pass/fail audit and review record |

## Controls that demonstrate quality

- The editable truth layers are ordered so defects can be fixed at their source instead of patched in the final document.
- Conditional advice text is generated deterministically, but suitability and authority remain adviser-owned.
- Direct template filling preserves the governed Word document rather than flattening it through conversion.
- Structural package QA and rendered-page QA are separate gates; a file opening successfully is not a release decision.
- Client and internal variants are explicitly separated and tested.
- Post-issue review turns recurring defects into upstream fixes.

## Diagram brief

Show the two-stage production architecture, the unresolved-authority stop, the four root-cause repair layers, separate structural/variant/visual gates, adviser release, and the post-issue feedback loop.

