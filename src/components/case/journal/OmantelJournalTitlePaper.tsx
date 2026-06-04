import { PaperClipSticky } from "@/components/home/PaperClipIcons";

interface OmantelJournalTitlePaperProps {
  /** Case slug — gates whether an Omantel domain pill appears */
  slug: string;
  metaLine?: string;
  title: string;
  problemStatement?: string;
  heroPills?: string[];
  overview: {
    role: string;
    context: string;
    company: string;
    problem: string;
    focus: string;
  };
}

const META_ROWS: ReadonlyArray<{
  label: string;
  field: keyof OmantelJournalTitlePaperProps["overview"];
}> = [
  { label: "Company", field: "company" },
  { label: "Problem", field: "problem" },
  { label: "Focus", field: "focus" },
];

const SLUGS_WITH_OMANTEL_PILL = new Set(["omantel-bulk-activation"]);

const PLACEHOLDER_COMPANIES = new Set(["", "—", "-", "–", "..."]);

const MAX_AUTO_PILL_LEN = 36;

function isPlaceholderCompany(company: string): boolean {
  return PLACEHOLDER_COMPANIES.has(company.trim());
}

/** Bulk activation — company + domain keywords from context */
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

/** Short tags from company + ` · `-delimited context segments (skips long prose) */
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

function titlePillsFromCase(
  slug: string,
  overview: { context: string; company: string },
  heroPills?: string[],
): string[] {
  if (heroPills?.length) return heroPills;
  if (SLUGS_WITH_OMANTEL_PILL.has(slug)) return omantelBulkPills(overview);
  return autoPillsFromOverview(overview);
}

/** Paper title insert — typography uses existing DS classes (font stacks unchanged) */
export function OmantelJournalTitlePaper({
  slug,
  metaLine,
  title,
  problemStatement,
  heroPills,
  overview,
}: OmantelJournalTitlePaperProps) {
  const chips = titlePillsFromCase(slug, overview, heroPills);

  return (
    <section className="ojo-title-section">
      <div className="ojo-tape ojo-tape-wave ojo-tape-a" aria-hidden />
      <div className="ojo-tape ojo-tape-seigaiha ojo-tape-b" aria-hidden />

      <div className="ojo-paper ojo-paper-shadow ojo-title-insert">
        <div className="ojo-punch-holes ojo-punch-holes--title" aria-hidden>
          <span className="ojo-punch-hole" />
          <span className="ojo-punch-hole" />
        </div>
        <div className="ojo-clip-top">
          <PaperClipSticky className="ojo-clip-svg" />
        </div>

        <div className="ojo-title-main">
          {metaLine ? <p className="ojo-title-eyebrow">{metaLine}</p> : null}
          <div className="ojo-title-copy-wrap">
            <div className="ojo-title-copy-inner">
              <h1 className="ojo-main-title cs-hero-title">{title}</h1>
              {problemStatement ? (
                <p className="ojo-sub-title">{problemStatement}</p>
              ) : null}
              {chips.length > 0 ? (
                <div className="ojo-title-pills">
                  {chips.map((c) => (
                    <span key={c} className="ojo-title-pill">
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="ojo-meta-grid">
          {META_ROWS.map((row) => (
            <div key={row.field} className="ojo-meta-item">
              <div className="ojo-meta-label">{row.label}</div>
              <div className="ojo-meta-val">{overview[row.field]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
