import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const url = process.env.QA_URL ?? "http://127.0.0.1:4322";
const chromePath = process.env.BROWSER_PATH ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDirectory = path.resolve(".qa");
await mkdir(outputDirectory, { recursive: true });

const chrome = await launch({ chromePath, chromeFlags: ["--headless", "--disable-gpu", "--no-first-run"] });
try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result) throw new Error("Lighthouse returned no result.");
  await writeFile(path.join(outputDirectory, "lighthouse.json"), result.report);
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round((category.score ?? 0) * 100)]),
  );
  console.log(JSON.stringify(scores, null, 2));
  const failures = Object.entries(scores).filter(([, score]) => score < 90);
  if (failures.length) {
    console.error(`Lighthouse categories below 90: ${failures.map(([key, score]) => `${key}=${score}`).join(", ")}`);
    process.exitCode = 1;
  }
} finally {
  await chrome.kill();
}
