# Workflow specification — coordinate-due-diligence-case

## Operating boundary

The skill prepares a review pack; it does not make regulatory, legal, or investment approval.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Case file + identity; Documents + screening results | README, instructions, fixtures | D | Entry / convergence |
| E2 | Transformations: Inventory readiness → Build specialist routing matrix → Independent research routines → Claim triangulation → Flags + conditions | Scripts, workflow JSON, or SKILL procedure | D | fanout |
| E3 | Gate: Ready for human review? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Evidence coverage + gaps; Human-reviewable synthesis | README and output contracts | D | Handoff / end |
| E5 | The skill prepares a review pack; it does not make regulatory, legal, or investment approval. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Case file + identity
- Documents + screening results

## Ordered transformations

1. Inventory readiness
2. Build specialist routing matrix
3. Independent research routines
4. Claim triangulation
5. Flags + conditions

## Decisions and outcomes

- Gate: Ready for human review?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Missing or conflicting evidence returns to a named source or owner; absence is not verification.

## Artifacts and stored state

- Evidence coverage + gaps
- Human-reviewable synthesis

## Explicit exclusions

- The skill prepares a review pack; it does not make regulatory, legal, or investment approval.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: Case evidence routes only to applicable specialists, then reconverges for contradiction-aware synthesis while the decision remains human.
- Primary reading direction: left to right
- Topology: fanout
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: routing-model.md, quality-gates.md, $gate-assessment-evidence
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `references/diagrams/coordinate-due-diligence-case-skill-diagram.excalidraw`
- PNG: `references/diagrams/coordinate-due-diligence-case-skill-diagram.png`
