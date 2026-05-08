import type { CaseStudy } from "@/case-studies/omantel";
import { cn } from "@/lib/utils";

export type CaseJournalImpactBlock = NonNullable<
  CaseStudy["sections"]["journalImpact"]
>["blocks"][number];

interface CaseImpactPostItsProps {
  blocks: CaseJournalImpactBlock[];
  /** Extra class on the `<ul>` (e.g. journal spacing) */
  className?: string;
}

/** Impact metrics as independent sage post-its (Warmth moss tokens). Shared by all cases with `journalImpact`. */
export function CaseImpactPostIts({
  blocks,
  className,
}: CaseImpactPostItsProps) {
  if (!blocks.length) return null;

  return (
    <ul className={cn("cs-impact-postits-grid", className)} role="list">
      {blocks.map((b, i) => (
        <li
          key={i}
          className={cn("cs-impact-postit", `cs-impact-postit--${(i % 3) + 1}`)}
        >
          {b.value?.trim() || b.labelItalic?.trim() ? (
            <p className="cs-impact-postit-stat ojo-impact-stat">
              <span className="ojo-impact-value">{b.value}</span>
              {b.labelItalic ? (
                <>
                  {" "}
                  <span
                    className={
                      b.labelItalic.startsWith("/")
                        ? "ojo-impact-suffix ojo-impact-suffix--scale"
                        : "ojo-impact-suffix"
                    }
                  >
                    {b.labelItalic}
                  </span>
                </>
              ) : null}
            </p>
          ) : null}
          {b.metaCaps ? <p className="ojo-impact-caps">{b.metaCaps}</p> : null}
          {b.metaDetail ? (
            <p
              className={cn(
                "ojo-impact-detail",
                b.metaDetailPlain && "ojo-impact-detail--plain",
              )}
            >
              {b.metaDetail}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
