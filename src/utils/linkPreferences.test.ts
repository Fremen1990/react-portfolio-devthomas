import { beforeEach, expect, test } from "vitest";
import { applyTheme, readLinkedTheme, LINK_THEME_KEY } from "./theme";
import { applySkin, LINK_SKIN_KEY } from "./skin";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.className = "";
  window.matchMedia = (() => ({
    matches: false,
  })) as unknown as typeof window.matchMedia;
});

test("a theme from a shared link is read for this visit only", () => {
  expect(readLinkedTheme()).toBeNull();
  sessionStorage.setItem(LINK_THEME_KEY, "dark");
  expect(readLinkedTheme()).toBe("dark");
  sessionStorage.setItem(LINK_THEME_KEY, "purple");
  expect(readLinkedTheme()).toBeNull();
});

test("choosing a theme saves it and replaces the linked theme", () => {
  sessionStorage.setItem(LINK_THEME_KEY, "dark");
  applyTheme("light", { persist: true });
  expect(localStorage.getItem("portfolio-theme")).toBe("light");
  expect(sessionStorage.getItem(LINK_THEME_KEY)).toBeNull();
});

test("choosing a skin saves it and replaces the linked skin", () => {
  sessionStorage.setItem(LINK_SKIN_KEY, "terminal");
  applySkin("default");
  expect(localStorage.getItem("portfolio-skin")).toBeNull();
  expect(sessionStorage.getItem(LINK_SKIN_KEY)).toBeNull();
  expect(document.documentElement).not.toHaveClass("skin-terminal");
});
