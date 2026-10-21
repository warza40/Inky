import type { CaseStudy } from "@/case-studies/omantel";
import { titlePillsFromCase } from "@/components/case/omantel/title-pills";

const META_ROWS: ReadonlyArray<{
  label: string;
  field: "company" | "problem" | "focus";
}> = [
  { label: "Company", field: "company" },
  { label: "Problem", field: "problem" },
  { label: "Focus", field: "focus" },
];

interface OmantelSystemIntroProps {
  slug: string;
  heroPills?: string[];
  overview: CaseStudy["overview"];
}

/** Pills and meta row for the shared case-study intro. Copy stays in the case file. */
export function OmantelSystemIntro({
  slug,
  heroPills,
  overview,
}: OmantelSystemIntroProps) {
  const chips = titlePillsFromCase(slug, overview, heroPills);

  return (
    <div className="om-intro-meta">
      {chips.length > 0 ? (
        <ul className="om-pills" aria-label="Project tags">
          {chips.map((chip) => (
            <li key={chip}>
              <span className="site-badge site-badge--tag">{chip}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <dl className="om-meta-grid">
        {META_ROWS.map((row) => (
          <div key={row.field} className="om-meta-item">
            <dt className="om-eyebrow">{row.label}</dt>
            <dd className="om-meta-value">{overview[row.field]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
