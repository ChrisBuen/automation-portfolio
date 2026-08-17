# ChrisBuen AI Automation Portfolio

A dark, evidence-led portfolio for AI automation systems that coordinate fragmented inputs, structured work, human review, and controlled release.

The site is a static Astro and TypeScript project. Its primary visuals are interactive, source-backed workflow atlases built from the approved generated system maps and quality decision trees. Each atlas supports view switching, zoom, pan, fit, actual size, fullscreen, and full-size evidence links. GSAP and ScrollTrigger are limited to surrounding orientation and reveal motion; the verified chart topology never morphs.

Use Node.js 22.19 or newer.

## Start locally

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:4321`.

## Validate the release

```powershell
npm run validate
```

This command:

1. type-checks the Astro project;
2. copies or transforms only allowlisted public artifacts;
3. builds the static site;
4. checks evidence paths, asset hashes, emitted file types, anchors, and common disclosure failures.

After Git is initialized and the intended public files are staged, run the complete publication gate:

```powershell
npm run release:ready
```

This adds a repository-level audit of the exact staged/tracked upload set, including path exclusions, file types and sizes, secret-like values, and the curated evidence manifest.

For local responsive and Lighthouse checks, start the production preview and run:

```powershell
npm run preview
npm run qa:visual
npm run qa:lighthouse
```

The visual check covers 390, 768, 1024, and 1440 pixel widths, all five atlases and ten diagram views, zoom and fit state, fullscreen and Escape exit, every native disclosure and internal anchor, touch-target sizing, fast and reverse scrolling, WCAG checks, reduced motion, no-JavaScript rendering, console errors, failed requests, and horizontal overflow. The build-variant check verifies valid, missing, and invalid optional links plus root and project GitHub Pages paths. Lighthouse requires every tested category to score at least 90. Reports and screenshots are written to the ignored `.qa/` folder.

## Configure optional links

Only valid HTTPS URLs render. Missing or invalid values disappear without leaving empty controls.

```text
PUBLIC_GITHUB_URL=https://github.com/owner/repository
PUBLIC_BOOKING_URL=https://booking.example/path
```

Set `SITE_URL` and `BASE_PATH` when building for a GitHub Pages project site. The included workflow derives both values automatically.

## Public repository architecture

The committed evidence layer is `portfolio-evidence/`. It contains five curated workflow packages, five reusable method extracts, three redacted PDFs, a publication policy, and a SHA-256 manifest. The site reads only from this directory.

The complete local `Portfolio Reference/` archive is Git-ignored. It contains private material, large client brand files, commercial fonts, source artwork, videos, caches, and other files that are not approved for public distribution. `design-references/` and workspace-local `skills/` are also excluded from the public repo.

When approved source material changes, rebuild the curated layer locally with:

```powershell
npm run evidence
```

The evidence sync starts from an explicit package allowlist, rejects unsafe directories and file classes, enforces a 25 MB per-file ceiling, scans text for secret-like values and local user paths, and creates `portfolio-evidence/publication-manifest.json`. The website asset sync then converts only hash-pinned diagrams to metadata-stripped WebP derivatives and copies only the three approved PDFs. Generated web assets remain ignored; GitHub Pages publishes only the validated `dist/` artifact.

## GitHub Pages

The included workflow builds and audits every push to `main`, resolves the correct root or project-site base path, configures the repository URL automatically, and deploys only `dist/`. After creating the GitHub repository, enable **Settings → Pages → Source: GitHub Actions** if GitHub does not select it automatically.

## Project authority

- `WEBSITE_PLAN.md` is the approved implementation source of truth.
- `PRODUCT.md` defines the audience, purpose, voice, and product principles.
- `DESIGN.md` and `DESIGN.json` define the visual and interaction system.
- `AGENTS.md` defines navigation, privacy, and validation rules for coding agents.
- `src/data/portfolio.ts` contains manually curated, source-backed public copy.
- `src/data/workflowAtlases.ts` contains the source-backed journey and viewer framing for each case.
- `portfolio-evidence/` is the only evidence tree approved for Git upload.
- `scripts/sync-publication-evidence.mjs` reproducibly rebuilds that tree from the local archive.
- `scripts/validate-repository.mjs` audits the exact staged/tracked repository before publication.
- `WORKFLOW_ATLAS_QUALITY_LOG.md` records the diagram evidence boundary, rejected passes, and accepted validation result.

Do not parse the reference archive at runtime or replace the curated content layer with generated claims.
