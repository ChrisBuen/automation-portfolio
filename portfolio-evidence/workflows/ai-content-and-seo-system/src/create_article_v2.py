#!/usr/bin/env python3
"""
Create a new v2 article folder with a Markdown entry file, structured research
file, and article-specific article-visual builder.
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import date
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT_DIR / "articles"
DRAFT_ARTICLES_DIR = ARTICLES_DIR / "draft"
SHARED_SOURCE_ASSETS_DIR = ROOT_DIR / "source-assets"


def slugify(value: str) -> str:
    lowered = value.lower()
    cleaned = re.sub(r"[^a-z0-9\s-]", "", lowered)
    dashed = re.sub(r"[\s_-]+", "-", cleaned).strip("-")
    return dashed


def build_index_markdown(title: str, slug: str) -> str:
    today = date.today().isoformat()
    return f"""---
title: "{title}"
slug: "{slug}"
metaTitle: "{title}"
metaDescription: ""
excerpt: ""
primaryKeyword: ""
secondaryKeywords:
  - ""
yoastFocusKeyphrase: ""
yoastRelatedKeyphrases:
  - ""
yoastSynonyms:
  - ""
yoastMetaTitle: ""
yoastMetaDescription: ""
author: "Codex"
publishedAt: "{today}"
searchIntent: ""
targetAudience: ""
estimatedWordCount: 1800
featuredImage: "featured.webp"
status: "draft"
---

# {title}

Intro paragraph.

<!-- visual:overview -->

## Key Points

- Point one
- Point two
- Point three

## Main Section

Draft the article body here.

<!-- visual:detail -->

## Workflow Or Example

Add a section that benefits from one more visual aid if the article needs it.

<!-- visual:workflow -->

<!--
Draft checklist before publish:
- Add 2-5 internal links in-body using markdown links with descriptive anchor text.
- Pull internal targets from posts/article-wordpress-tracking.csv only.
- Add in-body external citations for key factual claims.
- Do not leave raw /blog/... URL bullets in final article body.
-->

## Sources

