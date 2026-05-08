import type { CaseStudy } from "@/case-studies/omantel";

interface OmantelJournalProblemProps {
  beforeAfter: NonNullable<CaseStudy["sections"]["outcomeBeforeAfter"]>;
}

/** Two-column before / after — copy unchanged from case data */
export function OmantelJournalProblem({
  beforeAfter,
}: OmantelJournalProblemProps) {
  return (
    <div className="ojo-problem-section">
      <div className="ojo-problem-insert ojo-paper ojo-paper-shadow">
        <div className="ojo-p-label">Current scenario</div>
        <div className="ojo-problem-grid">
          <div>
            <div className="ojo-before-label">Before</div>
            <p className="ojo-problem-text">{beforeAfter.before}</p>
          </div>
          <div className="ojo-before-state">
            <div className="ojo-before-label">After</div>
            <p className="ojo-after-text">{beforeAfter.after}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
