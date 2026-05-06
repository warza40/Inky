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
  { label: "Role", field: "role" },
  { label: "Context", field: "context" },
  { label: "Company", field: "company" },
  { label: "Problem", field: "problem" },
  { label: "Focus", field: "focus" },
];

/** Paper title insert — typography uses existing DS classes (font stacks unchanged) */
export function OmantelJournalTitlePaper({
  metaLine,
  title,
  problemStatement,
  overview,
}: OmantelJournalTitlePaperProps) {
  const { role } = overview;

  return (
    <section className="ojo-title-section">
      <div className="ojo-tape ojo-tape-wave ojo-tape-a" aria-hidden />
      <div className="ojo-tape ojo-tape-seigaiha ojo-tape-b" aria-hidden />

      <div className="ojo-paper ojo-paper-shadow ojo-title-insert">
        <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
          <span className="ojo-punch-hole" />
          <span className="ojo-punch-hole" />
        </div>
        <div className="ojo-clip-top">
          <PaperClipSticky className="ojo-clip-svg" />
        </div>

        <div className="ojo-title-main">
          {metaLine ? <p className="ojo-title-eyebrow">{metaLine}</p> : null}
          <div className="ojo-title-copy-wrap">
            <div className="ojo-title-bullets" aria-hidden>
              <span />
              <span />
            </div>
            <div className="ojo-title-copy-inner">
              <h1 className="ojo-main-title cs-hero-title">{title}</h1>
              {problemStatement ? (
                <p className="ojo-sub-title">{problemStatement}</p>
              ) : null}
              <div className="ojo-title-pills">
                <span className="ojo-title-pill">{role}</span>
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
