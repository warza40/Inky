"use client";

import { OmantelJournalImageCarousel } from "@/components/case/journal/OmantelJournalImageCarousel";
import { parseBoldSpans } from "@/lib/case-rich-text";
import { cn } from "@/lib/utils";

interface OmantelJournalOutcomeProps {
  highlights?: string[];
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  reflection?: string;
  reflectionBullets?: string[];
  reflectionClosing?: string;
  /** Long-form outcome (paragraphs + optional • bullets), same as `sections.outcome` */
  outcomeNarrative?: string;
  outcomePill?: string;
}

function OutcomeNarrativeBody({
  text,
  withVisualLead,
}: {
  text: string;
  withVisualLead: boolean;
}) {
  const lines = text.split("\n").filter((line) => line.trim());
  const bulletPoints: string[] = [];
  const textParts: string[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("•")) {
      bulletPoints.push(trimmed.replace(/^•\s*/, ""));
    } else if (trimmed) {
      textParts.push(trimmed);
    }
  });

  return (
    <>
      {textParts.map((para, paraIndex) => (
        <p key={paraIndex} className="mb-4 case-body opacity-90">
          {para}
        </p>
      ))}
      {bulletPoints.length > 0 ? (
        <ul
          className={cn(
            "cs-outcome-list",
            withVisualLead && "cs-outcome-list--with-visuals",
          )}
        >
          {bulletPoints.map((point, pointIndex) => (
            <li key={pointIndex} className="cs-outcome-result-item">
              {parseBoldSpans(point)}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function OmantelJournalOutcome({
  highlights,
  images,
  reflection,
  reflectionBullets,
  reflectionClosing,
  outcomeNarrative,
  outcomePill,
}: OmantelJournalOutcomeProps) {
  const hasNarrative = Boolean(outcomeNarrative?.trim());
  const hasReflection =
    Boolean(reflection?.trim()) || Boolean(reflectionBullets?.length);
  if (
    !(highlights?.length ?? 0) &&
    !(images?.length ?? 0) &&
    !hasReflection &&
    !hasNarrative
  )
    return null;

  const hasOutcomeImages = Boolean(images?.length ?? 0);
  const outcomeImages = images ?? [];

  const hasPaper =
    (highlights?.length ?? 0) > 0 || hasReflection || hasNarrative;

  const hasTopPaperContent = (highlights?.length ?? 0) > 0 || hasNarrative;

  return (
    <div className="ojo-outcome-stack">
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

      {hasPaper ? (
        <div className={hasOutcomeImages ? "ojo-outcome-text-wrap" : undefined}>
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
            {hasNarrative ? (
              <>
                <div
                  className={cn(
                    "ojo-p-label",
                    (highlights?.length ?? 0) > 0 &&
                      "ojo-outcome-label--after-highlights",
                  )}
                >
                  Outcome
                </div>
                <OutcomeNarrativeBody
                  text={outcomeNarrative!}
                  withVisualLead={hasOutcomeImages}
                />
                {outcomePill ? (
                  <div className="cs-outcome-pill">{outcomePill}</div>
                ) : null}
              </>
            ) : null}
            {hasReflection ? (
              <>
                <div
                  className={cn(
                    "ojo-p-label",
                    hasTopPaperContent && "ojo-outcome-label--after-body",
                  )}
                >
                  Reflection
                </div>
                {reflection?.trim() ? (
                  <p className="ojo-reflection-p whitespace-pre-line">
                    {reflection}
                  </p>
                ) : null}
                {reflectionBullets && reflectionBullets.length > 0 ? (
                  <ul
                    className={cn(
                      "ojo-reflection-list",
                      !reflection?.trim() && "ojo-reflection-list--lead",
                    )}
                  >
                    {reflectionBullets.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {reflectionClosing ? (
                  <p className="cs-reflection-closing">{reflectionClosing}</p>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
