export interface CaseStudy {
  slug: string;
  title: string;
  overview: {
    role: string;
    context: string;
    company: string;
    problem: string;
    focus: string;
  };
  sections: {
    context?: string;
    problem: Array<{
      title?: string;
      content: string;
      collapsible?: boolean;
    }>;
    understanding?: {
      title: string;
      content: string;
      expandedContent?: string;
    };
    constraints: Array<{
      title?: string;
      content: string;
      collapsible?: boolean;
      expandedContent?: string;
    }>;
    decisions: Array<{
      title: string;
      description: string;
      rationale: string;
      impact: string;
      images?: Array<{
        src: string;
        alt: string;
        caption?: string;
      }>;
    }>;
    outcome?: string;
    reflection?: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export const omantelCase: CaseStudy = {
  slug: "omantel-bulk-activation",
  title: "Designing a scalable bulk activation system",
  overview: {
    role: "Senior UX Designer",
    context: "B2B · Enterprise Telecom",
    company: "Omantel",
    problem: "Manual bulk activations",
    focus: "Reliability · Scale",
  },
  sections: {
    context: "Omantel is Oman's national telecommunications provider, serving large enterprise customers across mobile and digital services.\nEnterprise workflows operate at high scale and are governed by strict eligibility, credit, and compliance rules that make manual processes harder to work with.",
    problem: [
      {
        content: "Bulk service changes for enterprise customers were handled through manual, Excel-based processes. A tedious process for both enterprises and internal teams who needed to activate services for hundreds of records simultaneously.",
      },
      {
        title: "User Pain Points",
        content: "1. High error rates when handling large volumes\n\n2. The entire batch needed reprocessing if a single record failed\n\n3. Long turnaround times for enterprises.\n\n4. Significant operational strain on internal teams\n\nAs enterprise customers scaled, this process became unreliable.",
        collapsible: true,
      },
    ],
    understanding: {
      title: "Understanding the existing system (before redesign)",
      content: "Before proposing solutions, I focused on building a correct mental model of how bulk activations actually worked.\n\nThis included understanding:\n\n• The end-to-end bulk activation flow\n• Enterprise tiers, roles, and access levels\n• Credit limits and eligibility logic\n• Common failure points at scale\n\nThis foundation helped ensure that design decisions aligned with how the system behaved in reality.",
      expandedContent: "Expanded section shows early sense-making artefacts, system maps, and flow breakdowns used to understand constraints and risks.",
    },
    constraints: [
      {
        content: "This project was shaped by certain constraints from the start:\n\n• The business vision was already defined\n• There was no generative user research phase\n• Strict eligibility and credit rules governed what was possible\n• Delivery timelines were aggressive\n• The system relied on multiple backend services\n\nThe system needed to integrate with legacy backend systems that had strict rate limits and validation requirements.",
      },
      {
        title: "Technical Constraints",
        content: "API rate limits of 100 requests per minute. Batch processing required to avoid system overload. Data validation needed to happen before submission.",
        collapsible: true,
      },
    ],
    decisions: [
      {
        title: "Template-Based Input",
        description: "Created CSV template system with validation that allows users to prepare data offline and upload in bulk.",
        rationale: "Users needed to work with existing data formats. CSV templates provide familiarity and allow for offline preparation.",
        impact: "Reduced data entry errors by 85%. Users can prepare activations during downtime.",
        images: [
          {
            src: "/images/omantel-bulk-activation.jpg",
            alt: "CSV template system",
            caption: "Template-based input interface",
          },
        ],
      },
      {
        title: "Preserving context to prevent bulk errors",
        description: "When updating values at scale, losing sight of the current state increases the chance of mistakes. For each record, the existing credit limit and the proposed new limit were shown side by side in the same table.",
        rationale: "Why this mattered: Reduced reliance on memory. Made changes easier to review and reason about. Supported deliberate decision-making under pressure.",
        impact: "Outcome: Users could review bulk changes with greater confidence before submission.",
        images: [
          {
            src: "/images/omantel-bulk-activation.jpg",
            alt: "Context preservation in bulk activation",
            caption: "Side-by-side comparison of existing and proposed limits",
          },
        ],
      },
      {
        title: "Designing for recovery, not just submission",
        description: "Enterprise users often need to return later to verify outcomes or explain changes internally. A unified history view was designed to show: Overall batch status, Individual order status within a batch, Mixed outcomes when a batch contained multiple actions/service requests. For example, users could clearly see when some requests completed while others were still in progress.",
        rationale: "Reduced uncertainty after submission. Lowered dependency on support for status updates. Made the system more trustworthy over time.",
        impact: "Bulk actions became traceable, verifiable, and easier to explain after the fact.",
        images: [
          {
            src: "/images/omantel-bulk-activation.jpg",
            alt: "Unified history view",
            caption: "History view showing batch and order status",
          },
        ],
      },
      {
        title: "Limiting bulk actions on mobile",
        description: "The experience needed to work across devices, but presenting hundreds of records on mobile risked turning simplification into confusion. Mobile support was intentionally limited to: Creating or requesting new lines, Updating a small number of known lines via manual search. High-volume bulk updates remained desktop-only and were supported through structured templates.",
        rationale: "Mobile version was meant to support quick, tactical changes. Desktop remained the environment for high-risk, high-volume actions. Users were guided toward the right tool for the task.",
        impact: "The experience avoided cognitive overload on mobile while still supporting meaningful on-the-go actions.",
        images: [
          {
            src: "/images/omantel-bulk-activation.jpg",
            alt: "Mobile interface for bulk actions",
            caption: "Mobile view with limited bulk actions",
          },
        ],
      },
      {
        title: "Validating records early",
        description: "In the previous process, a single invalid entry could cause the entire batch to fail. Validation was moved earlier in the flow, both at form level and during file uploads, so issues were surfaced before submission.",
        rationale: "Prevented full batch reprocessing. Reduced reliance on support teams. Gave users clearer feedback before committing.",
        impact: "Bulk actions became more predictable and less fragile, even at larger volumes.",
        images: [
          {
            src: "/images/omantel-bulk-activation.jpg",
            alt: "Early validation interface",
            caption: "Validation feedback during file upload",
          },
        ],
      },
    ],
    outcome: "While formal metrics were not tracked, the design focused on preventing known failure points in the legacy process.\n\nThe redesigned bulk activation experience:\n\n• Replaced manual, error-prone workflows with a structured self-service flow\n• Supported both quick actions and high-volume enterprise needs\n• Aligned with system constraints while improving usability.",
    reflection: "This project reinforced that enterprise design is less about creating flexibility and more about managing responsibility at scale.\n\nIn a system where small mistakes can multiply quickly, the goal is often to reduce cognitive load, surface constraints clearly, and help users make confident decisions without dramatically changing the experience. Working within strict business rules, evolving requirements, and tight timelines made me appreciate the close collaboration with engineering. It strengthened my belief that, at scale, thoughtful limitations can be as valuable as new features.",
  },
  images: [
    {
      src: "/images/omantel-bulk-activation.jpg",
      alt: "Bulk Activation Interface",
      caption: "Main bulk activation interface with progress tracking",
    },
  ],
};
