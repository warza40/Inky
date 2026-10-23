"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { OmantelSystemMap } from "@/components/case/omantel/OmantelSystemMap";
import { CaseJournalMap } from "@/components/case/journal/CaseJournalMap";
import { SystemCaseMap } from "@/components/case/system/SystemCaseMap";
import { isSystemCase } from "@/components/case/system/system-slugs";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  if (caseStudy.slug === "omantel-bulk-activation") {
    return <OmantelSystemMap caseStudy={caseStudy} />;
  }

  if (isSystemCase(caseStudy.slug)) {
    return <SystemCaseMap caseStudy={caseStudy} />;
  }

  return <CaseJournalMap caseStudy={caseStudy} />;
}
