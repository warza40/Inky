import type { CaseStudy } from "@/case-studies/omantel";
import {
  ComparisonCard,
  ComparisonPanel,
} from "@/components/case/ComparisonPanel";
import { parseBoldSpans } from "@/lib/case-rich-text";

interface OmantelJournalProblemProps {
  beforeAfter: NonNullable<CaseStudy["sections"]["outcomeBeforeAfter"]>;
  /** Pass null to hide the eyebrow. Omit to keep the default label. */
  eyebrow?: string | null;
}

function paragraphsOf(text: string): string[] {
  return text
    .split(/\n\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Two-column before / after. Copy comes from case data. */
export function OmantelJournalProblem({
  beforeAfter,
  eyebrow,
}: OmantelJournalProblemProps) {
  const label = eyebrow === undefined ? "Current scenario" : eyebrow;

  return (
    <ComparisonPanel label={label ?? undefined}>
      <ComparisonCard label="Before">
        <div className="om-dense">
          {paragraphsOf(beforeAfter.before).map((part, index) => (
            <p key={`${index}-${part.slice(0, 16)}`}>{parseBoldSpans(part)}</p>
          ))}
        </div>
      </ComparisonCard>
      <ComparisonCard label="After" emphasis>
        <div className="om-dense">
          {paragraphsOf(beforeAfter.after).map((part, index) => (
            <p key={`${index}-${part.slice(0, 16)}`}>{parseBoldSpans(part)}</p>
          ))}
        </div>
      </ComparisonCard>
    </ComparisonPanel>
  );
}
