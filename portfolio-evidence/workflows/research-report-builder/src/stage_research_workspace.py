#!/usr/bin/env python3
"""Stage the research-report-builder skill into a clean research workspace."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


SKILL_DIR = Path(__file__).resolve().parents[1]


def copy_file(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def copy_tree_contents(source: Path, destination: Path) -> None:
    if not source.exists():
        return
    destination.mkdir(parents=True, exist_ok=True)
    for item in source.iterdir():
        if item.name == "__pycache__" or item.suffix == ".pyc":
            continue
        target = destination / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            copy_file(item, target)


def run_script(script: Path, *args: str) -> None:
    subprocess.run([sys.executable, str(script), *args], check=True)


def stage(target: Path, topic: str, audience: str, archetype: str) -> None:
    target.mkdir(parents=True, exist_ok=True)

    copy_tree_contents(SKILL_DIR / "references", target / "references")
    # The public package stores reusable scripts in `src/` rather than the
    # private skill package's `scripts/` folder.
    copy_tree_contents(SKILL_DIR / "src", target / "scripts")
    copy_tree_contents(SKILL_DIR / "assets", target / "assets")

    (target / "context" / "sources").mkdir(parents=True, exist_ok=True)
    (target / "output" / "exhibits").mkdir(parents=True, exist_ok=True)

    run_script(
        target / "scripts" / "create_research_brief.py",
        "--topic",
        topic,
        "--audience",
        audience,
        "--archetype",
        archetype,
        "--output",
        str(target / "research_brief.md"),
    )
    run_script(target / "scripts" / "create_source_log.py", str(target / "context" / "source_log.csv"))
    run_script(
        target / "scripts" / "create_evidence_matrix.py",
        str(target / "context" / "evidence_matrix.csv"),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", help="Target research workspace")
    parser.add_argument("--topic", default="Research topic to be defined")
    parser.add_argument("--audience", default="decision-maker")
    parser.add_argument("--archetype", default="to be selected")
    args = parser.parse_args()

    target = Path(args.target).expanduser().resolve()
    stage(target, args.topic, args.audience, args.archetype)
    print(target)


if __name__ == "__main__":
    main()
