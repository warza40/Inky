import type { CaseStudy } from "./omantel";

export const anotherCase: CaseStudy = {
  slug: "another-case",
  title: "Another Case Study",
  overview: {
    role: "Product Designer",
    context: "B2B · SaaS",
    company: "Example Company",
    problem: "Example problem statement",
    focus: "User Experience · Efficiency",
  },
  sections: {
    problem: [
      {
        content: "Example problem description for another case study.",
      },
    ],
    constraints: [
      {
        content: "Example constraints that influenced the design decisions.",
      },
    ],
    decisions: [
      {
        title: "Key Decision 1",
        description: "Description of the first major design decision.",
        rationale: "Why this decision was made based on research and constraints.",
        impact: "Measurable impact of this decision on the product and users.",
      },
    ],
  },
};
