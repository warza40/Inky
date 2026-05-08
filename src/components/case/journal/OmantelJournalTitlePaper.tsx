import { PaperClipSticky } from "@/components/home/PaperClipIcons";

interface OmantelJournalTitlePaperProps {
  metaLine?: string;
  title: string;
  problemStatement?: string;
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

/** Domain chips under lede — company, then Telecom / B2B when present in context. */
function domainChipsFromOverview(overview: {
  context: string;
  company: string;
}): string[] {
  const { context, company } = overview;
  const chips: string[] = [];
  const co = company.trim();
  if (co) chips.push(co);
  if (/\btelecom\b/i.test(context)) chips.push("Telecom");
  if (/\bb2b\b/i.test(context)) chips.push("B2B");
  return chips.length > 0 ? chips : ["Omantel", "Telecom", "B2B"];
}

/** Paper title insert — typography uses existing DS classes (font stacks unchanged) */
export function OmantelJournalTitlePaper({
  metaLine,
  title,
  problemStatement,
  overview,
}: OmantelJournalTitlePaperProps) {
  const chips = domainChipsFromOverview(overview);

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
              <div className="ojo-title-pills">
                {chips.map((c) => (
                  <span key={c} className="ojo-title-pill">
                    {c}
                  </span>
                ))}
              </div>
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
