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
};

// Next merges `openGraph` and `twitter` shallowly, so every page gets the full
// set here rather than relying on the layout's defaults.
export const pageMetadata = ({
  path,
  title,
  description = profile.introduction,
  canonical = path,
  image,
}: PageMetadataInput): Metadata => {
  const fullTitle = title ? `${title} · ${profile.name}` : SITE_TITLE;
  const shareImage = image ? { ...SHARE_IMAGE, ...image } : SHARE_IMAGE;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
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
