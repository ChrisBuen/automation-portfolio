#!/usr/bin/env python3
"""
Shared helpers for article-specific visual builders.

These helpers support strict article-specific builders.
The old generic scaffold renderer is not an approved production path.
"""

from __future__ import annotations

import importlib
import json
import math
import re
from pathlib import Path
from typing import List, Sequence, Tuple


ROOT_DIR = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT_DIR / "articles"
DRAFT_ARTICLES_DIR = ARTICLES_DIR / "draft"
POSTED_ARTICLES_DIR = ARTICLES_DIR / "posted"
DEFAULT_BRAND_CONFIG = ROOT_DIR / "config" / "article-visual-brand.json"


def resolve_article_dir(raw_input: str) -> Path:
    candidate = Path(raw_input)
    candidate = candidate if candidate.is_absolute() else (ROOT_DIR / candidate)
    candidate = candidate.resolve()
    if not candidate.exists():
        normalized = raw_input.replace("\\", "/").strip("/")
        search_candidates = [
            (ARTICLES_DIR / normalized).resolve(),
            (DRAFT_ARTICLES_DIR / normalized).resolve(),
            (POSTED_ARTICLES_DIR / normalized).resolve(),
        ]
        if normalized.startswith("articles/"):
            suffix = normalized[len("articles/") :].strip("/")
            search_candidates.extend(
                [
                    (ARTICLES_DIR / suffix).resolve(),
                    (DRAFT_ARTICLES_DIR / suffix).resolve(),
                    (POSTED_ARTICLES_DIR / suffix).resolve(),
                ]
            )
        for search_candidate in search_candidates:
            if search_candidate.exists():
                candidate = search_candidate
                break
        else:
            raise SystemExit(f"Article path not found: {candidate}")
    if candidate.is_file():
        if candidate.name != "index.md":
            raise SystemExit("Pass a v2 article folder or its index.md file.")
        return candidate.parent
    return candidate


def load_pillow():
    try:
        image_module = importlib.import_module("PIL.Image")
        draw_module = importlib.import_module("PIL.ImageDraw")
        font_module = importlib.import_module("PIL.ImageFont")
    except ModuleNotFoundError as exc:
        raise SystemExit(
            "Pillow is required. Install it with `pip install -r scripts/requirements-wordpress.txt`."
        ) from exc
    return image_module, draw_module, font_module


