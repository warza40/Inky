import { omantelCase } from "./omantel";
import { anotherCase } from "./another-case";
import { realEstateConnectivityCase } from "./real-estate-connectivity";
import type { CaseStudy } from "./omantel";

export const caseStudies: CaseStudy[] = [
  omantelCase,
  anotherCase,
  realEstateConnectivityCase,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
