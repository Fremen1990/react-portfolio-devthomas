export const THEME_KEY = "portfolio-theme";

const THEME_COLORS = {
  light: "#f7f8fa",
  dark: "#10161b",
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

const paintThemeColor = (theme) => {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
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
};
