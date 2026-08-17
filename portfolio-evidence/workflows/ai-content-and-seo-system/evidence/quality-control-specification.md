# Quality decision specification — content, SEO, and publishing

## Decision tree

| Gate | Pass condition | Failure or uncertainty route | Evidence created |
| --- | --- | --- | --- |
| Topic and intent | Topic fits the cluster plan, audience need, and keyword coverage gap | Reframe or return to planning | Article brief and keyword assignment |
| Package completeness | Canonical folder contains Markdown, research JSON, visual builder, source-asset lanes, and QC notes | Complete the package before drafting | Versioned article workspace |
| Evidence and links | Claims have adjacent primary citations; internal targets come from the approved live inventory | Replace source/link or revise the claim | Research record and link map |
| Editorial quality | Search intent, structure, readability, accuracy, and useful explanation pass review | Return to research or copy layer | Reviewed article Markdown |
| Visual brief | Each image has a distinct job, source assets, family, and no more than two zones | Simplify, split, or omit the visual | Locked visual plan |
| Visual hard-fail gate | No clipping, tiny text, fake data, weak hierarchy, unsupported authority, wrong family, or template-like composition | Reject and issue targeted builder revisions | `image-qc.md` hard-fail record |
| Visual score | Image reaches publish quality on the 20-point checklist | Regenerate and re-review | Approve/reject verdict and score |
| Metadata and Yoast inputs | Focus phrase, title, description, related terms, and frontmatter are synchronized | Repair metadata and regenerate checklist | Yoast input plan |
| WordPress dry run | HTML renders without duplicate title or broken internal anchors; referenced media exists | Repair Markdown, renderer, or assets | Dry-run payload and rendered HTML |
| CMS verification | Draft saves, intended values persist, Yoast recalculates, and tracker state reconciles | Repair CMS/admin step; do not mark posted | Verified draft and tracking record |

## Controls that demonstrate quality

- The article folder remains canonical; CMS state is a downstream deployment state.
- Internal links are selected from a controlled live-target inventory rather than guessed URLs.
- Visual rendering uses reviewed local source packets, not arbitrary live downloads.
- File existence is never visual approval: hard failures override the numeric score and trigger regeneration.
- WordPress receives a draft first, followed by persistence checks and metadata verification.
- Content, evidence, links, visuals, metadata, and CMS failures return to different owners/layers.

## Diagram brief

Show a canonical article package feeding separate editorial, link/evidence, visual, metadata, and CMS gates. Make the visual reject/regenerate loop prominent and end with verified draft plus reconciled package state, not an unexplained publish box.

