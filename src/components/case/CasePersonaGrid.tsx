import { parseBoldSpans } from "@/lib/case-rich-text";

export interface PersonaCardData {
  name: string;
  ageLine: string;
  worksWith: string;
  motivations: string[];
  frustrations: string[];
  painPoints: string[];
}

function PersonaFieldLabel({ children }: { children: string }) {
  return <div className="ojo-d-impact-label">{children}</div>;
}

const PERSONA_TAPES = [
  { side: "left", variant: "red" },
  { side: "right", variant: "teal" },
  { side: "left", variant: "gold" },
  { side: "right", variant: "red" },
] as const;

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
        {personas.map((p, i) => {
          const tape = PERSONA_TAPES[i % PERSONA_TAPES.length];
          return (
            <div key={i} className="cs-persona-card">
              <span
                className={`cs-persona-tape cs-persona-tape--${tape.side} cs-persona-tape--${tape.variant}`}
                aria-hidden
              />
              <div className="cs-persona-name">{p.name}</div>
              <div className="cs-persona-age">{p.ageLine}</div>
              <div className="cs-persona-works">{p.worksWith}</div>
              <PersonaFieldLabel>Motivations</PersonaFieldLabel>
              <ul className="cs-persona-list">
                {p.motivations.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <PersonaFieldLabel>Frustrations</PersonaFieldLabel>
              <ul className="cs-persona-list">
                {p.frustrations.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <PersonaFieldLabel>Pain points</PersonaFieldLabel>
              <ul className="cs-persona-list">
                {p.painPoints.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {quote ? <p className="case-body cs-persona-aside">{quote}</p> : null}
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
