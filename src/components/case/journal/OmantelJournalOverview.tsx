"use client";

import Image from "next/image";
import type { CaseStudy } from "@/case-studies/omantel";
import { parseMadderSpans } from "@/lib/case-rich-text";
import { cn } from "@/lib/utils";

interface OmantelJournalOverviewProps {
  caseStudy: CaseStudy;
}

/** Single insert: Overview + Impact columns; optional context visuals below */
export function OmantelJournalOverview({
  caseStudy,
}: OmantelJournalOverviewProps) {
  const cf = caseStudy.sections.contextFlow;
  const ji = caseStudy.sections.journalImpact;
  if (!cf?.paragraphs?.length && !ji?.blocks?.length) return null;

  const hasOverview = Boolean(cf?.paragraphs?.length);

  return (
    <section id="context" className="ojo-overview-section cs-section">
      <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
        <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
          <span className="ojo-punch-hole" />
          <span className="ojo-punch-hole" />
        </div>
        <div className="ojo-overview-inner">
          <div className="ojo-overview-col-l">
            {hasOverview ? (
              <>
                <div className="ojo-p-label">Overview</div>
                <div className="ojo-overview-text cs-context-text cs-context-text--flow">
                  {cf.paragraphs.map((p, i) => (
                    <p key={i} className="ojo-overview-p cs-context-flow-p">
                      {parseMadderSpans(p)}
                    </p>
                  ))}
                </div>
                {cf.aim ? (
                  <p className="ojo-overview-aim">{parseMadderSpans(cf.aim)}</p>
                ) : null}
              </>
            ) : null}
          </div>

          <div className="ojo-overview-vdivider" aria-hidden />

          <div className="ojo-overview-col-r">
            {ji?.blocks?.length ? (
              <>
                <div className="ojo-p-label">Impact</div>
                <ul className="ojo-impact-stack" role="list">
                  {ji.blocks.map((b, i) => (
                    <li
                      key={i}
                      className="ojo-impact-row ojo-impact-metric-box"
                    >
                      {b.value?.trim() || b.labelItalic?.trim() ? (
                        <p className="ojo-impact-stat">
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
                      {b.metaCaps ? (
                        <p className="ojo-impact-caps">{b.metaCaps}</p>
                      ) : null}
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
              </>
            ) : cf?.aim ? (
              <>
                <div className="ojo-p-label">Constraints &amp; context</div>
                <p className="ojo-impact-panel cs-context-aim">
                  {parseMadderSpans(cf.aim)}
                </p>
              </>
            ) : null}
          </div>
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
    </section>
  );
}
