# ChrisBuen Portfolio Website Plan

## Status and authority

This file is the implementation source of truth for the portfolio website. Update it when an approved product, content, design, or technical decision changes. Do not let implementation silently diverge from it.

### Approved redesign amendment (2026-08-16)

This amendment incorporates the implementation requirements in [`WEBSITE_FIX_PLAN.md`](./WEBSITE_FIX_PLAN.md) and supersedes any conflicting first-build language below.

- Onboarding is the flagship case and receives the longest, most cinematic treatment.
- The voice is balanced: commercially understandable and client-facing, with first-person authorship wherever Chris's design decisions or tradeoffs matter.
- All five cases remain on one long landing page. A persistent case navigator provides the fast comparison route.
- The main case scenes follow the approved generated charts, including fan-out, convergence, sequential controls, separate cadence lanes, and explicit pass, fail, and correction routes.
- Each case follows a seven-beat narrative: client situation, old approach failure, systems insight, Chris's design, the system in motion, the controlled decision, and the client result.
- Public-safe artifact recreations are primary visual material. Full-size generated workflow charts remain directly inspectable proof.
- The final action uses a configured booking URL when one exists. Until then, it offers the real downloadable casebook and evidence appendix rather than a placeholder contact action.
- Accurate workflow explanations and readable full sentences take priority over terse diagram terminology. Compact fragments are limited to labels inside the visual system.

### Approved schematic-atlas amendment (2026-08-16)

This amendment records the decision to use the recreated `FLOW.html` reference as the primary workflow-presentation grammar. It supersedes any earlier direction that treats generated workflow charts as secondary proof or replaces their topology with decorative scene cards.

#### Visual thesis

The dark portfolio opens into calm, paper-like system atlases: each case moves from a client problem into a numbered journey, then into a large inspectable schematic whose connectors, gates, returns, and human authority carry the visual argument.

#### Content sequence for every case

1. State the client situation, the failure of the old approach, and the purpose of the system in complete sentences.
2. Orient the reader with a numbered journey that summarizes the actual path without pretending every workflow is linear.
3. Present the authoritative generated workflow chart as the primary visual, not as an optional proof image.
4. Provide a second decision-and-correction view so pass, fail, return, and human-control logic can be inspected separately.
5. Explain why Chris made the key design choices, where automation stops, and what changes for the client.
6. Keep source records, implementation status, publication exclusions, and full-size evidence available after the explanation.

#### Interaction thesis

- Each schematic viewer provides zoom in, zoom out, fit, reset, and fullscreen controls.
- The diagram can be panned by pointer, touch, or keyboard-friendly controls without hijacking page scroll.
- Switching between system flow and decision logic is explicit, reversible, and announced accessibly.
- Motion is limited to orientation, view changes, active state, and diagram manipulation. Scroll animation must not redraw or distort the verified topology.
- With JavaScript disabled or reduced motion requested, the complete primary chart remains readable and linked at full size.

#### Source-backed visual model

| Case | Primary schematic argument | Decision-and-correction argument | Evidence boundary |
| --- | --- | --- | --- |
| Onboarding | Applicant-specific planning fans out into document, specialist, and manual evidence before an exact-once signal gate and named human decision. | Every early review, evidence lane, signal gate, decision, and activation prerequisite can stop and return the case to its responsible owner. | Mixed deployed/manual system; inactive exports and the untested asynchronous path remain disclosed. |
| Advice documents | Governed inputs pass through deterministic assembly, source artifacts, preserved Word-template filling, and release controls. | Scope, source consistency, unresolved blockers, package integrity, rendered review, and adviser release clear independently; defects return to the highest responsible source layer. | Public mechanics and documented controls do not imply an unpublished trigger, queue, retry service, or approval API. |
| Research reports | Decision, audience, source records, claim matrices, research, exhibits, and the final package advance in one evidence-first line. | Unsupported claims, mismatched exhibits, citations, cut-off, or pages stop release and return to the evidence layer. | Scripts create and validate research controls; they do not perform or independently verify the research. |
| Content and SEO | The canonical article package advances through research, editorial, visual, metadata, HTML, CMS, and persistence states. | A failed content, source, link, visual, metadata, media, HTML, or CMS check holds the posted state and returns to the responsible layer. | No ranking, traffic, autonomous-publication, live-credential, or private-content claim is implied. |
| Market intelligence | One dated evidence workspace supports separate weekly and monthly production paths with distinct editorial questions and outputs. | Source, period, chart, thesis, document, and page checks remain cadence-specific; neither lane can borrow a pass from the other. | Public examples use synthetic data and exclude credentials, paid-source output, commentary, and private templates. |

#### Acceptance criteria for the schematic atlas

