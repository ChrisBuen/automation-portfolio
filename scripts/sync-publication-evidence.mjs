import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const workspace = process.cwd();
const sourceRoot = path.resolve(workspace, "Portfolio Reference");
const destinationRoot = path.resolve(workspace, "portfolio-evidence");

const workflowPackages = [
  "assessment-automation",
  "advice-document-pipeline",
  "research-report-builder",
  "ai-content-and-seo-system",
  "market-report-automation",
];

const approvedWorkflowDiagramFiles = new Set([
  "workflows/assessment-automation/evidence/diagrams/assessment-automation-workflow-diagram.excalidraw",
  "workflows/assessment-automation/evidence/diagrams/assessment-automation-workflow-diagram.png",
  "workflows/assessment-automation/evidence/diagrams/assessment-quality-decision-tree.excalidraw",
  "workflows/assessment-automation/evidence/diagrams/assessment-quality-decision-tree.png",
  "workflows/assessment-automation/evidence/diagrams/diagram-quality-log.md",
  "workflows/advice-document-pipeline/evidence/diagrams/advice-document-production-v2.excalidraw",
  "workflows/advice-document-pipeline/evidence/diagrams/advice-document-production-v2.png",
  "workflows/advice-document-pipeline/evidence/diagrams/advice-quality-decision-tree.excalidraw",
  "workflows/advice-document-pipeline/evidence/diagrams/advice-quality-decision-tree.png",
  "workflows/advice-document-pipeline/evidence/diagrams/diagram-quality-log.md",
  "workflows/research-report-builder/evidence/diagrams/research-report-builder-workflow-diagram.excalidraw",
  "workflows/research-report-builder/evidence/diagrams/research-report-builder-workflow-diagram.png",
  "workflows/research-report-builder/evidence/diagrams/research-quality-decision-tree.excalidraw",
  "workflows/research-report-builder/evidence/diagrams/research-quality-decision-tree.png",
  "workflows/research-report-builder/evidence/diagrams/diagram-quality-log.md",
  "workflows/ai-content-and-seo-system/evidence/diagrams/ai-content-and-seo-system-workflow-diagram.excalidraw",
  "workflows/ai-content-and-seo-system/evidence/diagrams/ai-content-and-seo-system-workflow-diagram.png",
  "workflows/ai-content-and-seo-system/evidence/diagrams/content-publishing-quality-decision-tree.excalidraw",
  "workflows/ai-content-and-seo-system/evidence/diagrams/content-publishing-quality-decision-tree.png",
  "workflows/ai-content-and-seo-system/evidence/diagrams/diagram-quality-log.md",
  "workflows/market-report-automation/evidence/diagrams/market-report-automation-workflow-diagram.excalidraw",
  "workflows/market-report-automation/evidence/diagrams/market-report-automation-workflow-diagram.png",
  "workflows/market-report-automation/evidence/diagrams/market-intelligence-quality-decision-tree.excalidraw",
  "workflows/market-report-automation/evidence/diagrams/market-intelligence-quality-decision-tree.png",
  "workflows/market-report-automation/evidence/diagrams/diagram-quality-log.md",
]);

const methodPackages = [
  "coordinate-due-diligence-case",
  "gate-assessment-evidence",
  "governed-contract-evaluation",
  "orchestrate-decision-council",
];

const directFiles = [
  "dependencies/reference/disclosure/publication-policy.md",
  "dependencies/reference/portfolio-documents/chrisbuen-ai-automation-brief.pdf",
  "dependencies/reference/portfolio-documents/chrisbuen-ai-automation-casebook.pdf",
  "dependencies/reference/portfolio-documents/chrisbuen-project-evidence-appendix.pdf",
  "skills/alpha-node-branding/agents/openai.yaml",
  "skills/alpha-node-branding/references/brand-guidelines.md",
  "skills/alpha-node-branding/references/brand-tokens.json",
  "skills/alpha-node-branding/references/workflow-specification.md",
  "skills/alpha-node-branding/references/diagrams/diagram-quality-log.md",
  "skills/alpha-node-branding/references/diagrams/alpha-node-branding-skill-diagram.png",
  "skills/alpha-node-branding/references/diagrams/alpha-node-branding-skill-diagram.excalidraw",
];

const allowedExtensions = new Set([
  ".csv",
  ".excalidraw",
  ".json",
  ".md",
  ".mmd",
  ".png",
  ".py",
  ".svg",
  ".txt",
  ".yaml",
  ".yml",
]);

const blockedSegments = new Set([
  ".git",
  ".next",
  "__pycache__",
  "assets",
  "credentials",
  "executions",
  "node_modules",
  "private",
  "raw",
  "screenshots",
]);

