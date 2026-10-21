const SLUGS_WITH_OMANTEL_PILL = new Set(["omantel-bulk-activation"]);

const PLACEHOLDER_COMPANIES = new Set(["", "—", "-", "–", "..."]);

const MAX_AUTO_PILL_LEN = 36;

function isPlaceholderCompany(company: string): boolean {
  return PLACEHOLDER_COMPANIES.has(company.trim());
}

function omantelBulkPills(overview: {
  context: string;
  company: string;
}): string[] {
  const { context, company } = overview;
  const chips: string[] = [];
  const co = company.trim();

  if (co && !isPlaceholderCompany(co)) {
    chips.push(co);
  }

  if (/\btelecom\b/i.test(context)) chips.push("Telecom");
  if (/\bb2b\b/i.test(context)) chips.push("B2B");

  const hasOmantel = chips.some((c) => /^omantel$/i.test(c.trim()));
  if (!hasOmantel) chips.unshift("Omantel");

  return chips;
}

function autoPillsFromOverview(overview: {
  context: string;
  company: string;
}): string[] {
  const chips: string[] = [];
  const co = overview.company.trim();

  if (co && !isPlaceholderCompany(co)) {
    chips.push(co);
  }

  const contextParts = overview.context
    .split(/\s·\s/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((part) => part.length <= MAX_AUTO_PILL_LEN);

  for (const part of contextParts) {
    const exists = chips.some((c) => c.toLowerCase() === part.toLowerCase());
    if (!exists) chips.push(part);
  }

  return chips;
}

export function titlePillsFromCase(
  slug: string,
  overview: { context: string; company: string },
  heroPills?: string[],
): string[] {
  if (heroPills?.length) return heroPills;
  if (SLUGS_WITH_OMANTEL_PILL.has(slug)) return omantelBulkPills(overview);
  return autoPillsFromOverview(overview);
}
