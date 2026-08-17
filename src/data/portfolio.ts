export interface NarrativeBeat {
  id: string;
  label: string;
  title: string;
  body: string;
  step: number;
}

export interface EvidenceItem {
  label: string;
  path: string;
  description: string;
}

export interface ProjectCase {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  lede: string;
  clientValue: string;
  status: string;
  statusDetail: string;
  scenePrompt: string;
  beats: NarrativeBeat[];
  humanDecision: string;
  publicBoundary: string;
  evidence: EvidenceItem[];
  artifactLabel: string;
  proofNote: string;
}

export interface ReusableMethod {
  slug: string;
  title: string;
  technicalTitle: string;
  purpose: string;
  trigger: string;
  controlBoundary: string;
  outcome: string;
  projectSlugs: string[];
  evidencePath: string;
}

export const operatingSteps = [
  {
    index: "01",
    title: "Find the evidence",
    description: "I locate the facts, documents, dates, and people that the decision actually depends on.",
  },
  {
    index: "02",
    title: "Design the route",
    description: "I turn scattered work into explicit stages, owners, artifacts, and return paths.",
  },
  {
    index: "03",
    title: "Keep judgement visible",
    description: "The system stops at missing evidence, exceptions, and decisions that still belong to a person.",
  },
  {
    index: "04",
    title: "Release with proof",
    description: "Only a checked output moves forward, with its evidence and limitations still attached.",
  },
] as const;

