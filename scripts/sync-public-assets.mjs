import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const workspace = process.cwd();
const sourceRoot = path.resolve(workspace, "portfolio-evidence");
const outputRoot = path.resolve(workspace, "public", "assets");

const allowlist = [
  {
    id: "automation-brief",
    type: "pdf",
    source: "dependencies/reference/portfolio-documents/chrisbuen-ai-automation-brief.pdf",
    destination: "downloads/chrisbuen-ai-automation-brief.pdf",
    approvedSha256: "280d2eb7a6a870b593a04ad2e200c2e9bc00905f64255c2c9f622f734728ff1f",
    rights: "Redacted public portfolio document.",
  },
  {
    id: "automation-casebook",
    type: "pdf",
    source: "dependencies/reference/portfolio-documents/chrisbuen-ai-automation-casebook.pdf",
    destination: "downloads/chrisbuen-ai-automation-casebook.pdf",
    approvedSha256: "7ff96a60b4bfa151fa5cfa7f04e3ce9e4e503fb8fde80158def8d17d3d5152d0",
    rights: "Redacted public portfolio document.",
  },
  {
    id: "evidence-appendix",
    type: "pdf",
    source: "dependencies/reference/portfolio-documents/chrisbuen-project-evidence-appendix.pdf",
    destination: "downloads/chrisbuen-project-evidence-appendix.pdf",
    approvedSha256: "40f460b077dbf80912dcb2a32ca1384fe8fc17f739b19778c9456811e4e0c09f",
    rights: "Redacted public portfolio document.",
  },
  {
    id: "assessment-automation",
    type: "image",
    source: "workflows/assessment-automation/evidence/diagrams/assessment-automation-workflow-diagram.png",
    destination: "evidence/assessment-automation",
    approvedSha256: "7ae1011f90e643ddf01f766cdf6431e638f8f65820a437e55dc6fef123c482f3",
    rights: "Public portfolio diagram derived from redacted workflow evidence.",
  },
  {
    id: "assessment-quality-decision-tree",
    type: "image",
    source: "workflows/assessment-automation/evidence/diagrams/assessment-quality-decision-tree.png",
    destination: "evidence/assessment-quality-decision-tree",
    approvedSha256: "b154138d5c763cc2ee6282e133cce40d20a8fb2e323d07b66fb0c6aea77c61b4",
    rights: "Public portfolio decision diagram derived from redacted workflow evidence.",
  },
  {
    id: "advice-document-pipeline",
    type: "image",
    source: "workflows/advice-document-pipeline/evidence/diagrams/advice-document-production-v2.png",
    destination: "evidence/advice-document-pipeline",
    approvedSha256: "9f3388bb12af7c70cda06101485076b2968cff65922a5653ea5546fc197c216e",
    rights: "Public portfolio diagram derived from redacted workflow evidence.",
  },
  {
    id: "advice-quality-decision-tree",
    type: "image",
    source: "workflows/advice-document-pipeline/evidence/diagrams/advice-quality-decision-tree.png",
    destination: "evidence/advice-quality-decision-tree",
    approvedSha256: "b638cb6b289cf2a5d2e5f65d5790ecabf1365952d9d33796f0a404429457ba7b",
    rights: "Public portfolio decision diagram derived from redacted workflow evidence.",
  },
  {
    id: "research-report-builder",
    type: "image",
    source: "workflows/research-report-builder/evidence/diagrams/research-report-builder-workflow-diagram.png",
    destination: "evidence/research-report-builder",
    approvedSha256: "a1c441dc3865f44ab5f6ca5b62dce694133ed2bb4db8281f047c9ecd85241e05",
    rights: "Public portfolio diagram derived from redacted workflow evidence.",
  },
  {
    id: "research-quality-decision-tree",
    type: "image",
    source: "workflows/research-report-builder/evidence/diagrams/research-quality-decision-tree.png",
    destination: "evidence/research-quality-decision-tree",
    approvedSha256: "bfb3ac9520f0bf330606720cb19d9ec2d927f72f818fa4fb647abb6abac995c3",
    rights: "Public portfolio decision diagram derived from redacted workflow evidence.",
  },
  {
    id: "ai-content-and-seo-system",
    type: "image",
    source: "workflows/ai-content-and-seo-system/evidence/diagrams/ai-content-and-seo-system-workflow-diagram.png",
    destination: "evidence/ai-content-and-seo-system",
    approvedSha256: "79064691f04f8ee2e024ea8e6559dbe7c7129ea259f04a1950be9e4a5a40f606",
    rights: "Public portfolio diagram derived from redacted workflow evidence.",
  },
  {
    id: "content-publishing-quality-decision-tree",
    type: "image",
    source: "workflows/ai-content-and-seo-system/evidence/diagrams/content-publishing-quality-decision-tree.png",
    destination: "evidence/content-publishing-quality-decision-tree",
    approvedSha256: "617acd607d4ac512ad940b0096a4a8f6ccfa9aa3e2d736ca8c01d807bf4d2df0",
    rights: "Public portfolio decision diagram derived from redacted workflow evidence.",
  },
  {
    id: "market-report-automation",
    type: "image",
    source: "workflows/market-report-automation/evidence/diagrams/market-report-automation-workflow-diagram.png",
    destination: "evidence/market-report-automation",
    approvedSha256: "3f64854230033ca2692274e6a7f04053601f53dab32633a575a717cb6228b85a",
    rights: "Public portfolio diagram derived from redacted workflow evidence.",
  },
  {
    id: "market-intelligence-quality-decision-tree",
    type: "image",
    source: "workflows/market-report-automation/evidence/diagrams/market-intelligence-quality-decision-tree.png",
    destination: "evidence/market-intelligence-quality-decision-tree",
    approvedSha256: "5f7a2bf46858623c0d5862d8a279c30976359c0e8c419def47c77fb26111a09e",
    rights: "Public portfolio decision diagram derived from redacted workflow evidence.",
  },
];

