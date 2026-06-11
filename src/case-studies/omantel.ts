import { OMANTEL_BULK_HERO_SRC } from "./omantel-assets";

export type CaseStudyWarmthTheme = "madder" | "moss" | "ochre" | "slate";

export interface CaseStudy {
  slug: string;
  title: string;
  /** Optional substring of `title` rendered in the case accent on the hero band */
  heroTitleAccent?: string;
  /** One line above the title: "domain · sector · company" (sentence case) */
  heroMetaLine?: string;
  /** Short problem lede under the hero title */
  heroProblemStatement?: string;
  /** Optional pill tags under the hero lede (overrides auto chips from overview) */
  heroPills?: string[];
  /** Shown as a minimal pill next to role */
  year?: string;
  /** Full-width image below site header / section tabs */
  heroImage?: { src: string; alt: string };
  /** Override "Next project" link (defaults to next item in the case study list) */
  nextProjectSlug?: string;
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
      /** Optional visuals after the narrative (e.g. process diagram) */
      images?: Array<{ src: string; alt: string; caption?: string }>;
    };
    /**
     * Impact metrics — sage moss post-its above overview/context copy (journal + generic case map).
     */
    journalImpact?: {
      blocks: Array<{
        value: string;
        labelItalic: string;
        metaCaps?: string;
        metaDetail?: string;
        /** Normal (non-italic) supporting line — uses heading font for readable body */
        metaDetailPlain?: boolean;
      }>;
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
    /**
     * “Before state” diagram in Problem — after narrative, before constraints.
     * Optional per case study.
     */
    problemProcessVisual?: {
      src: string;
      alt: string;
      caption?: string;
    };
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
      /** Optional post-it pain point groups shown after visuals (titles only) */
      painPointGroups?: Array<{
        title: string;
        items: string[];
      }>;
      /** Optional subsection after the divider (e.g. Approach): title, goal, content, bullets */
      afterDivider?: {
        title: string;
        goal?: string;
        content?: string;
        bullets?: string[];
        /** Optional carousel after subsection copy */
        images?: Array<{ src: string; alt?: string; caption?: string }>;
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
      /** Optional report-type boxes below rationale (e.g. four report categories) */
      rationaleReports?: Array<{
        title: string;
        description: string;
      }>;
    }>;
    outcome?: string;
    /** Before / after contrast block in Outcome */
    outcomeBeforeAfter?: { before: string; after: string };
    /** Short prominent statements (e.g. summary lines with accent styling) */
    outcomeHighlights?: string[];
    /** Optional stacked visuals after outcome copy (e.g. Omantel); lightbox like decision images */
    outcomeImages?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
    /** Optional pill below outcome bullets */
    outcomePill?: string;
    reflection?: string;
    /** Optional bullet list after reflection intro */
    reflectionBullets?: string[];
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
  title:
    "Redesigning the bulk SIM activation experience from a manual process to an automated one.",
  /** Deliberately empty: suppresses eyebrow above title and `context · company` fallback */
  heroMetaLine: "",
  heroProblemStatement:
    "Thousands of SIM activations, processed through email chains and manual data entry across three disconnected systems. One invalid record was enough to restart the entire batch.",
  year: "2024",
  nextProjectSlug: "warehouse-operations",
  heroImage: {
    src: OMANTEL_BULK_HERO_SRC,
    alt: "Bulk Actions landing: Change existing lines and Add new postpaid lines",
  },
  warmthTheme: "madder",
  overview: {
    role: "Senior UX Designer",
    context: "B2B · Enterprise Telecom",
    company: "Omantel",
    problem: "Manual bulk activations",
    focus: "Reliability · Scale",
  },
  sections: {
    contextFlow: {
      paragraphs: [
        "Omantel is Oman's national telecom provider. Work spanned a B2C eShop and a B2B bulk activation platform: enterprise customers need to activate, modify, or deactivate SIM services in bulk — hundreds of records at a time, governed by strict eligibility and credit rules.",
        "The existing process ran entirely on email. A company rep would send a request to the Omantel team, who would manually verify details against a separate backend system, re-enter the data into the portal, generate the batch — and discover errors only after submission. Every request meant tab-switching between email, the backend, and the portal. Every error meant starting over.",
      ],
      aim: "There was no defined scope for research, as the vision was pre-defined from the business side.",
    },
    journalImpact: {
      blocks: [
        {
          value: "",
          labelItalic: "",
          metaDetail:
            "Reduced batch creation and submission time by half using a template-based system.",
          metaDetailPlain: true,
        },
        {
          value: "0",
          labelItalic: "operators",
          metaCaps:
            "Required for Batch creation, request submission and error validation.",
          metaDetail:
            "Redesigned the fully manual experience with a single self-service flow.",
          metaDetailPlain: true,
        },
        {
          value: "-48hrs → 0",
          labelItalic: "",
          metaDetail:
            "From days to seconds\n\nBatch activations of up to 500 SIMs now confirm within the session — replacing a process where operators waited days for email confirmation with no visibility in between.",
          metaDetailPlain: true,
        },
      ],
    },
    problem: [],
    constraints: [],
    understanding: {
      title: "Understanding the existing scenario",
      content:
        "We were dealing with two sets of pain points — Omantel's and their business customers. It took some discussions to understand what a typical B2B telco journey looks like.\n\n---",
      images: [
        {
          src: "/Omantel%20assets/Conceptual%20level%20understanding.png",
          alt: "Conceptual map of B2B telco bulk activation — credit limits, enterprise process flow, and user guard rails",
          caption:
            "Conceptual understanding — credit limits, bulk activation process, and stakeholder guard rails.",
        },
      ],
      painPointGroups: [
        {
          title: "Pain Points of the Business Customer",
          items: [
            "High Error Rate",
            "Long Turn Around Time (TAT)",
            "Inefficiency in Handling Bulk Requests",
            "Lack of Automation",
            "Difficulty in Managing Multiple Numbers",
            "Limited Flexibility",
          ],
        },
        {
          title: "Pain Points of Omantel",
          items: [
            "Operational Risk",
            "Resource Intensive",
            "Reduced Work Efficiency",
            "Increased Human Errors",
            "Lower Productivity",
            "Inability to Scale",
          ],
        },
      ],
      afterDivider: {
        title: "Mapping the User flows",
        content:
          "A walkthrough of the entire manual process from Omantel's staff allowed us to put ourselves in their shoes, gather a better understanding of their pain points in the journey. They were juggling between three different platforms — a back office, a CRM, the customers mails.",
        images: [
          {
            src: "/Omantel%20assets/User%20flow%201.png",
            alt: "Bulk activations user flow 1 — template upload and row editing paths",
            caption:
              "Mapping user flows with parts of the proposed design for stakeholder discussions.",
          },
          {
            src: "/Omantel%20assets/User%20flow%201.5.png",
            alt: "Bulk activations user flow 1.5 — scenario 1 upload and file uploaded states",
            caption:
              "Mapping user flows with parts of the proposed design for stakeholder discussions.",
          },
          {
            src: "/Omantel%20assets/User%20flow%202.png",
            alt: "Bulk activations user flow 2 — dashboard to bulk action import journey",
            caption:
              "Mapping user flows with parts of the proposed design for stakeholder discussions.",
          },
          {
            src: "/Omantel%20assets/User%20flow.png",
            alt: "Bulk activations user flow — limit change from subscriptions to confirmation",
            caption:
              "Mapping user flows with parts of the proposed design for stakeholder discussions.",
          },
        ],
      },
    },
    decisions: [
      {
        title:
          "Redesigning the manual batch request process to a self service system",
        description:
          "Two input paths in one interface: CSV templates for bulk preparation offline, and a search-and-modify flow for quick single-record changes.",
        rationale:
          "Enterprise users already work in spreadsheets. The idea is to meet them there rather than reinventing the wheel — reducing the learning curve and adoption friction. Addressing both scenarios — smaller batches (less than 100) and large batches (goes up to 500 or even more) — through the self-service journey.",
        impact:
          "The entire manual entry pipeline was replaced with self-service. Company reps have zero dependency on internal staff for a clean batch submission and negligible wait time.",
        images: [
          {
            src: "/Omantel%20assets/Om-Addbysearch.gif",
            alt: "Add-by-search flow: finding and selecting lines to modify in bulk",
            caption:
              "Flow that caters to both use cases — quick search and modify few lines or upload a large batch of lines for modification.",
          },
          {
            src: "/Omantel%20assets/Upload%20file.png",
            alt: "CSV upload: selecting or dragging a file into the bulk upload area",
            caption:
              "Upload file — prepare changes offline and bring them into the flow.",
          },
        ],
      },
      {
        title:
          "Reducing error risk through context visibility and early validation",
        description:
          "In the manual process, a single invalid entry could fail the entire batch and the operator would have to go through the entire process again. The users would receive confirmation regarding batch submission in a span of 48-72hrs.",
        rationale:
          "Two micro decisions — 1. Surfacing errors at the form level and file-upload stage would allow room for recovery and reduce the scope for errors. 2. Providing the context of the existing value against the value being updated would reduce reliance on memory and eliminate unnecessary overwrites.",
        impact:
          "The model shifted the error-handling from recovery to prevention. Bulk operations became reliable at higher volumes without increasing the cognitive load on the user.",
        images: [
          {
            src: "/Omantel%20assets/Bulk%3AKD2.png",
            alt: "Side-by-side credit limit comparison with current vs proposed values",
            caption: "Side-by-side credit limit comparison with undo controls.",
          },
          {
            src: "/Omantel%20assets/Bulk%3AKD%202.2.gif",
            alt: "Bulk-edit flow with early validation and contextual limits visible while editing",
            caption:
              "Preserving context — current and proposed limits visible while editing.",
          },
          {
            src: "/Omantel%20assets/KD2.5.png",
            alt: "Apply to all scenario — bulk-edit pattern with per-row undo",
            caption:
              "Apply to all scenario — bulk-edit with individual undo per row.",
          },
        ],
      },
      {
        title: "Tracking batch submissions independently",
        description:
          "Enterprise users need to return later to verify outcomes or explain changes internally. A unified history view was designed to surface: overall batch status, individual order status within a batch, mixed outcomes when a batch contained both completed and in-progress requests.",
        rationale:
          "Dependency on Omantel staff for progress and updates added a layer of friction to the process. Making the system transparent meant making it trustworthy over time.",
        impact:
          "Bulk actions became traceable and verifiable. Users could self-serve status checks instead of raising support tickets. Users could refer to batch history details for internal discussions, planning their own timeline / making future changes.",
        images: [
          {
            src: "/Omantel%20assets/Batch%20History.gif",
            alt: "Batch history view: scanning status and drill-down into individual records",
            caption:
              "Batch history — status at a glance with detail on demand.",
          },
          {
            src: "/Omantel%20assets/KD3.png",
            alt: "History and tracking: batch-level and record-level status",
            caption:
              "History and tracking — batch and individual record status.",
          },
        ],
      },
      {
        title: "Limiting bulk actions on mobile",
        description:
          "The experience needed to work across devices, but presenting hundreds of records on mobile risked turning simplification into confusion. Mobile was intentionally scoped to: creating or requesting new lines, updating a small number of known lines via manual search. High-volume bulk updates remained desktop-only, supported through structured CSV templates.",
        rationale:
          "The mobile was meant to support quick modifications or as a tool for reference. The Desktop experience remains the primary environment for high-volume actions.",
        impact:
          "The experience avoided cognitive overload on mobile while still supporting meaningful on-the-go actions. No features were broken by being forced into a screen size they weren't designed for.",
        images: [
          {
            src: "/Omantel%20assets/Om%20mobile%201.gif",
            alt: "Omantel bulk actions on mobile — animated scoped flow",
            caption: "Mobile bulk actions — scoped on-the-go updates.",
          },
          {
            src: "/Omantel%20assets/Om-Mobile.png",
            alt: "Omantel bulk actions on mobile — scoped flows for on-the-go updates",
            caption: "Mobile-first views with limited scope of features.",
          },
        ],
      },
      {
        title: "Ensuring error prevention through data validity",
        description:
          "Using outdated/ invalid data to place batch requests can be a very costly mistake. To make it easy for enterprise reps to keep track of the latest data (associated with the numbers)- a logic was set for the system to self validate the data and prompt the user based on the same.",
        rationale:
          "The user will be informed by the system regarding outdated data and redirected to download the template containing the latest data. Reducing the effort required to recall information — keeping context intact.",
        impact:
          "Increasing efficiency by eliminating the need for the user to remember the latest data associated with each number.",
        images: [
          {
            src: "/Omantel%20assets/KD5-Template%20generation.png",
            alt: "Bulk Actions template generation for offline batch preparation",
            caption:
              "Template generation — prepare valid batches offline before upload.",
          },
          {
            src: "/Omantel%20assets/KD5%3AVisual%202.gif",
            alt: "Inline data validity checks during input and file upload",
            caption:
              "Data validity — form-level and upload-level validation before submission.",
          },
          {
            src: "/Omantel%20assets/Feedback.png",
            alt: "System informing the user about outdated data",
            caption: "The system informing the user about the outdated data",
          },
        ],
      },
    ],
    outcomeBeforeAfter: {
      before:
        "A company rep emails Omantel. An internal team member opens the mail, switches to a backend system to verify eligibility, switches to the portal to manually enter data, generates the batch — and discovers errors only after submission. Invalid records restart the process. Every bulk request requires staff time.",
      after:
        "The company rep submits directly. Eligibility and credit limits validate inline, before the batch is created. Errors surface at the point of entry, not after failure.",
    },
    outcomeHighlights: [],
    outcomeImages: [
      {
        src: "/Omantel%20assets/Outcome_new.gif",
        alt: "Omantel enterprise dashboard with Bulk Actions in quick actions",
        caption:
          "Bulk Actions surfaced on the dashboard — enterprise reps start self-serve batches from quick actions.",
      },
      {
        src: "/Omantel%20assets/Outcome%202.gif",
        alt: "Omantel dashboard hero carousel with upgrade and service prompts",
        caption:
          "Dashboard home with contextual prompts — the entry environment for bulk and account workflows.",
      },
    ],
    reflection:
      "To me this project was a good example of what proactive collaboration should look like.",
    reflectionBullets: [
      "With more time, I would have pushed for a lightweight usability study with 2–3 enterprise reps before final handoff — even without a formal research phase, watching someone navigate the journey would have surfaced friction I may have missed.",
      "I would have also explored batch-level progress indicators for large uploads where processing time becomes noticeable.",
      "Given the complexity that AI can perform — there are parts of this process that could have been made smarter such as the tracking, surfacing business rules to the user etc.",
    ],
  },
  visualsSections: [
    {
      title: "Single page to guided flow",
      image: {
        src: "/Omantel%20assets/Noteworthy%201.png",
        alt: "Before and after: bulk actions on one page versus a stepped select-actions flow",
        caption:
          "From bulk activations on the lines table to a guided flow — users choose the path before entering the process.",
      },
    },
    {
      title: "One action to multi-service batches",
      image: {
        src: "/Omantel%20assets/Noteworthy%202.png",
        alt: "Older single-action bulk flow compared with redesigned multi-service batch table",
        caption:
          "One bulk action at a time became multiple services in a single batch, with the line detail needed to decide.",
      },
    },
    {
      title: "Apply to all and undo",
      image: {
        src: "/Omantel%20assets/Noteworthy%203.gif",
        alt: "Bulk actions select step with apply-to-all and per-row undo for credit limit and international calling",
        caption:
          "Apply-to-all and per-row undo when bulk edits span credit limits and add-on services.",
      },
    },
  ],
};
