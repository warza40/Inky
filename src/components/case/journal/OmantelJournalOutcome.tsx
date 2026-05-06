"use client";

import { OmantelJournalImageCarousel } from "@/components/case/journal/OmantelJournalImageCarousel";

interface OmantelJournalOutcomeProps {
  highlights?: string[];
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  reflection?: string;
}

export function OmantelJournalOutcome({
  highlights,
  images,
  reflection,
}: OmantelJournalOutcomeProps) {
  if (!(highlights?.length ?? 0) && !(images?.length ?? 0) && !reflection)
    return null;

  const hasOutcomeImages = Boolean(images?.length ?? 0);
  const outcomeImages = images ?? [];

  return (
    <div className="ojo-outcome-stack space-y-8">
      {(highlights?.length ?? 0) > 0 || reflection ? (
        <div className="ojo-outcome-paper ojo-paper ojo-paper-shadow">
          <div className="ojo-punch-holes" aria-hidden>
            <span className="ojo-punch-hole" />
            <span className="ojo-punch-hole" />
            <span className="ojo-punch-hole" />
          </div>
          {(highlights?.length ?? 0) > 0 ? (
            <>
              <div className="ojo-p-label">Outcome</div>
              <ul className="ojo-highlight-list" role="list">
                {highlights!.map((line, i) => (
                  <li key={i} className="ojo-highlight-item">
                    {line}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {reflection ? (
            <>
              {(highlights?.length ?? 0) > 0 ? (
                <div className="ojo-d-divider" style={{ marginTop: "32px" }} />
              ) : null}
              <div className="ojo-p-label">
                {(highlights?.length ?? 0) > 0
                  ? "Reflection"
                  : "Outcome & reflection"}
              </div>
              <p className="ojo-reflection-p">{reflection}</p>
            </>
          ) : null}
        </div>
      ) : null}

      {hasOutcomeImages ? (
        <div className="ojo-outcome-visuals">
          <div className="ojo-decision-stage">
            <div
              className="ojo-decision-bg ojo-decision-bg--solid"
              aria-hidden
            />
            <div className="ojo-decision-badge" aria-hidden>
              01
            </div>
            <div className="ojo-decision-fade-top" aria-hidden />
            <OmantelJournalImageCarousel images={outcomeImages} />
            <div className="ojo-decision-fade-bottom" aria-hidden />
          </div>
        </div>
      ) : null}
    </div>
  );
}
