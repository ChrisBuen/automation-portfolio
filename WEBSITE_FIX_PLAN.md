# Website Critique and Fix Plan

## Status

**Approved and implemented on 2026-08-16. Retained as the critique, rationale, and acceptance record for the narrative redesign.**

This document records what is wrong with the current portfolio, what the workflow charts actually communicate, and what the next website pass must change. It is intended to become the review surface for the next goal prompt.

Date of audit: 2026-08-16

## User direction captured

The next version must:

1. Treat the generated workflow charts as the authoritative visual model.
2. Explain each workflow as a client problem-solving story.
3. Answer, in order: What is the problem? Why does it matter? How does the workflow work? What did Chris build? Where does human control remain? What solution does the client receive?
4. Use full sentences and transitions instead of rushing through labels and fragments.
5. Communicate a transformation rather than present an information dump.
6. Feel finished, authored, and visually substantial rather than technically complete but emotionally flat.

## Executive diagnosis

The current website is technically sound but strategically unfinished.

It has strong source material, valid evidence boundaries, accessible interactions, and a credible visual foundation. The failure is that it compresses complex, distinct workflows into similar six-box summaries. Those summaries name components, but they do not show cause and effect, preserve the charts' actual topology, or guide a visitor through the value of the work.

The page currently answers, "What concepts appear in this system?" It does not answer, "What was going wrong for the client, how did Chris reason through it, how does the system change the work, and why should someone hire him to solve a similar problem?"

## What is already working

- The hero has a clear high-level promise: fragmented work becomes controlled work.
- The dark visual system is coherent and readable.
- Human review and public-safety boundaries are treated honestly.
- The site works with keyboard, touch, reduced motion, and JavaScript disabled.
- The source diagrams and downloadable artifacts provide a strong evidence base.
- No fake metrics, testimonials, clients, or outcomes were invented.

These strengths should be retained. They are not enough to make the portfolio persuasive by themselves.

## Independent audit summary

### Design health score

| # | Heuristic | Score | Main issue |
| --- | --- | ---: | --- |
| 1 | Visibility of system status | 3/4 | State labels are clear, but the long page has no current-chapter cue. |
| 2 | Match with the real world | 3/4 | The evidence metaphor works, but specialist language is not translated for clients. |
| 3 | User control and freedom | 3/4 | Native scroll and disclosures work; comparison and return paths are limited. |
| 4 | Consistency and standards | 4/4 | The visual and interaction system is coherent. It is also too repetitive. |
| 5 | Error prevention | 3/4 | Invalid external links are hidden rather than rendered as dead actions. |
| 6 | Recognition rather than recall | 3/4 | Labels are visible, but the reader must learn the color and topology grammar. |
| 7 | Flexibility and efficiency | 2/4 | There is no case index, comparison route, or proof-first path. |
| 8 | Aesthetic and minimalist design | 3/4 | Clean foundation; repetition, tiny metadata, and category tropes weaken it. |
| 9 | Error recovery | 2/4 | Unconfigured evidence becomes inert text rather than a useful next step. |
| 10 | Help and documentation | 2/4 | Evidence exists, but there is no plain-language inspection guide or glossary. |
| **Total** |  | **28/40** | **Good technical foundation; significant communication and storytelling work remains.** |

### Cognitive load

The independent review recorded **2 failures out of 8**, which is moderate:

1. On mobile, the visitor reads four prose blocks before reaching the main visual.
2. Intervention copy is repeated instead of using the second appearance to advance understanding.

The bigger problem is not the number of choices. It is the effort required to translate jargon, infer connector meaning, and remember what changed between nearly identical case layouts.

### Deterministic interface scan

The source scan reported 54 findings: 3 warnings and 51 advisories. The browser overlay reported 229 repeated anti-pattern groups. Raw totals are inflated by repeated components and 85 findings inside closed disclosures, so they must not be treated as 229 independent design problems.

Actionable roots:

