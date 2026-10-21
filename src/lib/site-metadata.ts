import type { Metadata } from "next";

export const siteName = "Rachana Mandal";

export const siteUrl = "https://rachanamandal.space";

const defaultDescription =
  "Product designer for B2B tools and operational workflows. Case studies on activation, warehouse ops, and disaster recovery.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Product designer`,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    title: `${siteName} — Product designer`,
    description: defaultDescription,
    type: "website",
    siteName,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Product designer`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Public identity already shown on the site. Used for the homepage JSON-LD. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle: "Product designer",
  email: "mailto:rachanamandal@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/rachanamandal/",
    "https://www.instagram.com/rachanamandal/",
    "https://open.substack.com/pub/thelilyput",
  ],
};
