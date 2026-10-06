import type { Locale } from "./locales";
import { slugify } from "@/lib/headings";
export const localeForPath = (path: string): Locale =>
  /^\/(?:pl(?:\/|$)|blog\/pl(?:\/|$))/.test(path) ? "pl" : "en";
export const homePath = (locale: Locale) => (locale === "pl" ? "/pl/" : "/");
export type PageIdentity =
  | { kind: "home" }
  | { kind: "colophon" }
  | { kind: "blog" }
  | { kind: "work" | "look" | "article"; slug: string };
export function pageIdentity(path: string): PageIdentity | undefined {
  const base = path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  const plain = base.replace(/^\/pl(?=\/|$)/, "") || "/";
  if (plain === "/") return { kind: "home" };
  if (plain === "/colophon") return { kind: "colophon" };
  if (base === "/blog" || base === "/blog/pl") return { kind: "blog" };
  const article = /^\/blog\/(?:en|pl)\/([^/]+)$/.exec(base);
  if (article) return { kind: "article", slug: article[1] };
  const detail = /^\/(work|look)\/([^/]+)$/.exec(plain);
  if (detail) return { kind: detail[1] as "work" | "look", slug: detail[2] };
}
export function routePath(page: PageIdentity, locale: Locale): string {
  if (page.kind === "blog") return locale === "pl" ? "/blog/pl/" : "/blog/";
  if (page.kind === "article") return `/blog/${locale}/${page.slug}/`;
  const prefix = locale === "pl" ? "/pl" : "";
  if (page.kind === "home") return `${prefix}/`;
  if (page.kind === "colophon") return `${prefix}/colophon/`;
  return `${prefix}/${page.kind}/${page.slug}/`;
}
export function localizedPath(path: string, locale: Locale): string {
  const identity = pageIdentity(path);
  if (!identity) return path;
  const query = path.split("?")[1]?.split("#")[0];
  const hash = path.includes("#") ? `#${path.split("#")[1]}` : "";
  return (
    routePath(identity, locale) +
    (query ? `?${query}` : "") +
    translatedFragment(path, hash, locale)
  );
}
// Explicit semantic correspondence. No positional pairing: edits/reordering do
// not silently redirect an existing fragment to an unrelated heading.
const common = {
  "The situation": "Sytuacja",
  Constraints: "Ograniczenia",
  "Options I considered": "Rozważane opcje",
  "The decision": "Decyzja",
  "The outcome": "Rezultat",
  "What I'd do differently": "Co zrobiłbym inaczej",
};
export const headingPairs: Record<string, Record<string, string>> = {
  "work/orange-cms": { ...common, "How it works": "Jak to działa" },
  "work/orange-e2e-testing": {
    ...common,
    "How it started": "Początki",
    "Building the practice": "Budowanie praktyki testowania",
    "How it runs": "Uruchamianie testów",
  },
  "work/theeventa-mvp": {
    ...common,
    "How a feature gets built": "Jak powstaje funkcja",
    "Keeping quality high": "Utrzymanie jakości",
    "Design without designers": "Projektowanie bez projektantów",
    Architecture: "Architektura",
    "The outcome so far": "Dotychczasowy rezultat",
  },
  colophon: {
    Stack: "Stack",
    "Two skins, one codebase": "Dwa style, jeden kod",
    Accessibility: "Dostępność",
    "Tests and delivery": "Testy i wdrożenia",
    Performance: "Wydajność",
  },
  "article/building-mobile-and-web-clients-around-one-appwrite-backend": {
    "The system boundary: shared services, separate clients":
      "Granica systemu: wspólne usługi, osobne klienty",
    "The session boundary: a server layer earns its keep":
      "Granica sesji: serwer musi na siebie zapracować",
    "The state boundary: one database, several versions of “now”":
      "Granica stanu: jedna baza, kilka wersji „teraz”",
    "The reuse boundary: duplication with an expiry question":
      "Granica współdzielenia: duplikacja z pytaniem o termin ważności",
    "What would turn this diagram into evidence?":
      "Co zamieni ten schemat w dowód?",
  },
};
const homeFragments = new Set([
  "home",
  "work",
  "now",
  "approach",
  "about",
  "experience",
  "contact",
  "writing",
  "orange-engineering",
  "orange-e2e",
  "theeventa",
  "car-brain",
]);
export function translatedFragment(
  path: string,
  hash: string,
  target: Locale
): string {
  if (!hash) return "";
  if (localeForPath(path) === target) return hash;
  const page = pageIdentity(path);
  if (!page) return "";
  let fragment: string;
  try {
    fragment = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
  if (page.kind === "home" || page.kind === "look")
    return homeFragments.has(fragment.replace(/-heading$/, "")) ? hash : "";
  const key = "slug" in page ? `${page.kind}/${page.slug}` : page.kind;
  for (const [en, pl] of Object.entries(headingPairs[key] ?? {})) {
    if (fragment === slugify(localeForPath(path) === "en" ? en : pl))
      return `#${slugify(target === "en" ? en : pl)}`;
  }
  return "";
}
