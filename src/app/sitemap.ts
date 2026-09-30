import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { caseStudyPath, publishedCaseStudies } from "@/content/work/studies";

// Exported as /sitemap.xml. The /look/ copies of the home page are left out:
// they name / as their canonical page.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...publishedCaseStudies.map((study) => ({
      url: `${SITE_URL}${caseStudyPath(study.slug)}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/colophon/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
