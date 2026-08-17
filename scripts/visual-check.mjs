import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import axe from "axe-core";

const executablePath = process.env.BROWSER_PATH ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4321";
const output = path.resolve(".qa");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const results = [];

async function inspectViewport(width, height) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  const errors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText}`));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.addScriptTag({ content: axe.source });

  const metrics = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelectorAll("h1").length,
    sections: document.querySelectorAll("main section").length,
    caseStudies: document.querySelectorAll("[data-case-study]").length,
    atlases: document.querySelectorAll("[data-workflow-atlas]").length,
    atlasTabs: document.querySelectorAll("[data-diagram-tab]").length,
    atlasPanels: document.querySelectorAll("[data-diagram-panel]").length,
    atlasControls: document.querySelectorAll("[data-diagram-action]").length,
    methods: document.querySelectorAll(".method").length,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    width: document.documentElement.clientWidth,
    brokenAnchors: [...document.querySelectorAll('a[href^="#"]')]
      .map((anchor) => anchor.getAttribute("href"))
      .filter((href) => href && href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))),
    smallTargets: [...document.querySelectorAll("a, summary")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { label: (element.textContent ?? "").trim().slice(0, 50), width: Math.round(rect.width), height: Math.round(rect.height) };
      })
      .filter((target) => target.width > 0 && target.height > 0 && (target.width < 44 || target.height < 44)),
  }));

  const disclosures = page.locator("details");
  const disclosureCount = await disclosures.count();
  const disclosureFailures = [];
  for (let index = 0; index < disclosureCount; index += 1) {
    const disclosure = disclosures.nth(index);
    const summary = disclosure.locator("summary");
    await summary.press("Enter");
    if (!(await disclosure.evaluate((element) => element.hasAttribute("open")))) disclosureFailures.push(`open:${index}`);
    await summary.press("Enter");
    if (await disclosure.evaluate((element) => element.hasAttribute("open"))) disclosureFailures.push(`close:${index}`);
  }

  const atlasFailures = [];
  const firstAtlas = page.locator("[data-workflow-atlas]").first();
  const decisionTab = firstAtlas.locator('[data-diagram-tab="decisions"]');
  const systemTab = firstAtlas.locator('[data-diagram-tab="system"]');
  await decisionTab.click();
  const decisionPanel = firstAtlas.locator('[data-diagram-panel="decisions"]');
  if (!(await decisionPanel.isVisible())) atlasFailures.push("decision-view-hidden");
  const decisionSurface = decisionPanel.locator("[data-diagram-surface]");
  const transformBeforeZoom = await decisionSurface.getAttribute("style");
  await firstAtlas.locator('[data-diagram-action="zoom-in"]').click();
  const transformAfterZoom = await decisionSurface.getAttribute("style");
  if (transformBeforeZoom === transformAfterZoom) atlasFailures.push("zoom-did-not-change-transform");
  await firstAtlas.locator('[data-diagram-action="fit"]').click();
  const fitStatus = await decisionPanel.locator("[data-diagram-status]").innerText();
  if (fitStatus !== "Fit view") atlasFailures.push("fit-status-missing");
  if (width === 1024) {
    await firstAtlas.locator('[data-diagram-action="fullscreen"]').click();
    if (!(await page.evaluate(() => Boolean(document.fullscreenElement)))) atlasFailures.push("fullscreen-did-not-open");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100);
    if (await page.evaluate(() => Boolean(document.fullscreenElement))) atlasFailures.push("fullscreen-did-not-exit");
  }
  await systemTab.click();

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (const position of [scrollHeight, Math.round(scrollHeight * 0.35), scrollHeight, 0]) {
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), position);
    await page.waitForTimeout(35);
  }
  await page.mouse.move(0, 0);
  await page.waitForTimeout(220);

  const accessibility = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    });
    return result.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
      samples: violation.nodes.slice(0, 12).map((node) => ({ target: node.target.join(" "), summary: node.failureSummary })),
    }));
  });
  await page.screenshot({ path: path.join(output, `portfolio-${width}.png`), fullPage: true });

  results.push({ width, height, ...metrics, disclosureCount, disclosureFailures, atlasFailures, accessibility, errors, failedRequests });
  await context.close();
}

for (const viewport of [
  [390, 844],
  [768, 1024],
  [1024, 900],
  [1440, 1000],
]) {
  await inspectViewport(viewport[0], viewport[1]);
}

const reducedContext = await browser.newContext({ viewport: { width: 1024, height: 900 }, reducedMotion: "reduce" });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
const reducedMotion = await reducedPage.evaluate(() => ({
  preference: matchMedia("(prefers-reduced-motion: reduce)").matches,
  hiddenWorkflowNodes: [...document.querySelectorAll("[data-node-step], [data-route-step]")]
    .filter((node) => Number.parseFloat(getComputedStyle(node).opacity) < 0.95).length,
  runningAnimations: document.getAnimations().filter((animation) => animation.playState === "running").length,
}));
await reducedPage.screenshot({ path: path.join(output, "portfolio-reduced-motion.png"), fullPage: true });
await reducedContext.close();

const noScriptContext = await browser.newContext({ viewport: { width: 1024, height: 900 }, javaScriptEnabled: false });
const noScriptPage = await noScriptContext.newPage();
await noScriptPage.goto(baseUrl, { waitUntil: "load" });
const noScript = await noScriptPage.evaluate(() => ({
  title: document.title,
  visibleCases: document.querySelectorAll("[data-case-study]").length,
  visiblePrimaryDiagrams: [...document.querySelectorAll('[data-diagram-panel="system"] img')].filter((image) => {
    const style = getComputedStyle(image);
    return style.display !== "none" && style.visibility !== "hidden";
  }).length,
}));
await noScriptPage.screenshot({ path: path.join(output, "portfolio-no-js.png"), fullPage: true });
await noScriptContext.close();

await browser.close();

const failures = results.flatMap((result) => [
  ...(result.errors.length ? [`${result.width}: console errors: ${result.errors.join(" | ")}`] : []),
  ...(result.failedRequests.length ? [`${result.width}: failed requests: ${result.failedRequests.join(" | ")}`] : []),
  ...(result.h1 !== 1 ? [`${result.width}: expected one h1, got ${result.h1}`] : []),
  ...(result.caseStudies !== 5 ? [`${result.width}: expected five cases, got ${result.caseStudies}`] : []),
  ...(result.atlases !== 5 ? [`${result.width}: expected five workflow atlases, got ${result.atlases}`] : []),
  ...(result.atlasTabs !== 10 ? [`${result.width}: expected ten atlas tabs, got ${result.atlasTabs}`] : []),
  ...(result.atlasPanels !== 10 ? [`${result.width}: expected ten atlas panels, got ${result.atlasPanels}`] : []),
  ...(result.atlasControls !== 25 ? [`${result.width}: expected twenty-five atlas controls, got ${result.atlasControls}`] : []),
  ...(result.methods !== 5 ? [`${result.width}: expected five methods, got ${result.methods}`] : []),
  ...(result.overflow ? [`${result.width}: horizontal overflow detected`] : []),
  ...(result.disclosureCount !== 11 ? [`${result.width}: expected 11 disclosures, got ${result.disclosureCount}`] : []),
  ...(result.disclosureFailures.length ? [`${result.width}: disclosure keyboard failures: ${result.disclosureFailures.join(" | ")}`] : []),
  ...(result.atlasFailures.length ? [`${result.width}: workflow atlas failures: ${result.atlasFailures.join(" | ")}`] : []),
  ...(result.brokenAnchors.length ? [`${result.width}: broken anchors: ${result.brokenAnchors.join(" | ")}`] : []),
  ...(result.accessibility.length ? [`${result.width}: WCAG violations: ${result.accessibility.map((item) => `${item.id}:${item.nodes}`).join(" | ")}`] : []),
  ...(result.smallTargets.length ? [`${result.width}: touch targets below 44px: ${result.smallTargets.map((target) => `${target.label} (${target.width}x${target.height})`).join(" | ")}`] : []),
]);

if (!reducedMotion.preference || reducedMotion.hiddenWorkflowNodes > 0 || reducedMotion.runningAnimations > 0) failures.push("Reduced-motion state did not settle correctly.");
if (noScript.visibleCases !== 5) failures.push("No-JavaScript page did not retain all five cases.");
if (noScript.visiblePrimaryDiagrams !== 5) failures.push("No-JavaScript page did not retain all five primary workflow diagrams.");

console.log(JSON.stringify({ results, reducedMotion, noScript, failures }, null, 2));
if (failures.length) process.exit(1);
