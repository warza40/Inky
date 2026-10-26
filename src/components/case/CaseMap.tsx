"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { OmantelSystemMap } from "@/components/case/omantel/OmantelSystemMap";
import { SystemCaseMap } from "@/components/case/system/SystemCaseMap";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  if (caseStudy.slug === "omantel-bulk-activation") {
    return <OmantelSystemMap caseStudy={caseStudy} />;
  }

  return <SystemCaseMap caseStudy={caseStudy} />;
}
