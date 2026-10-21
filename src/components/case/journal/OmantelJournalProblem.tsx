import type { CaseStudy } from "@/case-studies/omantel";
import { parseBoldSpans } from "@/lib/case-rich-text";

interface OmantelJournalProblemProps {
  beforeAfter: NonNullable<CaseStudy["sections"]["outcomeBeforeAfter"]>;
  /** Pass null to hide the eyebrow. Omit to keep the default label. */
  eyebrow?: string | null;
}

/** Two-column before / after. Copy comes from case data. */
export function OmantelJournalProblem({
  beforeAfter,
  eyebrow,
}: OmantelJournalProblemProps) {
  const label = eyebrow === undefined ? "Current scenario" : eyebrow;

  return (
    <div className="ojo-problem-section">
      <div className="ojo-problem-insert ojo-paper ojo-paper-shadow">
        {label ? <div className="ojo-p-label">{label}</div> : null}
        <div className="ojo-problem-grid">
          <div>
            <div className="ojo-before-label">Before</div>
            <p className="ojo-problem-text">
              {parseBoldSpans(beforeAfter.before)}
            </p>
          </div>
          <div className="ojo-before-state">
            <div className="ojo-before-label">After</div>
            <p className="ojo-after-text">
              {parseBoldSpans(beforeAfter.after)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