- 181 repeated undersized-label detections point to functional metadata rendered around 9 to 11 pixels.
- 21 all-caps detections include a smaller valid subset of long operational strings that are harder to read than short labels.
- 10 line-length detections reinforce the need to control long proof and narrative passages.
- One document-row hover animates `padding-inline`, which causes layout work.
- The fixed two-axis background grid, large hero-frame shadow, and teal signal glow reinforce the expected AI-dashboard aesthetic.
- The font-size and color ramp uses more one-off values than the documented design system defines.

Mostly intentional or false-positive findings:

- Signal teal on graphite is usually meaningful state color, not arbitrary AI color.
- The large hero heading and tight display tracking follow the approved first-pass direction.
- Most all-caps strings are short operational labels rather than body copy.
- Instrument Sans Variable is the documented Instrument Sans family, not a mismatched font import.

## Priority issue register

### Workflow accuracy and meaning

#### WF-01 | P0 | The website scenes do not preserve the charts' actual topology

Each source chart has a specific visual argument. Some workflows fan out and reconverge. Some are deterministic assembly lines. Some have two distinct production lanes. The website reduces all five to similarly weighted rectangular nodes.

Why this matters: topology is not decoration. It explains how the automation works. When the topology changes, the meaning changes.

Required correction: rebuild every scene from the chart's real inputs, transformations, branches, gates, correction paths, outputs, and human decisions.

#### WF-02 | P1 | Gates are shown as if they are failed states

Red dashed boxes such as "Completeness gate," "Package + page checks," and "Editorial + SEO checks" sit directly in the normal path. A gate is not automatically a failure. The chart distinguishes the decision, its pass route, and its fail or correction route.

Why this matters: the current scene implies that failure is a required processing stage and hides the difference between checking and failing.

Required correction: show the gate as a decision point. Show pass and fail as separate, labelled outcomes. Put correction below the normal path.

#### WF-03 | P1 | The connectors do not explain the flow

Many lines are short ticks between boxes rather than continuous routes. On several scenes, the visible structure does not make it clear what connects to what. Branching and reconvergence must be inferred from position.

Required correction: use continuous, directional connectors with labelled branch outcomes. The structure should remain understandable even if most labels are removed.

#### WF-04 | P1 | The animated packet is decorative rather than semantic

The packet travels horizontally across the scene regardless of the workflow's actual branches, gates, or correction path. Nodes also reveal in DOM order rather than in response to the story being told beside them.

Required correction: animation must demonstrate a real state change. A dossier should split into research lanes. Evidence should reconverge at a gate. A failed check should visibly return to its responsible source layer. A weekly and monthly report should remain on different routes.

#### WF-05 | P1 | The strongest, accurate diagrams are hidden as secondary evidence

The generated charts are inside a collapsed "Inspect the case record" disclosure after the simplified scene. The primary visual is weaker and sometimes less accurate than the hidden artifact.

Required correction: use the chart model as the primary scene foundation. The full chart can remain downloadable, but its logic cannot be hidden from the main story.

### Narrative and copy

#### NAR-01 | P1 | The cases transmit information but do not tell a transformation story

Every case is divided into "Operational problem," "System intervention," "Produced," and "Human-control boundary." These are correct categories, but they read like a database record. They do not create tension, progression, or payoff.

Required correction: write each case as a sequence:

1. The situation the client faced.
2. What kept breaking or consuming time.
3. The key systems insight.
4. How Chris designed the workflow.
5. What happens as work moves through it.
6. Where the system deliberately stops for a person.
7. What becomes easier, safer, faster, or more repeatable for the client.

#### NAR-02 | P1 | Fragments and technical shorthand replace communication

Labels such as "03A / lane," "source truth," "fan-in," "MCP," "n8n," "reconcile," and "retained" are useful implementation annotations. They are not a client-facing explanation.

Required correction: keep concise labels inside the visual, but pair them with full-sentence narration that explains what is happening and why. Define specialist terminology the first time it appears.

#### NAR-03 | P1 | The copy emphasizes controls more than client value

