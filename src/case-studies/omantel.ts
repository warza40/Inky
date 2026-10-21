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
  /**
   * PROTOTYPE LINK SLOT
   * Paste the walkthrough URL here when it exists.
   * An empty string keeps the NDA line and renders no link.
   */
  prototypeHref?: string;
  /** Recruiter card rows. Rendered as static text. */
  tldr?: Array<{ label: string; value: string }>;
  /** Short bullets under the recruiter card. */
  tldrNotes?: string[];
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
      /** Column label when `why` is set. Defaults to Trade-off. */
      rationaleLabel?: string;
      impact: string;
      /** Column label for the outcome row when `why` is set. Defaults to Outcome. */
      impactLabel?: string;
      /** Right-hand column beside the trade-off. */
      why?: string;
      /** Callout under the decision. Static copy, not a placeholder. */
      iteration?: string;
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
    /** Outcome-framed goal sentence. May include **bold** phrases. */
    goal?: string;
    /** Hypothesis pull-quote plus only the signals that were actually known. */
    hypothesis?: {
      quote: string;
      signals: string[];
    };
    /** Stakeholder story: pull-quote plus the moves that followed. */
    collaboration?: {
      intro?: string;
      quote: string;
      bullets: string[];
    };
    /** Learnings. No surprise line unless one was confirmed. */
    learnings?: {
      learned: string[];
      moreTime: string[];
    };
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

export const omantelStoryNav: ReadonlyArray<{ id: string; label: string }> = [
  { id: "tldr", label: "At a glance" },
  { id: "context", label: "Goal" },
  { id: "problem", label: "Problem" },
  { id: "ambiguity", label: "Ambiguity" },
  { id: "hypothesis", label: "Hypothesis" },
  { id: "decisions", label: "Decisions" },
  { id: "outcome", label: "Outcome" },
  { id: "collaboration", label: "Collaboration" },
  { id: "learnings", label: "Learnings" },
];

/**
 * Hero and outcome stats. Static strings only — never a counter.
 * Same five, same order, in both places.
 */
export const omantelImpactBlocks: NonNullable<
  CaseStudy["sections"]["journalImpact"]
>["blocks"] = [
  {
    value: "48–72 hrs → Immediate",
    labelItalic: "",
    metaDetail: "confirmation time for bulk SIM requests",
    metaDetailPlain: true,
  },
  {
    value: "~50% less time",
    labelItalic: "",
    metaDetail: "batch creation & submission, per product team reporting",
    metaDetailPlain: true,
  },
  {
    value: "Up to 500 SIMs",
    labelItalic: "",
    metaDetail: "per batch, submitted in one session, no staff in the loop",
    metaDetailPlain: true,
  },
  {
    value: "Errors caught pre-submit",
    labelItalic: "",
    metaDetail: "errors caught at entry instead of fixed after the fact",
    metaDetailPlain: true,
  },
  {
    value: "Zero manual operator work",
    labelItalic: "",
    metaDetail:
      "operator work removed from creation, submission and validation",
    metaDetailPlain: true,
  },
];

