import { omantelCaseCardImageSrc } from "@/case-studies/omantel-card-preview";
import type { ExpandingCursorPrompt } from "@/lib/expanding-cursor";

export interface HomeCaseStudyPreview {
  meta: string;
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
      meta: "TELECOM · OPS UI",
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
