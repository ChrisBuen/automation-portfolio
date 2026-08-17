#!/usr/bin/env python3
"""Create a research brief template."""

from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--topic", required=True)
    parser.add_argument("--audience", default="decision-maker")
    parser.add_argument("--archetype", default="to be selected")
    parser.add_argument("--output", default="research_brief.md")
    args = parser.parse_args()

    path = Path(args.output)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        f"""# Research Brief

Report date: {date.today().isoformat()}

## Topic

{args.topic}

## Audience

{args.audience}

## Proposed Archetype

{args.archetype}

## Decision Context

- What decision should this report support?
- What should the reader be able to do after reading it?

## Scope

- Geography:
- Time horizon:
- Included topics:
- Excluded topics:

## Source Plan

- Primary sources:
- Datasets:
- Expert or analytical sources:
- Sources to avoid:

## Output Requirements

- Format:
- Target length:
- Exhibits needed:
- Branding:

## Open Questions

- 
""",
        encoding="utf-8",
    )
    print(path)


if __name__ == "__main__":
    main()
