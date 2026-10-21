import type { MetadataRoute } from "next";
import { caseStudies } from "@/case-studies";
import { siteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/experiments",
    "/inky-lily",
    ...caseStudies.map((study) => `/case/${study.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
