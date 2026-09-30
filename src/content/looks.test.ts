import { expect, test } from "vitest";
import { findLook, isHomePath, lookPath, looks } from "./looks";

test("every skin and theme pair has a look page", () => {
  expect(looks.map((look) => look.slug).sort()).toEqual([
    "standard-dark",
    "standard-light",
    "terminal-dark",
    "terminal-light",
  ]);
  expect(lookPath("terminal", "dark")).toBe("/look/terminal-dark/");
  expect(lookPath("default", "light")).toBe("/look/standard-light/");
  expect(findLook("terminal-light")?.skin).toBe("terminal");
  expect(findLook("neon-dark")).toBeUndefined();
});

test("look pages count as the home page", () => {
  expect(isHomePath("/")).toBe(true);
  expect(isHomePath("/look/terminal-dark/")).toBe(true);
  expect(isHomePath("/colophon/")).toBe(false);
  expect(isHomePath("/work/orange-cms/")).toBe(false);
});
