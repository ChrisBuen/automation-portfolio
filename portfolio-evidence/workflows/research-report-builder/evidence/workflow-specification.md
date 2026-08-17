# Workflow specification — research-report-builder

## Operating boundary

The scripts create research controls; they do not perform or verify the underlying research.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: Decision + audience + scope | README, instructions, fixtures | R | Entry / convergence |
| E2 | Transformations: Choose report archetype → Stage clean workspace → Create source log → Create evidence matrix → Research in separate passes → Draft from claim evidence | Scripts, workflow JSON, or SKILL procedure | R | linear |
| E3 | Gate: Cutoff, citations + exhibits agree? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Report skeleton; Reviewable report package | README and output contracts | R | Handoff / end |
| E5 | The scripts create research controls; they do not perform or verify the underlying research. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- Decision + audience + scope

## Ordered transformations

1. Choose report archetype
2. Stage clean workspace
3. Create source log
4. Create evidence matrix
5. Research in separate passes
6. Draft from claim evidence

## Decisions and outcomes

- Gate: Cutoff, citations + exhibits agree?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Unsupported claims return to the evidence matrix; a chart or confident conclusion is never forced.

## Artifacts and stored state

- Report skeleton
- Reviewable report package

## Explicit exclusions

- The scripts create research controls; they do not perform or verify the underlying research.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: A decision-specific brief, source log, and claim matrix precede drafting so report structure cannot substitute for evidence.
- Primary reading direction: left to right
- Topology: linear
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: stage_research_workspace.py, create_evidence_matrix.py, 9 outline archetypes
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `evidence/diagrams/research-report-builder-workflow-diagram.excalidraw`
- PNG: `evidence/diagrams/research-report-builder-workflow-diagram.png`
