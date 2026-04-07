import type { CaseStudy } from "@/case-studies/omantel";
import { parseBoldSpans } from "@/lib/case-rich-text";
import { CasePersonaGrid, CasePersonaIntro } from "./CasePersonaGrid";
import { MotionImage } from "./MotionImage";

type U = NonNullable<CaseStudy["sections"]["understanding"]>;

function splitSectionTitle(title: string): { eyebrow: string | null; headline: string } {
  const m = title.split(/\s[—–]\s/);
  if (m.length >= 2) {
    return { eyebrow: m[0].trim(), headline: m.slice(1).join(" — ").trim() };
  }
  return { eyebrow: null, headline: title };
}

export function DisasterRecoveryUnderstanding({ understanding }: { understanding: U }) {
  const sr = understanding.afterSecondaryResearchDivider;
  const ap = understanding.afterPersonasDivider;

  if (!sr || !ap) return null;

  return (
    <div className="cs-dr-understanding">
      <CasePersonaIntro intro={sr.intro} />
      {sr.personas && sr.personas.length > 0 ? (
        <CasePersonaGrid personas={sr.personas} quote={sr.personaQuote} />
      ) : null}

      <hr className="cs-dr-rule" aria-hidden />

      {(() => {
        const { eyebrow, headline } = splitSectionTitle(ap.title);
        return (
          <>
            {eyebrow ? (
              <div className="cs-dr-section-label">
                <span className="cs-dr-section-label-text cs-dr-section-label-text--accent">{eyebrow}</span>
              </div>
            ) : null}
            <h2 className="cs-dr-section-head">{headline}</h2>
          </>
        );
      })()}

      <div className="cs-dr-ia-intro-block">
        {ap.intro
          .split("\n\n")
          .filter((p) => p.trim())
          .map((para, i) => (
            <p key={i} className="case-body opacity-90 mb-0">
              {parseBoldSpans(para.trim())}
            </p>
          ))}
      </div>

      {ap.images && ap.images.length > 0 ? (
        <div className="cs-dr-ia-image-stack">
          {ap.images.map((img, i) => (
            <div key={`${img.src}-${i}`} className="cs-visual-frame">
              <div className="cs-visual-img cs-visual-img--contain">
                <MotionImage
                  src={img.src}
                  alt={img.alt ?? "IA or user flow visual"}
                  caption={img.caption}
                  intrinsic
                  lightbox
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {ap.bullets && ap.bullets.length > 0 ? (
            <ul className="cs-dr-ia-bullets">
              {ap.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}

          {ap.iaIterationLabels && ap.iaIterationLabels.length > 0 ? (
            <div className="cs-dr-ia-grid">
              {ap.iaIterationLabels.map((label, i) => (
                <div key={i} className="cs-dr-ia-placeholder">
                  <div className="cs-dr-ia-placeholder-sketch" aria-hidden />
                  <div className="cs-dr-ia-placeholder-label">{label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}

      <div className="cs-dr-ia-body">
        {ap.content
          .split("\n\n")
          .filter((p) => p.trim())
          .map((para, i) => (
            <p key={i} className="case-body opacity-90 mb-0">
              {parseBoldSpans(para.trim())}
            </p>
          ))}
      </div>

    </div>
  );
}
