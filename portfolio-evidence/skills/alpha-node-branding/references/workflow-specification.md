# Workflow specification — alpha-node-branding

## Operating boundary

The skill applies an approved identity to approved content. It does not alter the factual, legal, financial, or approval meaning of that content, and it does not grant rights beyond the original asset terms.

## Evidence ledger

| ID | Claim | Source | State | Diagram treatment |
| --- | --- | --- | --- | --- |
| E1 | Inputs are approved content, target medium, audience, dimensions, and delivery format. | `SKILL.md`, Output Guidance | D | Entry contract |
| E2 | Brand rules, machine-readable tokens, asset map, and searchable asset metadata govern selection. | `brand-guidelines.md`, `brand-tokens.json`, `asset-map.md` | R/D | Governance rail |
| E3 | Official assets are selected by medium and copied into the target project. | `SKILL.md`, Core Workflow; `asset-map.md` | D | Controlled transformation |
| E4 | Documents, presentations, web, and social/banner outputs have different composition requirements. | `SKILL.md`, Output Guidance | D | Medium fan-out |
| E5 | Logo, palette, typography, tone, placeholder, and embedded-asset checks must pass after rendering. | `SKILL.md`, Validation Checklist | D | Release decision |
| E6 | The delivered artifact contains required project-local assets and does not depend on the skill folder. | `SKILL.md`, Core Workflow | D | Output contract |

## Governed preconditions

- Content is approved for the requested use.
- Target medium, audience, dimensions, and output format are known.
- Official assets and their applicable rights are available.

## Ordered transformations

1. Read the guidelines, brand tokens, asset map, and relevant asset metadata.
2. Reject placeholder copy inherited from source brand-book layouts.
3. Choose the official positive, negative, white, black, raster, web-vector, or print-vector asset appropriate to the background and medium.
4. Copy required logo, font, and graphic files into the target project.
5. Apply the medium-specific layout: documents/PDFs, presentations, web, or social/banner.
6. Render the final artifact and inspect it at its delivery size.
7. Run the six-part brand release checklist.

## Decisions and outcomes

- Wrong asset or inadequate contrast returns to asset selection.
- Distorted logo, poor clear space, wrong palette/type, generic crypto tone, placeholder text, or missing embedded assets returns to composition.
- Pass produces the rendered branded artifact and project-local asset set.

## Evidence artifacts

- `brand-tokens.json`
- `brand-guidelines.md`
- `asset-map.md`
- official SVG, PNG, EPS, and AI logo variants
- bundled Futura PT and Gilmer resources
- final rendered artifact and checklist result

## Explicit exclusions

- No identity asset is recreated, stretched, slanted, warped, recolored, made transparent, or decorated with effects.
- Brand application does not approve underlying claims.
- Assets are not externally linked from the skill directory in the delivered project.

## Publication artifacts

- Editable source: `references/diagrams/alpha-node-branding-skill-diagram.excalidraw`
- PNG: `references/diagrams/alpha-node-branding-skill-diagram.png`

