import { currentSkin } from "./skin";
import { notifyPreferencesChanged } from "./preferenceEvents";

export const THEME_KEY = "portfolio-theme";

// Browser-chrome colour for each skin and theme; matches each --canvas.
const THEME_COLORS = {
  default: { light: "#f7f8fa", dark: "#10161b" },
  terminal: { light: "#f3f1e7", dark: "#07090a" },
};

export const readStoredTheme = () => {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch (error) {
    return null;
  }
};

export const systemPrefersDark = () => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (error) {
    return false;
  }
};

export const currentTheme = () => {
  const root = document.documentElement;
  if (root.classList.contains("dark-theme")) {
    return "dark";
  }
  if (root.classList.contains("light-theme")) {
    return "light";
  }
  return systemPrefersDark() ? "dark" : "light";
};

// The inline script in src/app/layout.tsx creates this tag before paint.
export const paintThemeColor = (theme = currentTheme()) => {
  const colors = THEME_COLORS[currentSkin()] || THEME_COLORS.default;
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", colors[theme]);
};

export const applyTheme = (theme, { persist = false } = {}) => {
  const root = document.documentElement;

  if (persist) {
    root.classList.toggle("dark-theme", theme === "dark");
    root.classList.toggle("light-theme", theme === "light");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      // Storage can be unavailable in private browsing.
    }
  } else {
    root.classList.remove("dark-theme", "light-theme");
  }

  paintThemeColor(currentTheme());
  notifyPreferencesChanged();
};
