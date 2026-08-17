# Workflow specification — ai-content-and-seo-system

## Operating boundary

No live credentials, analytics, article bodies, cookies, or ranking claims are included.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Topic-cluster plan; Approved link inventory; Reviewed source assets | README, instructions, fixtures | R | Entry / convergence |
| E2 | Transformations: Scaffold article package → Research + cite claims → Draft to search intent → Render local visuals | Scripts, workflow JSON, or SKILL procedure | R | converge |
| E3 | Gate: Editorial + CMS gates pass? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Verified CMS draft; Posted article package | README and output contracts | R | Handoff / end |
| E5 | No live credentials, analytics, article bodies, cookies, or ranking claims are included. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Topic-cluster plan
- Approved link inventory
- Reviewed source assets

## Ordered transformations

1. Scaffold article package
2. Research + cite claims
3. Draft to search intent
4. Render local visuals

## Decisions and outcomes

- Gate: Editorial + CMS gates pass?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Repair the responsible article, metadata, link, or visual layer; never suppress a failed gate.

## Artifacts and stored state

- Verified CMS draft
- Posted article package

## Explicit exclusions

- No live credentials, analytics, article bodies, cookies, or ranking claims are included.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: The article folder remains canonical while evidence, links, visuals, metadata, and CMS state pass separate gates.
- Primary reading direction: left to right
- Topology: converge
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: create_article_v2.py, sync_yoast_frontmatter.py, editorial-gates.md
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `evidence/diagrams/ai-content-and-seo-system-workflow-diagram.excalidraw`
- PNG: `evidence/diagrams/ai-content-and-seo-system-workflow-diagram.png`
