"""Render a small SVG line chart from a validated CSV market series."""

from __future__ import annotations

import csv
import html
import sys
from datetime import date
from pathlib import Path


def load_series(path: Path) -> list[tuple[date, float]]:
    rows: list[tuple[date, float]] = []
    with path.open(encoding="utf-8", newline="") as handle:
        for item in csv.DictReader(handle):
            rows.append((date.fromisoformat(item["date"]), float(item["value"])))
    if len(rows) < 2:
        raise ValueError("At least two dated observations are required")
    if rows != sorted(rows):
        raise ValueError("Observations must be sorted by date")
    return rows


def render_svg(rows: list[tuple[date, float]], title: str = "Synthetic market index") -> str:
    width, height = 1000, 520
    left, top, plot_width, plot_height = 100, 115, 820, 290
    values = [value for _, value in rows]
    low, high = min(values), max(values)
    span = high - low or 1
    points = []
    for index, (_, value) in enumerate(rows):
        x = left + (plot_width * index / (len(rows) - 1))
        y = top + plot_height - ((value - low) / span * plot_height)
        points.append(f"{x:.1f},{y:.1f}")
    start, end = rows[0][0].isoformat(), rows[-1][0].isoformat()
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
<rect width="100%" height="100%" fill="#f4f1ea"/>
<text x="60" y="56" font-family="Arial" font-size="20" font-weight="700" fill="#17212b">{html.escape(title)}</text>
<text x="60" y="82" font-family="Arial" font-size="13" fill="#53606c">Fictional portfolio fixture • {start} to {end}</text>
<line x1="{left}" y1="{top + plot_height}" x2="{left + plot_width}" y2="{top + plot_height}" stroke="#9aa3aa"/>
<line x1="{left}" y1="{top}" x2="{left}" y2="{top + plot_height}" stroke="#9aa3aa"/>
<polyline points="{' '.join(points)}" fill="none" stroke="#0f766e" stroke-width="5" stroke-linejoin="round"/>
<text x="{left}" y="450" font-family="Arial" font-size="12" fill="#53606c">{start}</text>
<text x="{left + plot_width - 70}" y="450" font-family="Arial" font-size="12" fill="#53606c">{end}</text>
<text x="60" y="126" font-family="Arial" font-size="12" fill="#53606c">{high:.1f}</text>
<text x="60" y="405" font-family="Arial" font-size="12" fill="#53606c">{low:.1f}</text>
<text x="60" y="495" font-family="Arial" font-size="12" fill="#53606c">Generated from a validated CSV; no live or forecast value is represented.</text>
</svg>'''


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: generate_market_chart.py INPUT.csv OUTPUT.svg")
        return 2
    rows = load_series(Path(sys.argv[1]))
    Path(sys.argv[2]).write_text(render_svg(rows), encoding="utf-8")
    print(f"Rendered {len(rows)} observations to {sys.argv[2]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
