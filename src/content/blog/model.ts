import type { BlogLocale, BlogPost } from "./types";
export const blogLocales = ["en", "pl"] as const;
export const isBlogLocale = (value: string): value is BlogLocale =>
  value === "en" || value === "pl";
export const blogIndexPath = (locale: BlogLocale) =>
  locale === "pl" ? "/blog/pl/" : "/blog/";
export const blogArticlePath = (slug: string, locale: BlogLocale) =>
  `/blog/${locale}/${slug}/`;
export const blogImagePath = (slug: string, locale: BlogLocale) =>
  `${blogArticlePath(slug, locale)}card.jpg`;
export const formatBlogDate = (date: string, locale: BlogLocale) =>
  new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
const validDate = (s: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(s)) &&
  new Date(s).toISOString().slice(0, 10) === s;
export function validateBlogPosts(posts: BlogPost[]) {
  const slugs = new Set<string>();
  for (const post of posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || slugs.has(post.slug))
      throw new Error(`Invalid or duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
    if (post.published && !post.publishedAt)
      throw new Error(`Published article needs a release date: ${post.slug}`);
    for (const date of [post.publishedAt, post.updatedAt, post.developmentAsOf])
      if (date && !validDate(date))
        throw new Error(`Invalid date: ${post.slug}`);
    if (
      post.updatedAt &&
      (!post.publishedAt || post.updatedAt < post.publishedAt)
    )
      throw new Error(`Invalid update date: ${post.slug}`);
    for (const locale of blogLocales) {
      const edition = post.editions?.[locale];
      if (
        !edition?.title?.trim() ||
        !edition.description?.trim() ||
        !edition.body?.trim() ||
        !Array.isArray(edition.topics)
      )
        throw new Error(`Missing ${locale} edition: ${post.slug}`);
      if (
        edition.body.includes("..") ||
        edition.body.startsWith("/") ||
        !edition.body.endsWith(".mdx")
      )
        throw new Error(`Invalid body path: ${post.slug}`);
    }
  }
}
export function selectBlogPosts(posts: BlogPost[], preview = false) {
  validateBlogPosts(posts);
  return posts
    .filter((post) => post.published || preview)
    .sort(
      (a, b) =>
        (b.publishedAt ?? b.developmentAsOf ?? "").localeCompare(
          a.publishedAt ?? a.developmentAsOf ?? ""
        ) || a.slug.localeCompare(b.slug)
    );
}
export function readingMinutes(source: string) {
  const prose = source
    .replace(/^import .*$/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  return Math.max(
    1,
    Math.ceil((prose.match(/[\p{L}\p{N}]+/gu)?.length ?? 0) / 200)
  );
}