- A first-time reader can trace the normal path and identify every visible branch, convergence, pass route, fail route, correction destination, and human gate.
- The generated workflow charts and generated quality decision trees are the visual authority; website summaries may orient but may not alter their topology.
- At desktop and mobile widths, labels can be inspected through fit, zoom, pan, fullscreen, and full-size links.
- The two diagram views are keyboard operable, touch safe, usable without animation, and represented in the accessibility tree.
- The visual hierarchy reads in this order: client problem, system purpose, actual flow, decision logic, client result, evidence boundary.

## Goal

Create a dark, cinematic, single-page portfolio for people who receive the link through an application, resume, or introduction. The website must demonstrate how ChrisBuen designs and builds AI automation systems; it is not primarily a lead-generation funnel.

The presentation combines:

- a living-system landing experience;
- five expandable workflow case studies;
- five reusable-method modules;
- a downloadable automation brief and casebook;
- an optional link to the complete GitHub portfolio repository; and
- a quiet booking or contact link in the footer.

## Approved positioning

| Decision | Approved direction |
| --- | --- |
| Identity | ChrisBuen |
| Role | AI Automation Builder |
| Audience | AI automation teams and prospective clients |
| Offer | Design and build complete automation systems |
| Voice | Balanced client-facing and builder-led narrative, with concrete first-person design decisions |
| Visual direction | Dark cinematic |
| Motion level | Cinematic but readable |
| Page model | One long landing page with a case navigator, one flagship story, four varied supporting chapters, and inspectable proof drawers |
| Deployment | GitHub Pages |
| Repository | One public repository containing the site and public Portfolio Reference library |

## Core message

The portfolio should establish one idea:

> ChrisBuen builds reliable systems for work that cannot be solved by a prompt alone.

The approved hero language is:

- **Eyebrow:** ChrisBuen / AI Automation Builder
- **Headline:** Automation for work that still needs judgement.
- **Supporting message:** I turn scattered evidence, manual handoffs, and high-stakes review into systems that show their work before they move.
- **Primary action:** Watch the flagship system
- **Secondary action:** Download the short brief

The underlying operating model is:

> Evidence → Structure → Review → Controlled release

## Visitor journey

### 1. Hero

The living-system visual begins immediately. Framed inputs—documents, source data, requests, messages, and scheduled triggers—move toward a central processing rail. The identity, headline, and actions remain usable before animation finishes and when motion or JavaScript is unavailable.

### 2. Flagship case

Reach a recognizable operating problem immediately after the hero. The onboarding case demonstrates applicant-specific planning, parallel evidence work, exact-once reconvergence, a pass/fail gate, a named human decision, and controlled downstream onboarding.

### 3. Reusable operating idea and five systems

Extract the shared evidence-to-release model only after the visitor has watched it solve the flagship onboarding problem.

Present the systems in this order:

1. AR, CAR, and Fund Onboarding
2. Digital Asset Advice Document Production
3. Evidence-First Research Report Production
4. AI Content, SEO, and Publishing
5. Weekly and Monthly Market Intelligence

Each case must:

- use a dominant local sticky visual stage on desktop followed by a calm proof interval;
- have a stable URL hash and accessible expandable detail area;
- support a quick scan of roughly one minute and 3–5 minutes of complete exploration;
- tell a complete problem-to-result story with full sentences, causal transitions, and visible authorship;
- explain the operational problem, inputs, mechanism, ChrisBuen's contribution, human decision, public exclusions, outputs, and proof as separate concepts;
- preserve the approved chart topology and make pass, fail, and correction routes unambiguous;
- retain fan-out, convergence, split-lane, and linear meaning on mobile through grouped or horizontally scrollable sub-scenes rather than a collapsed list;
- link to relevant public artifacts; and
- keep existing workflow diagrams inside an optional “Inspect the architecture” evidence area rather than using them as the main visual.

The project-specific visual metaphors are:

| Project | Living-system treatment |
| --- | --- |
| Onboarding | Dossiers, evidence queues, parallel research lanes, completeness gates, and human decisions |
| Advice documents | Structured fields assembling into reviewed and controlled document pages |
| Research reports | Sources resolving into claims, evidence, charts, and a composed report |
| Content and SEO | Briefs, research, assets, metadata, editorial QA, and controlled CMS handoff |
| Market intelligence | Recurring market signals, editorial selection, charts, reporting cadence, and release |

### 4. Reusable methods

Use the visitor-facing heading **Reusable methods** and the smaller technical label **Agent skill packages**.

Present these five accessible expandable modules:

1. Multi-Stream Due-Diligence Coordination
2. Evidence Completeness and Human-Control Gate
3. Governed Contract Automation Evaluation
4. Multi-Perspective Decision Council
5. Alpha Node Brand Application

The stage should pull back to reveal these methods as the shared control layer beneath multiple projects. Each module explains its purpose, trigger, control boundary, and project mappings.

### 5. Working philosophy

