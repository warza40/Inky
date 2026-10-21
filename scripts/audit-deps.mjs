import { spawnSync } from "node:child_process";

const production = spawnSync(
  "npm",
  ["audit", "--omit=dev", "--audit-level=high"],
  { stdio: "inherit" },
);
if (production.status !== 0) {
  process.exit(production.status ?? 1);
}

const full = spawnSync("npm", ["audit", "--json"], { encoding: "utf8" });
let data = {};
try {
  data = JSON.parse(full.stdout || "{}");
} catch {
  console.error("Could not parse npm audit JSON.");
  process.exit(1);
}

/**
 * eslint-config-next still depends on fast-glob -> micromatch -> braces.
 * The advisory's only published "fix" is downgrading eslint-config-next to 14,
 * which would drop the Next 16 lint rules. These packages are dev-only.
 */
const devAllowlist = new Set([
  "braces",
  "micromatch",
  "fast-glob",
  "@next/eslint-plugin-next",
  "eslint-config-next",
]);

const unexpected = [];
for (const [name, info] of Object.entries(data.vulnerabilities ?? {})) {
  if (info.severity !== "high" && info.severity !== "critical") continue;
  if (devAllowlist.has(name)) continue;
  unexpected.push(`${info.severity} ${name}`);
}

if (unexpected.length > 0) {
  console.error("Unexpected high or critical advisories:");
  for (const item of unexpected) console.error(`  - ${item}`);
  process.exit(1);
}

const allowed = [...devAllowlist].filter(
  (name) => data.vulnerabilities?.[name],
);
if (allowed.length > 0) {
  console.log(
    "Dev-only advisories allowlisted until eslint-config-next ships a patched fast-glob chain:",
  );
  for (const name of allowed) console.log(`  - ${name}`);
}

console.log("Dependency audit passed for production dependencies.");
