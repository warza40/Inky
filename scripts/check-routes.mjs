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

const expected = [
  ["/", 200],
  ["/experiments", 200],
  ["/inky-lily", 200],
  ["/topography", 200],
  ["/case/omantel-bulk-activation", 200],
  ["/case/warehouse-operations", 200],
  ["/case/disaster-recovery", 200],
  ["/case/another-case", 404],
  ["/robots.txt", 200],
  ["/sitemap.xml", 200],
];

const failures = [];

for (const [route, status] of expected) {
  try {
    const response = await fetch(`${base}${route}`, {
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    });
    if (response.status !== status) {
      failures.push(`${route} returned ${response.status}, expected ${status}`);
    } else {
      console.log(`ok ${response.status} ${route}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${route} failed to load (${message})`);
  }
}

if (failures.length > 0) {
  console.error("Route check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Route check passed.");
