# Long-form research-report production model

## Purpose and operating boundary

This workflow represents a repeatable research-production system for long-form, investor-facing digital-asset reports. It is designed to bring a reader up to date on an asset or network through history, mechanism, current data, competitive position, and risks. The public package exposes the reusable control scripts; private report content, paid datasets, and final commercial deliverables remain outside it.

## 1. Start from a decision brief

Every report starts by defining the subject, report date, intended audience, decision it should support, report type, scope limits, and key questions. Common report formats include a project deep dive, state-of-network update, thematic report, briefing note, market review, and due-diligence pack. This prevents a generic outline from deciding what evidence matters.

## 2. Build a reusable context pack

Before prose is drafted, the workspace captures official documentation, protocol and product history, governance and contributor context, token economics and unlocks, adoption metrics, competitive set, risks, controversies, regulatory context, source URLs, dates, and note snippets. The aim is not merely citation collection: it is a reusable evidence base that another researcher can refresh without beginning from memory.

The source log records locator, publisher, publication/capture date, source type, and relevance. The evidence matrix maps claims to their supporting evidence, caveats, exhibit requirements, and status. An unsupported claim returns to the matrix rather than being made more confidently in prose.

## 3. Create the report and exhibit plan together

The build selects a detailed report architecture: executive summary; overview and history; technology; use cases; tokenomics; performance and adoption metrics; competition; risks; sentiment; conclusion; and appendices, with section ordering adjusted to the actual investment question.

At the same time, a chart plan specifies what each exhibit must prove, its source, timeframe, units, calculation method, location in the report, and source line. Charts are not decorations. A proposed chart is removed if it cannot make one defensible point, and a table is preferred where it is clearer.

## 4. Cache data and generate a report-specific chart set

The report build keeps source manifests and cached market/protocol data alongside the report work. Data is collected before chart rendering, so a renderer does not silently mix live values from different cut-offs. In the source workspace, asset-specific builders generated a standard branded set of 18 charts for each major report family, alongside asset-specific market-snapshot fetchers, chart manifests, draft skeletons, DOCX builders, and publication-PDF helpers.

Chart construction follows a shared design system: deep-navy primary subject, cyan comparison, magenta event accents, restrained gridlines, a branded header treatment, legible units and timeframes, source lines, and consistent figure widths in the final document. Each chart is visually reviewed before assembly for clipping, overlapping labels, false visual implications, and annotations unsupported by the underlying series.

## 5. Draft from evidence to interpretation

The draft uses a deliberate section rhythm: establish the concrete fact or mechanism, present evidence, explain the implication, then state the bounded interpretation. It separates facts, interpretations, and open questions without turning the document into a visible worksheet. A final report is not treated as complete because it contains an outline or a full chart folder; it must explain the system, current position, strengths, risks, and invalidation conditions in enough depth to stand on its own.

## 6. Assemble the document and verify the release

The Markdown source, exhibit folder, and document-format reference feed the DOCX builder. The source production standard used 10-point body/caption/source text and consistent 6.5-inch visual widths. The output is then converted or rendered for visual QA. Review checks report date, structure, source visibility, chart/data alignment, table legibility, visual placement, page flow, and package health. Any chart revision triggers a document rebuild so figures do not fall out of sync with the final text.

## Artifacts retained for updateability

```text
report workspace/
  research brief
  source log and source manifest
  evidence matrix
  context/source captures
  outline and Markdown draft
  cached data
  chart manifest and chart images
  DOCX/PDF output
  QA notes and release record
```

This gives a future update a traceable starting point: identify the changed sources, refresh the data, re-evaluate the claims, rebuild the chart set, and regenerate the document rather than recreating a report from an opaque final Word file.

## What this workflow does not claim

The scripts do not automatically discover truth, validate current external facts, grant publication rights, or make an investment recommendation. Current research, citation review, editorial judgement, and final approval remain required.