- [Source title](https://example.com)
"""


def build_research_json(title: str, slug: str) -> str:
    payload = {
        "article": {
            "title": title,
            "slug": slug,
            "primary_keyword": "",
        },
        "visual_strategy": {
            "article_type": "",
            "primary_visual_problem": "What parts of the article should readers see, not just read?",
            "production_goal": "Build a source-led simple minimalistic visual set with article-specific HTML/CSS compositions. Use real screenshots first, official assets second, then clean staged framing built from those materials.",
            "recommended_image_count": "Plan 5 to 8 total images for every article. Each image should have a distinct proof, framing, comparison, sequence, or worked-example job.",
            "source_asset_rule": "Use posts/source-assets/ for reusable screenshots, proof crops, logos, wordmarks, and official product assets. Use the article source-assets/ folder only for material that belongs to this article.",
            "source_ladder": [
                "first_party",
                "official",
                "licensed_third_party",
                "editorial_composition",
            ],
            "production_path": "article_specific_html_css_playwright",
            "asset_packet": {
                "featured_candidates": [
                    {
                        "type": "",
                        "path_or_url": "posts/source-assets/official/example.png",
                        "notes": "List why this is a candidate source asset and why it is safe to use."
                    }
                ],
                "body_visual_candidates": [
                    {
                        "type": "",
                        "path_or_url": "posts/source-assets/first-party/example.png",
                        "notes": "Add 1 to 3 candidate assets for the first important in-body visual."
                    }
                ]
            },
            "qc_gate": {
                "required": True,
                "skill": "posts/skills/article-image-quality-control/SKILL.md",
                "threshold": "17-20 strong pass",
                "report_path": "image-qc.md"
            }
        },
        "art_direction": {
            "message": "What should the reader understand after seeing the visuals?",
            "mood": "Choose a mood such as simple, minimalistic, bright, precise, product-led, or sharp.",
            "visual_metaphor": "Describe the staging device for the article visuals in the simplest possible form: hero spread, proof stage, comparison stage, directional sequence, or worked example stage.",
            "display_gesture": "Describe where the italic or oblique editorial phrase appears in the featured image.",
            "composition_notes": [
                "Describe focal points, hierarchy, and asymmetry ideas.",
                "Note the hero position, crop shape, and whether the visual can work with no support module or just one small support move."
            ],
            "avoid": [
                "List visual approaches that would feel too generic for this article."
            ],
            "negative_prompt_house": "Do not generate dashboards, admin panels, slide decks, list boards, tool-card grids, path boards, checklist rails, flat-lay desk scenes, notebook collages, generic AI robot art, glowing blue tech scenes, cyberpunk effects, stock office scenes, decorative abstract posters, repeated rounded boxes, or multiple equal-weight focal points."
        },
        "sources": [
            {
                "label": "Example source",
                "url": "https://example.com",
                "notes": "Replace with article research.",
            }
        ],
        "visuals": [
            {
                "id": "featured",
                "type": "",
                "filename": "featured.webp",
                "visual_family": "",
                "purpose": "Hero image for the article card and post header.",
                "source_strategy": "",
                "source_assets": [],
                "title": title,
                "subtitle": "Replace with a concise research-backed summary.",
                "highlights": [],
                "footer": "example.com",
                "layout_archetype": "",
                "dominant_focal_zone": "",
                "shot_scale": "",
                "sequence_role": "frame",
                "display_gesture": "",
                "accent_family": "crimson",
                "hero_position": "",
                "crop_shape": "",
                "module_pattern": "",
                "negative_prompt": "No dashboard UI, no card stack, no side checklist, no hero collage, no generic AI symbolism, no unrelated stock characters.",
                "max_visible_words": 18,
                "max_visual_zones": 2,
                "max_support_modules": 1,
                "max_proof_surfaces": 1,
            },
            {
                "id": "overview",
                "type": "",
                "filename": "visual-overview.webp",
                "visual_family": "",
                "purpose": "First in-body proof-led visual placed near the first explanation section.",
                "source_strategy": "",
                "source_assets": [],
                "title": "Overview visual title",
                "alt": "Overview visual title",
                "caption": "Overview visual caption.",
                "layout_archetype": "",
                "dominant_focal_zone": "",
                "shot_scale": "",
                "sequence_role": "",
                "display_gesture": "",
                "accent_family": "crimson",
                "hero_position": "",
                "crop_shape": "",
                "module_pattern": "",
                "negative_prompt": "No fake interface, no equal tiles, no slide-board layout, no oversized text block, no collage noise.",
                "max_visible_words": 24,
                "max_visual_zones": 2,
                "max_support_modules": 1,
                "max_proof_surfaces": 2,
                "proof_points": [
                    "Replace with the first proof note or comparison point.",
                    "Replace with the second proof note or comparison point."
                ],
            },
            {
                "id": "detail",
                "type": "",
                "filename": "visual-detail.webp",
                "visual_family": "",
                "purpose": "Second in-body visual for a deeper comparison, proof crop, or detail callout.",
                "source_strategy": "",
                "source_assets": [],
                "title": "Detail visual title",
                "alt": "Detail visual title",
                "caption": "Detail visual caption.",
                "layout_archetype": "",
                "dominant_focal_zone": "",
                "shot_scale": "",
                "sequence_role": "",
                "display_gesture": "",
                "accent_family": "crimson",
                "hero_position": "",
                "crop_shape": "",
                "module_pattern": "",
                "negative_prompt": "No feature matrix, no list board, no stacked cards, no repeated rounded boxes, no presentation-slide comparison.",
                "max_visible_words": 24,
                "max_visual_zones": 2,
                "max_support_modules": 1,
                "max_proof_surfaces": 2,
                "proof_points": [
                    "Replace with a focused comparison point or proof note.",
                    "Replace with a second focused comparison point or proof note."
                ],
            },
            {
                "id": "workflow",
                "type": "",
                "filename": "visual-workflow.webp",
                "visual_family": "",
                "purpose": "Optional later in-body visual for a sequence, ribbon, or safe-use flow.",
                "source_strategy": "",
                "source_assets": [],
                "title": "Workflow visual title",
                "alt": "Workflow visual title",
                "caption": "Workflow visual caption.",
                "layout_archetype": "",
                "dominant_focal_zone": "",
                "shot_scale": "",
                "sequence_role": "",
                "display_gesture": "",
                "accent_family": "crimson",
                "hero_position": "",
                "crop_shape": "",
                "module_pattern": "",
                "negative_prompt": "No equal step cards, no checklist ladder, no process dashboard, no generic flowchart boxes, no flat collage staging.",
                "max_visible_words": 24,
                "max_visual_zones": 2,
                "max_support_modules": 1,
                "max_proof_surfaces": 2,
                "sequence_steps": [
                    "Replace with the first step or sequence note.",
                    "Replace with the second step or sequence note.",
                    "Replace with the third step or sequence note."
                ],
            },
        ],
    }
    return json.dumps(payload, indent=2) + "\n"


def build_article_visual_builder(title: str, slug: str) -> str:
    return """#!/usr/bin/env python3
\"\"\"
Article-specific article-visual builder for {title}.

This scaffold is intentionally non-runnable until rewritten.
It exists to lock the article into the repo's single production path:
source-led planning in `research.json` plus article-specific HTML/CSS renderers.
\"\"\"

from __future__ import annotations

from pathlib import Path


ARTICLE_DIR = Path(__file__).resolve().parent

def main() -> int:
    raise SystemExit(
        "This scaffold does not render visuals.\\n"
        "Rewrite build_article_visuals.py into an article-specific builder before running generation.\\n"
        "Required path:\\n"
        "1. finish research.json\\n"
        "2. collect saved source assets\\n"
        "3. use posts/source-assets/ for reusable screenshots, proof crops, logos, wordmarks, and official product assets\\n"
        "4. use local fonts from assets/fonts/Poppins-SemiBold.ttf, assets/fonts/Poppins-Regular.ttf, assets/fonts/FjordOne-Regular.ttf, and assets/fonts/Manrope-Variable.ttf\\n"
        "5. use one italic or oblique editorial phrase in the featured image\\n"
        "6. render article-specific HTML/CSS premium stage compositions with Playwright\\n"
        "7. inject generated image blocks into index.md\\n"
        "Then run: python posts\\\\scripts\\\\generate_article_visuals.py posts\\\\articles\\\\draft\\\\{slug}"
    )


if __name__ == "__main__":
    raise SystemExit(main())
""".format(title=title, slug=slug)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create a new v2 article folder scaffold under posts/articles/draft."
    )
    parser.add_argument("title", help="Article title.")
    parser.add_argument(
        "--slug",
        help="Optional slug override. Defaults to a slugified title.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    slug = args.slug or slugify(args.title)
    article_dir = DRAFT_ARTICLES_DIR / slug
    existing_locations = [
        ARTICLES_DIR / slug,
        DRAFT_ARTICLES_DIR / slug,
        ARTICLES_DIR / "posted" / slug,
    ]
    for existing in existing_locations:
        if existing.exists():
            raise SystemExit(f"Article folder already exists: {existing}")

    article_dir.mkdir(parents=True, exist_ok=False)
    (article_dir / "source-assets" / "first-party").mkdir(parents=True, exist_ok=True)
    (article_dir / "source-assets" / "official").mkdir(parents=True, exist_ok=True)
    (article_dir / "source-assets" / "licensed").mkdir(parents=True, exist_ok=True)
    (SHARED_SOURCE_ASSETS_DIR / "first-party").mkdir(parents=True, exist_ok=True)
    (SHARED_SOURCE_ASSETS_DIR / "official").mkdir(parents=True, exist_ok=True)
    (SHARED_SOURCE_ASSETS_DIR / "licensed").mkdir(parents=True, exist_ok=True)
    (article_dir / "index.md").write_text(
        build_index_markdown(args.title, slug),
        encoding="utf-8",
    )
    (article_dir / "research.json").write_text(
        build_research_json(args.title, slug),
        encoding="utf-8",
    )
    (article_dir / "build_article_visuals.py").write_text(
        build_article_visual_builder(args.title, slug),
        encoding="utf-8",
    )

    print(f"Created v2 article scaffold: {article_dir}")
    print(f"Markdown entry: {article_dir / 'index.md'}")
    print(f"Research file: {article_dir / 'research.json'}")
    print(f"Article visual builder: {article_dir / 'build_article_visuals.py'}")
    print(f"Article-only source assets: {article_dir / 'source-assets'}")
    print(f"Shared reusable source assets: {SHARED_SOURCE_ASSETS_DIR}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