The website repeatedly explains what the system does not do and what remains human-owned. That honesty is valuable, but it dominates the emotional message. The client benefit is often described as another artifact, such as a "reviewable case state" or "checked content package."

Required correction: translate the artifact into an operational benefit without inventing metrics. Examples include fewer hidden gaps, a faster path to review, repeatable document production, traceable claims, safer publishing, and reports that can be refreshed without reconstructing the evidence.

#### NAR-04 | P2 | Copy repeats instead of advancing

Each case's intervention paragraph is rendered twice: once in the reading column and again above the scene. Across five cases, that creates five exact duplicate passages. The same four information labels also repeat mechanically.

Required correction: every paragraph must move the story forward. The scene caption should tell the visitor what to watch for, not repeat the intervention.

#### NAR-05 | P1 | Chris's role is not concrete enough

The copy says "designed" or "built," but rarely explains the decisive choices Chris made, what he connected, what he made deterministic, what he refused to automate, or how he solved the operational constraint.

Required correction: make authorship visible through decisions and tradeoffs. The visitor should understand Chris's problem-solving method, not just the system's nouns.

#### NAR-06 | P1 | There are no transitions between facts or cases

The page jumps from one labelled fact to the next, then from one project to another. It does not explain why the next fact follows or how the next case expands the portfolio thesis.

Required correction: add sentence-level transitions and chapter bridges. Each case should have a beginning, escalation, controlled resolution, and handoff into the next capability.

### Visual storytelling and art direction

#### VIS-01 | P1 | Five different systems look like one reused component

Every case uses the same dark frame, thin border, teal nodes, amber review node, red dashed node, and small uppercase labels. The advice-document paper stack is the only strong project-specific material.

Required correction: give every case a distinct working surface while retaining one portfolio identity:

- Onboarding: applicant dossier, review stamps, evidence trays, specialist lanes, completeness lock, decision record.
- Advice documents: structured fields, source hierarchy, Markdown artifacts, preserved Word template, page inspection, adviser handoff.
- Research reports: decision brief, source log, claim matrix, cached evidence, chart manifest, report pages, release gate.
- Content and SEO: canonical article folder, citation layer, visual job, metadata and HTML checks, WordPress draft state, persistence check.
- Market intelligence: dated evidence desk, seven-day lane, month-end lane, separate editorial questions, distinct report outputs.

#### VIS-02 | P1 | The website barely shows the work products

The portfolio is built from rectangles rather than dossiers, document pages, charts, article packages, manifests, review records, or report outputs. The visitor sees a diagram of work but not the work becoming tangible.

Required correction: introduce public-safe, provenance-controlled artifact views and recreations. Use real or accurately reconstructed interfaces and documents where rights allow. Do not expose private source material.

#### VIS-03 | P2 | The aesthetic is category-predictable

The black grid, teal signal color, terminal labels, outlined boxes, Instrument Sans, and IBM Plex Mono create a familiar "AI automation dashboard" look. It is clean, but it does not yet feel uniquely ChrisBuen.

Required correction: keep the evidence-room concept, but make it physical and specific. Use dossier tabs, page edges, stamps, revision marks, source ledgers, dated cut-offs, and controlled annotations. Reduce generic grid and terminal styling.

#### VIS-04 | P1 | The visual stages do not have enough weight

At desktop size, the workflow stage is a 470-pixel panel next to a dense reading column. Large areas of empty dark space remain after the stage finishes. The visual should be the storytelling surface, but it reads as an illustration beside the copy.

Required correction: let the scene dominate the viewport during the explanation. Synchronize each narrative beat to a meaningful visual state, then release the scroll into proof and outcomes.

#### VIS-05 | P2 | The page reaches its emotional peak too early

The hero is the strongest moment. The operating model and five repeated cases gradually lose energy. The ending is a document list and a footer without a configured relationship action.

Required correction: choose a flagship case as the main cinematic peak, vary the rhythm of later cases, and finish with a clear statement of capability plus a real next step.

### Page architecture and pacing

