import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");
const publicDir = path.join(root, "public");

const failures = [];
const warnings = [];

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function publishedCaseSlugs() {
  const indexPath = path.join(srcDir, "case-studies", "index.ts");
  const index = fs.readFileSync(indexPath, "utf8");
  const arrayMatch = index.match(/caseStudies[^=]*=\s*\[([\s\S]*?)\]/);
  const arrayBody = arrayMatch?.[1] ?? "";
  const slugs = [];

  for (const match of index.matchAll(
    /import\s*\{([^}]+)\}\s*from\s*"\.\/([^"]+)"/g,
  )) {
    const binding = match[1].split(",")[0].trim();
    if (!arrayBody.includes(binding)) continue;
    const file = path.join(srcDir, "case-studies", `${match[2]}.ts`);
    const source = fs.readFileSync(file, "utf8");
    const slug = source.match(/slug:\s*"([^"]+)"/);
    if (slug) slugs.push(slug[1]);
  }

  return slugs;
}

function appRoutes() {
  const routes = new Set(["/"]);
  const appDir = path.join(srcDir, "app");

  function visit(dir, segments) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "case") {
        for (const slug of publishedCaseSlugs()) {
          routes.add(`/case/${slug}`);
        }
        continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(full, [...segments, entry.name]);
      else if (entry.name === "page.tsx" && segments.length > 0) {
        routes.add(`/${segments.join("/")}`);
      }
    }
  }

  visit(appDir, []);
  return routes;
}

function publicFileExists(urlPath) {
  let decoded = urlPath.split("?")[0].split("#")[0];
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return false;
  }
  const relative = decoded.replace(/^\/+/, "");
  return fs.existsSync(path.join(publicDir, relative));
}

const routes = appRoutes();
const files = walk(srcDir);
const referencedFromTemplate = new Set();
const assetRefs = new Map();
const routeRefs = new Map();
const externalRefs = new Map();

const assetPattern =
  /["'`](\/[^"'`\s)]+?\.(?:png|jpe?g|gif|webp|svg|ico|avif|mp4|webm|mov))(?:\?[^"'`]*)?["'`]/gi;
const internalPattern = /(?:href=|href:\s*)["'`](\/[^"'`#?\s]*)/g;
const externalPattern = /https?:\/\/[^\s"'`)<>]+/g;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);

  for (const match of text.matchAll(assetPattern)) {
    const urlPath = match[1];
    if (urlPath.includes("${")) continue;
    if (!assetRefs.has(urlPath)) assetRefs.set(urlPath, rel);
  }

  if (text.includes("/sparkles/${style}.svg")) {
    for (const entry of fs.readdirSync(path.join(publicDir, "sparkles"))) {
      referencedFromTemplate.add(`sparkles/${entry}`);
    }
  }

  for (const match of text.matchAll(internalPattern)) {
    const urlPath = match[1] || "/";
    if (!routeRefs.has(urlPath)) routeRefs.set(urlPath, rel);
  }

  for (const match of text.matchAll(externalPattern)) {
    const url = match[0].replace(/[.,;]+$/, "");
    const after = text.slice(
      (match.index ?? 0) + match[0].length,
      (match.index ?? 0) + match[0].length + 3,
    );
    if (after.startsWith('"+') || after.startsWith("'+")) continue;
    if (url.includes("example.com")) {
      warnings.push(`${rel} still points at placeholder ${url}`);
      continue;
    }
    if (
      url.startsWith("http://localhost") ||
      url.startsWith("https://localhost") ||
      url.includes("schema.org") ||
      url.includes("w3.org")
    ) {
      continue;
    }
    if (!externalRefs.has(url)) externalRefs.set(url, rel);
  }
}

for (const [urlPath, file] of assetRefs) {
  if (!publicFileExists(urlPath)) {
    failures.push(`Missing asset ${urlPath} referenced from ${file}`);
  }
}

for (const [urlPath, file] of routeRefs) {
  if (urlPath.startsWith("/case/")) {
    if (!routes.has(urlPath)) {
      failures.push(`Unknown case route ${urlPath} referenced from ${file}`);
    }
    continue;
  }
  if (!routes.has(urlPath)) {
    failures.push(`Unknown internal route ${urlPath} referenced from ${file}`);
  }
}

const referencedPublic = new Set([
  ...referencedFromTemplate,
  ...[...assetRefs.keys()].map((urlPath) => {
    const decoded = decodeURIComponent(urlPath.split("?")[0]).replace(
      /^\/+/,
      "",
    );
    return decoded;
  }),
]);

function listPublic(dir, prefix = "") {
  const unused = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) unused.push(...listPublic(full, rel));
    else if (!referencedPublic.has(rel) && !entry.name.startsWith(".")) {
      unused.push(rel);
    }
  }
  return unused;
}

const unusedPublic = listPublic(publicDir);

async function checkExternal() {
  if (process.env.CHECK_LINKS_INTERNAL_ONLY === "1") return;

  const checks = [...externalRefs.entries()].map(async ([url, file]) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(12000),
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; rachana-portfolio-link-check/1.0)",
        },
      });
      if (response.status === 404 || response.status === 410) {
        const message = `${url} returned ${response.status} (from ${file})`;
        if (
          url.includes(
            "drive.google.com/file/d/11pRdPZdKTFnX9Q06PUfgj922_X8luZ9K",
          )
        ) {
          warnings.push(
            `${message}. The public resume link is dead; replace RESUME_URL when a new file is ready.`,
          );
        } else {
          failures.push(message);
        }
      } else if (response.status >= 400) {
        warnings.push(
          `${url} returned ${response.status} (from ${file}); treated as reachable because the host may block checkers`,
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      warnings.push(`Could not reach ${url} (${message}) from ${file}`);
    }
  });

  await Promise.all(checks);
}

await checkExternal();

if (warnings.length > 0) {
  console.log("Link check warnings:");
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (unusedPublic.length > 0) {
  console.log(
    `\nUnreferenced public files (${unusedPublic.length}, informational):`,
  );
  for (const file of unusedPublic) console.log(`  - ${file}`);
}

if (failures.length > 0) {
  console.error("\nLink check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `\nLink check passed (${assetRefs.size} assets, ${routeRefs.size} internal routes, ${externalRefs.size} external URLs).`,
);
