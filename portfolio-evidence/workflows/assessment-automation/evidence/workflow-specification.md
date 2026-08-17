# Workflow specification — assessment-automation

## Operating boundary

Exports are inactive; the asynchronous report path is untested; final approval remains human.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Staff or agent MCP action; Case + document inventory | README, instructions, fixtures | D | Entry / convergence |
| E2 | Transformations: Route bounded action → Create specialist job records → Document collection → Specialist research → Manual milestone | Scripts, workflow JSON, or SKILL procedure | D | fanout |
| E3 | Gate: Required typed signals complete? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Draft synthesis; Human decision | README and output contracts | D | Handoff / end |
| E5 | Exports are inactive; the asynchronous report path is untested; final approval remains human. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Staff or agent MCP action
- Case + document inventory

## Ordered transformations

1. Route bounded action
2. Create specialist job records
3. Document collection
4. Specialist research
5. Manual milestone

## Decisions and outcomes

- Gate: Required typed signals complete?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Missing evidence returns to its owning routine; absence is not treated as a clean finding.

## Artifacts and stored state

- Draft synthesis
- Human decision

## Explicit exclusions

- Exports are inactive; the asynchronous report path is untested; final approval remains human.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: Bounded specialist work fans out into typed evidence signals and only reconverges for synthesis when the required set exists.
- Primary reading direction: left to right
- Topology: fanout
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: 11 redacted workflow JSON exports, stage_gate.py, RA code → signal mapping
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `evidence/diagrams/assessment-automation-workflow-diagram.excalidraw`
- PNG: `evidence/diagrams/assessment-automation-workflow-diagram.png`