export const omantelCase: CaseStudy = {
  slug: "omantel-bulk-activation",
  title: "Helping enterprise teams submit error-free SIM batches on their own",
  /** Deliberately empty: suppresses eyebrow above title and `context · company` fallback */
  heroMetaLine: "",
  heroProblemStatement:
    "Hundreds of activations per batch ran through email, a back office, and a portal. One invalid record restarted the batch. Confirmation took 48–72 hours.",
  heroPills: ["Omantel", "B2B", "Telecom"],
  /**
   * PROTOTYPE LINK SLOT
   * Paste the walkthrough URL here. Leave this empty until the link exists.
   */
  prototypeHref: "",
  nextProjectSlug: "warehouse-operations",
  heroImage: {
    src: OMANTEL_BULK_HERO_SRC,
    alt: "Bulk Actions landing: Change existing lines and Add new postpaid lines",
  },
  warmthTheme: "madder",
  tldr: [
    {
      label: "Client",
      value: "Omantel, Oman's national telecom. B2B enterprise portal.",
    },
    {
      label: "Role",
      value: "Senior UX Designer, one of two senior designers",
    },
    {
      label: "Team",
      value: "PMs, engineers, and Omantel's client-side stakeholders",
    },
    {
      label: "Time",
      value: "6 months",
    },
    {
      label: "Platforms",
      value: "Desktop primary. Mobile scoped.",
    },
    {
      label: "Problem",
      value: "Email and re-entry. Errors after submit. 48–72 hrs.",
    },
    {
      label: "Outcome",
      value:
        "Immediate confirmation. ~50% less time. Up to 500 SIMs. No manual ops.",
    },
  ],
  tldrNotes: [
    "No formal research phase",
    "Mobile scoped, not full parity",
    "Errors caught before submit",
  ],
  overview: {
    role: "Senior UX Designer",
    context: "B2B · Enterprise telecom",
    company: "Omantel",
    problem: "Email-driven bulk activation",
    focus: "Same-session self-service",
  },
  sections: {
    goal: "**The goal was** for a company rep to **submit a valid batch** and **see its status**, with **no Omantel staff in the loop**, so B2B bulk could scale.",
    contextFlow: {
      paragraphs: [
        "Omantel is Oman's national telecom provider. Enterprise customers activate, modify, or deactivate SIM services in bulk — hundreds of records at a time, under strict eligibility and credit rules.",
        "Every one of those requests went through Omantel's internal team by email.",
      ],
    },
    journalImpact: {
      blocks: omantelImpactBlocks,
    },
    problem: [],
    constraints: [],
    outcomeBeforeAfter: {
      before:
        "A rep emails Omantel. Staff check a backend, re-enter the data in the portal, and only then find the errors. One bad record restarts it, and confirmation takes **48–72 hours** with no visibility.",
      after:
        "The rep submits directly. Eligibility and credit limits are checked **before the batch is created**. Errors show at entry, not after a failed submit.",
    },
    understanding: {
      title: "No research phase. I learned it from the people doing the work.",
      content:
        "The business side had already set the vision. There was no defined scope for research.\n\nWalkthroughs of the manual process with Omantel staff showed where errors entered. They juggled a **back office**, a **CRM**, and **customer email**.\n\nI mapped the B2B journey at a conceptual level: **credit limits**, the **bulk activation process**, and **stakeholder guardrails**. Then I turned those maps into user flows against the proposed design, so stakeholder discussions had something concrete to react to.",
      images: [
        {
          src: "/Omantel%20assets/Conceptual%20level%20understanding.png",
          alt: "Conceptual map of B2B telco bulk activation — credit limits, enterprise process flow, and user guard rails",
          caption:
            "Credit limits, the bulk process, and stakeholder guardrails.",
        },
      ],
      painPointGroups: [
        {
          title: "Business customers",
          items: [
            "High error rate",
            "Long turnaround time",
            "Inefficient bulk handling",
            "No automation",
            "Hard to manage many numbers",
            "Limited flexibility",
          ],
        },
        {
          title: "Omantel",
          items: [
            "Operational risk",
            "Resource intensive",
            "Reduced work efficiency",
            "Increased human error",
            "Lower productivity",
            "Unable to scale",
          ],
        },
      ],
      afterDivider: {
        title: "Flows the stakeholders could react to",
        images: [
          {
            src: "/Omantel%20assets/User%20flow%201.png",
            alt: "Bulk activations user flow 1 — template upload and row editing paths",
            caption: "Template upload and row editing.",
          },
          {
            src: "/Omantel%20assets/User%20flow%201.5.png",
            alt: "Bulk activations user flow 1.5 — scenario 1 upload and file uploaded states",
            caption: "Upload, then the file-uploaded state.",
          },
          {
            src: "/Omantel%20assets/User%20flow%202.png",
            alt: "Bulk activations user flow 2 — dashboard to bulk action import journey",
            caption: "Dashboard into the bulk import.",
          },
          {
            src: "/Omantel%20assets/User%20flow.png",
            alt: "Bulk activations user flow — limit change from subscriptions to confirmation",
            caption: "Limit change through to confirmation.",
          },
        ],
      },
    },
    hypothesis: {
      quote:
        "If reps prepare batches in the spreadsheet they already use, and see **eligibility**, **credit limits**, and **outdated data** flagged before they submit, they will **submit valid batches on their own**, without Omantel staff, and fewer batches will restart.",
      signals: [
        "Confirmation time: **48–72 hrs → immediate**",
        "**~50% less time to create and submit**, per product team reporting",
        "Operator work **removed** from creation, submission and validation",
      ],
    },
    decisions: [
      {
        title: "Meet people in the spreadsheet they already use",
        description:
          "**CSV templates** for large batches (up to 500 SIMs). **Search-and-modify** for smaller batches (under 100 lines).",
        rationale:
          "Two entry points are more to design and build. One path would fail one of the two groups.",
        why: "Enterprise users already work in spreadsheets. I met them there instead of inventing a new workflow.",
        impact:
          "**Self-service replaced manual entry.** A clean batch no longer depends on internal staff.",
        iteration:
          "The first version put bulk actions straight on the lines table. Users had to work out which tool fit the job.\n\nWorking it through with stakeholders brought up use cases, edge cases, and accessibility needs that one shared surface couldn't handle.\n\nI added a short progressive-disclosure step at the start: what they're trying to do, and how many records. That sends them to search-and-modify or a CSV template, so they arrive knowing the goal. Users get more control, and each situation still gets a clear, fixed path.",
        images: [
          {
            src: "/Omantel%20assets/Om-Addbysearch.gif",
            alt: "Add-by-search flow: finding and selecting lines to modify in bulk",
            caption:
              "Search-and-modify for a few lines, or upload a large batch.",
          },
          {
            src: "/Omantel%20assets/Upload%20file.png",
            alt: "CSV upload: selecting or dragging a file into the bulk upload area",
            caption: "Prepare the batch offline, then bring the file in.",
          },
          {
            src: "/Omantel%20assets/Noteworthy%201.png",
            alt: "Before and after: bulk actions on one page versus a stepped select-actions flow",
            caption: "From the lines table to a guided start.",
          },
          {
            src: "/Omantel%20assets/Noteworthy%202.png",
            alt: "Older single-action bulk flow compared with redesigned multi-service batch table",
            caption:
              "One action at a time became several services in one batch.",
          },
        ],
      },
      {
        title: "Catch the error before the batch fails",
        description:
          "One invalid entry failed the whole batch. Confirmation took **48–72 hours**.",
        rationale:
          "Surface errors at the **form** and at **file upload**, while a fix is still cheap.",
        why: "Show each line's **current value next to the proposed value** (for example, the credit limit) with apply-to-all and per-row undo. That removes reliance on memory and blocks accidental overwrites.",
        impact:
          "Reps correct the row **before submit**, instead of finding the failure and starting over.",
        images: [
          {
            src: "/Omantel%20assets/Bulk%3AKD2.png",
            alt: "Side-by-side credit limit comparison with current vs proposed values",
            caption: "Current value beside the proposed value, with undo.",
          },
          {
            src: "/Omantel%20assets/Bulk%3AKD%202.2.gif",
            alt: "Bulk-edit flow with early validation and contextual limits visible while editing",
            caption: "Current and proposed limits stay visible while editing.",
          },
          {
            src: "/Omantel%20assets/KD2.5.png",
            alt: "Apply to all scenario — bulk-edit pattern with per-row undo",
            caption: "Apply to all, with undo on a single row.",
          },
          {
            src: "/Omantel%20assets/Noteworthy%203.gif",
            alt: "Bulk actions select step with apply-to-all and per-row undo for credit limit and international calling",
            caption:
              "Apply-to-all and per-row undo across credit limits and add-ons.",
          },
        ],
      },
      {
        title: "Every batch is checkable later",
        description:
          "History shows **batch status**, **each order**, and **mixed outcomes** when some requests are done and others are still in progress.",
        rationale:
          "Leaving updates with Omantel staff kept friction on every batch.",
        why: "Reps return to verify an outcome or explain a change. A transparent history is what makes the system trustworthy.",
        impact:
          "Reps **check status themselves** and use the history for internal discussions and the next change.",
        images: [
          {
            src: "/Omantel%20assets/Batch%20History.gif",
            alt: "Batch history view: scanning status and drill-down into individual records",
            caption: "Status at a glance, detail on demand.",
          },
          {
            src: "/Omantel%20assets/KD3.png",
            alt: "History and tracking: batch-level and record-level status",
            caption: "Batch status and each record inside it.",
          },
        ],
      },
      {
        title: "Big batches stay on desktop",
        description:
          "Mobile covers **new lines** and **a few known lines via search**. High-volume updates stay on desktop, through CSV templates.",
        rationale:
          "Hundreds of records on a phone would turn simplification into confusion.",
        why: "Mobile is a quick change or a reference. Desktop stays the place for high volume.",
        impact:
          "**Useful on the go.** No feature is forced onto a screen it wasn't designed for.",
        images: [
          {
            src: "/Omantel%20assets/Om%20mobile%201.gif",
            alt: "Omantel bulk actions on mobile — animated scoped flow",
            caption: "Scoped mobile actions for a change on the go.",
          },
          {
            src: "/Omantel%20assets/Om-Mobile.png",
            alt: "Omantel bulk actions on mobile — scoped flows for on-the-go updates",
            caption: "A limited set of actions, not the full desktop batch.",
          },
        ],
      },
      {
        title: "A stale file stops before submit",
        description:
          "The system checks the data, warns when it is out of date, and sends the rep to a template with the **latest data**.",
        rationale:
          "Placing a batch with outdated data is a costly mistake. The warning adds a step. A failed batch costs more.",
        why: "Reps should not have to remember the current data on each number.",
        impact: "**The latest data comes with the template.**",
        images: [
          {
            src: "/Omantel%20assets/KD5-Template%20generation.png",
            alt: "Bulk Actions template generation for offline batch preparation",
            caption: "Download a template that already has the latest data.",
          },
          {
            src: "/Omantel%20assets/KD5%3AVisual%202.gif",
            alt: "Inline data validity checks during input and file upload",
            caption: "Validity checks at the form and at upload.",
          },
          {
            src: "/Omantel%20assets/Feedback.png",
            alt: "System informing the user about outdated data",
            caption: "The system flags outdated data.",
          },
        ],
      },
    ],
    outcomeImages: [
      {
        src: "/Omantel%20assets/Outcome_new.gif",
        alt: "Omantel enterprise dashboard with Bulk Actions in quick actions",
        caption:
          "Bulk Actions sits in quick actions, so a rep starts from the home screen.",
      },
      {
        src: "/Omantel%20assets/Outcome%202.gif",
        alt: "Omantel dashboard hero carousel with upgrade and service prompts",
        caption: "The dashboard home, where bulk work starts.",
      },
    ],
    collaboration: {
      quote:
        "A key client stakeholder believed his enterprise customers were experts who already knew what they were doing. Templates and upload-stage checks felt unnecessary to him.\n\nThe process walkthroughs showed something else. Errors and edge cases were exactly what forced whole batches to restart.",
      bullets: [
        "I made the case for **expert and first-time reps**, and for **small and large-volume jobs**.",
        "I mapped the ops process and marked every **roadblock and dependency**.",
        "Instead of cycling through UI revisions, I laid out the happy path for each input method and kept the UI out of the room, so he judged the logic, not the pixels.",
      ],
    },
    learnings: {
      learned: [
        "**Experts still hit the edge cases** that restarted whole batches.",
        "**A guided start beats a toolbox** when use cases, edge cases and accessibility needs pull in different directions.",
      ],
      moreTime: [
        "Run a lightweight usability study with **2–3 enterprise reps** before handoff.",
        "Add **batch-level progress** for large uploads, where the wait becomes noticeable.",
        "Use AI to **track business rules and surface them** to the rep.",
      ],
    },
  },
};