Include a concise neutral explanation of how ChrisBuen approaches fragmented operations, evidence, uncertainty, human accountability, and controlled release.

Do not add an extended autobiography, testimonials, client-logo wall, pricing, fake metrics, or a generic services section.

### 6. Documents and repository

- Offer the automation brief and complete casebook as described downloads.
- Link the evidence appendix from relevant proof sections.
- Show **Inspect the complete portfolio repository** only when a valid GitHub repository URL is configured.
- Never render placeholder or dead repository links.

### 7. Footer

GitHub portfolio and booking links are secondary actions. Hide either link when its URL is missing. Do not build a contact form for the first release.

## Visual system

### Palette

| Token | Value | Purpose |
| --- | --- | --- |
| Graphite | `#070A0B` | Primary background |
| Elevated surface | `#101517` | Frames and panels |
| Warm white | `#F2EFE8` | Primary text |
| Muted text | `#8D9895` | Supporting copy |
| Signal teal | `#6FE0CF` | Active system state |
| Review amber | `#F2B84B` | Human-review state |
| Blocked red | `#EF6A67` | Blocked or failed state only |
| Structural line | `#243033` | Borders and connectors |

### Typography

- Instrument Sans for display and body text.
- IBM Plex Mono for operational labels, state text, identifiers, and evidence metadata.

### Visual language

- Use framed documents, evidence packets, queues, processing lanes, review controls, and finished outputs as the principal imagery.
- Use translucent surfaces selectively, not as a universal glass effect.
- Use existing screenshots and diagrams as proof artifacts.
- Do not use generic neon grids, gradient blobs, fake dashboards, fabricated telemetry, stock automation graphics, or unnecessary 3D.
- Do not require a portrait; identity comes through the work and point of view.

## Motion system

- Use GSAP and ScrollTrigger for restrained entrance, copy-reveal, and section-handoff motion. The verified diagram topology itself does not morph or scrub.
- Use native browser scrolling. Do not add Lenis or Locomotive Scroll in v1.
- Use CSS for hover, focus, press, and small state changes.
- Do not add Framer Motion as a second runtime. The local UI-animation skill may guide timing and easing without requiring its library.
- Let the generated charts show intake, routing, transformation, validation, review, reconciliation, and release; motion may orient the reader but may not redraw those relationships.
- Keep scrolling reversible and ensure fast flicks land in a valid state.
- Stop animation work when scenes are offscreen or settled.
- Primarily animate transforms and opacity; keep blur bounded.
- Provide an ordinary-flow mobile presentation with localized transitions instead of reproducing the desktop pinned stage.
- Under `prefers-reduced-motion`, render completed static states and remove scrubbed or continuous animation.
- Do not use audio, generated video, canvas, or WebGL in v1.

## Technical architecture

- Build a static Astro and TypeScript site at the repository root.
- Use authored CSS with shared design tokens rather than adopting a large component library.
- Keep portfolio content in typed, manually curated data; do not parse the reference library at runtime.
- Define content interfaces for `ProjectCase`, `ReusableMethod`, `DownloadArtifact`, and `ExternalLinks`.
- Optional external URLs must disappear cleanly when unset.
- Copy only selected public-safe assets and downloads into the website asset tree.
- Record every copied artifact's source path in an asset-provenance manifest.
- Keep the complete `Portfolio Reference/` archive local and Git-ignored. Commit only the allowlisted `portfolio-evidence/` extract.
- Add stable anchors for all five cases and five methods.
- Add canonical metadata, Open Graph assets, and truthful structured data.
- Add GitHub to structured-data `sameAs` only after its public URL exists.

## Repository and publication safety

- Add a root `.gitignore` for dependencies, build output, caches, environment files, credentials, the complete `Portfolio Reference/` archive, local design references, and workspace-local skills.
- Generate `portfolio-evidence/` from an explicit package allowlist with source paths, byte counts, and SHA-256 hashes.
- Never stage, commit, copy into the build, or link from the site any path under the complete local archive.
- Add a pre-deployment public-safety check for forbidden directories, secrets, local filesystem paths, placeholders, broken links, and unsupported external URLs.
- Add a repository-level release check for the exact staged/tracked upload set, including blocked paths, extensions, large files, secret-like values, and manifest drift.
- GitHub Pages must publish only the generated `dist/` artifact.
- Configure Astro asset paths for the GitHub repository base path.
- Use GitHub Actions to build, validate, upload, and deploy the Pages artifact.

## Validation and acceptance criteria

### Build and content

- The production build succeeds locally and in GitHub Actions.
- The GitHub Pages base-path build loads all routes, assets, and downloads.
- Every project claim is traceable to committed public content under `portfolio-evidence/`.
- No placeholder copy, confidential material, unsupported claims, or dead external actions remain.

### Interaction

