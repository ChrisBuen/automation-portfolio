export interface AtlasJourneyStep {
  index: string;
  title: string;
  detail: string;
}

export interface WorkflowAtlasCopy {
  visualArgument: string;
  systemQuestion: string;
  systemDescription: string;
  decisionQuestion: string;
  decisionDescription: string;
  journey: AtlasJourneyStep[];
}

export const workflowAtlases: Record<string, WorkflowAtlasCopy> = {
  onboarding: {
    visualArgument:
      "Applicant-specific evidence can move in parallel without becoming a premature decision, because every required signal must reconverge before a named person can proceed.",
    systemQuestion: "How does a fragmented application become a decision-ready case?",
    systemDescription:
      "The system map follows intake through three early reviews, a case-specific evidence plan, three accountable work lanes, an exact-once completeness gate, the due-diligence report, and controlled downstream onboarding.",
    decisionQuestion: "Where can the case stop, and who owns the correction?",
    decisionDescription:
      "The decision tree separates early review, lane completion, signal completeness, evidentiary support, and human prerequisites. A failed gate returns the exact gap instead of treating silence as a clean finding.",
    journey: [
      { index: "01", title: "Route the applicant", detail: "Record the case and complete the early human reviews." },
      { index: "02", title: "Build the evidence plan", detail: "Select the checklist, specialists, and required typed signals." },
      { index: "03", title: "Run accountable lanes", detail: "Documents, specialist work, and manual evidence move in parallel." },
      { index: "04", title: "Reconverge exactly once", detail: "The case-specific signal set must be complete without duplicate synthesis." },
      { index: "05", title: "Prepare the decision", detail: "A due-diligence report reaches the named human reviewer." },
      { index: "06", title: "Control the handoff", detail: "Only approved prerequisites move into engagement and onboarding." },
    ],
  },
  "advice-documents": {
    visualArgument:
      "A dependable advice document is produced by preserving source authority, inspecting the generated Word package, and returning defects to the layer that created them.",
    systemQuestion: "How do reviewed inputs become a controlled document release?",
    systemDescription:
      "The system map shows governed facts, decisions, and templates converging into deterministic assembly, three review artifacts, a preserved Word document, release controls, and an adviser-controlled handoff.",
    decisionQuestion: "What must be true before the document can be issued?",
    decisionDescription:
      "The decision tree tests scope, derived sources, unresolved blockers, Word-package integrity, the correct document variant, rendered pages, and adviser review as separate release responsibilities.",
    journey: [
      { index: "01", title: "Govern the inputs", detail: "Keep reviewed facts, advice decisions, and versioned templates distinct." },
      { index: "02", title: "Assemble deterministically", detail: "Flatten data, apply rules, resolve markers, and remove inapplicable sections." },
      { index: "03", title: "Expose the source", detail: "Produce advice, record, and merged-input artifacts for review." },
      { index: "04", title: "Direct-fill Word", detail: "Preserve tables, styles, relationships, and media in the approved template." },
      { index: "05", title: "Run release controls", detail: "Inspect package health, visible text, variant, and rendered pages." },
      { index: "06", title: "Hand off to the adviser", detail: "Release remains blocked until accountable judgement is recorded." },
    ],
  },
  "research-reports": {
    visualArgument:
      "Report structure cannot substitute for evidence when the brief, sources, claims, exhibits, draft, and release package advance through one inspectable production line.",
    systemQuestion: "How does a decision brief become a reviewable research package?",
    systemDescription:
      "The system map follows the ordered production chain from decision and audience through architecture, workspace, source records, evidence matrices, research passes, exhibits, document assembly, and final agreement.",
    decisionQuestion: "What prevents polish from outrunning the evidence?",
    decisionDescription:
      "The decision tree shows where unsupported claims, mismatched charts, weak citations, inconsistent cut-offs, or broken document pages stop release and return to the evidence layer.",
    journey: [
      { index: "01", title: "Define the decision", detail: "Set the audience, scope, period, and report archetype." },
      { index: "02", title: "Stage the workspace", detail: "Create clean source, context, exhibit, and output boundaries." },
      { index: "03", title: "Build the evidence record", detail: "Capture sources, dates, claims, and chart requirements before prose." },
      { index: "04", title: "Research in passes", detail: "Cache evidence and narrow claims when support is weaker than expected." },
      { index: "05", title: "Compose the package", detail: "Draft the report and data-linked exhibit set from approved claims." },
      { index: "06", title: "Reconcile before release", detail: "Cut-off, citations, claims, charts, and pages must agree." },
    ],
  },
  "content-seo": {
    visualArgument:
      "The article folder remains canonical while editorial, visual, metadata, HTML, media, and CMS states are verified independently before posted status is allowed.",
    systemQuestion: "How does an article move from intent to a verified CMS state?",
    systemDescription:
      "The system map follows topic and link planning into a canonical article package, evidence-led drafting, visual review, metadata and HTML checks, WordPress draft creation, persistence reconciliation, and the final state gate.",
    decisionQuestion: "What happens when one publishing layer disagrees?",
    decisionDescription:
      "The decision tree holds posted status when content, sources, links, visuals, metadata, HTML, media, routing, or saved CMS fields fail, and returns the defect to the responsible layer.",
    journey: [
      { index: "01", title: "Plan the article", detail: "Align search intent, topic cluster, approved links, and source assets." },
      { index: "02", title: "Create the canonical package", detail: "Keep copy, research, visuals, metadata, checks, and state together." },
      { index: "03", title: "Review content and visuals", detail: "Cite claims and reject visual work that does not support the article." },
      { index: "04", title: "Validate the deployable form", detail: "Synchronize metadata and inspect the dry-run HTML." },
      { index: "05", title: "Create the CMS draft", detail: "Send the controlled package to WordPress without making it canonical." },
      { index: "06", title: "Reconcile saved state", detail: "Only verified content, media, fields, and routing can become posted." },
    ],
  },
  "market-intelligence": {
    visualArgument:
      "One dated evidence workspace can support two reporting cadences without collapsing their different client questions, editorial contracts, or release decisions.",
    systemQuestion: "How does shared market evidence produce two distinct client outputs?",
    systemDescription:
      "The system map shows collection and normalization happening once before the evidence splits into a weekly lane for what changed now and a monthly lane for what the full period meant.",
    decisionQuestion: "Why must each cadence clear its own release path?",
    decisionDescription:
      "The decision tree keeps source, period, chart, thesis, document, and page checks tied to the cadence that owns them. A weekly pass cannot conceal a monthly evidence gap, or the reverse.",
    journey: [
      { index: "01", title: "Collect dated evidence", detail: "Gather news, events, candles, flows, and permitted analysis sources." },
      { index: "02", title: "Normalize once", detail: "Retain raw responses, reconcile dates, deduplicate, and disclose gaps." },
      { index: "03", title: "Split the cadence", detail: "Share the evidence base without sharing the editorial job." },
      { index: "04", title: "Answer the weekly question", detail: "Explain what changed now through selected developments and charts." },
      { index: "05", title: "Answer the monthly question", detail: "Build a full-period thesis, ledger, and exhibit set." },
      { index: "06", title: "Release separately", detail: "Each report clears its own evidence, chart, document, and page checks." },
    ],
  },
};
