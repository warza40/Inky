import { parseBoldSpans } from "@/lib/case-rich-text";

export interface PersonaCardData {
  name: string;
  ageLine: string;
  worksWith: string;
  motivations: string[];
  frustrations: string[];
  painPoints: string[];
}

export function CasePersonaGrid({
  personas,
  quote,
}: {
  personas: PersonaCardData[];
  quote?: string;
}) {
  return (
    <>
      <div className="cs-persona-grid">
        {personas.map((p, i) => (
          <div key={i} className="cs-persona-card">
            <div className="cs-persona-name">{p.name}</div>
            <div className="cs-persona-age">{p.ageLine}</div>
            <div className="cs-persona-works">{p.worksWith}</div>
            <div className="cs-persona-section-label">Motivations</div>
            <ul className="cs-persona-list">
              {p.motivations.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
            <div className="cs-persona-section-label">Frustrations</div>
            <ul className="cs-persona-list">
              {p.frustrations.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
            <div className="cs-persona-section-label">Pain Points</div>
            <ul className="cs-persona-list">
              {p.painPoints.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        {quote ? (
          <blockquote className="cs-persona-quote">{quote}</blockquote>
        ) : null}
      </div>
    </>
  );
}

export function CasePersonaIntro({ intro }: { intro: string }) {
  return (
    <div className="cs-persona-intro">
      {intro
        .split("\n\n")
        .filter((p) => p.trim())
        .map((para, i) => (
          <p key={i} className="case-body opacity-90 mb-0">
            {parseBoldSpans(para.trim())}
          </p>
        ))}
    </div>
  );
}