export const cases: ProjectCase[] = [
  {
    slug: "onboarding",
    index: "01",
    eyebrow: "Flagship / AR, CAR, and fund onboarding",
    title: "A complex applicant should never look complete by accident.",
    shortTitle: "Evidence-gated onboarding",
    lede:
      "I designed an onboarding control system that lets specialist work move in parallel without allowing a missing document, contradiction, or unfinished human task to disappear inside a confident summary.",
    clientValue:
      "The client gets a clearer path from first inquiry to a defensible human decision, with fewer hidden gaps and a precise route back when the case is not ready.",
    status: "A working control pattern with mixed automated and manual stages",
    statusDetail:
      "The narrow control interfaces and local gates were built. Broader lifecycle exports were recorded inactive, and the asynchronous report path had not completed end-to-end validation at the source cut-off.",
    scenePrompt: "Watch one applicant become a case-specific evidence plan, split into accountable lanes, and reconverge before a decision can move forward.",
    beats: [
      {
        id: "situation",
        label: "The client situation",
        title: "The case arrives in pieces.",
        body:
          "An individual, corporate representative, or fund can arrive with different entities, documents, intended activities, legal questions, and manual prerequisites. One intake form cannot establish that the case is ready.",
        step: 1,
      },
      {
        id: "failure",
        label: "Why the old approach fails",
        title: "A tidy summary can hide unfinished work.",
        body:
          "When document checks, specialist research, and staff-owned milestones finish at different times, summarising too early creates false confidence. Silence from one lane can be mistaken for a clean result.",
        step: 2,
      },
      {
        id: "insight",
        label: "The systems insight",
        title: "Plan for the applicant, not the template.",
        body:
          "The route has to change with the applicant. After three early human reviews, the system creates the checklist, specialist scope, and required typed signals for that specific case.",
        step: 3,
      },
      {
        id: "design",
        label: "What I designed",
        title: "Parallel work with accountable returns.",
        body:
          "I separated document collection, specialist research, and manual evidence into bounded lanes. Each lane records its output, confidence, limitations, and the signal it owes the case.",
        step: 4,
      },
      {
        id: "mechanism",
        label: "How it works",
        title: "Every required signal must return exactly once.",
        body:
          "The lanes reconverge at a concurrency-safe completeness gate. A row lock and recorded trigger time prevent duplicate synthesis, while the case-specific signal set prevents irrelevant work from blocking the route.",
        step: 5,
      },
      {
        id: "decision",
        label: "Where a person decides",
        title: "Automation prepares the decision. It does not own it.",
        body:
          "Only a complete case produces the due-diligence report for the named reviewer. Missing or contradictory evidence returns to its owner; proceed, add conditions, decline, or request more information remains a human decision.",
        step: 6,
      },
      {
        id: "result",
        label: "The client result",
        title: "A faster route without an opaque score.",
        body:
          "The result is a traceable case that can move into engagement, contracts, and onboarding only when its evidence and human prerequisites are visible. The client can see why the case advanced or exactly why it stopped.",
        step: 7,
      },
    ],
    humanDecision:
      "Early go or no-go reviews, the final due-diligence decision, conditions, engagement, and activation prerequisites remain with named people.",
    publicBoundary:
      "The public portfolio excludes applicant identities, live case records, credentials, confidential documents, and private policies. It also preserves the recorded deployment and testing limitations.",
    evidence: [
      {
        label: "Workflow specification",
        path: "portfolio-evidence/workflows/assessment-automation/evidence/workflow-specification.md",
        description: "Defines the bounded fan-out, typed-signal gate, operating boundary, and supported outputs.",
      },
      {
        label: "Source map",
        path: "portfolio-evidence/workflows/assessment-automation/evidence/source-map.md",
        description: "Records which controls were deployed, inactive, manual, or untested at the evidence cut-off.",
      },
      {
        label: "Generated workflow chart",
        path: "portfolio-evidence/workflows/assessment-automation/evidence/diagrams/assessment-automation-workflow-diagram.png",
        description: "Shows the applicant-specific plan, three evidence lanes, exact-once gate, decision, and correction route.",
      },
    ],
    artifactLabel: "Open the full onboarding architecture",
    proofNote:
      "The chart is the topology reference for this scene. The curated public package contains 11 redacted workflow exports and preserves the recorded inactive and untested boundaries.",
  },
  {
    slug: "advice-documents",
    index: "02",
    eyebrow: "Digital asset advice documents",
    title: "Generating a document is easy. Releasing the right one is not.",
    shortTitle: "Controlled document production",
    lede:
      "I built a deterministic production path that keeps reviewed client facts, advice decisions, source templates, Word structures, and adviser review connected instead of treating a generated file as the finish line.",
    clientValue:
      "The client gets repeatable document production with correction at the responsible source, preserved template structures, and a clear adviser-controlled handoff.",
    status: "Implemented through multiple controlled releases",
    statusDetail:
      "Public code demonstrates placeholder handling, section removal, visible-text checks, and DOCX package inspection. Private records document later release outcomes without exposing client material.",
    scenePrompt: "Watch governed inputs become three review artifacts, pass a source gate, fill the preserved Word template, and wait for adviser release.",
    beats: [
      { id: "situation", label: "The client situation", title: "Reviewed facts still arrive in different source layers.", body: "Client facts, the advice decision, and a versioned source template each answer a different question. A dependable document has to preserve their authority and their order.", step: 1 },
      { id: "failure", label: "Why the old approach fails", title: "A file can open and still be unsafe to release.", body: "Manual copy-paste and one-pass generation can leave unresolved markers, stale conditional sections, broken Word relationships, or a visually plausible document built from inconsistent inputs.", step: 2 },
      { id: "insight", label: "The systems insight", title: "Repair the source, never the generated symptom.", body: "The reliable route is a source hierarchy. Repeated defects return to the highest responsible layer, so the next document is corrected by design rather than patched by hand.", step: 3 },
      { id: "design", label: "What I designed", title: "One deterministic assembly line.", body: "I connected structured fact-find and decision records to predictable derivation rules, placeholder handling, and heading-bounded section removal before any Word document is filled.", step: 4 },
      { id: "mechanism", label: "How it works", title: "Three artifacts expose the source before release.", body: "The assembly fans out into advice Markdown, record Markdown, and a merged-input audit snapshot. A source gate must clear before the preserved branded Word template enters the release path.", step: 5 },
      { id: "decision", label: "Where a person decides", title: "Quality controls end in adviser judgement.", body: "Package health, visible text, relationships, styles, media, document variant, and rendered pages are checked. Open suitability, authority, or compliance questions block release until an adviser resolves them.", step: 6 },
      { id: "result", label: "The client result", title: "Dependable documents, not disposable drafts.", body: "The client receives a document that can be reproduced and reviewed without losing the source trail. If a defect returns, the team knows which layer owns the correction.", step: 7 },
    ],
    humanDecision: "An adviser scopes the work, resolves suitability and authority questions, explains the document, and records the final review.",
    publicBoundary: "Client data, advice content, commercial templates, credentials, internal terminology, logos, and confidential reviewer material are excluded.",
    evidence: [
      { label: "Workflow specification", path: "portfolio-evidence/workflows/advice-document-pipeline/evidence/workflow-specification.md", description: "Separates runnable public mechanics, documented controls, historical outcomes, and unsupported infrastructure claims." },
      { label: "Source map", path: "portfolio-evidence/workflows/advice-document-pipeline/evidence/source-map.md", description: "Explains the reviewed source lineage and the material excluded from publication." },
      { label: "Generated workflow chart", path: "portfolio-evidence/workflows/advice-document-pipeline/evidence/diagrams/advice-document-production-v2.png", description: "Shows governed inputs, deterministic assembly, the three-artifact fan-out, source gate, DOCX controls, and correction route." },
    ],
    artifactLabel: "Open the full document-production architecture",
    proofNote: "The public evidence proves production and validation mechanics. It does not imply financial-advice approval or an unpublished trigger, queue, retry service, or approval API.",
  },
  {
    slug: "research-reports",
    index: "03",
    eyebrow: "Evidence-first research reports",
    title: "A polished report is still weak when its evidence does not reconcile.",
    shortTitle: "Evidence-first report production",
    lede:
      "I designed a linear research workspace where the decision, source log, claim matrix, chart manifest, cached data, and final document agree before a report can be handed over.",
    clientValue:
      "The client gets a report that can be checked, challenged, and refreshed without reconstructing the research trail from scratch.",
    status: "Runnable staged workspace built from the original production chain",
    statusDetail: "The public scripts create and validate research controls. They do not perform the underlying research or independently verify a claim.",
    scenePrompt: "Follow the linear chain. Structure never jumps ahead of evidence, and the final gate can stop the release rather than force a conclusion.",
    beats: [
      { id: "situation", label: "The client situation", title: "The report begins with a decision, not a topic.", body: "Long-form research has to serve a specific audience, scope, cut-off, and decision. Those constraints determine what evidence and exhibits the work actually needs.", step: 1 },
      { id: "failure", label: "Why the old approach fails", title: "Structure and polish can impersonate certainty.", body: "A familiar outline can produce confident prose before the source record is complete. Charts can look persuasive even when their period, inputs, or claim relationship is unclear.", step: 2 },
      { id: "insight", label: "The systems insight", title: "Make evidence products before narrative products.", body: "A source log, context pack, claim matrix, and chart manifest have to exist before the final report. That forces every important sentence and exhibit to earn its place.", step: 3 },
      { id: "design", label: "What I designed", title: "A clean, staged research workspace.", body: "I turned the original script chain into a reusable sequence that selects the report architecture, stages a clean workspace, captures sources and context, and creates the claim and exhibit contracts.", step: 4 },
      { id: "mechanism", label: "How it works", title: "Research advances in one controlled line.", body: "Cached evidence feeds the evidence-led draft and chart set. Weak support narrows the claim at the matrix instead of becoming a routine box in the normal production path.", step: 5 },
      { id: "decision", label: "The release gate", title: "Sources, charts, citations, and cut-off must agree.", body: "If the final agreement check fails, the workflow stops and records the defect. It never forces a chart or a confident conclusion simply to complete the package.", step: 6 },
      { id: "result", label: "The client result", title: "A report with an update path built in.", body: "The client receives a reviewable DOCX and PDF package whose brief, source log, manifests, and cached evidence make future updates traceable instead of improvised.", step: 7 },
    ],
    humanDecision: "Researchers interpret the evidence and reviewers decide whether the supported claims and exhibits are ready for release.",
    publicBoundary: "Private drafts, proprietary theses, paid-source content, investment data, internal branding, and completed research text are excluded.",
    evidence: [
      { label: "Workflow specification", path: "portfolio-evidence/workflows/research-report-builder/evidence/workflow-specification.md", description: "Defines the linear evidence-first sequence, final agreement gate, and explicit research boundary." },
      { label: "Source map", path: "portfolio-evidence/workflows/research-report-builder/evidence/source-map.md", description: "Records the source workspace, published scripts, and excluded research materials." },
      { label: "Generated workflow chart", path: "portfolio-evidence/workflows/research-report-builder/evidence/diagrams/research-report-builder-workflow-diagram.png", description: "Shows the complete linear chain from decision brief to release or recorded defect." },
    ],
    artifactLabel: "Open the full research-production architecture",
    proofNote: "The report controls are runnable and inspectable; the public package deliberately does not claim that the scripts perform or verify the research itself.",
  },
  {
    slug: "content-seo",
    index: "04",
    eyebrow: "AI content, SEO, and publishing",
    title: "Publishing is a controlled state transition, not a WordPress click.",
    shortTitle: "Content operations and draft handoff",
    lede:
      "I designed a canonical article package that keeps research, links, copy, visuals, metadata, rendered HTML, and saved CMS state in agreement before the work is allowed to call itself posted.",
    clientValue:
      "The client gets safer publishing operations, clearer repair ownership, and an article package that remains useful outside the CMS interface.",
    status: "A public operating extract with executable preparation and audit tooling",
    statusDetail: "The public code demonstrates scaffolding, visual support, metadata synchronization, and operating controls. It does not claim ranking gains or autonomous publication.",
    scenePrompt: "Watch the article folder remain canonical while each downstream layer is checked in sequence and a failed state holds publication.",
    beats: [
      { id: "situation", label: "The client situation", title: "An article is more than its body copy.", body: "Search intent, approved links, evidence, visuals, metadata, HTML, and the CMS record all have to describe the same piece of work.", step: 1 },
      { id: "failure", label: "Why the old approach fails", title: "The editor can become a misleading source of truth.", body: "A successful upload says nothing about citation quality, internal links, visual review, saved metadata, or whether the CMS retained the values that were sent.", step: 2 },
      { id: "insight", label: "The systems insight", title: "Keep the complete article folder canonical.", body: "The durable source is a package that travels with its research record, source assets, metadata, checks, and state. WordPress is a controlled deployment destination, not the master copy.", step: 3 },
      { id: "design", label: "What I designed", title: "Separate controls for separate failure modes.", body: "I connected topic and live-link planning to a canonical scaffold, evidence-led drafting, local visual jobs, metadata synchronization, HTML validation, and CMS persistence checks.", step: 4 },
      { id: "mechanism", label: "How it works", title: "Each downstream state has to agree.", body: "Visuals can be rejected and regenerated. The WordPress draft is created only after metadata and dry-run HTML checks, then saved fields, media, routing, and tracking state are reconciled.", step: 5 },
      { id: "decision", label: "The release gate", title: "A failed layer holds posted status.", body: "The final gate requires content, source, link, visual, metadata, HTML, media, and CMS state to agree. A defect returns to its responsible layer and the downstream checks repeat.", step: 6 },
      { id: "result", label: "The client result", title: "A publishable package with repair ownership.", body: "The client can move content through review and CMS handoff without losing the evidence trail or hiding failures inside one generic quality check.", step: 7 },
    ],
    humanDecision: "Editors approve the topic, claims, links, visuals, and final release state. Failed gates identify the layer that must be repaired.",
    publicBoundary: "Live credentials, cookies, analytics, post IDs, site inventory, licensed media, article bodies, live HTML, and ranking or conversion claims are excluded.",
    evidence: [
      { label: "Workflow specification", path: "portfolio-evidence/workflows/ai-content-and-seo-system/evidence/workflow-specification.md", description: "Defines the canonical package, supported controls, final gate, and public operating boundary." },
      { label: "Source map", path: "portfolio-evidence/workflows/ai-content-and-seo-system/evidence/source-map.md", description: "Lists the public script lineage and the credentials, live data, and article material removed from publication." },
      { label: "Generated workflow chart", path: "portfolio-evidence/workflows/ai-content-and-seo-system/evidence/diagrams/ai-content-and-seo-system-workflow-diagram.png", description: "Shows the sequential publishing states, final all-state gate, pass output, and hold route." },
    ],
    artifactLabel: "Open the full publishing architecture",
    proofNote: "Workflow completion means a verified publishing state, not proof of ranking, traffic, conversion, or unattended publication.",
  },
  {
    slug: "market-intelligence",
    index: "05",
    eyebrow: "Weekly and monthly market intelligence",
    title: "One evidence base can answer two different client questions.",
    shortTitle: "Market intelligence production",
    lede:
      "I built a dated evidence workspace that feeds a fast weekly recap and a full-month interpretive report without collapsing their different research, editorial, visual, and release contracts.",
    clientValue:
      "The client gets recurring reports that share traceable evidence but remain fit for their cadence, with source and visual indexes ready for review and refresh.",
    status: "Implemented source-to-chart-to-document production lanes",
    statusDetail: "Public scripts and synthetic fixtures demonstrate collection, normalization, chart generation, assembly, and QA. Private data, commentary, and templates remain excluded.",
    scenePrompt: "Watch one dated workspace split permanently into a weekly question and a monthly question, each with its own controls and finished report.",
    beats: [
      { id: "situation", label: "The client situation", title: "Weekly urgency and monthly meaning are different jobs.", body: "A weekly reader needs to know what changed now. A month-end reader needs to understand what the full period meant. Both still depend on the same raw market record.", step: 1 },
      { id: "failure", label: "Why the old approach fails", title: "Two report folders quickly become two versions of reality.", body: "When each cadence gathers and cleans its own evidence, dates drift, revisions duplicate, charts lose their source line, and the monthly report can miss days that the weekly process already saw.", step: 2 },
      { id: "insight", label: "The systems insight", title: "Share evidence, not editorial contracts.", body: "Raw responses, date conventions, revisions, incomplete candles, and source restrictions should reconcile once. After that, each cadence must preserve its own question and release standard.", step: 3 },
      { id: "design", label: "What I designed", title: "One dated workspace, two independent lanes.", body: "I connected collectors and research inputs to a retained evidence layer, then split the system into a seven-day lane and a month-end lane instead of reconverging them into one generic report process.", step: 4 },
      { id: "mechanism", label: "How it works", title: "The weekly lane selects; the monthly lane interprets.", body: "Weekly production aligns seven-day evidence, selects defensible deep dives, validates charts and pages, and releases a recap. Monthly production closes coverage gaps, builds a thesis and ledger, then scores and page-checks the full report.", step: 5 },
      { id: "decision", label: "The release controls", title: "Each lane can fail without corrupting the other.", body: "Weekly defects return to the source, draft, chart, or template layer. Missing month-end data, a weak thesis, an incomplete ledger, or a decorative visual blocks and rebuilds the monthly report.", step: 6 },
      { id: "result", label: "The client result", title: "Two useful publications from one traceable record.", body: "The client receives a reviewed weekly recap and a separate reviewed monthly report, each with linked evidence, data-bearing visuals, rendered pages, and its own release record.", step: 7 },
    ],
    humanDecision: "Editors choose the weekly deep dives, form the monthly thesis, interpret uncertainty, and approve each cadence-specific release.",
    publicBoundary: "Credentials, paid-source outputs, live commentary, commercial templates, branding, completed reports, and investment conclusions are excluded. Public charts use synthetic data.",
    evidence: [
      { label: "Workflow specification", path: "portfolio-evidence/workflows/market-report-automation/evidence/workflow-specification.md", description: "Defines the dated evidence controls, reconciliation gate, outputs, and public boundary." },
      { label: "Source map", path: "portfolio-evidence/workflows/market-report-automation/evidence/source-map.md", description: "Records the reviewed weekly and monthly production sources and publication exclusions." },
      { label: "Generated workflow chart", path: "portfolio-evidence/workflows/market-report-automation/evidence/diagrams/market-report-automation-workflow-diagram.png", description: "Shows the shared workspace and two independent cadence lanes with separate QA and outputs." },
    ],
    artifactLabel: "Open the full market-intelligence architecture",
    proofNote: "The two lanes share dated evidence but do not reconverge. Workflow output is research publication, not current market data or an investment decision.",
  },
];

