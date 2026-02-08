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
    secondaryWork: {
      title: "Secondary work",
      subsections: [
        {
          title: "Understanding the context",
          content:
            "Placeholder for understanding the existing system, user flows, or pre-release validation. Add content as needed.",
        },
        { title: "User flows", content: "" },
        {
          title: "Pre-release experience validation",
          content:
            "Placeholder for validation activities. Replace with your own content when ready.",
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
          "Allowing owners to actively configure packages within the website helped shift the experience from passive comparison to active decision-making, increasing confidence in the selected configuration before purchase. This reduces:\n\n• fear of commitment\n\n• post-purchase regret\n\n• dependency on offline reassurance",
        images: [
          {
            src: "/images/omantel-bulk-activation.jpg",
            alt: "Balancing clarity, complexity, and purpose",
          },
        ],
      },
      {
        title: "Keep standard plans and package configuration on the same page",
        description:
          "Keep the package configuration experience on the same page as the standard plans, rather than moving users into a separate \"build package\" flow.",
        rationale: "",
        impact: "",
      },
    ],
    outcome:
      "Outcome and impact of the project. Add your summary and metrics here.",
    reflection:
      "Reflection and learnings from this project. Add your thoughts when ready.",
  },
  images: [
    {
      src: "/images/omantel-bulk-activation.jpg",
      alt: "Real estate connectivity",
      caption: "Placeholder—replace with your image",
    },
  ],
  visualsSections: [{}, {}, {}, {}],
};
