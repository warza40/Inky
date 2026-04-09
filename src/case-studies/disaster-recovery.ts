import type { CaseStudy } from "./omantel";

export const disasterRecoveryCase: CaseStudy = {
  slug: "disaster-recovery",
  title: "Accelerating Disaster Recovery Response Through Automation",
  heroTitleAccent: "Through Automation",
  warmthTheme: "slate",
  overview: {
    role: "UX, Data visualisation",
    context:
      "Disaster Recovery Operations · 3–4 months · In collaboration with a principal designer and development team",
    company: "",
    problem: "Legacy tools during active disaster response",
    focus: "Figma · FigJam",
    tools: "Figma · FigJam",
  },
  sections: {
    contextFlow: {
      paragraphs: [
        "[madder]Hurricane season[/madder] hits, and entire neighbourhoods are devastated. [madder]Homes are destroyed, trees are down, and debris is everywhere.[/madder] Amidst the chaos, our client — a vital organisation on the [madder]front lines of disaster recovery[/madder] — faces their biggest roadblock: legacy tools.",
        "They have a [madder]dedicated team who works tirelessly to clear debris[/madder] — sorting it, collecting it, and hauling it away. With [madder]no technological advancements[/madder], their system remained managed via legacy tools, long and [madder]prone to error and miscalculations[/madder].",
        "Their work involved quite [madder]critical timelines and a large number of field workers and backend teams[/madder]. Already being in a [madder]race against time[/madder], imagine a crew captain sifting through cumbersome tools for approvals and deployment — or a dispatcher struggling to track debris collection progress.",
      ],
      aim: "Our aim was to supercharge the client's response time and efficiency.",
    },
    contextEcosystem: {
      eyebrow: "THE ECOSYSTEM · FOUR SOLUTIONS, ONE MISSION",
      intro:
        "Across a timeline of 4–5 months, we worked on the following solutions for the problem statements as part of the same ecosystem.",
      boxTitle: "FOUR PRODUCTS · ONE DISASTER RECOVERY ECOSYSTEM",
      products: [
        {
          name: "Debris Management Portal",
          description:
            "Dashboards tracking debris categories across states via data visualisations and tabulations. Generates reports for all required metrics. Managed by crew captains, heads, and higher authority.",
          platform: "desktop",
          icon: "portal",
        },
        {
          name: "Time App",
          description:
            "Allows field workers collecting debris to log their time and shifts throughout the day.",
          platform: "mobile",
          icon: "clock",
        },
        {
          name: "Case Management",
          description:
            "Allows officials to manage fund allocations and track cases of displaced families throughout the recovery process.",
          platform: "desktop",
          icon: "check",
        },
        {
          name: "Disposal Monitor Application",
          description:
            "Allows the entire fleet of debris disposal trucks to create entries of debris disposed and associated site details — reflecting in main portal reports.",
          platform: "mobile",
          icon: "bars",
        },
      ],
    },
    problem: [
      {
        title: "The messy aftermath of natural calamities",
        content:
          "The legacy tools supporting this critical operation were the real crisis. Field workers, dispatchers, crew captains, and regional managers all depended on systems that were fragmented, inconsistent, and deeply prone to error.\n\nThere was no single source of truth. Data lived in different tools, updated at different cadences, and trusted by nobody. Approvals were delayed. Debris collection progress was invisible. Decisions that should take minutes were taking hours — in a context where hours matter enormously.\n\nThe core problem was not an absence of data. It was an absence of **clarity, trust, and shared visibility** across roles, tools, and locations.",
      },
    ],
    understanding: {
      title: "Understanding the existing scenario",
      content: "",
      afterSecondaryResearchDivider: {
        title: "Knowing the who's",
        intro:
          "In actuality there were 9 different personas across our interviews. Most of their goals started becoming common while going through the interview data. At a high level, the personas can be categorised as **On-field personas** and **Backend personas**.\n\nAt a higher level, most personas were looking forward to having: a streamlined platform, all the details in one place, and automation of manual processes.",
        content: "",
        personas: [
          {
            name: "Eliza Petrowsky",
            ageLine: "27y · Senior Analyst",
            worksWith:
              "Works with: DQS Team Leaders, Regional Data Managers, Invoice Reconciler",
            motivations: [
              "Automation",
              "Improving Productivity",
              "Saving time · Cloud Technology",
            ],
            frustrations: ["Legacy tools · Losing data", "Poor communication"],
            painPoints: [
              "Time-consuming. Needs reports and updates sooner than current tools allow.",
              "Ticket and transaction data is scattered — SQL updates needed for simple corrections.",
            ],
          },
          {
            name: "Paul Hernandez",
            ageLine: "55y · Field Supervisor",
            worksWith:
              "Works with: Project Manager, Operation Manager, Debris Monitor",
            motivations: [
              "Automation",
              "Improving Productivity",
              "Saving time · Cloud Technology",
            ],
            frustrations: ["Legacy tools · Losing data", "Poor communication"],
            painPoints: [
              "No system informing supervisors when monitor or employee is out of bounds.",
              "Redundant ticket creation with no way to resolve errors end-to-end.",
            ],
          },
          {
            name: "Jolene A. Warner",
            ageLine: "28y · Invoice Supervisor / Reconciler",
            worksWith:
              "Works with: Field Data Staff, Project Managers, Data Supervisors, Contractors",
            motivations: ["Automation · Connected data · Saving time"],
            frustrations: ["Legacy tools · Load times · Difficulty in usage"],
            painPoints: [
              "Using external tools to track invoices — tedious.",
              "Data scattered across several tools. System freezes on simple tasks.",
            ],
          },
          {
            name: "Ratandeep Basu",
            ageLine: "38y · Regional Data Manager",
            worksWith: "Works with: Regional Data Managers",
            motivations: [
              "Automation · Improving Productivity",
              "Saving time · Cloud Technology",
            ],
            frustrations: ["Legacy tools · Losing data · Poor communication"],
            painPoints: [
              "Setting up projects is too time-consuming compared to existing system.",
              "Automation of several manual activities would save everyone time.",
            ],
          },
        ],
        personaQuote:
          '"It would be great to see the automation of several manual processes — and I would like to plan my tasks in an orderly fashion."',
      },
      afterPersonasDivider: {
        title: "Information Architecture — Navigation and Discoverability",
        intro:
          "This was the portion that took far more explorations than usual. It turned out we were approaching it in the wrong manner initially. I contributed majorly on the reporting segment of this tool post this step.\n\nWe decided to break down different segments of the app to gain more clarity. Some pages and even segments seemed redundant and unnecessary through our brainstorming — which was a relief.\n\nBelow: information architecture exploration and user flows that informed navigation and discoverability.",
        images: [
          {
            src: "/DM%20assets/IA.png",
            alt: "Information architecture exploration for navigation and discoverability",
            caption: "Information architecture",
          },
          {
            src: "/DM%20assets/User%20flows.png",
            alt: "User flows for key navigation paths",
            caption: "User flows",
          },
        ],
        content:
          "Despite having a large number of menus (even after elimination), the navigation that was finalised was kept **straightforward and simple** — the requirement was to keep the learning curve for users to a minimum.",
      },
    },
    constraints: [
      {
        content: "",
        intro:
          "This project operated within several challenges — rather than constraints — that shaped every design decision we made.",
        numberedItems: [
          "Limited access to direct end users due to operational and time constraints — we were designing for people in the field during active disaster response.",
          "Existing backend systems and data structures that could not be changed — we designed around the data model, not the other way around.",
          "A predefined design system that needed to be followed — visual design decisions were not ours to make freely.",
          "Multiple user roles with different access levels and responsibilities — the same platform had to serve field workers and executives without confusion.",
          "Mission-critical timelines — every screen needed to enable fast, confident decisions. There was no room for cognitive overhead.",
        ],
      },
    ],
    decisions: [
      {
        title:
          "Designing a four-product ecosystem rather than one monolithic platform",
        rationale:
          "Field workers and executives have fundamentally different contexts, devices, and tasks. A single platform would compromise all of them.\n\nThe Disposal Monitor needed to work on mobile under harsh field conditions. Forcing this into a desktop portal would make it unusable.\n\nSplitting by function allowed each product to be optimised for its specific user's workflow.",
        impact:
          "Role-appropriate interfaces reduced cognitive load across all 9 personas.\n\nMobile products could be designed for speed and single-handed use.\n\nDesktop products could support the data density required by analysts and supervisors.\n\nData from all four products fed into a single reporting layer — one source of truth.",
      },
      {
        title: "Reports as a first-class priority, not an afterthought",
        rationale:
          "Reports are typically the most mundane or most time-consuming task in a data-heavy enterprise product.\n\nThe client had very high expectations from the reporting section. Every required parameter needed to be upfront — not buried.\n\nThe ask was to surface every single required dataset within a couple of minutes of opening the report.",
        impact:
          "Dashboards structured so essential details are findable within minutes for quicker decisions.\n\nFilters for major categories added to increase efficiency.\n\nFour categories of reports designed: Haul Out, ROW Collection, Unit Rate, Budget Summary.\n\nDual-mode view — tabular and graph — catered to both analytical styles.",
        images: [
          {
            src: "/DM%20assets/DM-KD2.png",
            alt: "Reporting dashboards with key parameters surfaced upfront",
            caption: "Reports as a first-class priority, not an afterthought",
          },
        ],
      },
      {
        title:
          "Dual-mode data visualisation — tabular and graph simultaneously",
        rationale:
          "The biggest challenge was finding the appropriate data visualisation for each metric and fitting them within limited screen real estate.\n\nPersonas consumed data differently — some were graph-oriented, others needed tabular detail for audit trails and reconciliation.\n\nIt was challenging to think beyond regular visualisation types and even come up with nameless data visualisation combinations.",
        impact:
          "Same screen presented in both tabular and graph format — catering to both styles of information consumption.\n\nData depicted: categorisation of debris by type, site, weight/volume, and contractor.\n\nEvery data visualisation chosen on basis of requirement, colour distribution, and easy interpretation.",
        images: [
          {
            src: "/DM%20assets/DM-KD3.png",
            alt: "Dual-mode reporting: graph and tabular views of operational data",
            caption:
              "Dual-mode data visualisation — tabular and graph simultaneously",
          },
        ],
      },
      {
        title: "Simplified navigation despite 9 personas and large menu depth",
        rationale:
          "We explored three navigation schemas: Mega Menu, Ribbon, and Panel. Each represented a different tradeoff between discoverability and simplicity.\n\nUsers were working on critical, time-bound tasks. Navigation had to be learnable in minutes, not hours.\n\nMany pages and segments identified during IA work were redundant — elimination reduced navigation complexity significantly.",
        impact:
          "Final navigation pattern kept straightforward and simple despite the underlying complexity.\n\nLearning curve minimised — a key client requirement for field workers who weren't power users.\n\nNavigation exploration also identified redundant features that were eliminated before build.",
        navExploration: [
          { label: "Mega Menu", variant: "mega" },
          { label: "Ribbon", variant: "ribbon" },
          { label: "Panel", variant: "panel" },
        ],
      },
      {
        title:
          "Content-heavy layouts designed around information hierarchy, not aesthetics",
        rationale:
          "Most real estate was content-heavy. The question was what grabs attention first, and what hierarchy of elements guides the user to a decision.\n\nThe visual design system was scalable and accessible by necessity — large number of users, mission-critical context.\n\nWe blocked out spaces to envision the best layout before committing to detailed design — exploring layouts as structure, not style.",
        impact:
          "Wireframing phase was critical — identified hierarchy issues before they became design debt.\n\nReports section designed so every required parameter is visible upfront — no buried data.\n\nThe design system (built by a separate team) was kept accessible and scalable throughout.",
        images: [
          {
            src: "/DM%20assets/DM-KD5.png",
            alt: "Content-heavy layout and information hierarchy in reporting views",
            caption:
              "Content-heavy layouts designed around information hierarchy, not aesthetics",
          },
        ],
      },
    ],
    reportCategories: [
      {
        num: "01",
        title: "Haul Out Reports",
        description:
          "Volume and weight of debris hauled by site, day, and debris type",
      },
      {
        num: "02",
        title: "ROW Collection Reports",
        description:
          "Right-of-way debris collection tracking by zone and contractor",
      },
      {
        num: "03",
        title: "Unit Rate Reports",
        description: "Per-unit cost tracking and crew productivity metrics",
      },
      {
        num: "04",
        title: "Budget Summary Reports",
        description:
          "Fund allocation, invoicing, and budget reconciliation overview",
      },
    ],
    outcome:
      "• The centralised dashboard allowed crew captains and project managers to assess operational health quickly — reducing the need to navigate across multiple disconnected systems.\n\n• Role-based views and structured approval workflows helped maintain data integrity while supporting collaboration between field workers and backend office teams.\n\n• Clear traceability across debris collection, quality, and variance workflows improved confidence during reviews and audits.\n\n• Standardised inputs and structured data flows through the Disposal Monitor and Time App reduced inconsistencies in operational reporting.\n\n• The dual-mode visualisation approach (graph and tabular) meant that different user types — from field supervisors to invoice reconcilers — could consume the same data in their preferred format.",
    outcomeImages: [
      {
        src: "/DM%20assets/DM-outcome.png",
        alt: "Disaster recovery platform — outcome and reporting visibility",
        caption: "Outcome — centralised dashboard and reporting",
      },
    ],
    reflection:
      "This project involved designing within real operational and system constraints. Limited access to end users and fixed backend structures required decisions to be made based on system understanding, stakeholder input, and observed workflow patterns rather than ideal processes.\n\nThe reporting segment was where I contributed most — and where I learnt the most. It was challenging to think beyond regular visualisation types, to find the most appropriate chart for every metric, and to fit them meaningfully within the limited screen real estate of a dashboard that had to surface everything upfront.\n\nWhat this project taught me most was the relationship between data density and decision speed. When data is scattered across tools, people don't just lose time — they lose trust. The design problem was never really the interface. It was the absence of a single source of truth that everyone could act on.",
    reflectionClosing:
      "Our aim was to supercharge the client's response time and efficiency. Three years later, I think we did.",
  },
  images: [],
  visualsSections: [],
};
