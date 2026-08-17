# Workflow specification — orchestrate-decision-council

## Operating boundary

The user or named accountable owner remains judge; no external action follows without separate authorization.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Decision question; Success, failure + constraints | README, instructions, fixtures | R | Entry / convergence |
| E2 | Transformations: Build structured brief → Select minimum seat set → Domain seat → Downside / control seat → Bias-reduction seat | Scripts, workflow JSON, or SKILL procedure | R | fanout |
| E3 | Gate: Evidence + dissent preserved? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Decision-shaped synthesis; Evidence that could change view | README and output contracts | R | Handoff / end |
| E5 | The user or named accountable owner remains judge; no external action follows without separate authorization. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Decision question
- Success, failure + constraints

## Ordered transformations

1. Build structured brief
2. Select minimum seat set
3. Domain seat
4. Downside / control seat
5. Bias-reduction seat

## Decisions and outcomes

- Gate: Evidence + dissent preserved?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Return weak assumptions to cross-examination; never invent consensus or source support.

## Artifacts and stored state

- Decision-shaped synthesis
- Evidence that could change view

## Explicit exclusions

- The user or named accountable owner remains judge; no external action follows without separate authorization.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: A common decision brief fans out to non-overlapping independent seats, then reconverges through explicit cross-examination without erasing dissent.
- Primary reading direction: left to right
- Topology: fanout
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: build_decision_brief.py, select_seats.py, output-shapes.md
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `references/diagrams/orchestrate-decision-council-skill-diagram.excalidraw`
- PNG: `references/diagrams/orchestrate-decision-council-skill-diagram.png`
