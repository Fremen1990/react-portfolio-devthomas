import { describe, expect, test, vi } from "vitest";
import {
  buildShareUrl,
  carBrainCommands,
  commands,
  filterCommands,
  type CommandContext,
  type CommandState,
} from "./commands";

import { carBrain } from "./content/carBrain";
import { sections } from "./content/navigation";

const light: CommandState = { theme: "light", skin: "default" };
const ids = (query: string, state = light) =>
  filterCommands(commands, query, state).map((command) => command.id);

describe("filterCommands", () => {
  test("an empty query or help lists every available command", () => {
    expect(ids("")).toEqual(ids("help"));
    expect(ids("")).toContain("section-work");
    expect(ids("")).toContain("email");
  });

  test("hides the theme and skin that are already active", () => {
    expect(ids("")).not.toContain("theme-light");
    expect(ids("")).toContain("theme-dark");
    expect(ids("")).not.toContain("skin-standard");

    const terminalDark: CommandState = { theme: "dark", skin: "terminal" };
    expect(ids("", terminalDark)).toContain("theme-light");
    expect(ids("", terminalDark)).toContain("skin-standard");
    expect(ids("", terminalDark)).not.toContain("skin-terminal");
  });

  test("matches titles, words inside titles, and keywords", () => {
    expect(ids("open cv")[0]).toBe("cv");
    expect(ids("cv")[0]).toBe("cv");
    expect(ids("resume")).toEqual(["cv"]);
    expect(ids("contact")[0]).toBe("section-contact");
    expect(ids("contact")).toContain("email");
  });

  test("an exact terminal command wins", () => {
    expect(ids("cat cv")[0]).toBe("cv");
    expect(ids("cd background")[0]).toBe("section-about");
    expect(ids("theme dark")[0]).toBe("theme-dark");
    expect(ids("whoami")[0]).toBe("top");
  });

  test("section commands follow the page order, including Now", () => {
    const sectionIds = commands
      .filter((command) => command.group === "Section")
      .map((command) => command.id);
    expect(sectionIds).toEqual([
      "top",
      ...sections.map((section) => `section-${section.id}`),
    ]);
    expect(ids("cd now")[0]).toBe("section-now");
  });

  test("finds published case studies", () => {
    expect(ids("case study")).toContain("case-study-orange-cms");
    expect(ids("cat work/orange-cms.md")[0]).toBe("case-study-orange-cms");
  });

  test("returns nothing for unknown input", () => {
    expect(ids("rm -rf")).toEqual([]);
  });
});

test("commands call the matching action", () => {
  const context: CommandContext = {
    goToSection: vi.fn(),
    goToPage: vi.fn(),
    openExternal: vi.fn(),
    copyEmail: vi.fn(),
    copyShareLink: vi.fn(),
    setTheme: vi.fn(),
    setSkin: vi.fn(),
  };
  const run = (id: string) =>
    commands.find((command) => command.id === id)?.run(context);

  run("section-approach");
  expect(context.goToSection).toHaveBeenCalledWith("approach");
  run("case-study-orange-cms");
  expect(context.goToPage).toHaveBeenCalledWith("/work/orange-cms/");
  run("colophon");
  expect(context.goToPage).toHaveBeenCalledWith("/colophon/");
  run("cv");
  expect(context.openExternal).toHaveBeenCalledWith("https://cv.devthomas.pl/");
  run("email");
  expect(context.copyEmail).toHaveBeenCalled();
  run("share");
  expect(context.copyShareLink).toHaveBeenCalled();
  run("theme-dark");
  expect(context.setTheme).toHaveBeenCalledWith("dark");
  run("skin-terminal");
  expect(context.setSkin).toHaveBeenCalledWith("terminal");
});

describe("Car Brain commands", () => {
  test("are left out while the app is unpublished", () => {
    expect(carBrainCommands({ ...carBrain, published: false })).toEqual([]);
    if (!carBrain.published) {
      expect(
        commands.some((command) => command.id.startsWith("car-brain"))
      ).toBe(false);
    }
  });

  test("open the store and the site once it is published", () => {
    const openExternal = vi.fn();
    const context = { openExternal } as unknown as CommandContext;
    const published = carBrainCommands({ ...carBrain, published: true });
    expect(published.map((command) => command.id)).toEqual([
      "car-brain-app-store",
      "car-brain-site",
    ]);
    published.forEach((command) => command.run(context));
    expect(openExternal).toHaveBeenNthCalledWith(1, carBrain.appStoreUrl);
    expect(openExternal).toHaveBeenNthCalledWith(2, carBrain.siteUrl);
  });
});

describe("buildShareUrl", () => {
  test("the home page links to the look's own page, which has its preview card", () => {
    expect(buildShareUrl("/", { theme: "dark", skin: "terminal" })).toBe(
      "https://devthomas.pl/look/terminal-dark/"
    );
    expect(buildShareUrl("/", { theme: "light", skin: "default" })).toBe(
      "https://devthomas.pl/look/standard-light/"
    );
    expect(
      buildShareUrl("/look/terminal-dark/", { theme: "light", skin: "default" })
    ).toBe("https://devthomas.pl/look/standard-light/");
  });

  test("other pages name the look with ?skin= and ?theme=", () => {
    expect(
      buildShareUrl("/colophon/", { theme: "light", skin: "terminal" })
    ).toBe("https://devthomas.pl/colophon/?skin=terminal&theme=light");
  });
});
