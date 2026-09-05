import type { Metadata } from "next";

export const siteName = "Rachana Mandal";

export const defaultDescription =
  "Product designer for B2B tools and operational workflows. Case studies on activation, warehouse ops, and disaster recovery.";

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteName} — Product designer`,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    title: `${siteName} — Product designer`,
    description: defaultDescription,
    type: "website",
  },
};
