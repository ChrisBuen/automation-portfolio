"""Template mechanics for the advice-document pipeline.

Domain-specific scoring and regulated advice language are deliberately absent.
"""

from __future__ import annotations

import re
from collections.abc import Mapping

PLACEHOLDER_RE = re.compile(r"\[([A-Za-z0-9_]+)\]")


def flatten(data: Mapping[str, object], prefix: str = "") -> dict[str, object]:
    result: dict[str, object] = {}
    for key, value in data.items():
        name = f"{prefix}_{key}" if prefix else key
        if isinstance(value, Mapping):
            result.update(flatten(value, name))
        else:
            result[name] = value
    return result


def render_placeholders(text: str, values: Mapping[str, object]) -> str:
    def replace(match: re.Match[str]) -> str:
        key = match.group(1)
        value = values.get(key)
        return match.group(0) if value is None else str(value)

    return PLACEHOLDER_RE.sub(replace, text)


def remove_section(text: str, heading: str) -> str:
    lines = text.splitlines()
    start = next((i for i, line in enumerate(lines) if line.strip() == heading.strip()), None)
    if start is None:
        return text
    level = len(heading) - len(heading.lstrip("#"))
    end = len(lines)
    for index in range(start + 1, len(lines)):
        candidate = lines[index]
        if candidate.startswith("#"):
            candidate_level = len(candidate) - len(candidate.lstrip("#"))
            if candidate_level <= level:
                end = index
                break
    return "\n".join(lines[:start] + lines[end:]).strip() + "\n"


def unresolved_placeholders(text: str) -> list[str]:
    return sorted({match.group(0) for match in PLACEHOLDER_RE.finditer(text)})
