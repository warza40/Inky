import { omantelCaseCardImageSrc } from "@/case-studies/omantel-card-preview";

export interface HomeCaseStudy {
  slug: string;
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export const HOME_CASE_STUDIES: HomeCaseStudy[] = [
  {
    slug: "omantel-bulk-activation",
    title: "Bulk SIM activation for Omantel",
    caption: "Scale bulk activation so one bad row doesn't kill the batch.",
    imageSrc: omantelCaseCardImageSrc,
    imageAlt: "Omantel bulk SIM activation dashboard",
    href: "/case/omantel-bulk-activation",
  },
  {
    slug: "warehouse-operations",
    title: "Warehouse operations",
    caption: "Show warehouse status before someone pings the group chat.",
    imageSrc: "/warehouse.png",
    imageAlt: "Warehouse operations dashboard",
    href: "/case/warehouse-operations",
  },
  {
    slug: "disaster-recovery",
    title: "Disaster recovery automation",
    caption: "When minutes matter, reporting can wait.",
    imageSrc: "/DM.png",
    imageAlt: "Disaster recovery operations dashboard",
    href: "/case/disaster-recovery",
  },
];
