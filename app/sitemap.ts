import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/data/case-studies";
import { siteConfig } from "@/lib/site-config";

// Static dates reflect actual content state, not the build timestamp.
// Update when page content meaningfully changes.
const SITE_LAUNCHED = new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const studies = getAllCaseStudies();
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: SITE_LAUNCHED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: SITE_LAUNCHED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAUNCHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${baseUrl}/work/${study.id}`,
    lastModified: new Date(`${study.year}-01-01`),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
