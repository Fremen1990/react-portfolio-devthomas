import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import type { MDXContent } from "mdx/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { visiblePosts } from "@/content/blog/.generated/posts";
import {
  blogArticlePath,
  blogImagePath,
  blogIndexPath,
  formatBlogDate,
} from "@/content/blog/model";
import type { BlogLocale } from "@/content/blog/types";
import { blogLabels } from "@/content/blog/labels";
import { profile } from "@/content/publicProfile";
import { getCaseStudies, caseStudyPath } from "@/content/work/studies";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import { headingsFromMdx } from "@/lib/headings";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { CaseStudyToc } from "@/components/CaseStudy/CaseStudyToc";

const find = (slug: string) => visiblePosts.find((p) => p.slug === slug);
export function articleMetadata(slug: string, locale: BlogLocale) {
  const post = find(slug);
  if (!post) return {};
  const edition = post.editions[locale];
  return pageMetadata({
    path: blogArticlePath(slug, locale),
    title: edition.title,
    description: edition.description,
    image: { url: blogImagePath(slug, locale), alt: edition.title },
    languages: {
      en: blogArticlePath(slug, "en"),
      pl: blogArticlePath(slug, "pl"),
    },
    article: {
      locale,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    },
    noIndex: post.preview,
  });
}
const Unwrapped = ({ children }: { children?: ReactNode }) => <>{children}</>;
export async function BlogArticle({
  slug,
  locale,
  Body,
}: {
  slug: string;
  locale: BlogLocale;
  Body: MDXContent;
}) {
  const post = find(slug);
  if (!post) notFound();
  const t = blogLabels[locale],
    edition = post.editions[locale];
  const source = await readFile(
    join(process.cwd(), "src/content/blog/.generated", `${slug}.${locale}.mdx`),
    "utf8"
  );
  const headings = headingsFromMdx(source);
  const url = SITE_URL + blogArticlePath(slug, locale);
  const related = getCaseStudies(locale).filter((s) =>
    post.relatedWork?.includes(s.slug)
  );
  return (
    <article lang={locale} className="blog-article">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: edition.title,
          description: edition.description,
          url,
          mainEntityOfPage: url,
          inLanguage: locale,
          image: SITE_URL + blogImagePath(slug, locale),
          author: { "@type": "Person", name: profile.name, url: SITE_URL },
          ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
          ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        }}
      />
      <header className="band blog-hero">
        <div className="page-wrap">
          <p className="eyebrow">Blog · {edition.topics.join(" / ")}</p>
          <h1>{edition.title}</h1>
          <p className="blog-description">{edition.description}</p>
          <p className="blog-meta">
            {profile.name}
            <span aria-hidden="true"> · </span>
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
          {post.updatedAt && (
            <p className="blog-meta">
              {t.updated}:{" "}
              <time dateTime={post.updatedAt}>
                {formatBlogDate(post.updatedAt, locale)}
              </time>
            </p>
          )}
        </div>
      </header>
      <div className="page-wrap case-study-body blog-body">
        <CaseStudyToc headings={headings} label={t.toc} />
        <div className="prose blog-prose">
          {post.preview && <p className="blog-notice">{t.preview}</p>}
          {post.developmentAsOf && (
            <aside className="blog-notice">
              <strong>
                {t.note} ·{" "}
                <time dateTime={post.developmentAsOf}>
                  {formatBlogDate(post.developmentAsOf, locale)}
                </time>
              </strong>
              <p>{t.development}</p>
            </aside>
          )}
          <Body components={{ wrapper: Unwrapped }} />
          {related.length > 0 && (
            <aside aria-label={t.related}>
              <h2>{t.related}</h2>
              <ul>
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link href={caseStudyPath(s.slug, locale)}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <footer className="blog-author">
            <p>
              {t.author}: <strong>{profile.name}</strong>
            </p>
            <p>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.discussion}
              </a>
            </p>
            <Link href={blogIndexPath(locale)}>← {t.back}</Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
