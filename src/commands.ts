import type { Locale } from "@/i18n/locales";
import { localizedPath, localeForPath } from "@/i18n/routes";
import { getSections } from "@/content/navigation";
import { getCaseStudies } from "@/content/work/studies";
import { visiblePosts } from "./content/blog/.generated/posts";
import { blogArticlePath } from "./content/blog/model";
import { profile } from "./content/publicProfile";
import { SITE_URL } from "./lib/metadata";
import { sections } from "./content/navigation";
import { caseStudyPath, publishedCaseStudies } from "./content/work/studies";
import { isHomePath, lookPath } from "./content/looks";
import { carBrainLinks, type CarBrainLinks } from "./content/carBrainLinks";
import type { Theme } from "./utils/theme";
import type { Skin } from "./utils/skin";

// What a command can do. The palette supplies these, so commands stay plain
// data and can be tested without a browser.
export type CommandContext = {
  goToSection: (id: string) => void;
  goToPage: (path: string) => void;
  openExternal: (url: string) => void;
  copyEmail: () => void;
  copyShareLink: () => void;
  setTheme: (theme: Theme) => void;
  setSkin: (skin: Skin) => void;
};

export type CommandState = { theme: Theme; skin: Skin };

export type Command = {
  id: string;
  /** Shown in the standard skin. */
  title: string;
  /** The shell-style name shown, and typed, in the Terminal skin. */
  alias: string;
  keywords: string[];
  /** What kind of thing the command is, shown beside its title. */
  group: "Section" | "Page" | "Link" | "Setting" | "Action";
  /** Hide the command when it would change nothing, e.g. the current theme. */
  available?: (state: CommandState) => boolean;
  run: (context: CommandContext) => void;
};

/**
 * Car Brain's links, offered only once its publication gate is open. The
 * palette imports just the gate and links, not the rest of the app's content.
 */
export const carBrainCommands = (links: CarBrainLinks | null): Command[] =>
  links
    ? [
        {
          id: "car-brain-app-store",
          title: "Open Car Brain on the App Store",
          alias: "open car-brain --app-store",
          keywords: ["car brain", "app", "ios", "iphone", "download"],
          group: "Link",
          run: (context) => context.openExternal(links.appStoreUrl),
        },
        {
          id: "car-brain-site",
          title: "Open car-brain.com",
          alias: "open car-brain.com",
          keywords: ["car brain", "app", "website", "landing page"],
          group: "Link",
          run: (context) => context.openExternal(links.siteUrl),
        },
      ]
    : [];

export const commands: Command[] = [
  {
    id: "blog",
    title: "Read the blog",
    alias: "ls blog/",
    keywords: ["writing", "articles", "blog"],
    group: "Page",
    run: (context) => context.goToPage("/blog/"),
  },
  ...visiblePosts.flatMap((post) =>
    (["en", "pl"] as const).map((locale): Command => ({
      id: `blog-${locale}-${post.slug}`,
      title: `${post.editions[locale].title} (${locale.toUpperCase()})`,
      alias: `cat blog/${locale}/${post.slug}.mdx`,
      keywords: ["article", "blog", ...post.editions[locale].topics],
      group: "Page",
      run: (context) => context.goToPage(blogArticlePath(post.slug, locale)),
    }))
  ),
  {
    id: "top",
    title: "Go to top",
    alias: "whoami",
    keywords: ["home", "introduction", "about me"],
    group: "Section",
    run: (context) => context.goToSection("home"),
  },
  ...sections.map((section): Command => ({
    id: `section-${section.id}`,
    title: `Go to ${section.title}`,
    alias: `cd ${section.label.toLowerCase()}`,
    keywords: [section.label, section.id],
    group: "Section",
    run: (context) => context.goToSection(section.id),
  })),
  ...publishedCaseStudies.map((study): Command => ({
    id: `case-study-${study.slug}`,
    title: `Case study: ${study.title}`,
    alias: `cat work/${study.slug}.md`,
    keywords: ["case study", study.company, study.stack],
    group: "Page",
    run: (context) => context.goToPage(caseStudyPath(study.slug)),
  })),
  {
    id: "colophon",
    title: "How this site is built",
    alias: "cat README.md",
    keywords: ["colophon", "stack", "source", "tests", "architecture"],
    group: "Page",
    run: (context) => context.goToPage("/colophon/"),
  },
  ...carBrainCommands(carBrainLinks),
  {
    id: "cv",
    title: "Open CV",
    alias: "cat cv",
    keywords: ["resume", "curriculum vitae", "experience"],
    group: "Link",
    run: (context) => context.openExternal(profile.links.cv),
  },
  {
    id: "linkedin",
    title: "Open LinkedIn",
    alias: "open linkedin",
    keywords: ["profile", "connect", "message"],
    group: "Link",
    run: (context) => context.openExternal(profile.links.linkedin),
  },
  {
    id: "github",
    title: "Open GitHub",
    alias: "open github",
    keywords: ["code", "repositories", "projects"],
    group: "Link",
    run: (context) => context.openExternal(profile.links.github),
  },
  {
    id: "source",
    title: "View this site's source",
    alias: "git remote -v",
    keywords: ["repository", "open source", "code", "how it's built"],
    group: "Link",
    run: (context) => context.openExternal(profile.links.source),
  },
  {
    id: "email",
    title: "Copy email address",
    alias: "copy email",
    keywords: ["contact", "mail", "hire", profile.links.emailLabel],
    group: "Action",
    run: (context) => context.copyEmail(),
  },
  {
    id: "share",
    title: "Copy link to this look",
    alias: "share",
    keywords: ["link", "url", "send", "skin", "theme"],
    group: "Action",
    run: (context) => context.copyShareLink(),
  },
  {
    id: "theme-dark",
    title: "Use dark theme",
    alias: "theme dark",
    keywords: ["appearance", "night", "colour"],
    group: "Setting",
    available: ({ theme }) => theme !== "dark",
    run: (context) => context.setTheme("dark"),
  },
  {
    id: "theme-light",
    title: "Use light theme",
    alias: "theme light",
    keywords: ["appearance", "day", "colour"],
    group: "Setting",
    available: ({ theme }) => theme !== "light",
    run: (context) => context.setTheme("light"),
  },
  {
    id: "skin-terminal",
    title: "Use terminal style",
    alias: "skin terminal",
    keywords: ["console", "monospace", "look"],
    group: "Setting",
    available: ({ skin }) => skin !== "terminal",
    run: (context) => context.setSkin("terminal"),
  },
  {
    id: "skin-standard",
    title: "Use standard style",
    alias: "skin standard",
    keywords: ["default", "look"],
    group: "Setting",
    available: ({ skin }) => skin !== "default",
    run: (context) => context.setSkin("default"),
  },
];