- Test forward, backward, slow, and fast scrolling through every animated case.
- All expandable case and method sections work with mouse, keyboard, and touch.
- Anchor links focus or reveal the correct content.
- Missing GitHub or booking URLs hide their controls without empty layout gaps.
- No console errors or failed assets occur.

### Responsive behavior

Verify at these viewport widths:

- 390 px
- 768 px
- 1024 px
- 1440 px

Mobile must be intentionally composed rather than merely collapsing the desktop layout.

### Accessibility

- Provide semantic heading order, skip navigation, visible focus, accessible expandable controls, meaningful link labels, sufficient contrast, and useful alternative text.
- Preserve a complete reading order without animation.
- Verify the reduced-motion version independently.
- Target Lighthouse scores of at least 90 for accessibility, best practices, and SEO.

### Publication safety

- Confirm that private material is neither committed for publication nor copied into `dist/`.
- Confirm every download and evidence artifact appears in the provenance manifest.
- Scan the final site for local paths, private names, credentials, unsupported company claims, and broken links.

## Approved assumptions

- `Portfolio Reference/` remains the local factual source; `portfolio-evidence/` is its reproducible public extract and the only archive content approved for Git.
- The five flagship workflows and five featured skills form the launch portfolio.
- `ChrisBuen` is the only public identity required for v1.
- No portrait is required.
- The complete GitHub URL and booking URL may be supplied later; both remain hidden until valid.
- The site has no CMS, database, server API, contact form, analytics, audio, generated video, or Three.js scene in v1.
- The design follows the local Awwwards-quality, scroll-storytelling, and UI-animation guidance while prioritizing evidence, clarity, accessibility, and restrained dependencies.

## Change control

Any material change to audience, positioning, project selection, navigation, content hierarchy, visual system, motion runtime, deployment target, privacy boundary, or acceptance criteria must be reflected here before implementation proceeds.

## Implementation record

The approved narrative and schematic-atlas redesign is implemented at the repository root as of 2026-08-16.

- Astro, TypeScript, authored CSS, GSAP, and ScrollTrigger form the runtime.
- Onboarding is the flagship. Each of the five cases now uses a seven-beat client story that moves from situation and failure through design, mechanism, controlled decision, and client result.
- Five interactive system atlases now make the generated charts the primary visual authority. Each atlas pairs the authoritative workflow map with its authoritative quality decision tree.
- Every atlas begins with a six-step orientation journey, then answers two explicit questions: how the operating flow works, and where the system can stop, return, or require human authority.
- Each diagram supports zoom in, zoom out, fit, actual size, pointer/touch panning, keyboard panning, fullscreen, Escape exit, accessible view tabs, and a full-size chart link.
- Mobile retains the complete topology inside the same inspectable canvas; the orientation journey scrolls horizontally without flattening the underlying workflow into a list.
- The superseded hand-built scene components and their large positioning stylesheet were removed so agents cannot accidentally maintain two conflicting visual models.
- Generated charts, decision trees, source maps, workflow specifications, and three downloadable evidence documents remain inspectable through the atlases, public-safe proof drawers, and the explicit asset allowlist.
- Optional GitHub and booking controls render only when valid HTTPS URLs are configured.
- The build uses an explicit public-asset allowlist. Selected diagrams become metadata-stripped WebP derivatives; source hashes are pinned to reviewed revisions; source and output hashes are recomputed; the generated directory is cleaned before sync; and PDF text and metadata are scanned before release.
- The earlier portfolio banner is intentionally excluded because it contains stale counts and an unverified repository URL.
- The generated `dist/` artifact is the approved Pages publication surface.
- The complete `Portfolio Reference/` tree is Git-ignored. A roughly 19 MB curated public evidence layer is generated from explicit workflow, method, policy, and redacted-document selections; client brand files, commercial fonts, source artwork, videos, caches, screenshots, superseded chart experiments, and private directories remain outside Git.
- A repository publication validator audits the actual staged/tracked file set and cross-checks every curated evidence file against `portfolio-evidence/publication-manifest.json` before deployment.
- Local release validation covers type safety, production build, evidence-source existence, artifact provenance, forbidden-path patterns, configured and missing optional-link variants, root and project Pages paths, four responsive widths, all five atlases, all ten diagram views, zoom and fit state, fullscreen and Escape exit, every disclosure and internal anchor, touch targets, automated WCAG checks, fast and reverse scrolling, horizontal overflow, reduced motion, no-JavaScript rendering, console errors, failed requests, and Lighthouse performance/accessibility/best-practice/SEO thresholds.
- Final local results: Astro diagnostics 0 errors / 0 warnings / 0 hints; responsive and accessibility QA passes at 390, 768, 1024, and 1440 px; Lighthouse scores 97 performance, 100 accessibility, 100 best practices, and 100 SEO against the production preview; and an independent read-only topology and label-floor audit passes.
