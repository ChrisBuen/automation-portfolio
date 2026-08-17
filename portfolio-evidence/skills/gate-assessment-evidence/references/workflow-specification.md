# Workflow specification — gate-assessment-evidence

## Operating boundary

Approve, decline, and equivalent accountable decisions remain with an identified human reviewer.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Assessment case JSON; Evidence inventory | README, instructions, fixtures | R | Entry / convergence |
| E2 | Transformations: Inventory → Not ready → Ready for research → Routines accounted → Ready for human review → Concrete request list → Outstanding-items register | Scripts, workflow JSON, or SKILL procedure | R | state |
| E3 | Gate: Required evidence complete? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Readiness state; Human decision required | README and output contracts | R | Handoff / end |
| E5 | Approve, decline, and equivalent accountable decisions remain with an identified human reviewer. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Assessment case JSON
- Evidence inventory

## Ordered transformations

1. Inventory
2. Not ready
3. Ready for research
4. Routines accounted
5. Ready for human review
6. Concrete request list
7. Outstanding-items register

## Decisions and outcomes

- Gate: Required evidence complete?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Contradictions and missing verification remain outstanding; they never convert to a clean finding.

## Artifacts and stored state

- Readiness state
- Human decision required

## Explicit exclusions

- Approve, decline, and equivalent accountable decisions remain with an identified human reviewer.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: A case advances from inventory to bounded research to human review only when required evidence and routine outputs are accounted for.
- Primary reading direction: left to right
- Topology: state
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: check_readiness.py, gate-model.md, typed routine states
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `references/diagrams/gate-assessment-evidence-skill-diagram.excalidraw`
- PNG: `references/diagrams/gate-assessment-evidence-skill-diagram.png`
