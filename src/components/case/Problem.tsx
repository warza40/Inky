import type { CaseStudy } from "@/case-studies/omantel";
import { Collapsible } from "./Collapsible";

interface ProblemProps {
  problem: CaseStudy["sections"]["problem"];
}

export function Problem({ problem }: ProblemProps) {
  if (problem.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        {problem.map((item, index) => {
          if (item.collapsible && item.title) {
            const lines = item.content.split('\n').filter(line => line.trim());
            const bulletPoints: string[] = [];
            let conclusion = '';
            
            lines.forEach((line) => {
              const trimmed = line.trim();
              if (/^\d+\./.test(trimmed)) {
                bulletPoints.push(trimmed);
              } else if (trimmed) {
                conclusion = trimmed;
              }
            });

            return (
              <Collapsible key={index} title={item.title}>
                <div className="case-body opacity-90">
                  <ol className="list-decimal list-inside space-y-2 mb-4 ml-2">
                    {bulletPoints.map((point, pointIndex) => (
                      <li key={pointIndex}>{point.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                  {conclusion && (
                    <p className="mt-4">{conclusion}</p>
                  )}
                </div>
              </Collapsible>
            );
          }
          return (
            <div key={index} className="mb-6">
              {item.title && (
                <h3 className="case-subsection-title">
                  {item.title}
                </h3>
              )}
              <p className="case-body whitespace-pre-line opacity-90">
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