const secretPatterns = [
  /BEGIN (?:RSA|OPENSSH|EC)? ?PRIVATE KEY/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /gh[opsu]_[A-Za-z0-9]{30,}/,
  /sk-(?:proj-)?[A-Za-z0-9_-]{24,}/,
  /AIza[0-9A-Za-z_-]{30,}/,
  /(?:file:\/\/\/)?[A-Za-z]:[\\/]+Users[\\/]+/i,
];

const entries = [];

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function normalize(relativePath) {
  return relativePath.replaceAll("\\", "/");
}

function assertInside(root, candidate, label) {
  const relative = path.relative(root, candidate);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} is outside its approved root: ${candidate}`);
  }
}

function isTextFile(filePath) {
  return /\.(?:csv|excalidraw|json|md|mmd|py|svg|txt|ya?ml)$/i.test(filePath);
}

async function copyApprovedFile(relativePath) {
  const normalized = normalize(relativePath);
  const source = path.resolve(sourceRoot, normalized);
  const destination = path.resolve(destinationRoot, normalized);
  assertInside(sourceRoot, source, "Source");
  assertInside(destinationRoot, destination, "Destination");

  const sourceInfo = await stat(source);
  if (!sourceInfo.isFile()) throw new Error(`Approved source is not a file: ${normalized}`);
  if (sourceInfo.size > 25 * 1024 * 1024) throw new Error(`Approved source exceeds 25 MB: ${normalized}`);

  const sourceBuffer = await readFile(source);
  let outputBuffer = sourceBuffer;
  if (isTextFile(source)) {
    const text = sourceBuffer.toString("utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(text)) throw new Error(`Potential secret or local path in ${normalized}: ${pattern}`);
    }
    outputBuffer = Buffer.from(text.replace(/\r\n?/g, "\n"), "utf8");
  }

  await mkdir(path.dirname(destination), { recursive: true });
  if (isTextFile(source)) await writeFile(destination, outputBuffer);
  else await cp(source, destination);
  entries.push({
    source: `Portfolio Reference/${normalized}`,
    destination: `portfolio-evidence/${normalized}`,
    bytes: outputBuffer.byteLength,
    sha256: digest(outputBuffer),
    sourceSha256: digest(sourceBuffer),
    ...(digest(outputBuffer) !== digest(sourceBuffer) ? { transform: "Text line endings normalized to LF." } : {}),
  });
}

async function writePublicExtract(relativePath, transform) {
  const normalized = normalize(relativePath);
  const source = path.resolve(sourceRoot, normalized);
  const destination = path.resolve(destinationRoot, normalized);
  assertInside(sourceRoot, source, "Source");
  assertInside(destinationRoot, destination, "Destination");

  const sourceBuffer = await readFile(source);
  const output = transform(sourceBuffer.toString("utf8")).replace(/\r\n?/g, "\n");
  if (!output || output === sourceBuffer.toString("utf8")) throw new Error(`Public extract transform did not run: ${normalized}`);
  for (const pattern of secretPatterns) {
    if (pattern.test(output)) throw new Error(`Potential secret or local path in transformed ${normalized}: ${pattern}`);
  }

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, output, "utf8");
  const outputBuffer = await readFile(destination);
  entries.push({
    source: `Portfolio Reference/${normalized}`,
    destination: `portfolio-evidence/${normalized}`,
    bytes: outputBuffer.byteLength,
    sha256: digest(outputBuffer),
    sourceSha256: digest(sourceBuffer),
    transform: "Public procedural extract; non-public asset instructions removed.",
  });
}

async function collectPackage(relativeRoot) {
  const absoluteRoot = path.resolve(sourceRoot, relativeRoot);
  assertInside(sourceRoot, absoluteRoot, "Package");

  async function visit(directory) {
    const children = await readdir(directory, { withFileTypes: true });
    for (const child of children) {
      if (child.isSymbolicLink()) throw new Error(`Symbolic link rejected: ${path.join(directory, child.name)}`);
      const absolute = path.join(directory, child.name);
      const relative = normalize(path.relative(sourceRoot, absolute));
      const segments = relative.toLowerCase().split("/");
      if (child.isDirectory()) {
        if (blockedSegments.has(child.name.toLowerCase())) continue;
        await visit(absolute);
        continue;
      }
      if (!child.isFile()) continue;
      if (segments.at(-1) === "workflow-diagram.png" || segments.at(-1) === "skill-diagram.png") continue;
      if (relative.includes("/evidence/diagrams/") && !approvedWorkflowDiagramFiles.has(relative)) continue;
      if (!allowedExtensions.has(path.extname(child.name).toLowerCase())) continue;
      await copyApprovedFile(relative);
    }
  }

  await visit(absoluteRoot);
}

const expectedDestination = path.resolve(workspace, "portfolio-evidence");
if (destinationRoot !== expectedDestination || path.basename(destinationRoot) !== "portfolio-evidence") {
  throw new Error(`Refusing to clean unexpected evidence destination: ${destinationRoot}`);
}

await rm(destinationRoot, { recursive: true, force: true });
await mkdir(destinationRoot, { recursive: true });

for (const packageName of workflowPackages) await collectPackage(`workflows/${packageName}`);
for (const packageName of methodPackages) await collectPackage(`skills/${packageName}`);
for (const relativePath of directFiles) await copyApprovedFile(relativePath);

await writePublicExtract("skills/alpha-node-branding/SKILL.md", (source) =>
  source
    .replace(
      "# Alpha Node Regulated Finance Brand Application",
      "# Alpha Node Regulated Finance Brand Application\n\n> **Public procedural extract:** Client brand books, logos, commercial fonts, source art, stock media, animation files, and the private asset index are deliberately excluded. This file documents the control method; it does not distribute or grant rights to the underlying assets.",
    )
    .replace(
      /## Core Workflow[\s\S]*?## Brand Foundation/,
      `## Core Workflow\n\n1. Read \`references/brand-guidelines.md\` before making design decisions.\n2. Use only identity assets that the rights holder has supplied and approved for the specific output.\n3. Apply the machine-readable controls in \`references/brand-tokens.json\`.\n4. Render the completed artifact and validate it against the checklist in this file before delivery.\n\n## Brand Foundation`,
    )
    .replace(
      /## Bundled Resources[\s\S]*?## Validation Checklist/,
      `## Public evidence included\n\n- \`references/brand-guidelines.md\`: concise brand rules and application guidance.\n- \`references/brand-tokens.json\`: machine-readable colors, typography, and voice notes.\n- \`references/workflow-specification.md\`: source-backed control sequence and publication boundary.\n- \`references/diagrams/\`: the public workflow diagram, editable source, and quality log.\n\nProduction assets are intentionally not part of this repository.\n\n## Validation Checklist`,
    ),
);

