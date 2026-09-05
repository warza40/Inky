import { omantelCase } from "./omantel";
import { anotherCase } from "./another-case";
import { warehouseOperationsCase } from "./warehouse-operations";
import { disasterRecoveryCase } from "./disaster-recovery";
import type { CaseStudy } from "./omantel";

export type { CaseStudy };

export const caseStudies: CaseStudy[] = [
  omantelCase,
  anotherCase,
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
