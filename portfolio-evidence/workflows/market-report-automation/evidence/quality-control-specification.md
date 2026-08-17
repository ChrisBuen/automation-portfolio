# Quality decision specification — weekly and monthly market intelligence

## Shared intake decisions

| Gate | Pass condition | Failure or uncertainty route | Evidence created |
| --- | --- | --- | --- |
| Dated workspace | Report date, cadence, timezone, and source cutoff are explicit | Stop and define the measurement boundary | Run brief and dated source workspace |
| Collection integrity | Raw market, ETF, event, technical, headline, and visual-source inputs are retained with dates | Re-run collector or disclose unavailable input | Raw responses and source manifest |
| Data quality | Incomplete candles are labelled; ETF revisions are deduplicated; settlement lag is disclosed; countdowns are not treated as exact unlock dates | Wait, refresh, narrow, or disclose | Normalized tables and caveats |
| Source quality | Blacklisted sources are removed and material claims use attributable evidence | Replace source or remove claim | Source ledger |

## Weekly branch

| Gate | Pass condition | Failure or uncertainty route | Evidence created |
| --- | --- | --- | --- |
| Weekly coverage | Seven-day range, latest available market session, headlines, ETF flows, and events align | Refresh the missing lane | Weekly evidence pack |
| Editorial selection | Two deep dives earn space through relevance, persistence, and evidence quality | Replace weak/decorative topic | Ranked topic set |
| Chart/source mapping | BTC, ETH, ETF, and deep-dive visuals match the claims and have source URLs | Rebuild or replace the visual | Image/source manifest |
| Weekly narrative | Facts, analysis, synthesis, uncertainty, and linked catalysts reconcile | Rewrite from evidence | Linked Markdown draft |
| Document release | Required sections and images exist; no blacklisted link, clipped figure, broken heading, empty page, or mismatched source line remains | Repair source, draft, chart, or template and rerender | Reviewed weekly DOCX and page set |

## Monthly branch

| Gate | Pass condition | Failure or uncertainty route | Evidence created |
| --- | --- | --- | --- |
| Cutoff-gap audit | Every day after the last weekly cutoff through final calendar-day close is researched | Research the uncovered remainder | Gap log and completed monthly brief |
| Boundary reconciliation | BTC/ETH and cross-asset returns use one provider and disclosed month-end convention | Rebuild the performance dataset | Reconciled performance table |
| Narrative graph | Thesis connects beginning, middle, and end through causes and consequences; it cannot be rearranged as four weeklies | Rebuild the thesis/map | Narrative map and falsifiable thesis |
| Evidence ledger | Claims, dates, caveats, and visual provenance are complete | Research, qualify, or remove | Claim/source/visual ledger |
| Visual hierarchy | Source-native evidence is used before reconstructed or explanatory visuals; every chart proves the section’s claim | Replace synthetic dashboard, cover, or decorative image | Visual plan and provenance record |
| Draft assessment | Completeness, evidence, data integrity, narrative, and reader utility clear the editorial bar; blockers score as blockers | Revise content and data, not merely layout | Scored assessment and work order |
| Final release | Text, performance data, charts, appendix, DOCX structure, and every rendered page reconcile | Rebuild and re-inspect the complete report | Monthly DOCX/PDF, methods/evidence appendix, release record |

## Controls that demonstrate quality

- Weekly and monthly reports share evidence infrastructure but have different editorial decision trees.
- The monthly report audits the gap after the final weekly cutoff and cannot be assembled by concatenating weekly recaps.
- Market periods and timezones are treated as data contracts.
- Source-native charts outrank branded summaries when the original figure carries stronger evidence.
- Draft scoring identifies publication blockers; design polish cannot compensate for missing month-end data.
- Any source, chart, or narrative repair returns through document assembly and full page review.

## Diagram brief

Show one shared evidence-control layer splitting into a compact weekly release tree and a deeper monthly interpretation tree. Give the monthly cutoff-gap, boundary, narrative-graph, evidence-ledger, and source-native-visual gates enough space to be understood at first glance.

