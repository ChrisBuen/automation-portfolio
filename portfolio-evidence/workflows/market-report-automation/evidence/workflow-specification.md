# Workflow specification — market-report-automation

## Operating boundary

The public chart uses synthetic data; credentials, paid-source output, commentary, and private templates are excluded.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs: News + event calendar; Raw candles + structured flows; Licensed analysis adapter | README, instructions, fixtures | R | Entry / convergence |
| E2 | Transformations: Store raw responses → Normalize dates + indicators → Generate data-linked charts → Draft dated Markdown → Assemble reviewed DOCX | Scripts, workflow JSON, or SKILL procedure | R | converge |
| E3 | Gate: Sources, charts + pages reconcile? | Instructions and stop conditions | D | Decision / control |
| E4 | Outputs: Source manifest; Rendered report package | README and output contracts | R | Handoff / end |
| E5 | The public chart uses synthetic data; credentials, paid-source output, commentary, and private templates are excluded. | Source map and stated exclusions | D | Boundary band |

## Inputs and contracts

- News + event calendar
- Raw candles + structured flows
- Licensed analysis adapter

## Ordered transformations

1. Store raw responses
2. Normalize dates + indicators
3. Generate data-linked charts
4. Draft dated Markdown
5. Assemble reviewed DOCX

## Decisions and outcomes

- Gate: Sources, charts + pages reconcile?
- Pass: continue to the recorded output or handoff.
- Fail or uncertainty: Repair the source or chart mapping; never let a decorative or mismatched visual pass.

## Artifacts and stored state

- Source manifest
- Rendered report package

## Explicit exclusions

- The public chart uses synthetic data; credentials, paid-source output, commentary, and private templates are excluded.
- No trigger, datastore, retry service, credential, or approval role is implied beyond the evidence named above.

## Chart brief

- Audience: portfolio reviewers and implementers
- One-sentence visual argument: Dated raw market evidence becomes reproducible charts and a governed report only when every source, period, and release check reconciles.
- Primary reading direction: left to right
- Topology: converge
- Correction convention: one lower correction / handoff rule
- Evidence artifacts: fetch_market_analysis.py, generate_market_chart.py, chart rendering tests
- Publication width: GitHub content column, with full-size PNG available

## Publication artifacts

- Editable source: `evidence/diagrams/market-report-automation-workflow-diagram.excalidraw`
- PNG: `evidence/diagrams/market-report-automation-workflow-diagram.png`
