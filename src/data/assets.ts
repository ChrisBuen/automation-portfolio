const assetUrl = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export interface DownloadArtifact {
  title: string;
  description: string;
  href: string;
  filename: string;
  type: "PDF";
  sourcePath: string;
}

export const downloads: DownloadArtifact[] = [
  {
    title: "Automation portfolio brief",
    description: "A compact orientation to the systems, controls, and reusable capabilities.",
    href: assetUrl("downloads/chrisbuen-ai-automation-brief.pdf"),
    filename: "chrisbuen-ai-automation-brief.pdf",
    type: "PDF",
    sourcePath: "portfolio-evidence/dependencies/reference/portfolio-documents/chrisbuen-ai-automation-brief.pdf",
  },
  {
    title: "Complete automation casebook",
    description: "The extended portfolio narrative with project context and implementation detail.",
    href: assetUrl("downloads/chrisbuen-ai-automation-casebook.pdf"),
    filename: "chrisbuen-ai-automation-casebook.pdf",
    type: "PDF",
    sourcePath: "portfolio-evidence/dependencies/reference/portfolio-documents/chrisbuen-ai-automation-casebook.pdf",
  },
];

export const evidenceAppendix = {
  title: "Project evidence appendix",
  href: assetUrl("downloads/chrisbuen-project-evidence-appendix.pdf"),
  filename: "chrisbuen-project-evidence-appendix.pdf",
  sourcePath: "portfolio-evidence/dependencies/reference/portfolio-documents/chrisbuen-project-evidence-appendix.pdf",
};

export interface DiagramAsset {
  small: string;
  large: string;
  sourcePath: string;
  alt: string;
  width: number;
  height: number;
}

export const caseDiagrams: Record<string, DiagramAsset> = {
  onboarding: {
    small: assetUrl("evidence/assessment-automation-1600.webp"),
    large: assetUrl("evidence/assessment-automation-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/assessment-automation/evidence/diagrams/assessment-automation-workflow-diagram.png",
    alt: "Assessment lifecycle from applicant intake through evidence fan-in, human decision, and controlled onboarding.",
    width: 1600,
    height: 856,
  },
  "advice-documents": {
    small: assetUrl("evidence/advice-document-pipeline-1600.webp"),
    large: assetUrl("evidence/advice-document-pipeline-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/advice-document-pipeline/evidence/diagrams/advice-document-production-v2.png",
    alt: "Advice document production from reviewed inputs through deterministic assembly, quality gates, and adviser delivery.",
    width: 1600,
    height: 583,
  },
  "research-reports": {
    small: assetUrl("evidence/research-report-builder-1600.webp"),
    large: assetUrl("evidence/research-report-builder-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/research-report-builder/evidence/diagrams/research-report-builder-workflow-diagram.png",
    alt: "Evidence-first research production from decision brief through claims, charts, document assembly, and release review.",
    width: 1600,
    height: 579,
  },
  "content-seo": {
    small: assetUrl("evidence/ai-content-and-seo-system-1600.webp"),
    large: assetUrl("evidence/ai-content-and-seo-system-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/ai-content-and-seo-system/evidence/diagrams/ai-content-and-seo-system-workflow-diagram.png",
    alt: "Editorial system from topic planning through evidence, visuals, SEO checks, and controlled CMS draft publishing.",
    width: 1600,
    height: 856,
  },
  "market-intelligence": {
    small: assetUrl("evidence/market-report-automation-1600.webp"),
    large: assetUrl("evidence/market-report-automation-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/market-report-automation/evidence/diagrams/market-report-automation-workflow-diagram.png",
    alt: "Recurring market intelligence system from dated evidence collection through reporting, visual QA, and source retention.",
    width: 1600,
    height: 856,
  },
};

export const caseDecisionDiagrams: Record<string, DiagramAsset> = {
  onboarding: {
    small: assetUrl("evidence/assessment-quality-decision-tree-1600.webp"),
    large: assetUrl("evidence/assessment-quality-decision-tree-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/assessment-automation/evidence/diagrams/assessment-quality-decision-tree.png",
    alt: "Onboarding quality decision tree showing pass gates, failure returns, correction ownership, and the final human-controlled onboarding decision.",
    width: 1600,
    height: 856,
  },
  "advice-documents": {
    small: assetUrl("evidence/advice-quality-decision-tree-1600.webp"),
    large: assetUrl("evidence/advice-quality-decision-tree-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/advice-document-pipeline/evidence/diagrams/advice-quality-decision-tree.png",
    alt: "Advice document quality decision tree showing independent source, blocker, package, rendered-review, and adviser-release gates with responsible-layer returns.",
    width: 1600,
    height: 856,
  },
  "research-reports": {
    small: assetUrl("evidence/research-quality-decision-tree-1600.webp"),
    large: assetUrl("evidence/research-quality-decision-tree-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/research-report-builder/evidence/diagrams/research-quality-decision-tree.png",
    alt: "Research report quality decision tree showing evidence, claim, exhibit, citation, cut-off, document, and release checks with defect returns.",
    width: 1600,
    height: 856,
  },
  "content-seo": {
    small: assetUrl("evidence/content-publishing-quality-decision-tree-1600.webp"),
    large: assetUrl("evidence/content-publishing-quality-decision-tree-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/ai-content-and-seo-system/evidence/diagrams/content-publishing-quality-decision-tree.png",
    alt: "Content publishing quality decision tree showing editorial, link, visual, metadata, HTML, media, CMS, and saved-state checks before posted status.",
    width: 1600,
    height: 856,
  },
  "market-intelligence": {
    small: assetUrl("evidence/market-intelligence-quality-decision-tree-1600.webp"),
    large: assetUrl("evidence/market-intelligence-quality-decision-tree-3200.webp"),
    sourcePath: "portfolio-evidence/workflows/market-report-automation/evidence/diagrams/market-intelligence-quality-decision-tree.png",
    alt: "Market intelligence quality decision tree showing source, period, chart, editorial, document, and cadence-specific release checks with correction paths.",
    width: 1600,
    height: 856,
  },
};

export const assetProvenance = [
  ...downloads.map(({ title, href, sourcePath }) => ({ title, href, sourcePath })),
  { title: evidenceAppendix.title, href: evidenceAppendix.href, sourcePath: evidenceAppendix.sourcePath },
  ...Object.entries(caseDiagrams).map(([title, value]) => ({ title, href: value.small, sourcePath: value.sourcePath })),
  ...Object.entries(caseDecisionDiagrams).map(([title, value]) => ({ title: `${title}-decision-tree`, href: value.small, sourcePath: value.sourcePath })),
];
