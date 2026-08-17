# Weekly and monthly market-report production

## Why this is two workflows, not one

The weekly report gives a reader a high-signal account of the immediate period. The monthly report interprets the complete month: it reconciles the final days the weeklies did not cover, explains the causal sequence across the month, and identifies which developments are persistent versus temporary. The monthly report uses weekly outputs as evidence, never as copy-and-paste sections.

## Weekly crypto market recap

### 1. Create a dated evidence workspace

Each run starts in `NewReport/MM-DD-YYYY/` with separate `Input/`, `Images/`, `Output/`, and research/visual source folders. This creates a period-specific audit trail and prevents a later report from silently inheriting stale charts or facts.

### 2. Run and retain the collection pack

The weekly workflow captures and retains both readable extracts and raw data for:

| Evidence stream | Primary artifact | Purpose |
|---|---|---|
| Seven-day news capture | headline Markdown and raw JSON | Candidate stories and initial dates |
| Token unlocks | Markdown, raw JSON, and Big Unlocks visual | Calendar and supply events |
| BTC and ETH market data | market Markdown and raw API response | Price window, OHLC, return and market context |
| Technical analysis | asset notes plus BTC/ETH price-chart assets | Trend, indicators, support, resistance, invalidation |
| ETF data | ETF summary and raw flow response | Net flows, daily moves, and momentum |
| ETF chart generation | BTC and ETH ETF flow PNGs | A visual calculated from the retained flow set |

Credentials and paid-source access stay local; the report keeps the resulting evidence and source links, not secrets.

### 3. Reconcile and select before writing

The writer reads prior reports to preserve house structure and avoids a scrape-to-summary shortcut. Inputs are checked for week alignment, incomplete price periods, ETF latest date, unlock timing, and source quality. The team ranks deep-dive candidates, selects the two strongest current themes, and retains a source-native figure, chart, filing extract, or dashboard capture for each selected theme. A decorative hero image is rejected.

### 4. Build the report

The finished weekly report includes a seven-word title, opening synthesis, 6-8 highlights, 12-18 linked recap items, a six-paragraph BTC section, a structurally different six-paragraph ETH section, two sourced deep dives, and a dated calendar. The BTC and ETH notes combine the price window, technical structure, key levels, ETF conditions, and selected news drivers. They are written for a client-facing financial digest, not as a trading chat or a dump of raw indicators.

### 5. Assemble and inspect

Markdown is rendered through the report DOCX builder using the established template. The build inserts BTC/ETH price charts, BTC/ETH ETF charts, and two deep-dive visuals with source lines. Preflight checks verify the required evidence set and content structure; after DOCX build, the package is validated, converted/rendered for visual inspection, and checked page by page for clipping, bad links, missing figures, broken headings, empty pages, and mismatched source lines.

## Monthly crypto state-of-market report

### 1. Establish the complete-month evidence boundary

The monthly run begins by reading earlier monthly reports and the latest quality/postmortem records. It establishes the final calendar-day market cut-off and identifies the time between the last weekly report and month end. A month cannot be described from a partial final-day chart.

### 2. Build the research and narrative layer

The monthly workspace holds a `MonthlyBrief`, cached price/flow/liquidity/macro data, a narrative map, an evidence ledger, and a visual plan. A research pass examines the weekly archive and the uncovered period, then provides:

- net-new topics missing from the weeklies;
- a proposed dominant narrative and beginning-middle-end chronology;
- points of agreement, disagreement, and neglected risk;
- candidate metrics and source-native visuals;
- provisional figures requiring month-end reconciliation; and
- a ledger separating primary evidence from commentary.

The narrative is selected before sections and visuals are finalised. This prevents the document becoming a longer weekly recap.

### 3. Build data and editorial exhibits

Required monthly exhibits include full-month BTC and ETH price charts, BTC and ETH ETF-flow charts, a cross-asset performance visual, and a chronology where the causal sequence needs one. Market structure and thematic charts are chosen from the narrative, not filled from a fixed template. Cached data is used to build charts; the build step does not silently refetch live values. Source-native figures take priority over custom dashboard visuals where they carry the evidence more clearly.

### 4. Write the complete-month argument

The normal structure moves through opening synthesis, cross-asset performance, highlights, how the month unfolded, distinct BTC and ETH analyses, thematic deep dives, Macro Watch, Market Structure, Regulatory Developments, a calendar, next-month watchboard, conclusion, method notes, and visual-evidence index. The report connects beginning, middle, and end of the month, states the mechanism by which macro, liquidity, policy, or adoption affected crypto, and distinguishes an observed fact from an interpretation.

### 5. Quality gates

The monthly release gate requires reconciled final-month dates, source URLs and caveats for material claims, a complete performance table, current full-month charts, figures with legible labels and captured provenance, a research-led rather than weekly-concatenated narrative, DOCX validation, and a complete rendered-page review. If the chart or source does not support the claim, the section changes; the visual is never retained to fill a page.

## Controls that apply to both cadences

- Store raw API responses and date-stamped readable extracts together.
- Record the reporting window, fetch time, units, asset, source URL, incomplete-period state, and capture limitation.
- Reconcile price, flow, and news cut-offs before drafting.
- Keep every chart tied to the dataset named in its source line.
- Use editorial review for claim selection, interpretation, and writing quality.
- Treat document/package validation as necessary but insufficient: visual inspection finds issues a parser cannot.
- Never include credentials, paid-source output, private commentary, or client distribution details in a public package.
