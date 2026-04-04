import { omantelCase } from "./omantel";
import { anotherCase } from "./another-case";
import { realEstateConnectivityCase } from "./real-estate-connectivity";
import { warehouseOperationsCase } from "./warehouse-operations";
import type { CaseStudy, CaseStudyWarmthTheme } from "./omantel";

export type { CaseStudy, CaseStudyWarmthTheme };

export const caseStudies: CaseStudy[] = [
  omantelCase,
  anotherCase,
  realEstateConnectivityCase,
  warehouseOperationsCase,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
