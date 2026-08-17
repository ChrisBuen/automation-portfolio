# Workflow atlas quality log

## Evidence basis

The website does not invent or redraw workflow topology. Each primary system view and each decision/correction view is an approved generated diagram under `portfolio-evidence/workflows/*/evidence/diagrams/`, backed by the adjacent workflow specification and source map. The manifest in `portfolio-evidence/` preserves its path and hash relationship to the Git-ignored local source archive.

Published diagram pairs:

| Website case | System flow | Decision and correction |
| --- | --- | --- |
| Onboarding | `assessment-automation-workflow-diagram.png` | `assessment-quality-decision-tree.png` |
| Advice documents | `advice-document-production-v2.png` | `advice-quality-decision-tree.png` |
| Research reports | `research-report-builder-workflow-diagram.png` | `research-quality-decision-tree.png` |
| Content and SEO | `ai-content-and-seo-system-workflow-diagram.png` | `content-publishing-quality-decision-tree.png` |
| Market intelligence | `market-report-automation-workflow-diagram.png` | `market-intelligence-quality-decision-tree.png` |

All ten sources are hash-pinned in `scripts/sync-public-assets.mjs`. The build creates metadata-stripped 1600 px and 3200 px WebP derivatives and records source/output provenance.

## Non-negotiable gates

1. The diagram is the topology authority; summary copy cannot change a connector, branch, convergence, gate, return, or owner.
2. System flow and decision/correction logic remain separate inspectable views.
3. Implementation status and public exclusions remain visible outside the diagram.
4. Fit view must show the complete chart; zoom, pan, actual size, fullscreen, Escape exit, and full-size links must work.
5. The primary diagram remains present without JavaScript; reduced motion cannot hide content.
6. Mobile must retain the complete topology and provide touch-safe controls without page-level horizontal overflow.
7. All published files must pass the public-asset allowlist and provenance checks.

## Render review record

| Pass | Observation | Decision |
| --- | --- | --- |
| 0 | The prior hand-built scenes summarized the workflows but made the charts secondary, used a landing-page card grammar, and maintained a second visual model beside the authoritative diagrams. | Rejected. |
| 1 | The first atlas implementation made both generated views primary and added the reference controls. Automated review found insufficient journey-copy contrast and non-focusable horizontal journey/legend regions. | Rejected; contrast and focus behavior corrected. |
| 2 | All ten diagrams were loaded eagerly. This removed every loading interval but reduced Lighthouse performance to 84. | Rejected; loading strategy revised. |
| 3 | The flagship system chart loads eagerly. Later and secondary charts load progressively with an explicit loading state. Atlas controls, diagram tabs, fullscreen, Escape exit, keyboard/touch behavior, no-JavaScript fallback, reduced motion, and full-size links passed. | Accepted. |

## Accepted validation result

- Astro diagnostics: 0 errors, 0 warnings, 0 hints.
- Production build and public-safety validation: passed.
- Root and project-base build variants: passed.
- Responsive automated review: passed at 390, 768, 1024, and 1440 px.
- Workflow atlas inventory: 5 atlases, 10 diagram views, and 25 viewer controls.
- Accessibility: no automated WCAG violations in the tested viewports.
- No horizontal page overflow, broken anchors, undersized interaction targets, console errors, or failed requests.
- Reduced motion: settled; no hidden workflow content or running animations.
- No JavaScript: all five cases and all five primary charts remain present.
- Lighthouse production preview: 97 performance, 100 accessibility, 100 best practices, and 100 SEO.

## Publication boundary

The diagrams describe only the states supported by their workflow specifications and source maps. They do not establish unpublished triggers, queues, retry services, credentials, approval APIs, client records, ranking outcomes, or production deployment beyond the stated source cut-off.
