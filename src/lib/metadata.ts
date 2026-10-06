import { getProfile } from "@/i18n/profile";
import { localeForPath, localizedPath } from "@/i18n/routes";
import type { Metadata } from "next";
import { profile } from "@/content/publicProfile";

export const SITE_URL = "https://devthomas.pl";
export const SITE_TITLE = `${profile.name}, ${profile.headline}`;

const SHARE_IMAGE = {
  url: "/og-share.png",
  width: 1200,
  height: 630,
  alt: "Tomasz Stanisz portfolio — Software Engineer and Tech Lead",
};

type PageMetadataInput = {
  /** Path with a trailing slash, e.g. "/" or "/work/orange-cms/". */
  path: string;
  /** Page title; omit for the home page's full title. */
  title?: string;
  description?: string;
  /** Canonical path when it differs from `path` (e.g. /look/ copies of /). */
  canonical?: string;
  /** Preview image when it differs from the site-wide one. */
  image?: { url: string; alt: string };
  languages?: Record<string, string>;
  noIndex?: boolean;
  article?: { locale: "en" | "pl"; publishedAt?: string; updatedAt?: string };
};

// Next merges `openGraph` and `twitter` shallowly, so every page gets the full
// set here rather than relying on the layout's defaults.
export const pageMetadata = ({
  path,
  title,
  description,
  canonical = path,
  image,
  languages,
  noIndex,
  article,
}: PageMetadataInput): Metadata => {
  const locale = localeForPath(path);
  const localProfile = getProfile(locale);
  description ??= localProfile.introduction;
  const fullTitle = title
    ? `${title} · ${profile.name}`
    : `${profile.name}, ${localProfile.headline}`;
  const shareImage = image
    ? { ...SHARE_IMAGE, ...image }
    : locale === "pl"
      ? {
          ...SHARE_IMAGE,
          url: "/pl/look/standard-light/card.jpg",
          alt: "Portfolio Tomasza Stanisza — inżynier oprogramowania i Tech Lead",
        }
      : SHARE_IMAGE;
  const pairs = languages ?? {
    en: localizedPath(canonical, "en"),
    pl: localizedPath(canonical, "pl"),
  };

  return {
    title: fullTitle,
    description,
    alternates: { canonical, languages: { ...pairs, "x-default": pairs.en } },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      ...(article
        ? {
            type: "article" as const,
            locale: article.locale === "pl" ? "pl_PL" : "en_GB",
            alternateLocale: article.locale === "pl" ? "en_GB" : "pl_PL",
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt,
            authors: [profile.name],
          }
        : {
            type: "website" as const,
            locale: locale === "pl" ? "pl_PL" : "en_GB",
            alternateLocale: locale === "pl" ? "en_GB" : "pl_PL",
          }),
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
};
