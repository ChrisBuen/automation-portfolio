import { access, readdir, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const outputRoot = path.resolve("dist");
const forbidden = [
  /Portfolio Reference[\\/]private/i,
  /Portfolio Reference[\\/]/i,
  /private[\\/]source/i,
  /BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY/,
  /client[_ -]?secret/i,
  /api[_ -]?key\s*[:=]/i,
  /[A-Za-z]:\\Users\\/,
  /https:\/\/example\.com/i,
];

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry);
    const info = await stat(absolute);
    if (info.isDirectory()) files.push(...(await walk(absolute)));
    else files.push(absolute);
  }
  return files;
}

const files = await walk(outputRoot);
const textFiles = files.filter((file) => /\.(?:html|css|js|json|xml|txt|svg)$/i.test(file));
const failures = [];

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

for (const file of textFiles) {
  const contents = await readFile(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(contents)) failures.push(`${path.relative(outputRoot, file)} matched ${pattern}`);
  }
}

const indexPath = path.join(outputRoot, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
const ids = new Set([...indexHtml.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));
for (const match of indexHtml.matchAll(/\shref=["']#([^"']+)["']/g)) {
  if (!ids.has(match[1])) failures.push(`index.html links to missing anchor #${match[1]}`);
}

const configuredBase = (process.env.BASE_PATH ?? "/").replace(/\/$/, "");
const emittedUrls = [
  ...[...indexHtml.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]),
  ...[...indexHtml.matchAll(/\ssrcset=["']([^"']+)["']/g)].flatMap((match) => match[1].split(",").map((candidate) => candidate.trim().split(/\s+/)[0])),
];

for (const url of emittedUrls) {
  if (!url.startsWith("/") || url.startsWith("//")) continue;
  const withoutBase = configuredBase && url.startsWith(`${configuredBase}/`) ? url.slice(configuredBase.length) : url;
  const relative = decodeURIComponent(withoutBase.split(/[?#]/)[0]).replace(/^\//, "");
  if (!relative || !path.extname(relative)) continue;
  try {
    await access(path.join(outputRoot, relative));
  } catch {
    failures.push(`Missing emitted asset referenced by index.html: ${url}`);
  }
}

const provenancePath = path.join(outputRoot, "assets", "provenance.json");
let provenance;
try {
  provenance = JSON.parse(await readFile(provenancePath, "utf8"));
} catch {
  failures.push("Missing or invalid assets/provenance.json");
}

if (provenance?.assets) {
  for (const asset of provenance.assets) {
    if (/private/i.test(asset.source)) failures.push(`Private provenance source: ${asset.source}`);
    const emittedPath = path.join(outputRoot, asset.destination.replace(/^assets\//, "assets/"));
    try {
      await access(emittedPath);
    } catch {
      failures.push(`Manifest destination missing: ${asset.destination}`);
      continue;
    }
    if (!/^[a-f0-9]{64}$/.test(asset.sourceSha256) || !/^[a-f0-9]{64}$/.test(asset.outputSha256)) {
      failures.push(`Invalid hash record for ${asset.id}`);
    }
    const emittedBuffer = await readFile(emittedPath);
    const sourceBuffer = await readFile(path.resolve(asset.source));
    if (digest(emittedBuffer) !== asset.outputSha256) failures.push(`Output hash mismatch for ${asset.destination}`);
    if (digest(sourceBuffer) !== asset.sourceSha256 || asset.sourceSha256 !== asset.approvedSha256) {
      failures.push(`Source hash mismatch for ${asset.source}`);
    }
    if (emittedBuffer.byteLength !== asset.bytes) failures.push(`Byte count mismatch for ${asset.destination}`);

    if (asset.type === "pdf") {
      const document = await getDocument({ data: new Uint8Array(emittedBuffer), useSystemFonts: true }).promise;
      const metadata = await document.getMetadata().catch(() => ({ info: {}, metadata: null }));
      let searchable = JSON.stringify(metadata.info ?? {});
      for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const textContent = await page.getTextContent();
        searchable += "\n" + textContent.items.map((item) => ("str" in item ? item.str : "")).join(" ");
      }
      for (const pattern of forbidden) {
        if (pattern.test(searchable)) failures.push(`${asset.destination} PDF text/metadata matched ${pattern}`);
      }
      document.cleanup();
    }
  }
}

const contentSource = await readFile(path.resolve("src", "data", "portfolio.ts"), "utf8");
const sourcePaths = [...contentSource.matchAll(/(?:path|evidencePath):\s*"([^"]+)"/g)]
  .map((match) => match[1])
  .filter((sourcePath) => sourcePath.startsWith("portfolio-evidence/") && !sourcePath.includes("<"));

for (const sourcePath of sourcePaths) {
  if (/private/i.test(sourcePath)) failures.push(`Restricted content source: ${sourcePath}`);
  try {
    await access(path.resolve(sourcePath));
  } catch {
    failures.push(`Content evidence source missing: ${sourcePath}`);
  }
}

const unexpected = files.filter((file) => {
  const relative = path.relative(outputRoot, file).replaceAll("\\", "/");
  return relative !== "og.png" && !/\.(?:html|css|js|json|xml|txt|svg|webp|pdf|woff2?)$/i.test(file);
});
for (const file of unexpected) failures.push(`Unexpected emitted file type: ${path.relative(outputRoot, file)}`);

if (failures.length > 0) {
  console.error("Public build validation failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Public build validation passed (${files.length} emitted files scanned).`);
