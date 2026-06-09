import type { ReactNode } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { MotionImage } from "./MotionImage";
import { DisasterRecoveryUnderstanding } from "./DisasterRecoveryUnderstanding";

type Understanding = NonNullable<CaseStudy["sections"]["understanding"]>;

interface CaseUnderstandingBlockProps {
  slug: string;
  understanding: Understanding;
}

function UnderstandingSubsectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="cs-context-section-title">{children}</h3>;
}

export function CaseUnderstandingBlock({
  slug,
  understanding: u,
}: CaseUnderstandingBlockProps) {
  if (slug === "disaster-recovery") {
    return (
      <div className="cs-understanding-block">
        <div className="ojo-p-label">{u.title}</div>
        <DisasterRecoveryUnderstanding understanding={u} />
      </div>
    );
  }

  return (
    <div className="cs-understanding-block">
      <div className="ojo-p-label">{u.title}</div>
      <div className="case-body cs-understanding-body">
        {(() => {
          const lines = u.content.split("\n").filter((line) => line.trim());
          const bulletPoints: string[] = [];
          const textParts: string[] = [];
          let showDividerAfterVisuals = false;
          lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("•")) {
              bulletPoints.push(trimmed.replace(/^•\s*/, ""));
            } else if (trimmed === "---") {
              showDividerAfterVisuals = true;
            } else if (trimmed) {
              textParts.push(trimmed);
            }
          });
          const images = u.images ?? [];
          const hasVisualsBlock = showDividerAfterVisuals || images.length > 0;
          return (
            <>
              {textParts.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {bulletPoints.length > 0 && (
                <ul className="cs-understanding-list">
                  {bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
              {u.expandedContent && (
                <p className="cs-context-aim">{u.expandedContent}</p>
              )}
              {hasVisualsBlock && (
                <div className="case-divider cs-understanding-visuals">
                  {u.visualsTitle && (
                    <UnderstandingSubsectionTitle>
                      {u.visualsTitle}
                    </UnderstandingSubsectionTitle>
                  )}
                  {images.length > 0 ? (
                    images.map((img, idx) => (
                      <div key={idx} className="cs-understanding-visual">
                        {img.src ? (
                          <MotionImage
                            src={img.src}
                            alt={img.alt ?? "Understanding visual"}
                            caption={img.caption}
                            fill
                            objectFit="contain"
                            lightbox
                            hoverTooltip={img.hoverTooltip}
                          />
                        ) : (
                          <div
                            className="cs-understanding-visual-placeholder"
                            aria-label="Visuals placeholder"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div
                      className="cs-understanding-visual-placeholder"
                      aria-label="Visuals placeholder"
                    />
                  )}
                </div>
              )}
              {showDividerAfterVisuals && (
                <hr className="cs-dr-rule" aria-hidden />
              )}
              {showDividerAfterVisuals && u.afterDivider && (
                <div className="cs-understanding-subsection">
                  <UnderstandingSubsectionTitle>
                    {u.afterDivider.title}
                  </UnderstandingSubsectionTitle>
                  {u.afterDivider.goal && (
                    <p>
                      <span className="cs-understanding-goal-label">
                        Goal :
                      </span>{" "}
                      {u.afterDivider.goal}
                    </p>
                  )}
                  {u.afterDivider.content && <p>{u.afterDivider.content}</p>}
                  {u.afterDivider.bullets &&
                    u.afterDivider.bullets.length > 0 && (
                      <ul className="cs-understanding-list">
                        {u.afterDivider.bullets.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                </div>
              )}
              {showDividerAfterVisuals && u.afterDivider && (
                <hr className="cs-dr-rule" aria-hidden />
              )}
              {showDividerAfterVisuals && u.afterApproachDivider && (
                <div className="cs-understanding-subsection">
                  <UnderstandingSubsectionTitle>
                    {u.afterApproachDivider.title}
                  </UnderstandingSubsectionTitle>
                  {u.afterApproachDivider.content
                    .split("\n\n")
                    .filter((p) => p.trim())
                    .map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                </div>
              )}
              {u.afterSecondaryResearchDivider && (
                <>
                  <hr className="cs-dr-rule" aria-hidden />
                  <div className="cs-understanding-subsection">
                    <UnderstandingSubsectionTitle>
                      {u.afterSecondaryResearchDivider.title}
                    </UnderstandingSubsectionTitle>
                    {u.afterSecondaryResearchDivider.intro &&
                      u.afterSecondaryResearchDivider.intro
                        .split("\n\n")
                        .filter((p) => p.trim())
                        .map((para, i) => <p key={i}>{para.trim()}</p>)}
                    {u.afterSecondaryResearchDivider.bullets &&
                      u.afterSecondaryResearchDivider.bullets.length > 0 && (
                        <ul className="cs-understanding-list">
                          {u.afterSecondaryResearchDivider.bullets.map(
                            (item, i) => (
                              <li key={i} className="whitespace-pre-line">
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    {u.afterSecondaryResearchDivider.content &&
                      u.afterSecondaryResearchDivider.content
                        .split("\n\n")
                        .filter((p) => p.trim())
                        .map((para, i) => (
                          <p key={i} className="whitespace-pre-line">
                            {para.trim()}
                          </p>
                        ))}
                  </div>
                </>
              )}
              {u.afterPersonasDivider && (
                <>
                  <hr className="cs-dr-rule" aria-hidden />
                  <div className="cs-understanding-subsection">
                    <UnderstandingSubsectionTitle>
                      {u.afterPersonasDivider.title}
                    </UnderstandingSubsectionTitle>
                    {u.afterPersonasDivider.intro &&
                      u.afterPersonasDivider.intro
                        .split("\n\n")
                        .filter((p) => p.trim())
                        .map((para, i) => <p key={i}>{para.trim()}</p>)}
                    {u.afterPersonasDivider.bullets &&
                      u.afterPersonasDivider.bullets.length > 0 && (
                        <ul className="cs-understanding-list">
                          {u.afterPersonasDivider.bullets.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    {u.afterPersonasDivider.content &&
                      u.afterPersonasDivider.content
                        .split("\n\n")
                        .filter((p) => p.trim())
                        .map((para, i) => <p key={i}>{para.trim()}</p>)}
                    {u.afterPersonasDivider.images &&
                      u.afterPersonasDivider.images.length > 0 && (
                        <div className="cs-understanding-image-stack">
                          {u.afterPersonasDivider.images.map((img, i) => (
                            <MotionImage
                              key={i}
                              src={img.src}
                              alt={img.alt ?? ""}
                              caption={img.caption}
                              fill
                              objectFit="contain"
                              lightbox
                            />
                          ))}
                        </div>
                      )}
                    {(u.afterPersonasDivider.workflowsIntro ||
                      u.afterPersonasDivider.workflows?.length ||
                      u.afterPersonasDivider.workflowsClosing) && (
                      <div className="cs-workflows-inline">
                        <h4 className="cs-workflows-inline-title">
                          Exploring high frequency workflows
                        </h4>
                        {u.afterPersonasDivider.workflowsIntro && (
                          <p>{u.afterPersonasDivider.workflowsIntro}</p>
                        )}
                        {u.afterPersonasDivider.workflows &&
                          u.afterPersonasDivider.workflows.length > 0 && (
                            <ul className="cs-understanding-workflows">
                              {u.afterPersonasDivider.workflows.map(
                                (item, i) => (
                                  <li key={i}>
                                    <strong>{item.title}</strong>
                                    <span>{item.description}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        {u.afterPersonasDivider.workflowsClosing && (
                          <p>{u.afterPersonasDivider.workflowsClosing}</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