/**
 * A link that opens `path` in exactly this skin and theme, for that visit.
 * The home page has one address per look (/look/<slug>/), each with its own
 * preview image; other pages use ?skin= and ?theme=. The layout's inline
 * script reads both.
 */
export const buildShareUrl = (path: string, { theme, skin }: CommandState) => {
  if (isHomePath(path)) {
    return `${SITE_URL}${lookPath(skin, theme, localeForPath(path))}`;
  }
  const params = new URLSearchParams({
    skin: skin === "terminal" ? "terminal" : "standard",
    theme,
  });
  return `${SITE_URL}${path}?${params}`;
};

/** Inputs that the palette handles itself rather than as commands. */
export const SHOW_ALL = "help";
export const CLOSE_INPUTS = ["exit", "clear"];

// Lower is better; 3 means no match.
const score = (command: Command, query: string) => {
  const title = command.title.toLowerCase();
  const alias = command.alias.toLowerCase();
  const keywords = command.keywords.map((keyword) => keyword.toLowerCase());
  if (alias === query) {
    return -1;
  }
  if (title.startsWith(query) || alias.startsWith(query)) {
    return 0;
  }
  const words = [title, alias, ...keywords].join(" ").split(/[\s'-]+/);
  if (words.some((word) => word.startsWith(query))) {
    return 1;
  }
  if ([title, alias, ...keywords].some((text) => text.includes(query))) {
    return 2;
  }
  return 3;
};

export const filterCommands = (
  list: Command[],
  query: string,
  state: CommandState
) => {
  const available = list.filter(
    (command) => !command.available || command.available(state)
  );
  const normalized = query.trim().toLowerCase();
  if (!normalized || normalized === SHOW_ALL) {
    return available;
  }
  return available
    .map((command, index) => ({
      command,
      index,
      score: score(command, normalized),
    }))
    .filter((entry) => entry.score < 3)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.command);
};

const polishCommandTitles: Record<string, string> = {
  blog: "Czytaj blog",
  top: "Przejdź na górę",
  colophon: "Jak powstała ta strona",
  cv: "Otwórz CV (EN)",
  linkedin: "Otwórz LinkedIn",
  github: "Otwórz GitHub",
  source: "Zobacz kod tej strony",
  email: "Kopiuj adres e-mail",
  share: "Kopiuj link z tym wyglądem",
  "theme-dark": "Włącz ciemny motyw",
  "theme-light": "Włącz jasny motyw",
  "skin-terminal": "Włącz styl Terminal",
  "skin-standard": "Włącz styl standardowy",
  "car-brain-app-store": "Otwórz Car Brain w App Store",
  "car-brain-site": "Otwórz car-brain.com",
};
export function createCommands(locale: Locale = "en"): Command[] {
  return commands.map((command) => {
    const section = getSections(locale).find(
      (s) => command.id === `section-${s.id}`
    );
    const study = getCaseStudies(locale).find(
      (s) => command.id === `case-study-${s.slug}`
    );
    const title =
      locale === "en"
        ? command.title
        : section
          ? `Przejdź: ${section.title}`
          : study
            ? `Studium przypadku: ${study.title}`
            : (polishCommandTitles[command.id] ??
              (command.id.startsWith("blog-") ? command.title : undefined));
    if (!title) throw new Error(`Missing command translation: ${command.id}`);
    const polishSection = getSections("pl").find(
      (s) => command.id === `section-${s.id}`
    );
    const polishStudy = getCaseStudies("pl").find(
      (s) => command.id === `case-study-${s.slug}`
    );
    return {
      ...command,
      title,
      keywords: [
        ...command.keywords,
        command.title,
        polishCommandTitles[command.id] ?? "",
        polishSection?.title ?? "",
        polishSection?.label ?? "",
        polishStudy?.title ?? "",
        "polecenie",
      ],
      run(context) {
        command.run({
          ...context,
          goToPage(path) {
            context.goToPage(
              command.id.startsWith("blog-")
                ? path
                : localizedPath(path, locale)
            );
          },
        });
      },
    };
  });
}
