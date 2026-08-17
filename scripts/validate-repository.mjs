import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { lstat, readFile } from "node:fs/promises";
import path from "node:path";

const workspace = process.cwd();
const failures = [];

function gitFiles() {
  try {
    const output = execFileSync("git", ["ls-files", "--cached", "-z"], {
      cwd: workspace,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return output.split("\0").filter(Boolean).map((file) => file.replaceAll("\\", "/"));
  } catch {
    failures.push("Git is not initialized or the intended public files have not been staged.");
    return [];
  }
}

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

const files = gitFiles();
const fileSet = new Set(files);
const requiredFiles = [
  ".github/workflows/deploy.yml",
  ".gitignore",
  "AGENTS.md",
  "README.md",
  "package-lock.json",
  "package.json",
  "portfolio-evidence/README.md",
  "portfolio-evidence/publication-manifest.json",
];

for (const required of requiredFiles) {
  if (!fileSet.has(required)) failures.push(`Required publication file is not staged/tracked: ${required}`);
}

const blockedPrefixes = [
  ".qa/",
  ".astro/",
  "Portfolio Reference/",
  "design-references/",
  "dist/",
  "node_modules/",
  "public/assets/",
  "skills/",
];
const blockedExtensions = /\.(?:ai|env|eps|key|mov|mp4|otf|pem|psd|tgz|ttf|woff|zip)$/i;
const allowedPdfPrefix = "portfolio-evidence/dependencies/reference/portfolio-documents/";
const textExtensions = /\.(?:astro|css|csv|excalidraw|html|js|json|md|mjs|mmd|py|svg|ts|txt|ya?ml)$/i;
const secretPatterns = [
  /BEGIN (?:RSA|OPENSSH|EC)? ?PRIVATE KEY/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /gh[opsu]_[A-Za-z0-9]{30,}/,
  /sk-(?:proj-)?[A-Za-z0-9_-]{24,}/,
  /AIza[0-9A-Za-z_-]{30,}/,
  /(?:file:\/\/\/)?[A-Za-z]:[\\/]+Users[\\/]+/i,
];

for (const file of files) {
  if (blockedPrefixes.some((prefix) => file.startsWith(prefix))) failures.push(`Blocked path is staged/tracked: ${file}`);
  if (blockedExtensions.test(file)) failures.push(`Blocked file type is staged/tracked: ${file}`);
  if (/\.pdf$/i.test(file) && !file.startsWith(allowedPdfPrefix)) failures.push(`Unapproved PDF is staged/tracked: ${file}`);

  const absolute = path.resolve(workspace, file);
  const info = await lstat(absolute);
  if (info.isSymbolicLink()) failures.push(`Symbolic link is staged/tracked: ${file}`);
  if (info.size > 25 * 1024 * 1024) failures.push(`File exceeds the 25 MB repository limit: ${file}`);

  if (textExtensions.test(file)) {
    const text = await readFile(absolute, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(text)) failures.push(`${file} matched restricted pattern ${pattern}`);
    }
  }
}

let manifest;
try {
  manifest = JSON.parse(await readFile(path.resolve(workspace, "portfolio-evidence/publication-manifest.json"), "utf8"));
} catch {
  failures.push("portfolio-evidence/publication-manifest.json is missing or invalid.");
}

if (manifest?.files) {
  const manifestDestinations = new Set(manifest.files.map((entry) => entry.destination));
  for (const entry of manifest.files) {
    if (!fileSet.has(entry.destination)) failures.push(`Manifest destination is not staged/tracked: ${entry.destination}`);
    try {
      const buffer = await readFile(path.resolve(workspace, entry.destination));
      if (buffer.byteLength !== entry.bytes) failures.push(`Manifest byte count mismatch: ${entry.destination}`);
      if (digest(buffer) !== entry.sha256) failures.push(`Manifest hash mismatch: ${entry.destination}`);
    } catch {
      failures.push(`Manifest destination is missing: ${entry.destination}`);
    }
  }

  for (const file of files.filter((item) => item.startsWith("portfolio-evidence/") && !item.endsWith("README.md") && !item.endsWith("publication-manifest.json"))) {
    if (!manifestDestinations.has(file)) failures.push(`Evidence file is not declared in the manifest: ${file}`);
  }
}

if (failures.length > 0) {
  console.error("Repository publication validation failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Repository publication validation passed (${files.length} staged/tracked files).`);
