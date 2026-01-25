import type { CaseStudy } from "@/case-studies/omantel";
import { Collapsible } from "./Collapsible";

interface ProblemProps {
  problem: CaseStudy["sections"]["problem"];
}

export function Problem({ problem }: ProblemProps) {
  if (problem.length === 0) return null;

  return (
    <>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Problem</h2>
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
                <div className="text-base text-neutral-700 leading-relaxed">
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
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
              )}
              <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
