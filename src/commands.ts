import { profile } from "./content/publicProfile";
import { sections } from "./content/navigation";
import type { Theme } from "./utils/theme";
import type { Skin } from "./utils/skin";

// What a command can do. The palette supplies these, so commands stay plain
// data and can be tested without a browser.
export type CommandContext = {
  goToSection: (id: string) => void;
  openExternal: (url: string) => void;
  copyEmail: () => void;
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
  group: "Section" | "Link" | "Setting" | "Action";
  /** Hide the command when it would change nothing, e.g. the current theme. */
  available?: (state: CommandState) => boolean;
  run: (context: CommandContext) => void;
};

export const commands: Command[] = [
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
