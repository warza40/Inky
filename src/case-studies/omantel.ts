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
  title: "Fixing the Fragility in Enterprise SIM Activation",
  /** Deliberately empty: suppresses eyebrow above title and `context · company` fallback */
  heroMetaLine: "",
  heroProblemStatement:
    "Thousands of SIM activations, processed through email chains and manual data entry across three disconnected systems. One invalid record was enough to restart the entire batch.",
  year: "2024",
  nextProjectSlug: "warehouse-operations",
  heroImage: {
    src: "/Omantel%20assets/Bulk%20Hero.png",
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
    decisions: [
      {
        title:
          "Redesigning the manual batch request process to a self service system",
        description:
          "Two input paths in one interface: CSV templates for bulk preparation offline, and a search-and-modify flow for quick single-record changes.",
        rationale:
          "Enterprise users already work in spreadsheets. Meeting them there — rather than inventing a new input method — reduced learning curve and adoption friction. The search-and-modify path exists because not every request is bulk; seasoned users making quick changes shouldn't be forced through a CSV workflow.",
        impact:
          "The entire email → manual verification → manual entry pipeline was eliminated for valid submissions. Company reps self-serve directly. Zero dependency on internal staff for a clean batch submission.",
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
          "Reducing error risk through early validation and contextual visibility",
        description:
          "In the previous process, a single invalid entry could fail the entire batch — and users would receive a confirmation email in a span of 48-72hrs. Two decisions addressed this together: 1. error validation was moved earlier in the flow, surfacing issues at form level and during file upload before submission. 2. For every record being edited, the existing value and the proposed change appear side by side in the same table, so users can make an informed commitment.",
        rationale:
          "Early validation and contextual visibility address two distinct failure modes in bulk operations. Surfacing errors at the form and file-upload stage prevents invalid records from entering the submission pipeline entirely. Presenting the existing value alongside the proposed change within the same view reduces operator reliance on memory and eliminates the risk of unconsidered overwrites — both conditions that, at batch scale, compound into significant downstream failures.",
        impact:
          "Errors that previously propagated through to post-submission discovery were intercepted at the point of input. Operators gained the ability to review proposed changes against existing state before committing, shifting the error-handling model from recovery to prevention. Bulk operations became reliable at higher volumes without increasing the cognitive load on the operator.",
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
        title: "Designing for recovery, not just submission",
        description:
          "Enterprise users need to return later to verify outcomes or explain changes internally. A unified history view was designed to surface: overall batch status, individual order status within a batch, mixed outcomes when a batch contained both completed and in-progress requests.",
        rationale:
          "Reduced uncertainty after submission. Without a history view, users had to contact Omantel support for status updates — adding another manual handoff to a process already overloaded with them. Making the system transparent made it trustworthy over time.",
        impact:
          "Bulk actions became traceable and verifiable. Users could self-serve status checks instead of raising support tickets. The system earned trust by showing its work.",
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
          "Mobile was meant to support quick, tactical changes. Desktop remained the environment for high-risk, high-volume actions. Users were guided toward the right tool for the task rather than given a degraded version of everything.",
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
        title: "Validating records early",
        description:
          "In the previous process, a single invalid entry could cause the entire batch to fail. Validation was moved earlier in the flow — at form level during input and during file upload — so issues surfaced before submission, not after.",
        rationale:
          "Prevented full batch reprocessing. Reduced reliance on support teams for error resolution. Users got clearer feedback before committing — shifting error handling from post-failure recovery to pre-submission prevention.",
        impact:
          'Bulk actions became more predictable and less fragile, even at larger volumes. The cost of a single bad record went from "restart the entire batch" to "fix this field before you submit."',
        images: [
          {
            src: "/Omantel%20assets/KD5-Template%20generation.png",
            alt: "Bulk Actions template generation for offline batch preparation",
            caption:
              "Template generation — prepare valid batches offline before upload.",
          },
          {
            src: "/Omantel%20assets/KD5-Data%20Validity.png",
            alt: "Inline data validity checks during input and file upload",
            caption:
              "Data validity — form-level and upload-level validation before submission.",
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
        src: "/Omantel%20assets/Outcome1.png",
        alt: "Bulk Actions upload step with drag-and-drop area before a file is selected",
        caption: "Empty upload state (drag-and-drop).",
      },
      {
        src: "/Omantel%20assets/Outcome%202.gif",
        alt: "Bulk Actions file upload in progress with percentage",
        caption: "Active upload with progress.",
      },
    ],
    reflection:
      "With more time, I would have pushed for a lightweight usability study with 2–3 enterprise reps before final handoff — even without a formal research phase, watching someone navigate the CSV upload flow once would have surfaced friction I couldn't predict from constraint analysis alone. I'd also explore batch-level progress indicators for large uploads where processing time becomes noticeable.",
  },
  visualsSections: [
    {
      title: "Bulk-edit comparisons",
      image: {
        src: "/Omantel%20assets/KD2.png",
        alt: "Side-by-side credit limit comparison with current vs proposed values",
        caption:
          "Iteration on exposing current vs proposed credit limits before locking the bulk pattern.",
      },
    },
    {
      title: "Apply-to-all and undo",
      image: {
        src: "/Omantel%20assets/KD2.5.png",
        alt: "Apply to all scenario — bulk-edit pattern with per-row undo",
        caption:
          "Mid-stage refinement: how granular undo felt when edits spanned many rows.",
      },
    },
    {
      title: "Production breadth",
      image: {
        src: "/Omantel%20assets/Screens%20from%20Production.png",
        alt: "Shipped Bulk Actions views across breakpoints",
        caption:
          "Late iteration aligning layouts once production constraints were clearer.",
      },
    },
  ],
};