#### PAGE-01 | P1 | The repeated case template creates monotony

Five cases each occupy roughly 1,600 pixels and repeat the same title, status, four text blocks, small scene, and disclosure pattern. The page is comprehensive but not paced.

Required correction: vary chapter structure based on the story. Not every project needs equal length or identical content order.

#### PAGE-02 | P1 | The first scan path is too abstract

The hero, operating model, and systems introduction all speak in broad concepts before the visitor sees a concrete client situation.

Required correction: reach a recognizable problem and a flagship proof point earlier. Use the operating model after the visitor has seen it solve something, or compress it into the hero transition.

#### PAGE-03 | P1 | Mobile destroys topology

At 820 pixels and below, every scene becomes one vertical list. Fan-out, parallel lanes, convergence, and cadence splits disappear.

Required correction: design mobile-specific grouped lanes, branch brackets, mini maps, or horizontal sub-scenes. Do not treat a linear stack as an acceptable substitute for a branched workflow.

#### PAGE-04 | P2 | The page offers no fast comparison route

A recruiter who understands the first case must still scroll through every full case to compare projects. There is no project index, sticky chapter indicator, or concise capability summary tied to the cases.

Required correction: add a lightweight case navigator and a clear one-line value proposition for each project.

#### PAGE-05 | P1 | The ending does not convert interest into a next step

When GitHub and booking URLs are absent, evidence rows become inert "source recorded" text and the footer has no relationship action.

Required correction: a real repository inspection path and an appropriate contact path are release requirements. Never add fake or placeholder URLs.

### Information and evidence quality

#### INFO-01 | P1 | "Human-control boundary" is sometimes the wrong label

Some blocks describe publication exclusions and public-data limits rather than a human decision boundary. This mixes governance categories and makes the cases harder to understand.

Required correction: separate "Where a person decides" from "What is excluded from the public portfolio."

#### INFO-02 | P2 | Status language is accurate but not useful enough

Phrases such as "mixed workflow and manual stages" or "public operating extract with executable tooling" require repository knowledge to interpret.

Required correction: explain status in plain language: what ran, what was documented, what remained manual, and what had not been validated at the recorded cut-off.

#### INFO-03 | P1 | Evidence is present but not inspectable in the current configuration

Without a configured GitHub URL, source records are visible but not clickable. Raw diagram files and provenance JSON also lack a visitor-friendly inspection context.

Required correction: design a proof drawer or evidence page that explains what each artifact proves and provides a return path.

#### INFO-04 | P1 | Resolved — the onboarding workflow count is reconciled

The curated public package contains 11 `*.workflow.json` files. The workflow specification now states 11 redacted exports, and the website uses that count while preserving the inactive and untested boundaries.

### Typography, readability, and implementation polish

#### UI-01 | P1 | Functional metadata is too small

Many labels, statuses, evidence annotations, and diagram captions render between roughly 9 and 11 pixels on desktop. The detector found this pattern 181 times because it is embedded in repeated components.

Required correction: establish a readable label floor and a smaller, deliberate type ramp. Operational precision should not require squinting.

#### UI-02 | P2 | Some all-caps strings are too long

Uppercase works for short state labels. It becomes tiring when applied to scroll instructions, figure captions, availability text, and source-record messages.

Required correction: reserve uppercase mono styling for short identifiers. Use sentence case for anything the visitor must read as language.

#### UI-03 | P2 | One hover effect animates layout

The document rows transition horizontal padding on hover. That produces layout work instead of a compositor-only change.

Required correction: replace the padding animation with transform, background, border, or a pseudo-element reveal.

#### UI-04 | P2 | The implementation drifts beyond the documented type and color ramp

The scan found 41 font-size advisories and eight color advisories. Not every value is visually wrong, but the number of one-off values makes the interface harder to refine consistently.

Required correction: define the complete responsive type, metadata, neutral, and state-color ramps before the redesign.

## Per-workflow correction map

