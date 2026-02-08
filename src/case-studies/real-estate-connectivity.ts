import type { CaseStudy } from "./omantel";

export const realEstateConnectivityCase: CaseStudy = {
  slug: "real-estate-connectivity",
  title: "Real estate connectivity solution",
  overview: {
    role: "UX Designer",
    context: "Real Estate · Connectivity",
    company: "—",
    problem: "Connectivity for properties",
    focus: "User Experience · Integration",
  },
  sections: {
    context:
      "This project focused on a bulk connectivity solution introduced for the Omani market, where sharing Wi-Fi connections across tenants is restricted by regulation. The product enables real estate owners to purchase and manage internet services for multiple residential units within a building.\n\nMy work was scoped to the initial purchase flow on the Omantel website, where real estate owners select a combination of units and bandwidth plans when setting up connectivity for a property. As this was a new offering, the first phase supported a predefined set of recommended unit bundles. Requests for custom unit counts were routed to internal teams for further evaluation.\n\nA key consideration during this stage was helping owners understand that this was not a fixed or irreversible decision. After purchase, owners would have access to a management platform where connections could be started, modified, or paused for individual tenants, allowing connectivity to function as a managed building amenity.",
    problem: [
      {
        content:
          "From a business perspective, this solution represented a shift from individual household subscriptions to a higher-value, multi-unit offering. The goal of including this flow within the platform was to enable expansion, reduce dependency on manual sales processes, and ensure consistent application of pricing and regulatory rules.\n\nFor real estate owners, the purchase decision involved both cost and responsibility. Internet connectivity was positioned as a building amenity, and owners needed clarity and confidence that they could manage services for different tenants over time, rather than committing to a rigid, one-time configuration.\n\nFrom an operational standpoint, the existing process relied heavily on offline coordination through email, which increased turnaround time, introduced the risk of miscommunication, and placed additional load on internal teams.",
      },
    ],
    understanding: {
      title: "Understanding the existing scenario",
      content:
        "Prior to this, real estate connectivity plans were presented as a static table on the Omantel website. The table outlined standard unit and bandwidth combinations, but did not support configuration or direct purchase.\n\nFor cases that did not match the listed options, real estate owners were required to contact Omantel through email. This resulted in manual coordination to clarify requirements, pricing, and feasibility before a request could be processed.\n\nAs a result, the digital experience functioned primarily as a reference point, with the actual transaction and validation occurring offline through internal teams.",
      images: [
        {},
        {
          src: "/Section-3.png",
          alt: "Understanding the existing scenario – Section 3",
          hoverTooltip: "Low fidelity wireframes for different options for user to enter the flow.",
        },
      ],
    },
    constraints: [
      {
        content:
          "This was more of a placement constraint: the solution was required to replace an existing static table on the Omantel homepage. This meant the experience needed to fit within a predefined section of the page, rather than being introduced as a standalone flow or separate journey.",
      },
    ],
    decisions: [
      {
        title: "Balancing clarity, complexity, and purpose",
        description: "",
        rationale:
          "Progressively guide users through available unit and bandwidth combinations, prioritizing clarity and making sure that the user understands all possible options upfront. Presenting all packages, combinations, and service constraints at once risked overwhelming users and increasing decision friction.",
        impact:
          "Allowing owners to actively configure packages within the website helped shift the experience from passive comparison to active decision-making, increasing confidence in the selected configuration before purchase. This reduces:\n• fear of commitment\n• post-purchase regret\n• dependency on offline reassurance",
      },
      {
        title: "Keep standard plans and package configuration on the same page",
        description:
          "Keep the package configuration experience on the same page as the standard plans, rather than moving users into a separate \"build package\" flow.",
        rationale:
          "Earlier explorations treated configuration as a distinct step—users would first view standard plans, then move into a separate package-building flow to configure units, review pricing, and request a callback. While this separation was logically clean, it introduced unnecessary context switching for a decision that required frequent reference back to standard plans and pricing anchors.",
        impact:
          "This allowed users to:\n• reference standard packages while configuring a custom plan\n• understand how custom selections mapped to familiar benchmarks\n• maintain continuity without navigating away or restarting the flow and avoided loss of context",
      },
      {
        title: "Check service availability after package configuration",
        description:
          "Placing the location validation stage later in the flow, after users had configured their package, rather than requiring location details upfront. When a location was not serviceable, the experience clearly communicated the status and captured user intent as a lead, rather than ending the journey abruptly. This reframed the outcome from a dead end to a signal of future interest.",
        rationale:
          "From a system perspective, capturing location information early would have filtered out non-serviceable users quickly. However, it would also have prevented visibility into interest and demand from areas not yet covered by the service.\n\nFrom a user perspective, this introduced a risk of perceived wasted effort if a location was not yet serviceable. However, placing location checks later ensured users first understood the value and structure of the offering before encountering availability constraints.",
        impact:
          "1. This approach supported both business planning and user clarity, while acknowledging a calculated amount of upfront user effort as a trade-off.\n2. Helped the team understand demand and plan future services efficiently based on the same.",
      },
    ],
    outcome:
      "Enabled a more self-serve entry point for real estate connectivity, reducing reliance on offline coordination for early-stage configuration.\n\nImproved clarity around available packages, service constraints, and next steps within a single-page flow.\n\nCaptured structured demand signals for locations and configurations beyond current service availability.",
    reflection:
      "1. This project reminded me of the importance of designing within real operational and business constraints. This wasn't a project about idealised user flows. Many of the decisions were less about adding capability and more about sequencing information, managing expectations, and preserving continuity in the decision-making process for the users.\n\n2. This project highlighted how product experiences often sit at the intersection of regulation, backend readiness, and user trust.\n\n3. Overall, this work shaped how I approach complex B2B flows—focusing on clarity, sequencing, and decision support over feature breadth.",
  },
  images: [
    {
      src: "/Section-3.png",
      alt: "Real estate connectivity",
      caption: "Placeholder—replace with your image",
    },
  ],
  visualsSections: [{}, {}, {}, {}],
};
