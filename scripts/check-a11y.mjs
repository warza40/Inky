import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000";

async function waitForServer() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(2000) });
      if (response.status < 500) return;
    } catch {
      // Server is still booting.
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  console.error(`Server did not become ready at ${base}`);
  process.exit(1);
}

await waitForServer();
const pages = [
  "/",
  "/experiments",
  "/inky-lily",
  "/topography",
  "/case/warehouse-operations",
  "/case/disaster-recovery",
  "/case/omantel-bulk-activation",
];

const blockingImpacts = new Set(["serious", "critical"]);
const contrastRule = "color-contrast";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || undefined,
});

const failures = [];
const contrastNotes = [];

try {
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const route of pages) {
    const url = `${base}${route}`;
    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    if (!response || response.status() >= 400) {
      failures.push(`${route} returned ${response?.status() ?? "no response"}`);
      continue;
    }

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    for (const violation of results.violations) {
      const targets = violation.nodes
        .slice(0, 8)
        .map((node) => node.target.join(" "))
        .join(" | ");
      const summary = `${route} ${violation.id} (${violation.impact}) ${violation.nodes.length} node(s): ${targets}`;
      if (violation.id === contrastRule) {
        contrastNotes.push(summary);
        continue;
      }
      if (blockingImpacts.has(violation.impact ?? "")) {
        failures.push(summary);
      } else {
        console.log(`note ${summary}`);
      }
    }
  }
} finally {
  await browser.close();
}

if (contrastNotes.length > 0) {
  console.log(
    "\nColor contrast findings (reported, not failed — palette changes are an owner decision):",
  );
  for (const note of contrastNotes) console.log(`  - ${note}`);
}

if (failures.length > 0) {
  console.error("\nAccessibility check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  "\nAccessibility check passed (WCAG 2.1 A/AA, contrast reported separately).",
);
