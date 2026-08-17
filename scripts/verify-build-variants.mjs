import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const npmCli = process.env.npm_execpath;
const indexPath = path.resolve("dist", "index.html");
const failures = [];

function build(environment) {
  if (!npmCli) throw new Error("npm_execpath is unavailable; run this check through npm.");
  const result = spawnSync(process.execPath, [npmCli, "run", "build"], {
    cwd: process.cwd(),
    env: { ...process.env, ...environment },
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status !== 0) throw new Error(`Variant build failed:\n${result.error ?? ""}\n${result.stdout}\n${result.stderr}`);
}

async function html() {
  return readFile(indexPath, "utf8");
}

build({
  SITE_URL: "https://example.github.io",
  BASE_PATH: "/portfolio-check",
  PUBLIC_GITHUB_URL: "https://github.com/example/portfolio",
  PUBLIC_BOOKING_URL: "https://booking.example.test/chris",
});
let output = await html();
if (!output.includes('href="https://github.com/example/portfolio"')) failures.push("Configured GitHub link did not render.");
if (!output.includes('href="https://booking.example.test/chris"')) failures.push("Configured booking link did not render.");
if (!output.includes('"sameAs":["https://github.com/example/portfolio"]')) failures.push("Configured GitHub URL missing from structured data.");
if (!output.includes('/portfolio-check/assets/')) failures.push("Repository base path was not applied to generated assets.");

build({
  SITE_URL: "https://example.github.io",
  BASE_PATH: "/portfolio-check",
  PUBLIC_GITHUB_URL: "http://insecure.example.test/repository",
  PUBLIC_BOOKING_URL: "not-a-url",
});
output = await html();
if (output.includes("insecure.example.test") || output.includes("not-a-url")) failures.push("Invalid optional URLs rendered.");
if (output.includes('aria-label="External links"')) failures.push("Empty external navigation rendered for invalid URLs.");

build({ SITE_URL: "https://chrisbuen.github.io", BASE_PATH: "/", PUBLIC_GITHUB_URL: "", PUBLIC_BOOKING_URL: "" });
output = await html();
if (/href="\/portfolio-check\//.test(output)) failures.push("Project base path leaked into root Pages build.");
if (output.includes('aria-label="External links"')) failures.push("Empty external navigation rendered when URLs were absent.");
if (!output.includes('href="/assets/downloads/')) failures.push("Root Pages asset path is incorrect.");

console.log(failures.length ? failures.join("\n") : "Build variants passed (configured, invalid, project base, and root base)." );
if (failures.length) process.exit(1);
