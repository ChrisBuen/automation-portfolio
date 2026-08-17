# Workflow specification — governed-contract-evaluation

## Operating boundary

Passing permits review only; operational reliance stays blocked pending separately governed live-shadow evidence.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Frozen evaluation set; Generator outputs; Withheld evaluator references | README, instructions, fixtures | R | Entry / convergence |
| E2 | Transformations: Blind replay → Score classification + retrieval → Check facts + provenance → Test leakage + separation → Validate hashes + rendering | Scripts, workflow JSON, or SKILL procedure | R | converge |
| E3 | Gate: All fixed release gates pass? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Evaluation metrics; Legal-owner review package | README and output contracts | R | Handoff / end |
| E5 | Passing permits review only; operational reliance stays blocked pending separately governed live-shadow evidence. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Frozen evaluation set
- Generator outputs
- Withheld evaluator references

## Ordered transformations

1. Blind replay
2. Score classification + retrieval
3. Check facts + provenance
4. Test leakage + separation
5. Validate hashes + rendering

## Decisions and outcomes

- Gate: All fixed release gates pass?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Repair the responsible generation layer and replay the frozen set; never expose private precedent to improve the score.

## Artifacts and stored state

- Evaluation metrics
- Legal-owner review package

## Explicit exclusions

- Passing permits review only; operational reliance stays blocked pending separately governed live-shadow evidence.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: Fixed blind cases, provenance, leakage controls, document separation, and rendered QA converge before a system may enter legal review.
- Primary reading direction: left to right
- Topology: converge
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: evaluation_metrics.py, evaluation-protocol.md, fixed-case contract
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `references/diagrams/governed-contract-evaluation-skill-diagram.excalidraw`
- PNG: `references/diagrams/governed-contract-evaluation-skill-diagram.png`
