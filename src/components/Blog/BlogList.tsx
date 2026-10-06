import Link from "next/link";
import { visiblePosts } from "@/content/blog/.generated/posts";
import {
  blogArticlePath,
  blogIndexPath,
  formatBlogDate,
} from "@/content/blog/model";
import { blogLabels } from "@/content/blog/labels";
import type { BlogLocale, VisiblePost } from "@/content/blog/types";
import { SectionBand } from "@/components/SectionBand/SectionBand";

export function BlogLanguages({
  locale,
  slug,
}: {
  locale: BlogLocale;
  slug?: string;
}) {
  return (
    <nav
      className="blog-languages"
      aria-label={
        slug ? blogLabels[locale].language : blogLabels[locale].indexLanguage
      }
    >
      {(["en", "pl"] as const).map((lang) => (
        <Link
          key={lang}
          href={slug ? blogArticlePath(slug, lang) : blogIndexPath(lang)}
          hrefLang={lang}
          lang={lang}
          aria-current={lang === locale ? "page" : undefined}
        >
          {lang === "en" ? "English" : "Polski"}
        </Link>
      ))}
    </nav>
  );
}
export function BlogList({
  locale,
  posts = visiblePosts,
  headingLevel = 2,
}: {
  locale: BlogLocale;
  posts?: VisiblePost[];
  headingLevel?: 2 | 3;
}) {
  const t = blogLabels[locale];
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <ul className="blog-list">
      {posts.map((post) => (
        <li key={post.slug} className="blog-list-item">
          <p className="blog-meta">
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt, locale)}
              </time>
            ) : (
              t.draft
            )}
            <span aria-hidden="true"> · </span>
            {post.readingMinutes[locale]} {t.minute}
          </p>
          <Heading>
            <Link href={blogArticlePath(post.slug, locale)}>
              {post.editions[locale].title}
            </Link>
          </Heading>
          <p className="blog-description">
            {post.editions[locale].description}
          </p>
          <BlogLanguages locale={locale} slug={post.slug} />
        </li>
      ))}
    </ul>
  );
}
export function LatestWriting({ locale = "en" }: { locale?: BlogLocale }) {
  if (!visiblePosts.length) return null;
  return (
    <SectionBand
      id="writing"
      title={locale === "pl" ? "Najnowsze artykuły" : "Latest writing"}
      aside={
        <Link href={blogIndexPath(locale)}>
          {locale === "pl" ? "Wszystkie artykuły →" : "All articles →"}
        </Link>
      }
    >
      <BlogList
        locale={locale}
        headingLevel={3}
        posts={visiblePosts.slice(0, 2)}
      />
    </SectionBand>
  );
}
