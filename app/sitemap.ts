import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const studies = getAllCaseStudies();
  const baseUrl = "https://travishall.design";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${baseUrl}/work/${study.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
