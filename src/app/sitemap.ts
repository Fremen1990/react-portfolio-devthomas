import { localizedPath } from "@/i18n/routes";
import { visiblePosts } from "@/content/blog/.generated/posts";
import { blogArticlePath } from "@/content/blog/model";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { caseStudyPath, publishedCaseStudies } from "@/content/work/studies";

// Exported as /sitemap.xml. The /look/ copies of the home page are left out:
// they name / as their canonical page.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog/` },
    { url: `${SITE_URL}/blog/pl/` },
    ...visiblePosts
      .filter((post) => !post.preview)
      .flatMap((post) =>
        (["en", "pl"] as const).map((locale) => ({
          url: SITE_URL + blogArticlePath(post.slug, locale),
          lastModified: post.updatedAt ?? post.publishedAt,
          alternates: {
            languages: {
              en: SITE_URL + blogArticlePath(post.slug, "en"),
              pl: SITE_URL + blogArticlePath(post.slug, "pl"),
            },
          },
        }))
      ),
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
  return entries.flatMap((entry) => {
    const path = entry.url.slice(SITE_URL.length);
    const paths = path.startsWith("/blog/")
      ? [path]
      : [localizedPath(path, "en"), localizedPath(path, "pl")];
    return paths.map((p) => ({
      ...entry,
      url: SITE_URL + p,
      alternates: {
        languages: {
          en: SITE_URL + localizedPath(p, "en"),
          pl: SITE_URL + localizedPath(p, "pl"),
          "x-default": SITE_URL + localizedPath(p, "en"),
        },
      },
    }));
  });
}
