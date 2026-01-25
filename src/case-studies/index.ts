import { omantelCase } from "./omantel";
import { anotherCase } from "./another-case";
import type { CaseStudy } from "./omantel";

export const caseStudies: CaseStudy[] = [omantelCase, anotherCase];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
