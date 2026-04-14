import type { CaseStudy } from "@/case-studies/omantel";

interface CaseConstraintsBlockProps {
  constraints: CaseStudy["sections"]["constraints"];
}

export function CaseConstraintsBlock({
  constraints,
}: CaseConstraintsBlockProps) {
  if (constraints.length === 0) return null;

  return (
    <div className="space-y-4 cs-problem-constraints">
      {constraints.map((item, index) => {
        if (item.intro && item.numberedItems && item.numberedItems.length > 0) {
          return (
            <div key={index} className="cs-constraints-block">
              <p className="case-body opacity-90 cs-constraints-intro">
                {item.intro}
              </p>
              <ul className="cs-constraint-list">
                {item.numberedItems.map((text, ni) => (
                  <li key={ni} className="cs-constraint-list-item">
                    <span className="cs-cl-marker">
                      {String(ni + 1).padStart(2, "0")}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (item.collapsible && item.title) {
          const lines = item.content.split("\n").filter((line) => line.trim());
          const bulletPoints: string[] = [];
          const textParts: string[] = [];
          let conclusion = "";
          let foundBullets = false;

          lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("•")) {
              foundBullets = true;
              bulletPoints.push(trimmed.replace(/^•\s*/, ""));
            } else if (trimmed && !foundBullets) {
              textParts.push(trimmed);
            } else if (trimmed && foundBullets && !trimmed.startsWith("•")) {
              conclusion = trimmed;
            }
          });

          return (
            <div key={index} className="cs-constraint-collapsible-inline">
              <h3 className="case-subsection-title">{item.title}</h3>
              <div className="case-body text-neutral-700 dark:text-neutral-300">
                {textParts.map((para, paraIndex) => (
                  <p key={paraIndex} className="mb-4">
                    {para}
                  </p>
                ))}
                {bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                    {bulletPoints.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                )}
                {conclusion && <p className="mb-4">{conclusion}</p>}
                {item.expandedContent && (
                  <p className="mt-4 case-body text-neutral-600 dark:text-neutral-400 italic">
                    {item.expandedContent}
                  </p>
                )}
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="mb-6">
            {item.title && (
              <h3 className="case-subsection-title">{item.title}</h3>
            )}
            <div className="case-body text-neutral-700 dark:text-neutral-300">
              {(() => {
                const lines = item.content
                  .split("\n")
                  .filter((line) => line.trim());
                const bulletPoints: string[] = [];
                const textParts: string[] = [];
                let foundBullets = false;

                lines.forEach((line) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("•")) {
                    foundBullets = true;
                    bulletPoints.push(trimmed.replace(/^•\s*/, ""));
                  } else if (trimmed && !foundBullets) {
                    textParts.push(trimmed);
                  } else if (
                    trimmed &&
                    foundBullets &&
                    !trimmed.startsWith("•")
                  ) {
                    textParts.push(trimmed);
                  }
                });

                return (
                  <>
                    {textParts.map((para, paraIndex) => (
                      <p
                        key={paraIndex}
                        className={paraIndex === 0 ? "mb-3" : "mb-3"}
                      >
                        {para}
                      </p>
                    ))}
                    {bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                        {bulletPoints.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
