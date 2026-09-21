import { omantelCaseCardImageSrc } from "@/case-studies/omantel-card-preview";
import type { ExpandingCursorPrompt } from "@/lib/expanding-cursor";

export interface HomeCaseStudyPreview {
  displayTitle: string;
  description: string;
  meta: string;
  statusLabel?: string;
  cursor?: ExpandingCursorPrompt;
}

export type PortfolioCardLayout = "standard" | "feature";

export interface HomeCaseStudy {
  slug: string;
  title: string;
  caption: string;
  tag: string;
  layout?: PortfolioCardLayout;
  preview: HomeCaseStudyPreview;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export const HOME_CASE_STUDIES: HomeCaseStudy[] = [
  {
    slug: "omantel-bulk-activation",
    title: "Bulk SIM activation for Omantel",
    caption: "Scale bulk activation so one bad row doesn't kill the batch.",
    tag: "Telecom | Work project",
    layout: "feature",
    preview: {
      displayTitle: "Omantel bulk",
      description:
        "Ops tooling for batch SIM activation — validation, recovery, and audit trails when thousands of rows move at once.",
      meta: "TELECOM · OPS UI",
      statusLabel: "LIVE BUILD",
      cursor: {
        title: "View case study",
        hint: "TELECOM · OPS UI · Click to explore",
      },
    },
    imageSrc: omantelCaseCardImageSrc,
    imageAlt: "Omantel bulk SIM activation dashboard",
    href: "/case/omantel-bulk-activation",
  },
  {
    slug: "warehouse-operations",
    title: "Warehouse operations",
    caption: "Show warehouse status before someone pings the group chat.",
    tag: "Logistics | Work project",
    preview: {
      displayTitle: "Warehouse ops",
      description:
        "A live warehouse dashboard so teams see stock, bottlenecks, and handoffs before the group chat lights up.",
      meta: "LOGISTICS · DASHBOARD",
      cursor: {
        title: "View case study",
        hint: "LOGISTICS · DASHBOARD · Click to explore",
      },
    },
    imageSrc: "/warehouse.png",
    imageAlt: "Warehouse operations dashboard",
    href: "/case/warehouse-operations",
  },
  {
    slug: "disaster-recovery",
    title: "Disaster recovery automation",
    caption: "When minutes matter, reporting can wait.",
    tag: "Infrastructure | Work project",
    preview: {
      displayTitle: "DR automation",
      description:
        "Runbook automation for disaster recovery — cut manual reporting when minutes matter and keep stakeholders aligned.",
      meta: "INFRASTRUCTURE · OPS",
      cursor: {
        title: "View case study",
        hint: "INFRASTRUCTURE · OPS · Click to explore",
      },
    },
    imageSrc: "/DM.png",
    imageAlt: "Disaster recovery operations dashboard",
    href: "/case/disaster-recovery",
  },
];
