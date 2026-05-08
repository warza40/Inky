"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { CaseJournalMap } from "@/components/case/journal/CaseJournalMap";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  return <CaseJournalMap caseStudy={caseStudy} />;
}
