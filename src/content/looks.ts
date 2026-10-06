import type { Skin } from "../utils/skin";
import type { Theme } from "../utils/theme";

// The four looks of the home page, each with its own address, so a shared
// link can carry its own preview image. /look/<slug>/ is a full copy of the
// home page that opens in that look for the visit (the layout's inline script
// reads the path) and names / as its canonical page.

export type Look = {
  slug: string;
  skin: Skin;
  theme: Theme;
  /** For the image's alt text. */
  label: string;
};

export const looks: Look[] = [
  {
    slug: "standard-light",
    skin: "default",
    theme: "light",
    label: "standard style, light",
  },
  {
    slug: "standard-dark",
    skin: "default",
    theme: "dark",
    label: "standard style, dark",
  },
  {
    slug: "terminal-light",
    skin: "terminal",
    theme: "light",
    label: "Terminal style, light",
  },
  {
    slug: "terminal-dark",
    skin: "terminal",
    theme: "dark",
    label: "Terminal style, dark",
  },
];

export const lookSlug = (skin: Skin, theme: Theme) =>
  `${skin === "terminal" ? "terminal" : "standard"}-${theme}`;

export const lookPath = (
  skin: Skin,
  theme: Theme,
  locale: "en" | "pl" = "en"
) => `${locale === "pl" ? "/pl" : ""}/look/${lookSlug(skin, theme)}/`;

export const findLook = (slug: string) =>
  looks.find((look) => look.slug === slug);

const LOOK_PATH = /^\/(?:pl\/)?look\/[a-z]+-[a-z]+\/?$/;

/** The home page and its /look/ copies share the same sections. */
export const isHomePath = (pathname: string) =>
  pathname === "/" ||
  pathname === "/pl/" ||
  pathname === "/pl" ||
  LOOK_PATH.test(pathname);