| Case | What the authoritative chart says | What the current website loses or changes | Required story emphasis |
| --- | --- | --- | --- |
| Onboarding | Intake moves through three early human reviews and a case-specific evidence plan. Work fans out into document collection, specialist research, and manual evidence. Required signals reconverge exactly once. Failure returns the exact gap. Pass produces a DD report, named human decision, and later onboarding steps. | Omits the case-specific plan, exactly-once control, distinct pass/fail routes, DD report, and downstream engagement/onboarding. Treats the completeness gate as a red failure box. | A complex applicant cannot be judged from one form. Show how the plan changes by applicant, how parallel work remains accountable, and how the decision maker receives a complete case rather than scattered findings. |
| Advice documents | Three governed inputs converge into deterministic source assembly. The system produces three source-review artifacts, passes a source gate, direct-fills a preserved Word template, runs release controls, and hands the document to an adviser. Defects return to the highest responsible source layer. | Collapses the governed inputs, internal assembly, three-artifact fan-out, source gate, template input, and layered release controls into a short line of boxes. The correction route is only a note. | A document generator can create a file without creating a safe deliverable. Show how source truth, template preservation, QA, and adviser control turn reviewed inputs into a dependable client document. |
| Research reports | A linear evidence-first production path begins with decision, audience, and scope. It creates architecture, a clean workspace, source log, context pack, claim matrix, chart manifest, cached research, report and chart set, then a final agreement gate. Failure stops and records the defect. | Invents an early two-track topology, puts "narrow weak claims" inline as a normal step, and removes much of the staged research scaffold and final pass/fail decision. | A polished report can still be weak if its claims and exhibits do not reconcile. Show how the workflow prevents structure or visual polish from substituting for evidence. |
| Content and SEO | A canonical article package advances through research, editorial review, visual planning and rejection, metadata and HTML checks, WordPress draft creation, persistence reconciliation, and a final state gate. Failed layers hold posted status. | Rearranges the stages into a loose parallel grid, hides the sequential CMS checks, and stops at a generic verified draft. The responsible-layer return route is not visible. | Publishing is a controlled state transition, not a WordPress click. Show how the canonical folder keeps evidence, links, visuals, metadata, HTML, and CMS state in agreement. |
| Market intelligence | One dated evidence workspace splits into two genuinely different production lanes. The weekly lane asks what changed now. The monthly lane asks what the full month meant. Each lane has its own research, editorial, visual, QA, and output contract. | Collapses each lane to one box, reconverges them into one generic QA step, and produces one generic report output. This removes the central purpose of the chart. | The same evidence must serve two different client questions without becoming two inconsistent data systems. Show shared evidence first, then preserve the distinct weekly and monthly jobs through separate outputs. |

## Required narrative model for every case

Each case should be written as a guided story, not four labelled fields.

### Beat 1: The client situation

Open with a specific, recognizable operating situation. Name who is trying to do what and what makes the work difficult.

### Beat 2: The failure of the old approach

Explain what becomes slow, inconsistent, risky, opaque, or impossible to update. This creates the reason the workflow exists.

### Beat 3: The systems insight

State the key idea that changed the solution. Examples: parallel research must reconverge into typed signals; generated documents must be repaired at the source layer; weekly and monthly reports can share evidence without sharing the same editorial contract.

### Beat 4: How Chris designed the workflow

Use first-person authorship and full sentences. Explain the important design choices and boundaries.

### Beat 5: Watch the system work

Synchronize narration with the visual. Each scroll beat should change one meaningful thing: intake, route, transform, reconcile, stop, decide, or release.

### Beat 6: The controlled decision

Show where automation stops, who decides, what evidence they receive, and what happens when the case is incomplete.

### Beat 7: The client result

End with the operational transformation in plain language. Then provide evidence for the visitor who wants to verify it.

## Sentence and copy rules

- Use full sentences for narrative copy.
- Use fragments only for compact interface labels inside diagrams.
- Every paragraph must answer a new question or move the story forward.
- Do not repeat the intervention in the scene caption.
- Introduce acronyms only after the plain-language concept.
- Prefer "why this step exists" over lists of tools.
- Translate technical output into client value without inventing numbers.
- Separate human decisions, technical limitations, and publication exclusions.
- Use transitions that explain cause and effect: "Because," "That means," "Only when," "If the check fails," and "The result is."

