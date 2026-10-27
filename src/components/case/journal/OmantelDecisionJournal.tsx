"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { DecisionBlock } from "@/components/case/DecisionBlock";

type Decision = CaseStudy["sections"]["decisions"][number];

interface OmantelDecisionJournalProps {
  decision: Decision;
  index: number;
}

export function OmantelDecisionJournal({
  decision,
  index,
}: OmantelDecisionJournalProps) {
  return <DecisionBlock decision={decision} index={index} />;
}
