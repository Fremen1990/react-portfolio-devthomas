import Link from "next/link";
import { visiblePosts } from "@/content/blog/.generated/posts";
import { blogLabels } from "@/content/blog/labels";
import { blogIndexPath } from "@/content/blog/model";
import type { BlogLocale } from "@/content/blog/types";
import { pageMetadata } from "@/lib/metadata";
import { BlogLanguages, BlogList } from "./BlogList";
export function blogIndexMetadata(locale: BlogLocale) {
  const t = blogLabels[locale];
  return pageMetadata({
    path: blogIndexPath(locale),
    title: t.title,
    description: t.description,
    languages: { en: "/blog/", pl: "/blog/pl/" },
    noIndex: visiblePosts.some((post) => post.preview),
  });
}
export function BlogIndex({ locale }: { locale: BlogLocale }) {
  const t = blogLabels[locale];
  return (
    <section
      lang={locale}
      className="page-section blog-index"
      aria-labelledby="blog-heading"
    >
      <div className="page-wrap">
        <header className="blog-index-header">
          <p className="eyebrow">Blog · Tomasz Stanisz</p>
          <h1 id="blog-heading">{t.title}</h1>
          <p className="blog-description">{t.description}</p>
          <BlogLanguages locale={locale} />
        </header>
        {visiblePosts.some((p) => p.preview) && (
          <p className="blog-notice">{t.preview}</p>
        )}
        {visiblePosts.length ? (
          <BlogList locale={locale} />
        ) : (
          <div className="prose">
            <p>{t.empty}</p>
            <Link href="/#work">{t.work} →</Link>
          </div>
        )}
      </div>
    </section>
  );
}