export const methods: ReusableMethod[] = [
  {
    slug: "due-diligence-coordination",
    title: "Due-diligence coordination",
    technicalTitle: "Multi-Stream Due-Diligence Case Coordination",
    purpose: "I coordinate specialist work without collapsing it into one opaque answer. The method preserves source limits, reconciles contradictions, surfaces gaps, and prepares a human-reviewable synthesis.",
    trigger: "Use it when a case needs readiness inventory, specialist routing, triangulation, and a final evidence pack.",
    controlBoundary: "The method coordinates and synthesizes evidence; it cannot make the accountable approval decision.",
    outcome: "A structured evidence pack with coverage, flags, outstanding items, and the decision still required from the accountable owner.",
    projectSlugs: ["onboarding", "research-reports"],
    evidencePath: "portfolio-evidence/skills/coordinate-due-diligence-case/SKILL.md",
  },
  {
    slug: "evidence-gate",
    title: "Evidence gate",
    technicalTitle: "Evidence Completeness and Human-Control Gate",
    purpose: "I separate supplied claims from independent verification and record the precise evidence or specialist output that is still missing before synthesis can begin.",
    trigger: "Use it before substantive synthesis or release when required evidence may still be incomplete.",
    controlBoundary: "Missing evidence stops the route; proceed, decline, and exception decisions stay with an identified reviewer.",
    outcome: "Incomplete work stops with a concrete request list instead of becoming a falsely clean finding.",
    projectSlugs: ["onboarding", "advice-documents", "content-seo", "market-intelligence"],
    evidencePath: "portfolio-evidence/skills/gate-assessment-evidence/SKILL.md",
  },
  {
    slug: "contract-evaluation",
    title: "Governed contract evaluation",
    technicalTitle: "Governed Contract Automation Evaluation",
    purpose: "I test precedent-driven contract automation through blind cases, provenance, leakage controls, missing-fact handling, document separation, Word-package integrity, rendering, and audit reproducibility.",
    trigger: "Use it when a contract automation pipeline must be tested before legal review or operational reliance.",
    controlBoundary: "A passing technical evaluation permits human legal review only; it is not legal approval or autonomous release.",
    outcome: "A reproducible technical record that shows whether the pipeline is ready to enter human legal review.",
    projectSlugs: ["onboarding", "advice-documents"],
    evidencePath: "portfolio-evidence/skills/governed-contract-evaluation/SKILL.md",
  },
  {
    slug: "decision-council",
    title: "Decision council",
    technicalTitle: "Multi-Perspective Decision Council",
    purpose: "I pressure-test consequential decisions with independent specialist seats, common evidence, explicit cross-examination, bias controls, and a synthesis that preserves material dissent.",
    trigger: "Use it when one consequential decision benefits from competing expert views and explicit dissent.",
    controlBoundary: "The council surfaces arguments and uncertainty; the accountable owner still makes and records the decision.",
    outcome: "The owner receives the strongest arguments, open evidence, weak assumptions, and dissent without manufactured consensus.",
    projectSlugs: ["onboarding", "research-reports", "market-intelligence"],
    evidencePath: "portfolio-evidence/skills/orchestrate-decision-council/SKILL.md",
  },
  {
    slug: "alpha-node-branding",
    title: "Governed brand application",
    technicalTitle: "Alpha Node Regulated Finance Brand Application",
    purpose: "I adapt approved content to governed identity rules through official asset selection, controlled type and color choices, medium-specific composition, and rendered inspection.",
    trigger: "Use it after content approval when a document, deck, web page, or campaign asset must follow a controlled identity.",
    controlBoundary: "Brand application does not approve underlying claims, grant publication rights, or expand rights to bundled source assets.",
    outcome: "A review-ready branded artifact whose visual quality does not outrun its content approval or asset rights.",
    projectSlugs: ["onboarding", "advice-documents", "research-reports", "content-seo", "market-intelligence"],
    evidencePath: "portfolio-evidence/skills/alpha-node-branding/SKILL.md",
  },
];

export const sourceNotes = {
  publicLibrary: { path: "portfolio-evidence/", note: "All portfolio claims are manually curated from the public evidence library. The website must not expose the local source archive." },
  projectEvidence: { path: "portfolio-evidence/workflows/<project>/evidence/", note: "Workflow specifications, source maps, and charts provide the evidence paths used by the five case studies." },
  methodEvidence: { path: "portfolio-evidence/skills/<method>/SKILL.md", note: "Method descriptions are grounded in public skill packages and preserve their control boundaries." },
  publicationRule: { path: "portfolio-evidence/dependencies/reference/disclosure/publication-policy.md", note: "Do not expose restricted material, credentials, client records, paid-source content, internal locations, or unsupported claims." },
} as const;
