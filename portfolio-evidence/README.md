# Public portfolio evidence

This directory is the curated, public evidence layer for the Chris Buen automation portfolio. It contains five source-backed workflow packages, five reusable method extracts, three redacted portfolio PDFs, and the publication policy that governs the selection.

The larger local `Portfolio Reference/` archive is deliberately excluded from Git. It contains private material, caches, commercial fonts, client brand assets, source artwork, video, and other files that are not approved for public distribution.

## Start here

- Browse `workflows/` for the five case-study specifications, source maps, implementation extracts, tests, samples, and workflow diagrams.
- Browse `skills/` for the five reusable operating methods cited by the site.
- Read `dependencies/reference/disclosure/publication-policy.md` for the public evidence boundary.
- Use `publication-manifest.json` to verify every copied file by source path, byte count, and SHA-256 digest.

## Rebuild this directory

From a local workspace that contains the private source archive, run `npm run evidence`. The command recreates this directory from an explicit package allowlist, rejects unsafe file classes and secret-like values, and never copies the full archive.

The Alpha Node branding method is a public procedural extract only. Client brand books, logos, fonts, source art, stock media, animations, and the asset index are intentionally absent; their omission does not grant or imply publication rights.
