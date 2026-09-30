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
};

// Next merges `openGraph` and `twitter` shallowly, so every page gets the full
// set here rather than relying on the layout's defaults.
export const pageMetadata = ({
  path,
  title,
  description = profile.introduction,
}: PageMetadataInput): Metadata => {
  const fullTitle = title ? `${title} · ${profile.name}` : SITE_TITLE;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
};
