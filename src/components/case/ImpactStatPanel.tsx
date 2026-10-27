import type { CaseStudy } from "@/case-studies/omantel";

type ImpactBlock = NonNullable<
  CaseStudy["sections"]["journalImpact"]
>["blocks"][number];

function statValue(block: ImpactBlock): string {
  return [block.value, block.labelItalic]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

/**
 * One Paper Deep panel for a case's impact stats.
 * The section heading stays where the page already renders it.
 */
export function ImpactStatPanel({
  blocks,
}: {
  blocks: readonly ImpactBlock[];
}) {
  if (!blocks.length) return null;

  return (
    <div className="om-stat-panel om-full">
      <ul className="om-stat-grid">
        {blocks.map((block, index) => {
          const value = statValue(block);
          const detail = block.metaDetail?.trim() ?? "";
          const caps = block.metaCaps?.trim() ?? "";
          return (
            <li key={`${value || detail}-${index}`} className="om-stat-cell">
              {caps ? <p className="om-stat-eyebrow">{caps}</p> : null}
              {value ? <p className="om-stat-value">{value}</p> : null}
              {detail ? (
                value ? (
                  <p className="om-dense">{detail}</p>
                ) : (
                  <p className="sys-impact-copy">{detail}</p>
                )
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
