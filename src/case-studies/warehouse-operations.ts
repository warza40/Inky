import type { CaseStudy } from "./omantel";

export const warehouseOperationsCase: CaseStudy = {
  slug: "warehouse-operations",
  title: "Bringing Clarity to Warehouse Operations at Scale",
  heroTitleAccent: "at Scale",
  overview: {
    role: "UX and UI Design",
    context: "Logistics · Operations",
    company: "Amazon",
    problem: "Warehouse operations at scale",
    focus: "Clarity · Operations",
  },
  sections: {
    context:
      "This project focused on designing a centralized warehouse management portal used by multiple internal teams to track operations, quality checks, and warehouse performance.\n\nThe product was part of a larger enterprise ecosystem, where data already existed across different systems — but was fragmented, inconsistent, and difficult to act on.\n\nMy role was to bring clarity to this complexity by designing a system that could support day-to-day operational decisions across roles without overwhelming stakeholders.",
    problem: [
      {
        content:
          "Though the system technically functioned, it placed a high cognitive and coordination load on individual stakeholders and teams.\n\nData inconsistencies made it difficult to trust reports. Teams struggled to align because updates lived in different tools. Critical decisions were often delayed or revisited due to missing context.\n\nThe core problem was not the absence of data, but the absence of clarity, trust, and shared visibility across roles.",
      },
    ],
    understanding: {
      title: "Understanding the existing scenario",
      content:
        "Warehouse operations were managed through a combination of internal tools, spreadsheets, and manual processes.\n\nEach team maintained its own records for quality checks, inventory, and variance tracking. Data was updated independently across systems, often at different points in time.\n\nAccess to information varied by role, but there was no unified interface that reflected the end-to-end state of warehouse operations. As a result, users relied on experience and informal communication to fill in gaps.\n\n---",
      visualsTitle: "View-to-Role Mapping",
      images: [{ src: "/Table.webp", alt: "View-to-Role Mapping" }],
      afterDivider: {
        title: "Approach",
        goal:
          "To reduce cognitive load while maintaining accuracy, traceability, and operational reliability.",
        content:
          "I followed a structured, iterative design process grounded in domain understanding and cross-functional collaboration:",
        bullets: [
          "Understanding stakeholder inputs and existing operational workflows",
          "Synthesizing pain points through affinity mapping",
          "Defining user roles and core decision-making workflows",
          "Mapping critical user flows and dependencies",
          "Exploring interactions through wireframes",
          "Designing high-fidelity interfaces using the existing design system",
          "Supporting development through handoff and design QA",
        ],
      },
      afterApproachDivider: {
        title: "Secondary Research",
        content:
          "Due to project constraints, direct primary user research was limited. To make informed design decisions, I focused on secondary research, drawing an understanding from stakeholder inputs, existing systems, and operational artifacts.\n\nThe aim was to build a shared understanding of the domain before proposing changes.",
      },
      afterSecondaryResearchDivider: {
        title: "Personas (Derived)",
        intro:
          "Personas were derived from stakeholder inputs and observed workflows, rather than direct interviews.\n\nThey were used as alignment tools to represent:",
        bullets: [
          "responsibilities",
          "decision-making needs",
          "access levels",
          "information frequency",
        ],
        content:
          "Primary personas included Project Managers and Quality Check Officers, with secondary personas such as Regional QC Officers and Third-Party Managers.\n\nThese personas helped ensure the interface supported realistic operational needs without overgeneralizing user behavior.",
      },
      afterPersonasDivider: {
        title: "System-Level Exploration & Brainstorming",
        intro:
          "Before moving into screens, I explored the problem at a system level to understand how information flowed across teams.\n\nThis included:",
        bullets: [
          "mapping key workflows across roles",
          "identifying handoff points where information broke down",
          "exploring alternative ways to structure visibility and access",
        ],
        content:
          "This helped ensure the designed solution addressed core operational issues rather than surface-level UI problems.",
        workflowsIntro:
          "During system analysis, I focused on a few high-frequency workflows that shaped the product structure:",
        workflows: [
          {
            title: "Variance Testing",
            description:
              "Identifying gaps between planned and actual execution (For warehouse blueprints) A repetitive, manual task used by Project Managers and internal staff.",
          },
          {
            title: "Quality Checks",
            description:
              "Tracking quality across units and handling damaged items through structured records. Used by Project Managers, on-site staff, and QC officers.",
          },
          {
            title: "Managing User Access",
            description:
              "Controlling access for internal and third-party users to reduce risk and maintain data security.",
          },
        ],
        workflowsClosing:
          "These workflows informed decisions around dashboards, permissions, and audit visibility.",
        images: [
          { src: "/Warehouse%20assets/Flow%201.png", alt: "Flow 1" },
          { src: "/Warehouse%20assets/Flow%202.png", alt: "Flow 2" },
        ],
      },
    },
    constraints: [
      {
        content:
          "This project operated within several challenges, rather than constraints, that shaped design decisions:\n\n• Limited access to direct end users due to operational and time constraints\n• Existing backend systems and data structures that could not be changed\n• A predefined design system that needed to be followed\n• Multiple user roles with different access levels and responsibilities",
      },
    ],
    decisions: [
      {
        title: "Role-Based Views Instead of a Single Unified Interface",
        description: "",
        rationale:
          "Although users accessed the same underlying data, their responsibilities and decision needs differed. A single view for all stakeholders risked increasing cognitive load and reducing clarity.",
        impact:
          "Faster access to relevant information\n\nReduced clutter for day-to-day tasks\n\nImproved adoption across roles",
        images: [{ src: "/Warehouse%20assets/KD1.png", alt: "Role-based views" }],
      },
      {
        title: "Making Quality Check Access Explicit and Context-Aware",
        description: "",
        rationale:
          "Quality checks involved multiple teams working across large physical spaces. Earlier workflows relied on informal coordination to decide which areas were open for inspection, leading to confusion and unnecessary exposure to sensitive project information.\n\nTo reduce ambiguity, access needed to be clearly defined, traceable, and aligned with on-site workflows.",
        designResponse:
          "An access-map workflow was introduced, allowing Project Managers to mark specific zones on the blueprint that required inspection. These zones were then reflected on the Quality Check Officer's mobile view, showing only the areas open for access along with navigation support.",
        impact:
          "Clear scope for on-site quality checks\n\nReduced coordination overhead between teams\n\nBetter control over what information was visible during site visits",
        images: [
          { src: "/Warehouse%20assets/KD2.gif", alt: "Quality check access – zone mapping" },
          { src: "/Warehouse%20assets/KD2.5.gif", alt: "Quality check access – mobile view" },
        ],
      },
      {
        title: "Granular Permission Controls for Internal and Third-Party Users",
        description: "",
        rationale:
          "The system needed to balance collaboration with data security. Broad access to third party stakeholders increased risk, while strict controls slowed operations.",
        impact:
          "Improved data security\n\nClear ownership and accountability\n\nSafer collaboration with external teams",
        designResponse:
          "User approval workflows were intentionally designed as gated actions.\n\nThird-party users remained in a pending state until explicitly reviewed and approved. To prevent errors, approval actions were disabled for records undergoing edits, ensuring that review and modification could not occur simultaneously.",
        images: [
          { src: "/Warehouse%20assets/KD3.png", alt: "Permission controls – approval workflow" },
          { src: "/Warehouse%20assets/KD3.5.png", alt: "Permission controls – gated actions" },
        ],
      },
      {
        title: "Project Dashboards for Decision-Making",
        description: "",
        rationale:
          "Project Managers needed to assess project health quickly without navigating through multiple sections. Existing workflows required piecing together information across modules, increasing cognitive load and slowing responses.\n\nThe challenge was to surface what mattered most, without overwhelming the user with raw data.",
        impact:
          "Faster assessment of project status\n\nReduced need to navigate across sections\n\nMore confident, timely decision-making by Project Managers",
        designResponse:
          "Each project was given a dedicated dashboard that prioritized milestone progress, readiness scores, safety status, and order states. Related actions, such as accessing documents or drilling into modules, were kept within reach without breaking context.",
        images: [{ src: "/Warehouse%20assets/KD4.png", alt: "Project dashboard" }],
      },
      {
        title: "Mobile Experience for On-Site Quality Checks",
        description: "",
        rationale:
          "Quality Check Officers performed inspections on-site while moving across large warehouse areas. Desktop workflows were impractical in these conditions, and users needed focused access to only what was relevant during a site visit.",
        impact:
          "Enabled effective on-site inspections\n\nReduced reliance on memory or offline references\n\nMaintained consistency between planning and execution workflows",
        designResponse:
          "A mobile experience was designed to support on-site workflows such as viewing assigned zones, navigating to specific modules, and recording quality checks. The interface prioritized clarity, limited actions, and quick validation, while configuration and planning remained desktop-first.",
        images: [{ src: "/Warehouse%20assets/KD5.gif", alt: "Mobile on-site quality check experience", caption: "Mobile experience for on-site quality checks" }],
      },
    ],
    outcome:
      "• Project Managers were able to assess project health quickly through centralized dashboards, reducing the need to navigate across multiple sections.\n\n• Role-based views and approval workflows helped maintain data integrity while supporting collaboration with third-party teams.\n\n• Clear traceability across quality and variance workflows improved confidence during reviews and audits.\n\n• Standardized inputs and structured workflows reduced inconsistencies in operational data.\n\n• The clarity and scalability of the system led to a Phase 2 engagement with the same client.",
    reflection:
      "This project involved designing within real operational and system constraints. Limited access to end users and fixed backend structures required decisions to be made based on system understanding, stakeholder input, and observed workflows rather than ideal scenarios.\n\nDesigning both desktop and mobile experiences clarified the need to separate planning work from on-site execution. Treating these as distinct contexts helped reduce complexity and supported more focused use during quality checks.\n\nIf revisited, the work would benefit from more validation in live on-site conditions to refine edge cases and reduce friction during high-volume usage.",
  },
  images: [],
  visualsSections: [],
};
