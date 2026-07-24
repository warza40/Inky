import { omantelCase } from "./omantel";
import { warehouseOperationsCase } from "./warehouse-operations";
import { disasterRecoveryCase } from "./disaster-recovery";
import type { CaseStudy, CaseStudyWarmthTheme } from "./omantel";

export type { CaseStudy, CaseStudyWarmthTheme };

/** Published case studies only — never include placeholder/draft entries. */
export const caseStudies: CaseStudy[] = [
  omantelCase,
  warehouseOperationsCase,
  disasterRecoveryCase,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1 || i >= caseStudies.length - 1) return undefined;
  return caseStudies[i + 1];
}

export function getPreviousCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i <= 0) return undefined;
  return caseStudies[i - 1];
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
