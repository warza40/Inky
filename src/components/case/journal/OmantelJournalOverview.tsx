"use client";

import Image from "next/image";
import type { CaseStudy } from "@/case-studies/omantel";
import { parseMadderSpans } from "@/lib/case-rich-text";
import { CaseImpactPostIts } from "@/components/case/CaseImpactPostIts";

interface OmantelJournalOverviewProps {
  caseStudy: CaseStudy;
}

export function omantelJournalOverviewHasContent(
  caseStudy: CaseStudy,
): boolean {
  const cf = caseStudy.sections.contextFlow;
  const ji = caseStudy.sections.journalImpact;
  return Boolean(cf?.paragraphs?.length) || Boolean(ji?.blocks?.length);
}

/** Insert: Impact post-its (sage) above Overview; optional context visuals below */
export function OmantelJournalOverview({
  caseStudy,
}: OmantelJournalOverviewProps) {
  const cf = caseStudy.sections.contextFlow;
  const ji = caseStudy.sections.journalImpact;
  if (!cf?.paragraphs?.length && !ji?.blocks?.length) return null;

  const hasOverview = Boolean(cf?.paragraphs?.length);

  return (
    <div className="ojo-overview-section">
      <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
        <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
          <span className="ojo-punch-hole" />
          <span className="ojo-punch-hole" />
        </div>
        <div className="ojo-overview-inner ojo-overview-inner--stacked">
          {ji?.blocks?.length ? (
            <div className="ojo-overview-impact-band">
              <h3 className="cs-impact-postits-eyebrow">Impact</h3>
              <CaseImpactPostIts blocks={ji.blocks} />
            </div>
          ) : null}

          {(hasOverview || (!ji?.blocks?.length && cf?.aim)) && (
            <div className="ojo-overview-narrative">
              {hasOverview ? (
                <>
                  <div className="ojo-p-label">Overview</div>
                  <div className="ojo-overview-text cs-context-text cs-context-text--flow">
                    {cf!.paragraphs.map((p, i) => (
                      <p key={i} className="ojo-overview-p cs-context-flow-p">
                        {parseMadderSpans(p)}
                      </p>
                    ))}
                  </div>
                  {cf!.aim ? (
                    <p className="ojo-overview-aim">
                      {parseMadderSpans(cf!.aim)}
                    </p>
                  ) : null}
                </>
              ) : null}
              {!ji?.blocks?.length && cf?.aim ? (
                <>
                  <div className="ojo-p-label">Constraints &amp; context</div>
                  <p className="ojo-impact-panel cs-context-aim">
                    {parseMadderSpans(cf!.aim)}
                  </p>
                </>
              ) : null}
            </div>
          )}
        </div>
        {cf?.images && cf.images.length > 0 ? (
          <div className="ojo-context-visuals">
            {cf.images.map((img, i) => (
              <figure key={i} className="ojo-context-visual">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, min(980px, 92vw)"
                  className="ojo-context-visual-img"
                />
                {img.caption ? (
                  <figcaption className="ojo-context-caption">
                    {img.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