## Illustrative narrative direction

This is not final copy. It demonstrates the intended communication style.

> A new onboarding case rarely arrives as one clean package. Documents come from different people, specialist checks finish at different times, and some decisions cannot be delegated to software. If those streams are summarized too early, missing evidence can look like a clean result.
>
> I designed the workflow around that failure. After the early human review, the system creates an evidence plan for the specific applicant. Document checks, specialist research, and manual milestones can then move in parallel, but they cannot silently bypass one another. Each lane must return the typed signal the case requires.
>
> Only when the complete signal set reconverges does the workflow prepare the due-diligence report for the named decision maker. If anything is missing or contradictory, the case does not produce false confidence. It returns the exact gap to the person or routine that owns it.
>
> The client receives a faster, more traceable path to a human decision without turning the decision itself into an opaque automated score.

## Proposed page-level story

This sequence is a recommendation for approval, not an implemented decision.

1. **Hero:** State the kind of operational problems Chris solves and show one fragmented case beginning to organize itself.
2. **Flagship case:** Tell one complete, high-impact story early. Onboarding is the strongest candidate because its fan-out, evidence gate, and human decision express the portfolio thesis.
3. **The reusable operating idea:** Extract the pattern only after the visitor has watched it solve a real problem.
4. **Four supporting chapters:** Give each a different visual world and a shorter but complete problem-to-result arc.
5. **Reusable methods:** Present skills as the methods Chris can apply to a new client's work, not only as repository packages.
6. **How Chris works:** Explain discovery, evidence boundaries, implementation, validation, and handoff.
7. **Proof and next step:** Provide source-backed evidence, the casebook, repository inspection, and a real contact action.

## Recommended implementation order after approval

1. Correct the semantic model for all five website scenes.
2. Approve one narrative brief per case before writing final copy.
3. Choose the flagship case and page rhythm.
4. Rewrite the case copy in complete narrative sentences.
5. Storyboard each visual state against the copy.
6. Add public-safe artifact views and case-specific materials.
7. Rebuild desktop motion as cause-and-effect storytelling.
8. Design separate mobile topology rather than collapsing to a list.
9. Configure real proof and contact destinations.
10. Run a final accuracy, accessibility, motion, and publication-safety review.

## Acceptance criteria for the next version

- A first-time visitor can explain the problem, mechanism, human boundary, and client result of each case without opening the repository.
- Each main scene matches the generated chart's topology.
- Gates visibly separate pass, fail, and correction routes.
- Motion demonstrates workflow behavior rather than moving decorative packets.
- Every case contains a clear problem-to-solution narrative with full sentences and transitions.
- No intervention paragraph is repeated.
- Client value is clear without unsupported metrics.
- The five cases are visually distinguishable at a glance.
- Mobile retains branches, lanes, and convergence meaning.
- Evidence is inspectable and explains what each artifact proves.
- The ending provides a real, appropriate next action.
- The page no longer feels like five copies of one component.

## Resolved decisions

1. Onboarding is the flagship story and receives the longest treatment.
2. The voice is balanced: client-facing in value and explanation, builder-led when describing Chris's decisions.
3. All five cases remain on one long page with a fast case navigator.
4. Superseded by the approved schematic-atlas amendment in `WEBSITE_PLAN.md`: the generated workflow charts and quality decision trees now lead the visual story as interactive, inspectable system maps.
5. A configured booking URL becomes the relationship action. Until a real URL exists, the ending uses the downloadable casebook rather than a placeholder.

## Relationship to the existing plan

[`WEBSITE_PLAN.md`](./WEBSITE_PLAN.md) is the implementation source of truth. Its approved redesign amendment and implementation record incorporate this critique's decisions, topology requirements, narrative model, public-safety constraints, and validation results.
