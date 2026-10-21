"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { CaseJournalMap } from "@/components/case/journal/CaseJournalMap";
import { OmantelSystemMap } from "@/components/case/omantel/OmantelSystemMap";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  if (caseStudy.slug === "omantel-bulk-activation") {
    return <OmantelSystemMap caseStudy={caseStudy} />;
  }
  return <CaseJournalMap caseStudy={caseStudy} />;
}
