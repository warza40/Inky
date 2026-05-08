import Image from "next/image";
import type { CaseStudy } from "@/case-studies/omantel";
import { CaseImpactPostIts } from "@/components/case/CaseImpactPostIts";
import { ContextEcosystem } from "./ContextEcosystem";
import { CaseContextFlow } from "./CaseContextFlow";
import { MotionSection } from "./MotionSection";

interface CaseContextSectionProps {
  caseStudy: CaseStudy;
}

export function CaseContextSection({ caseStudy }: CaseContextSectionProps) {
  const s = caseStudy.sections;
  const hasContext =
    Boolean(s.context) ||
    Boolean(s.contextSections?.length) ||
    Boolean(s.contextFlow?.paragraphs?.length) ||
    Boolean(s.contextFlow?.images?.length) ||
    Boolean(s.contextEcosystem) ||
    Boolean(s.journalImpact?.blocks?.length);

  if (!hasContext) return null;

  return (
    <MotionSection id="context" title="Context">
      {s.journalImpact?.blocks && s.journalImpact.blocks.length > 0 ? (
        <div className="cs-impact-postits-section">
          <h3 className="cs-impact-postits-eyebrow">Impact</h3>
          <CaseImpactPostIts blocks={s.journalImpact.blocks} />
        </div>
      ) : null}
      {s.contextFlow?.paragraphs?.length ? (
        <>
          <CaseContextFlow
            paragraphs={s.contextFlow.paragraphs}
            aim={s.contextFlow.aim}
          />
          {s.contextFlow.images && s.contextFlow.images.length > 0 ? (
            <div className="cs-context-visuals">
              {s.contextFlow.images.map((img, i) => (
                <figure key={i} className="cs-context-visual">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={675}
                    className="cs-context-visual-img"
                    sizes="(max-width: 768px) 100vw, min(var(--cs-column-cap), 100%)"
                  />
                  {img.caption ? (
                    <figcaption className="cs-context-visual-caption">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}
        </>
      ) : s.contextSections && s.contextSections.length > 0 ? (
        <div className="cs-context-text cs-context-text--sections">
          {s.contextSections.map((section, i) => (
            <section key={i} className="cs-context-section">
              <h3 className="cs-context-section-title">{section.title}</h3>
              <p className="cs-context-section-body">{section.body}</p>
            </section>
          ))}
        </div>
      ) : s.context ? (
        <p className="cs-context-text">{s.context}</p>
      ) : null}
      {s.contextEcosystem ? (
        <ContextEcosystem data={s.contextEcosystem} />
      ) : null}
    </MotionSection>
  );
}