def load_json(path: Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise SystemExit(f"Required file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid JSON in {path}: {exc}") from exc


def build_font_loader(font_module, config: dict):
    typography = config.get("typography", {})

    def get_font(size: int, role: str):
        candidates = typography.get(role, [])
        if not candidates:
            raise SystemExit(
                f"Brand config is missing required typography entries for role '{role}'."
            )
        attempted: list[str] = []
        for raw_path in candidates:
            font_path = Path(raw_path)
            if not font_path.is_absolute():
                font_path = (ROOT_DIR / font_path).resolve()
            attempted.append(str(font_path))
            if not font_path.exists():
                continue
            try:
                return font_module.truetype(str(font_path), size=size)
            except OSError:
                continue
        attempted_paths = ", ".join(attempted) if attempted else "<none>"
        raise SystemExit(
            f"Could not load required font for role '{role}'. "
            f"Tried: {attempted_paths}"
        )

    return get_font


def wrap_text(text: str, draw, font, max_width: int) -> List[str]:
    words = text.split()
    if not words:
        return [""]

    lines: List[str] = []
    current = words[0]
    for word in words[1:]:
        trial = f"{current} {word}"
        width = draw.textbbox((0, 0), trial, font=font)[2]
        if width <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def draw_multiline_text(
    draw,
    text: str,
    font,
    x: int,
    y: int,
    max_width: int,
    fill: str,
    line_gap: int,
) -> int:
    lines = wrap_text(text, draw, font, max_width)
    cursor_y = y
    for line in lines:
        draw.text((x, cursor_y), line, font=font, fill=fill)
        bbox = draw.textbbox((x, cursor_y), line, font=font)
        cursor_y = bbox[3] + line_gap
    return cursor_y


def rounded_panel(draw, box: Tuple[int, int, int, int], radius: int, fill: str) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def paste_brand_logo(image_module, image, brand: dict) -> None:
    logo_config = brand.get("logo", {})
    raw_path = str(logo_config.get("path") or "").strip()
    if not raw_path:
        return

    logo_path = Path(raw_path)
    if not logo_path.is_absolute():
        logo_path = (ROOT_DIR / logo_path).resolve()
    if not logo_path.exists():
        raise SystemExit(f"Configured brand logo not found: {logo_path}")

    try:
        logo = image_module.open(str(logo_path)).convert("RGBA")
    except OSError:
        raise SystemExit(f"Configured brand logo could not be opened: {logo_path}")

    max_width = int(logo_config.get("max_width", 220))
    max_height = int(logo_config.get("max_height", 120))
    margin = int(logo_config.get("margin", 48))
    scale = min(max_width / max(logo.width, 1), max_height / max(logo.height, 1), 1)
    resized = (
        max(1, int(logo.width * scale)),
        max(1, int(logo.height * scale)),
    )
    if hasattr(image_module, "Resampling"):
        resample = image_module.Resampling.LANCZOS
    else:
        resample = image_module.LANCZOS
    logo = logo.resize(resized, resample)

    target = image.convert("RGBA")
    x = target.width - margin - logo.width
    y = margin
    target.alpha_composite(logo, (x, y))

    if image.mode == "RGBA":
        image.alpha_composite(logo, (x, y))
        return
    image.paste(target.convert(image.mode))


def render_featured(image_module, draw_module, font_for, brand: dict, visual: dict, output_path: Path) -> None:
    width = int(brand["sizes"]["featured"]["width"])
    height = int(brand["sizes"]["featured"]["height"])
    palette = brand["palette"]
    spacing = int(brand["spacing"]["padding"])
    radius = int(brand["spacing"]["radius"])

    image = image_module.new("RGB", (width, height), palette["background"])
    draw = draw_module.Draw(image)

    rounded_panel(
        draw,
        (spacing, spacing, width - spacing, height - spacing),
        radius,
        palette["surface"],
    )
    paste_brand_logo(image_module, image, brand)

    heading_font = font_for(64, "heading")
    body_font = font_for(28, "body")
    chip_font = font_for(24, "body")
    small_font = font_for(20, "body")

    cursor_y = spacing + 48
    cursor_y = draw_multiline_text(
        draw,
        str(visual.get("title", "")),
        heading_font,
        spacing + 48,
        cursor_y,
        width - (spacing * 2) - 96,
        palette["text"],
        14,
    )
    cursor_y += 20
    cursor_y = draw_multiline_text(
        draw,
        str(visual.get("subtitle", "")),
        body_font,
        spacing + 48,
        cursor_y,
        width - (spacing * 2) - 96,
        palette["muted_text"],
        12,
    )

    highlights = [str(item) for item in visual.get("highlights", []) if str(item).strip()]
    chip_y = cursor_y + 30
    chip_x = spacing + 48
    chip_max_width = width - (spacing * 2) - 96
    chip_height = 54
    for highlight in highlights[:4]:
        chip_width = min(
            chip_max_width,
            draw.textbbox((0, 0), highlight, font=chip_font)[2] + 48,
        )
        if chip_x + chip_width > width - spacing - 48:
            chip_x = spacing + 48
            chip_y += chip_height + 16
        rounded_panel(
            draw,
            (chip_x, chip_y, chip_x + chip_width, chip_y + chip_height),
            22,
            palette["accent_soft"],
        )
        draw.text((chip_x + 24, chip_y + 14), highlight, font=chip_font, fill=palette["accent"])
        chip_x += chip_width + 16

    footer = str(visual.get("footer") or brand["brand"].get("site_name", "")).strip()
    if footer:
        draw.text(
            (spacing + 48, height - spacing - 56),
            footer,
            font=small_font,
            fill=palette["muted_text"],
        )

    image.save(output_path, format="WEBP", quality=92, method=6)


def render_stat_grid(image_module, draw_module, font_for, brand: dict, visual: dict, output_path: Path) -> None:
    width = int(brand["sizes"]["body"]["width"])
    height = int(brand["sizes"]["body"]["height"])
    palette = brand["palette"]
    spacing = int(brand["spacing"]["padding"])
    radius = int(brand["spacing"]["radius"])

    image = image_module.new("RGB", (width, height), palette["background"])
    draw = draw_module.Draw(image)

    title_font = font_for(46, "heading")
    stat_font = font_for(38, "heading")
    label_font = font_for(22, "body")
    source_font = font_for(18, "body")

    cursor_y = spacing
    cursor_y = draw_multiline_text(
        draw,
        str(visual.get("title", "")),
        title_font,
        spacing,
        cursor_y,
        width - (spacing * 2),
        palette["text"],
        12,
    )
    cursor_y += 24

    stats = [item for item in visual.get("stats", []) if isinstance(item, dict)]
    if not stats:
        raise SystemExit(f"Visual '{visual.get('id')}' is missing `stats`.")

    columns = 2
    gap = 28
    card_width = (width - (spacing * 2) - gap) // columns
    card_height = 270
    for index, stat in enumerate(stats[:4]):
        row = index // columns
        col = index % columns
        x = spacing + (card_width + gap) * col
        y = cursor_y + (card_height + gap) * row
        rounded_panel(draw, (x, y, x + card_width, y + card_height), radius, palette["surface"])
        value = str(stat.get("value", ""))
        label = str(stat.get("label", ""))
        source = str(stat.get("source", ""))
        draw.text((x + 28, y + 28), value, font=stat_font, fill=palette["accent"])
        next_y = draw_multiline_text(
            draw,
            label,
            label_font,
            x + 28,
            y + 110,
            card_width - 56,
            palette["text"],
            8,
        )
        if source:
            draw.text((x + 28, min(next_y + 18, y + card_height - 42)), source, font=source_font, fill=palette["muted_text"])

    image.save(output_path, format="WEBP", quality=92, method=6)


def render_process(image_module, draw_module, font_for, brand: dict, visual: dict, output_path: Path) -> None:
    width = int(brand["sizes"]["body"]["width"])
    height = int(brand["sizes"]["body"]["height"])
    palette = brand["palette"]
    spacing = int(brand["spacing"]["padding"])
    radius = int(brand["spacing"]["radius"])

    image = image_module.new("RGB", (width, height), palette["background"])
    draw = draw_module.Draw(image)

    title_font = font_for(44, "heading")
    step_font = font_for(24, "body")
    number_font = font_for(30, "heading")

    cursor_y = spacing
    cursor_y = draw_multiline_text(
        draw,
        str(visual.get("title", "")),
        title_font,
        spacing,
        cursor_y,
        width - (spacing * 2),
        palette["text"],
        12,
    )
    cursor_y += 24

    steps = [str(item) for item in visual.get("steps", []) if str(item).strip()]
    if not steps:
        raise SystemExit(f"Visual '{visual.get('id')}' is missing `steps`.")

    box_height = max(
        180,
        math.floor((height - cursor_y - spacing - ((len(steps) - 1) * 18)) / max(len(steps), 1)),
    )
    for index, step in enumerate(steps[:5], start=1):
        y = cursor_y + ((index - 1) * (box_height + 18))
        rounded_panel(draw, (spacing, y, width - spacing, y + box_height), radius, palette["surface"])
        rounded_panel(draw, (spacing + 24, y + 24, spacing + 88, y + 88), 32, palette["accent_soft"])
        draw.text((spacing + 44, y + 38), str(index), font=number_font, fill=palette["accent"])
        draw_multiline_text(
            draw,
            step,
            step_font,
            spacing + 120,
            y + 34,
            width - (spacing * 2) - 150,
            palette["text"],
            8,
        )

    image.save(output_path, format="WEBP", quality=92, method=6)


def build_markdown_block(visual: dict) -> str:
    alt_text = str(visual.get("alt") or visual.get("title") or visual.get("id") or "").strip()
    filename = str(visual.get("filename") or "").strip()
    caption = str(visual.get("caption") or "").strip()
    block = f"![{alt_text}]({filename})"
    if caption:
        block += f"\n*Caption: {caption}*"
    return block


def set_featured_image(markdown_text: str, filename: str) -> str:
    if not markdown_text.startswith("---\n"):
        return markdown_text

    parts = markdown_text.split("\n---\n", 1)
    if len(parts) != 2:
        return markdown_text

    frontmatter, body = parts
    if re.search(r"^featuredImage:\s*", frontmatter, flags=re.MULTILINE):
        frontmatter = re.sub(
            r"^featuredImage:\s*.*$",
            f'featuredImage: "{filename}"',
            frontmatter,
            flags=re.MULTILINE,
        )
    else:
        frontmatter = frontmatter + f'\nfeaturedImage: "{filename}"'

    return f"{frontmatter}\n---\n{body}"


def inject_visual_block(markdown_text: str, visual: dict) -> str:
    block = build_markdown_block(visual)
    filename = str(visual.get("filename") or "").strip()
    if filename:
        pattern = rf"!\[[^\]]*\]\({re.escape(filename)}\)(?:\n\*Caption: [^\n]*\*)?"
        if re.search(pattern, markdown_text):
            return re.sub(pattern, block, markdown_text, count=1)
    marker = f"<!-- visual:{visual['id']} -->"
    if marker in markdown_text:
        return markdown_text.replace(marker, block)

    sources_heading = "\n## Sources"
    if sources_heading in markdown_text:
        return markdown_text.replace(sources_heading, f"\n{block}\n\n## Sources", 1)
    return markdown_text.rstrip() + f"\n\n{block}\n"


def resolve_brand_config(brand_config_path: str | Path | None) -> Path:
    if brand_config_path is None:
        return DEFAULT_BRAND_CONFIG
    candidate = Path(brand_config_path)
    if not candidate.is_absolute():
        candidate = (ROOT_DIR / candidate).resolve()
    return candidate


def generate_article_visuals(
    article_dir: Path,
    visuals: Sequence[dict],
    brand_config_path: str | Path | None = None,
) -> int:
    raise SystemExit(
        "The generic shared renderer is disabled. "
        "Rewrite build_article_visuals.py into an article-specific Playwright-based builder."
    )
