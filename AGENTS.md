# Portfolio website agent guide

## Goal

Build a distinctive, production-quality portfolio website that presents ChrisBuen's past automation, research, document, publishing, governance, and agent-system work as an interactive visual story.

The site should help a recruiter, client, or collaborator quickly understand:

- what problems were solved;
- how each automation or system works;
- what Chris designed or implemented;
- where evidence, controls, and human decisions enter the flow;
- what artifacts support each claim; and
- how to explore the underlying case studies.

The finished experience should feel authored and memorable: narrative framing, connected visual flows, system-state transitions, and clickable case studies. Source-backed workflow charts are the primary visual authority. Present them as interactive system atlases with orientation, decision/correction views, zoom, pan, fit, reset, fullscreen, and full-size evidence links.

## Repository boundaries

- The website application belongs at this repository root unless a later task establishes a dedicated app directory.
- `Portfolio Reference/` is the complete local source archive. It is Git-ignored and must never be staged, committed, linked from the built site, or uploaded wholesale.
- `portfolio-evidence/` is the curated public evidence layer and the only evidence tree approved for Git upload. Website evidence paths must resolve here.
- `skills/` contains workspace-local design and motion procedures. Do not ship this directory as public website content.
- `design-references/` is a local recreation and analysis workspace. Do not ship it as public website content.
- Rebuild `portfolio-evidence/` only with `npm run evidence`; do not manually broaden the sync allowlist without a rights, privacy, claim, and size review.
- Do not publish credentials, personal data, client records, paid-source content, confidential documents, internal locations, or unsupported performance claims.

## Required working sequence

1. Read the relevant source README and evidence for a project before representing it; use `portfolio-evidence/` for public links and the local archive only for source research.
2. Separate verified facts from visual interpretation. Animation may simplify a mechanism, but it must not invent outcomes or capabilities.
3. Define the page's visual thesis, story beats, content hierarchy, and motion grammar before implementation.
4. Build semantic content and a complete static first frame before layering motion.
5. Validate desktop, mobile, keyboard, touch, reduced-motion, loading, and error behavior before handoff.

## Local skill routing

Read each selected `SKILL.md` completely before following it. Use the smallest combination needed for the task.

- `skills/build-awwwards-quality-sites/SKILL.md` — overall art direction and high-quality portfolio implementation.
- `skills/scroll-world-storytelling/SKILL.md` — convert the portfolio narrative into a connected, scroll-driven sequence of visual beats.
- `skills/ui-animation/SKILL.md` — design, implement, inspect, or debug UI motion and Framer Motion behavior.

The installed global `frontend-skill` is the primary implementation guide, `impeccable` is the refinement pass, `fixing-motion-performance` is used when motion performance needs auditing, and the in-app browser is used for visual QA.

## Experience principles

- Lead with the value and mechanism of the work, not a list of tools.
- Make the first viewport immediately explain who Chris is and what kind of systems he builds.
- Use 5–7 deliberate narrative beats on the landing page, followed by deeper clickable case studies.
- Give featured projects their own visual metaphor while retaining one coherent portfolio identity.
- Animate state changes—intake, routing, transformation, review, decision, and release—rather than adding decorative movement everywhere.
- Preserve the generated charts' connectors, branches, convergence, pass/fail routes, correction ownership, and human gates. Website summaries may orient the reader but may not redraw the topology into a simpler card sequence.
- Frame each chart with the client problem before it and the design decisions, human boundary, and client result after it.
- Prefer one motion system and one scrolling strategy. Avoid competing animation libraries controlling the same properties.
- Keep navigation, headings, calls to action, and project evidence usable before animations finish and when JavaScript or motion is unavailable.
- Honor `prefers-reduced-motion`; provide static or simplified alternatives for scrubbed, pinned, video, canvas, and WebGL experiences.
- Use real project evidence and honest labels. Do not fabricate clients, testimonials, metrics, partnerships, or production status.

## Content model for case studies

Each featured project should answer:

1. What was the operational problem?
2. What entered the system?
3. What did the automation transform, route, or validate?
4. Where did human review or approval remain?
5. What was produced?
6. Which public artifacts demonstrate the work?

## Definition of done

- The production build succeeds without errors.
- The landing page communicates the portfolio thesis and provides working paths into featured projects.
- Claims and project descriptions are traceable to committed files under `portfolio-evidence/` and, through its manifest, to the local source archive.
- All primary interactions work with mouse, keyboard, and touch.
- Mobile layouts are intentionally composed, not merely collapsed desktop sections.
- Reduced-motion behavior is verified.
- Motion remains smooth and does not block reading or navigation.
- Images and media have deliberate sizing, loading behavior, fallbacks, and accessible text where appropriate.
- No placeholder copy, broken links, console errors, confidential material, or unsupported claims remain.
- `npm run release:ready` passes against the exact staged/tracked upload set.
