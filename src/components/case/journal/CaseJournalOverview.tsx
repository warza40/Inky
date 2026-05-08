"use client";

import Image from "next/image";
import type { CaseStudy } from "@/case-studies/omantel";
import { parseMadderSpans } from "@/lib/case-rich-text";
import { CaseImpactPostIts } from "@/components/case/CaseImpactPostIts";
import { ContextEcosystem } from "@/components/case/ContextEcosystem";
import { CaseContextFlow } from "@/components/case/CaseContextFlow";

export function caseJournalOverviewHasContent(caseStudy: CaseStudy): boolean {
  const s = caseStudy.sections;
  return (
    Boolean(s.context) ||
    Boolean(s.contextSections?.length) ||
    Boolean(s.contextFlow?.paragraphs?.length) ||
    Boolean(s.contextFlow?.images?.length) ||
    Boolean(s.contextEcosystem) ||
    Boolean(s.journalImpact?.blocks?.length)
  );
}

interface CaseJournalOverviewProps {
  caseStudy: CaseStudy;
}

/** Leather strip + cream paper; mirrors CaseContextSection, journal styling */
export function CaseJournalOverview({ caseStudy }: CaseJournalOverviewProps) {
  const s = caseStudy.sections;
  const cf = s.contextFlow;
  const ji = s.journalImpact;
  if (!caseJournalOverviewHasContent(caseStudy)) return null;

  const hasFlowNarrative = Boolean(cf?.paragraphs?.length);
  const hasImpact = Boolean(ji?.blocks?.length);
  const showAimOnlyPaper =
    !hasImpact &&
    !hasFlowNarrative &&
    Boolean(cf?.aim?.trim()) &&
    !s.context &&
    !s.contextSections?.length;

  return (
    <div className="ojo-overview-section">
      {hasImpact ? (
        <div className="ojo-overview-impact-rail">
          <h3 className="cs-impact-postits-eyebrow">Impact</h3>
          <CaseImpactPostIts
            blocks={ji!.blocks}
            className="ojo-impact-postits--on-leather"
          />
        </div>
      ) : null}

      {hasFlowNarrative ? (
        <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
          <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
            <span className="ojo-punch-hole" />
            <span className="ojo-punch-hole" />
          </div>
          <div className="ojo-overview-inner ojo-overview-inner--stacked">
            <div className="ojo-overview-narrative">
              <div className="ojo-p-label">Overview</div>
              <CaseContextFlow
                paragraphs={cf!.paragraphs}
                aim={cf!.aim}
                delayStyle={{ ["--delay" as string]: "80ms" }}
              />
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
      ) : s.contextSections && s.contextSections.length > 0 ? (
        <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
          <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
            <span className="ojo-punch-hole" />
            <span className="ojo-punch-hole" />
          </div>
          <div className="ojo-context-text cs-context-text--sections ojo-overview-inner--stacked">
            {s.contextSections.map((section, i) => (
              <section key={i} className="cs-context-section">
                <h3 className="cs-context-section-title">{section.title}</h3>
                <p className="cs-context-section-body">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      ) : s.context ? (
        <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
          <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
            <span className="ojo-punch-hole" />
            <span className="ojo-punch-hole" />
          </div>
          <p className="ojo-context-text cs-context-text">{s.context}</p>
        </div>
      ) : showAimOnlyPaper ? (
        <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
          <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
            <span className="ojo-punch-hole" />
            <span className="ojo-punch-hole" />
          </div>
          <div className="ojo-overview-inner ojo-overview-inner--stacked">
            <div className="ojo-overview-narrative">
              <div className="ojo-p-label">Constraints &amp; context</div>
              <p className="ojo-impact-panel cs-context-aim">
                {parseMadderSpans(cf!.aim!)}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {s.contextEcosystem ? (
        <ContextEcosystem data={s.contextEcosystem} />
      ) : null}
    </div>
  );
}

/** @deprecated Use caseJournalOverviewHasContent */
export const omantelJournalOverviewHasContent = caseJournalOverviewHasContent;
/** @deprecated Use CaseJournalOverview */
export function OmantelJournalOverview(props: CaseJournalOverviewProps) {
  return <CaseJournalOverview {...props} />;
}
