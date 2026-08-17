---
name: ChrisBuen Portfolio
description: A cinematic evidence-led portfolio for an AI Automation Builder.
colors:
  graphite: "#070A0B"
  elevated-surface: "#101517"
  warm-white: "#F2EFE8"
  muted-text: "#8D9895"
  signal-teal: "#6FE0CF"
  review-amber: "#F2B84B"
  blocked-red: "#EF6A67"
  structural-line: "#243033"
typography:
  display:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 8rem)"
    fontWeight: 560
    lineHeight: 0.9
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 5.5rem)"
    fontWeight: 520
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.09em"
rounded:
  control: "3px"
  frame: "10px"
  capsule: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "{colors.elevated-surface}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.control}"
    padding: "14px 20px"
  system-frame:
    backgroundColor: "{colors.elevated-surface}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.frame}"
    padding: "24px"
---

# Design System: ChrisBuen Portfolio

## Overview

**Creative North Star: "The Living Evidence Room"**

The page feels like entering a quiet, dimly lit operations room where work can be inspected while it moves. Framed documents, evidence packets, routing rails, review controls, and finished artifacts replace decorative technology imagery. The atmosphere is cinematic, but reading remains calm and immediate.

This is a strict technical composition, not a generic SaaS interface. Large editorial-scale type establishes authorship; compact operational labels provide precision; controlled signal colors explain system state. The page rejects neon-grid spectacle, ornamental glassmorphism, floating-dashboard collage, and motion that exists only to impress.

**Key Characteristics:**

- full-bleed graphite field with warm, readable type;
- one dominant living-system stage per major story beat;
- restrained teal signals and amber human-review moments;
- evidence artifacts that remain selectable, linkable, and accessible;
- reversible scroll choreography with calm reading intervals.

## Colors

The palette uses near-black mineral surfaces with warm paper-like type and state colors reserved for meaning.

### Primary

- **Signal Teal:** marks active routing, successful reconciliation, and the live path through a system.

### Secondary

- **Review Amber:** appears only where accountable human attention is required.
- **Blocked Red:** appears only for failed, missing, or stopped states and never as decoration.

### Neutral

- **Graphite:** the full-canvas environmental field.
- **Elevated Surface:** framed artifacts, stages, and disclosure surfaces.
- **Warm White:** primary copy, important borders, and completed output states.
- **Muted Text:** explanatory copy and secondary metadata.
- **Structural Line:** rails, dividers, inactive connectors, and frame boundaries.

**The State Color Rule.** Teal, amber, and red communicate system state. They are forbidden as arbitrary section decoration.

## Typography

**Display Font:** Instrument Sans (with Arial fallback)
**Body Font:** Instrument Sans (with Arial fallback)
**Label/Mono Font:** IBM Plex Mono (with Consolas fallback)

**Character:** The sans voice is direct and contemporary; the compact mono layer behaves like evidence metadata rather than developer costume.

### Hierarchy

- **Display:** used only for the hero promise and rare section-scale statements.
- **Headline:** used for project and method introductions.
- **Title:** used for subsections and evidence disclosures.
- **Body:** capped near 70 characters per line for case-study reading.
- **Label:** short operational identifiers, always concise and never used for paragraphs.

**The Two-Voice Rule.** Large sans language carries meaning; mono language orients the reader inside the system.

## Elevation

Depth comes from tonal layering, overlap, crop, and motion rather than diffuse drop shadows. Surfaces are flat at rest. A narrow ambient shadow may appear only when a frame must separate from a moving background during a major transition.

**The Flat Evidence Rule.** Evidence surfaces remain visually stable and legible; elevation responds to hierarchy, not decoration.

## Components

### Buttons

- **Shape:** compact, nearly square corners using the control radius.
- **Primary:** warm-white surface with graphite text.
- **Secondary:** elevated graphite surface with warm-white text and a structural border.
- **Hover / Focus:** explicit color, border, and translate transitions using the fast enter curve; visible two-color focus outline.

### Chips

- **Style:** only for state, category, or evidence type. Use compact mono labels and thin structural outlines.
- **State:** selected states may use signal teal; inactive states remain neutral.

### Cards / Containers

- **Corner Style:** quiet framed corners using the frame radius.
- **Background:** elevated surface with tonal separation from the graphite field.
- **Shadow Strategy:** flat by default.
- **Border:** one-pixel structural line; no colored side stripes.
- **Internal Padding:** responsive from the medium to large spacing token.

### Inputs / Fields

The first release has no form fields. If added later, use solid surfaces, visible labels, structural borders, and a clear focus outline.

### Navigation

Use a low-profile overlay at the top of the full-bleed hero. Links remain ordinary anchors with clear hover, active, and focus states. Mobile uses a compact horizontal rail or simple disclosure, never a full-screen animated menu by default.

### Workflow Atlas

A light, paper-like schematic surface inside the dark portfolio field. The approved generated system map is the primary view; the approved quality decision tree is the paired decision/correction view. The atlas provides an orientation journey, stable legend, zoom, pan, fit, actual size, fullscreen, and full-size links. Website motion may reveal the atlas as a unit but may not morph, simplify, or redraw its verified topology. Mobile uses the same complete charts with touch-safe inspection controls.

## Do's and Don'ts

### Do:

- **Do** make the first viewport work as a complete poster before animation runs.
- **Do** connect every system state to a real case-study idea or artifact.
- **Do** use signal teal, review amber, and blocked red only for their named state roles.
- **Do** alternate cinematic stages with calm reading sections.
- **Do** frame every atlas with the client problem before it and the design, human boundary, and client result after it.
- **Do** preserve every generated connector, branch, convergence, gate, return route, and correction owner.
- **Do** keep the complete page usable with keyboard, touch, reduced motion, and JavaScript unavailable.

### Don't:

- **Don't** build a generic AI startup landing page from floating dashboards, neon grids, purple gradients, or ornamental glass cards.
- **Don't** use SaaS conversion templates with logo walls, fake metrics, testimonials, pricing, or repeated calls to action.
- **Don't** make an n8n-themed developer portfolio that leads with tools instead of operational problems and accountable outcomes.
- **Don't** expose the archive as a dense documentation portal before establishing the narrative.
- **Don't** replace an authoritative workflow chart with a decorative card sequence or a simplified landing-page illustration.
- **Don't** hijack scrolling, delay reading, use gradient text, animate layout properties, or use `transition: all`.
- **Don't** use colored side-stripe borders, nested cards, permanent `will-change`, or continuously animated offscreen content.
