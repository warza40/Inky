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
      /** Optional visuals: one container per item, rendered one below the other. Omit src for an empty container. */
      images?: Array<{
        src?: string;
        alt?: string;
        caption?: string;
        /** Tooltip shown when hovering over the image (for lightbox thumbnails) */
        hoverTooltip?: string;
      }>;
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
  /** Bottom Visuals section split into 4 subsections, one below the other */
  visualsSections?: Array<{
    title?: string;
    image?: {
      src: string;
      alt: string;
      caption?: string;
    };
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
        title: "Helping enterprise users submit bulk orders confidently",
        description: "Created CSV template system with validation that allows users to prepare data offline and upload in bulk; along with a search and modify system for users that needed to make quick requests.",
        rationale: "Re-inventing the wheel could have added to the learning curve for the user. CSV templates provide familiarity and allow for offline preparation and the search by MSISDN(Number) and modify method was to cater to the seasoned users.",
        impact: "By aligning the input format with how enterprise users already work, bulk submissions became easier to prepare, review, and submit - this reduced the number of errors, reduced dependency on the internal team and early validation of data.",
        images: [
          {
            src: "/Key-Decision-1.png",
            alt: "Bulk orders: CSV template and search by MSISDN",
            caption: "Helping enterprise users submit bulk orders confidently",
          },
        ],
      },
      {
        title: "Preserving context to prevent bulk errors",
        description: "When updating values at scale, losing sight of the current state increases the chance of mistakes. For each record, the existing credit limit and the proposed new limit were shown side by side in the same table.",
        rationale: "Reduced reliance on memory. Made changes easier to review and reason about. Supported deliberate decision-making under pressure.",
        impact: "Users could review bulk changes with greater confidence before submission.",
        images: [
          {
            src: "/Key-Decision-2-v2.png",
            alt: "Context preservation in bulk activation",
            caption: "Preserving context to prevent bulk errors",
          },
          {
            src: "/Key-Decision-2.5.png",
            alt: "Context preservation – detail",
            caption: "Apply to all scenario",
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
            src: "/Key-Decision-3.png",
            alt: "Unified history view",
            caption: "History and tracking",
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
            src: "/Key-Decision-4.png",
            alt: "Mobile interface for bulk actions",
            caption: "Limiting bulk actions on mobile",
          },
        ],
      },
      {
        title: "Validating records early",
        description: "In the previous process, a single invalid entry could cause the entire batch to fail. Validation was moved earlier in the flow, both at form level and during file uploads, so issues were surfaced before submission.",
        rationale: "Prevented full batch reprocessing. Reduced reliance on support teams. Gave users clearer feedback before committing.",
        impact: "Bulk actions became more predictable and less fragile, even at larger volumes.",
        images: [],
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
  visualsSections: [
    {
      image: {
        src: "/Noteworthy-1.png",
        alt: "Noteworthy visual",
        caption: "Noteworthy 1",
      },
    },
    {},
    {},
    {},
  ],
};