await writeFile(
  path.join(destinationRoot, "skills", "alpha-node-branding", "README.md"),
  `# Governed brand application — public extract\n\nThis package documents the brand-application control method cited by the portfolio. Start with [SKILL.md](SKILL.md), then inspect the [workflow specification](references/workflow-specification.md), [brand guidelines](references/brand-guidelines.md), [brand tokens](references/brand-tokens.json), and [workflow diagram](references/diagrams/alpha-node-branding-skill-diagram.png).\n\nClient brand books, logos, commercial fonts, source art, stock media, animations, asset indexes, and helper scripts are not included and no publication rights are implied.\n`,
  "utf8",
);

entries.sort((a, b) => a.destination.localeCompare(b.destination));

const readme = `# Public portfolio evidence

This directory is the curated, public evidence layer for the Chris Buen automation portfolio. It contains five source-backed workflow packages, five reusable method extracts, three redacted portfolio PDFs, and the publication policy that governs the selection.

The larger local \`Portfolio Reference/\` archive is deliberately excluded from Git. It contains private material, caches, commercial fonts, client brand assets, source artwork, video, and other files that are not approved for public distribution.

## Start here

- Browse \`workflows/\` for the five case-study specifications, source maps, implementation extracts, tests, samples, and workflow diagrams.
- Browse \`skills/\` for the five reusable operating methods cited by the site.
- Read \`dependencies/reference/disclosure/publication-policy.md\` for the public evidence boundary.
- Use \`publication-manifest.json\` to verify every copied file by source path, byte count, and SHA-256 digest.

## Rebuild this directory

From a local workspace that contains the private source archive, run \`npm run evidence\`. The command recreates this directory from an explicit package allowlist, rejects unsafe file classes and secret-like values, and never copies the full archive.

The Alpha Node branding method is a public procedural extract only. Client brand books, logos, fonts, source art, stock media, animations, and the asset index are intentionally absent; their omission does not grant or imply publication rights.
`;

await writeFile(path.join(destinationRoot, "README.md"), readme, "utf8");
await writeFile(
  path.join(destinationRoot, "publication-manifest.json"),
  JSON.stringify(
    {
      schemaVersion: 1,
      sourceArchive: "Portfolio Reference/ (local and Git-ignored)",
      policy: "portfolio-evidence/dependencies/reference/disclosure/publication-policy.md",
      files: entries,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

console.log(`Published ${entries.length} curated evidence files (${entries.reduce((sum, entry) => sum + entry.bytes, 0)} bytes).`);
