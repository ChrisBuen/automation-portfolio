#!/usr/bin/env python3
"""Create a Markdown report skeleton from a supported archetype."""

from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path


ARCHETYPES = {
    "investment-memo": [
        "Executive Summary",
        "Investment Question",
        "Opportunity Overview",
        "Market Context",
        "Thesis Drivers",
        "Evidence and Key Metrics",
        "Economics or Strategic Value",
        "Risks and Mitigants",
        "Counterarguments",
        "Scenarios and Watchlist",
        "Recommendation or Decision Framework",
        "Sources and Appendix",
    ],
    "market-landscape": [
        "Executive Summary",
        "Market Definition and Scope",
        "Market Structure and Value Chain",
        "Demand Drivers",
        "Supply, Infrastructure, and Constraints",
        "Key Players and Segments",
        "Market Size and Growth Evidence",
        "Regulation and Policy Context",
        "Competitive Dynamics",
        "Opportunities and Risks",
        "Outlook and Watchlist",
        "Sources and Appendix",
    ],
    "company-profile": [
        "Executive Summary",
        "Company Snapshot",
        "Business Model",
        "Products and Customers",
        "Market Position",
        "Financial and Operating Indicators",
        "Management and Governance",
        "Competitive Positioning",
        "Recent Developments",
        "Risks and Red Flags",
        "Assessment",
        "Sources and Appendix",
    ],
    "technology-explainer": [
        "Executive Summary",
        "Problem and Context",
        "How The System Works",
        "Technical Architecture",
        "Current State of Adoption",
        "Use Cases",
        "Competing Approaches",
        "Strengths and Constraints",
        "Recent Developments",
        "Risks and Open Questions",
        "Implications",
        "Sources and Appendix",
    ],
    "regulatory-brief": [
        "Executive Summary",
        "Regulatory Question",
        "Jurisdiction and Scope",
        "Current Legal Framework",
        "Relevant Regulators and Guidance",
        "Recent Developments",
        "Practical Compliance Implications",
        "Risk Areas",
        "Open Questions",
        "Action Items or Decision Framework",
        "Sources and Appendix",
    ],
    "competitive-analysis": [
        "Executive Summary",
        "Category Definition",
        "Competitor Set and Selection Logic",
        "Comparison Matrix",
        "Positioning and Messaging",
        "Product or Service Capabilities",
        "Distribution and Partnerships",
        "Pricing or Business Model",
        "Strengths, Weaknesses, and Gaps",
        "Strategic Options",
        "Recommended Moves",
        "Sources and Appendix",
    ],
    "due-diligence-report": [
        "Executive Summary",
        "Scope and Methodology",
        "Entity or Opportunity Overview",
        "Ownership, Governance, and People",
        "Product, Operations, and Infrastructure",
        "Market and Commercial Position",
        "Financial, Legal, and Regulatory Review",
        "Reputation, Litigation, and Adverse Media",
        "Key Risks and Mitigants",
        "Open Items",
        "Recommendation",
        "Evidence Appendix",
    ],
    "strategic-options-paper": [
        "Executive Summary",
        "Decision Context",
        "Current State",
        "Strategic Objective",
        "Option Set",
        "Option Comparison",
        "Risks, Costs, and Dependencies",
        "Recommended Path",
        "Implementation Considerations",
        "Watchlist and Decision Triggers",
        "Sources and Appendix",
    ],
    "briefing-note": [
        "Bottom Line",
        "Context",
        "What Changed",
        "Evidence",
        "Implications",
        "Risks and Caveats",
        "Next Questions",
        "Sources",
    ],
}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archetype", choices=sorted(ARCHETYPES))
    parser.add_argument("output", nargs="?", default="output/report.md")
    parser.add_argument("--title", default="Research Report")
    args = parser.parse_args()

    path = Path(args.output)
    path.parent.mkdir(parents=True, exist_ok=True)

    lines = [f"# {args.title}", "", f"Date: {date.today().isoformat()}", ""]
    for heading in ARCHETYPES[args.archetype]:
        lines.extend([f"## {heading}", "", "[Draft section. Add sourced evidence, interpretation, and implications.]", ""])
    path.write_text("\n".join(lines), encoding="utf-8")
    print(path)


if __name__ == "__main__":
    main()