const allowedExtensions = new Set([".pdf", ".png"]);

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function safeSource(relativePath) {
  const absolute = path.resolve(sourceRoot, relativePath);
  const normalizedRoot = sourceRoot.toLowerCase() + path.sep;
  const normalizedAbsolute = absolute.toLowerCase();
  if (!normalizedAbsolute.startsWith(normalizedRoot)) throw new Error(`Source escapes portfolio-evidence: ${relativePath}`);
  if (normalizedAbsolute.split(path.sep).includes("private")) throw new Error(`Private source rejected: ${relativePath}`);
  if (!allowedExtensions.has(path.extname(absolute).toLowerCase())) throw new Error(`Extension rejected: ${relativePath}`);
  return absolute;
}

const expectedOutputRoot = path.resolve(workspace, "public", "assets");
if (outputRoot !== expectedOutputRoot || path.basename(outputRoot) !== "assets") {
  throw new Error(`Refusing to clean unexpected output root: ${outputRoot}`);
}
await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
const manifest = [];

for (const entry of allowlist) {
  const source = safeSource(entry.source);
  const sourceBuffer = await readFile(source);
  const sourceHash = digest(sourceBuffer);
  if (sourceHash !== entry.approvedSha256) {
    throw new Error(`Approved source hash changed for ${entry.id}. Review the new source and deliberately update the pin.`);
  }

  if (entry.type === "pdf") {
    const destination = path.resolve(outputRoot, entry.destination);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(source, destination);
    const outputBuffer = await readFile(destination);
    manifest.push({
      ...entry,
      source: `portfolio-evidence/${entry.source}`,
      destination: `assets/${entry.destination}`,
      sourceSha256: sourceHash,
      outputSha256: digest(outputBuffer),
      bytes: outputBuffer.byteLength,
      transform: "Copied without modification",
    });
    continue;
  }

  for (const width of [1600, 3200]) {
    const relativeDestination = `${entry.destination}-${width}.webp`;
    const destination = path.resolve(outputRoot, relativeDestination);
    await mkdir(path.dirname(destination), { recursive: true });
    await sharp(sourceBuffer)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width === 1600 ? 82 : 78, effort: 5 })
      .toFile(destination);
    const outputBuffer = await readFile(destination);
    const metadata = await sharp(outputBuffer).metadata();
    manifest.push({
      ...entry,
      source: `portfolio-evidence/${entry.source}`,
      destination: `assets/${relativeDestination}`,
      sourceSha256: sourceHash,
      outputSha256: digest(outputBuffer),
      bytes: outputBuffer.byteLength,
      width: metadata.width,
      height: metadata.height,
      transform: `Metadata-stripped WebP derivative, maximum width ${width}px`,
    });
  }
}

const socialSource = path.resolve(workspace, "public", "og.svg");
const socialDestination = path.resolve(workspace, "public", "og.png");
await sharp(socialSource).resize(1200, 630).png({ compressionLevel: 9 }).toFile(socialDestination);

await writeFile(path.join(outputRoot, "provenance.json"), JSON.stringify({ generatedAt: new Date().toISOString(), assets: manifest }, null, 2));
console.log(`Synchronized ${manifest.length} allowlisted public assets.`);
