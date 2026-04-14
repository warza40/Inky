import type { CaseStudy } from "@/case-studies/omantel";
import { MotionImage } from "./MotionImage";
import { DisasterRecoveryUnderstanding } from "./DisasterRecoveryUnderstanding";

type Understanding = NonNullable<CaseStudy["sections"]["understanding"]>;

interface CaseUnderstandingBlockProps {
  slug: string;
  understanding: Understanding;
}

export function CaseUnderstandingBlock({
  slug,
  understanding: u,
}: CaseUnderstandingBlockProps) {
  if (slug === "disaster-recovery") {
    return (
      <div className="cs-understanding-block">
        <h3 className="case-subsection-title">{u.title}</h3>
        <DisasterRecoveryUnderstanding understanding={u} />
      </div>
    );
  }

  return (
    <div className="cs-understanding-block">
      <h3 className="case-subsection-title">{u.title}</h3>
      <div className="case-body text-neutral-700 dark:text-neutral-300">
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
                <p key={i} className="mb-4">
                  {para}
                </p>
              ))}
              {bulletPoints.length > 0 && (
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  {bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
              {u.expandedContent && (
                <p className="mt-4 case-body text-neutral-600 dark:text-neutral-400 italic">
                  {u.expandedContent}
                </p>
              )}
              {hasVisualsBlock && (
                <div className="case-divider mt-6 pt-6 border-t border-[var(--case-border)] space-y-6">
                  {u.visualsTitle && (
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      {u.visualsTitle}
                    </h3>
                  )}
                  {images.length > 0 ? (
                    images.map((img, idx) => (
                      <div key={idx} className="w-full">
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
                          <div className="w-full aspect-video rounded-xl border border-[var(--case-border)] bg-[var(--background)]" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div
                      className="min-h-[120px] rounded-xl border border-[var(--case-border)] bg-[var(--background)]"
                      aria-label="Visuals placeholder"
                    />
                  )}
                </div>
              )}
              {showDividerAfterVisuals && (
                <hr className="border-[var(--case-border)] my-6" aria-hidden />
              )}
              {showDividerAfterVisuals && u.afterDivider && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {u.afterDivider.title}
                  </h3>
                  {u.afterDivider.goal && (
                    <p className="mb-4">
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">
                        Goal :
                      </span>{" "}
                      {u.afterDivider.goal}
                    </p>
                  )}
                  {u.afterDivider.content && (
                    <p className="mb-4">{u.afterDivider.content}</p>
                  )}
                  {u.afterDivider.bullets &&
                    u.afterDivider.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        {u.afterDivider.bullets.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                </div>
              )}
              {showDividerAfterVisuals && u.afterDivider && (
                <hr className="border-[var(--case-border)] my-6" aria-hidden />
              )}
              {showDividerAfterVisuals && u.afterApproachDivider && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {u.afterApproachDivider.title}
                  </h3>
                  <div className="space-y-4">
                    {u.afterApproachDivider.content
                      .split("\n\n")
                      .filter((p) => p.trim())
                      .map((para, i) => (
                        <p key={i} className="mb-0">
                          {para.trim()}
                        </p>
                      ))}
                  </div>
                </div>
              )}
              {u.afterSecondaryResearchDivider && (
                <>
                  <hr
                    className="border-[var(--case-border)] my-6"
                    aria-hidden
                  />
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      {u.afterSecondaryResearchDivider.title}
                    </h3>
                    {u.afterSecondaryResearchDivider.intro && (
                      <div className="space-y-4 mb-4">
                        {u.afterSecondaryResearchDivider.intro
                          .split("\n\n")
                          .filter((p) => p.trim())
                          .map((para, i) => (
                            <p key={i} className="mb-0">
                              {para.trim()}
                            </p>
                          ))}
                      </div>
                    )}
                    {u.afterSecondaryResearchDivider.bullets &&
                      u.afterSecondaryResearchDivider.bullets.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                          {u.afterSecondaryResearchDivider.bullets.map(
                            (item, i) => (
                              <li key={i} className="whitespace-pre-line">
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    {u.afterSecondaryResearchDivider.content && (
                      <div className="space-y-4">
                        {u.afterSecondaryResearchDivider.content
                          .split("\n\n")
                          .filter((p) => p.trim())
                          .map((para, i) => (
                            <p key={i} className="mb-0 whitespace-pre-line">
                              {para.trim()}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                </>
              )}
              {u.afterPersonasDivider && (
                <>
                  <hr
                    className="border-[var(--case-border)] my-6"
                    aria-hidden
                  />
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      {u.afterPersonasDivider.title}
                    </h3>
                    {u.afterPersonasDivider.intro && (
                      <div className="space-y-4 mb-4">
                        {u.afterPersonasDivider.intro
                          .split("\n\n")
                          .filter((p) => p.trim())
                          .map((para, i) => (
                            <p key={i} className="mb-0">
                              {para.trim()}
                            </p>
                          ))}
                      </div>
                    )}
                    {u.afterPersonasDivider.bullets &&
                      u.afterPersonasDivider.bullets.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                          {u.afterPersonasDivider.bullets.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    {u.afterPersonasDivider.content && (
                      <div className="space-y-4">
                        {u.afterPersonasDivider.content
                          .split("\n\n")
                          .filter((p) => p.trim())
                          .map((para, i) => (
                            <p key={i} className="mb-0">
                              {para.trim()}
                            </p>
                          ))}
                      </div>
                    )}
                    {u.afterPersonasDivider.images &&
                      u.afterPersonasDivider.images.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 w-full max-w-full mt-6">
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
                      <div className="cs-workflows-inline mt-6">
                        <h4 className="cs-workflows-inline-title">
                          Exploring high frequency workflows
                        </h4>
                        <div className="case-body text-neutral-700 dark:text-neutral-300">
                          {u.afterPersonasDivider.workflowsIntro && (
                            <p className="mb-4">
                              {u.afterPersonasDivider.workflowsIntro}
                            </p>
                          )}
                          {u.afterPersonasDivider.workflows &&
                            u.afterPersonasDivider.workflows.length > 0 && (
                              <ul className="space-y-4 mb-4 list-none ml-0">
                                {u.afterPersonasDivider.workflows.map(
                                  (item, i) => (
                                    <li key={i}>
                                      <strong className="text-neutral-900 dark:text-neutral-100">
                                        {item.title}
                                      </strong>
                                      <br />
                                      <span className="text-neutral-700 dark:text-neutral-300">
                                        {item.description}
                                      </span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            )}
                          {u.afterPersonasDivider.workflowsClosing && (
                            <p className="mb-0">
                              {u.afterPersonasDivider.workflowsClosing}
                            </p>
                          )}
                        </div>
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
