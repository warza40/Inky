export type CaseStudyWarmthTheme = "madder" | "moss" | "ochre" | "slate";

export interface CaseStudy {
  slug: string;
  title: string;
  /** Optional substring of `title` rendered in the case accent on the hero band */
  heroTitleAccent?: string;
  /** Warmth DS wash + UI accents (default madder) */
  warmthTheme?: CaseStudyWarmthTheme;
  overview: {
    role: string;
    context: string;
    company: string;
    problem: string;
    focus: string;
    /** When set, the third meta column is labelled “Tools” instead of “Company”. */
    tools?: string;
  };
  sections: {
    context?: string;
    /** Optional titled blocks; when present, rendered instead of flat `context` */
    contextSections?: Array<{ title: string; body: string }>;
    /** Narrative context with optional [madder]…[/madder] highlights; takes precedence over `contextSections` when present */
    contextFlow?: {
      paragraphs: string[];
      /** Italic madder line (e.g. “Our aim…”) */
      aim?: string;
    };
    /** Optional ecosystem module (e.g. four products in one bordered block); shown after `contextSections` when present */
    contextEcosystem?: {
      eyebrow: string;
      intro: string;
      boxTitle: string;
      products: Array<{
        name: string;
        description: string;
        platform: "desktop" | "mobile";
        icon: "portal" | "clock" | "check" | "bars";
      }>;
    };
    problem: Array<{
      title?: string;
      content: string;
      collapsible?: boolean;
      /** Optional stat strip (e.g. 9 / 4 / 3–4 mo) */
      statBar?: Array<{ value: string; label: string; valueSup?: string }>;
    }>;
    understanding?: {
      title: string;
      content: string;
      expandedContent?: string;
      /** Optional sub header shown above the visuals container */
      visualsTitle?: string;
      /** Optional visuals: one container per item, rendered one below the other. Omit src for an empty container. */
      images?: Array<{
        src?: string;
        alt?: string;
        caption?: string;
        /** Tooltip shown when hovering over the image (for lightbox thumbnails) */
        hoverTooltip?: string;
      }>;
      /** Optional subsection after the divider (e.g. Approach): title, goal, content, bullets */
      afterDivider?: {
        title: string;
        goal?: string;
        content?: string;
        bullets?: string[];
      };
      /** Optional subsection after the Approach divider (e.g. Secondary Research): title + content (use \\n\\n for paragraphs) */
      afterApproachDivider?: {
        title: string;
        content: string;
      };
      /** Optional subsection after Secondary Research (divider + Personas): title, intro, bullets, content */
      afterSecondaryResearchDivider?: {
        title: string;
        intro: string;
        bullets?: string[];
        /** When `personas` is set, rendered as cards instead of this string */
        content: string;
        /** Structured persona cards (replaces raw `content` when present) */
        personas?: Array<{
          name: string;
          ageLine: string;
          worksWith: string;
          motivations: string[];
          frustrations: string[];
          painPoints: string[];
        }>;
        personaQuote?: string;
      };
      /** Optional subsection after Personas (divider + e.g. System-Level Exploration): title, intro, bullets, content, optional workflows */
      afterPersonasDivider?: {
        title: string;
        intro: string;
        bullets?: string[];
        content: string;
        /** Legacy: grey placeholder tile labels (omit when `images` is set) */
        iaIterationLabels?: string[];
        /** Optional workflow list: intro, items (title + description), closing */
        workflowsIntro?: string;
        workflows?: Array<{ title: string; description: string }>;
        workflowsClosing?: string;
        /** Optional images shown one below the other (e.g. Flow 1, Flow 2) */
        images?: Array<{ src: string; alt?: string; caption?: string }>;
      };
    };
    constraints: Array<{
      title?: string;
      content: string;
      collapsible?: boolean;
      expandedContent?: string;
      /** Intro paragraph before a numbered list (use with `numberedItems`) */
      intro?: string;
      /** Numbered rows (01, 02, …) */
      numberedItems?: string[];
    }>;
    decisions: Array<{
      title: string;
      description?: string;
      rationale: string;
      impact: string;
      /** Optional "Solutioning" paragraph(s), shown after Rationale/Impact */
      designResponse?: string;
      images?: Array<{
        src: string;
        alt: string;
        caption?: string;
      }>;
      /** NDA placeholder note in a dark band when there are no images */
      imagePlaceholder?: string;
      /** Two-column NDA placeholders (e.g. graph vs tabular) */
      imagePlaceholderSplit?: [string, string];
      /** Navigation exploration sketches (Mega Menu / Ribbon / Panel) */
      navExploration?: Array<{
        label: string;
        variant: "mega" | "ribbon" | "panel";
      }>;
    }>;
    outcome?: string;
    /** Optional stacked visuals after outcome copy (e.g. Omantel); lightbox like decision images */
    outcomeImages?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
    /** Optional pill below outcome bullets */
    outcomePill?: string;
    reflection?: string;
    /** Final madder italic line (after main reflection body) */
    reflectionClosing?: string;
    /** Optional 2×2 grid (numbered cards + title + description) shown after Key Decisions */
    reportCategories?: Array<{
      num: string;
      title: string;
      description: string;
    }>;
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
    video?: {
      src: string;
      caption?: string;
    };
  }>;
}

export const omantelCase: CaseStudy = {
  slug: "omantel-bulk-activation",
  title: "Designing a scalable bulk activation system",
  warmthTheme: "moss",
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
        images: [
          {
            src: "/Key-Decision-5.png",
            alt: "Early validation of bulk records in the flow",
            caption: "Validating records early",
          },
        ],
      },
    ],
    outcome: "While formal metrics were not tracked, the design focused on preventing known failure points in the legacy process.\n\nThe redesigned bulk activation experience:\n\n• Replaced manual, error-prone workflows with a structured self-service flow\n• Supported both quick actions and high-volume enterprise needs\n• Aligned with system constraints while improving usability.",
    outcomeImages: [
      {
        src: "/Omantel%20assets/Outcome1.png",
        alt: "Bulk Actions: upload step with drag-and-drop area before a file is selected",
        caption: "Outcome 1 — empty upload state (drag-and-drop).",
      },
      {
        src: "/Omantel%20assets/Outcome%202.gif",
        alt: "Bulk Actions: file upload in progress with percentage",
        caption: "Outcome 2 — active upload with progress.",
      },
    ],
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
        src: "/Omantel%20assets/Noteworthy%201.png",
        alt: "Noteworthy visual",
        caption: "Positioning the entry point of the bulk action flow for the user.",
      },
    },
    {
      image: {
        src: "/Omantel%20assets/Noteworthy%202.png",
        alt: "Noteworthy visual 2",
        caption: "Evolution of the bulk actions request submission flow",
      },
    },
    {
      image: {
        src: "/Omantel%20assets/Noteworthy%203.gif",
        alt: "Noteworthy 3",
        caption: "The column configurator",
      },
    },
  ],
};
