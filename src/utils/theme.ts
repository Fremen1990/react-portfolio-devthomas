import { currentSkin, type Skin } from "./skin";
import { notifyPreferencesChanged } from "./preferenceEvents";

export const THEME_KEY = "portfolio-theme";
// A theme opened from a shared link (?theme=), kept for this tab only.
export const LINK_THEME_KEY = "portfolio-link-theme";

export type Theme = "light" | "dark";

// Browser-chrome colour for each skin and theme. The standard header is a
// dark band in both themes, so its colour is the band's; Terminal matches
// its --canvas.
const THEME_COLORS: Record<Skin, Record<Theme, string>> = {
  default: { light: "#0f1413", dark: "#0f1413" },
  terminal: { light: "#f3f1e7", dark: "#07090a" },
};

export const readStoredTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
};

export const readLinkedTheme = (): Theme | null => {
  try {
    const value = sessionStorage.getItem(LINK_THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
};

export const systemPrefersDark = () => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
};

export const currentTheme = (): Theme => {
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
export const paintThemeColor = (theme: Theme = currentTheme()) => {
  const colors = THEME_COLORS[currentSkin()];
  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", colors[theme]);
};

export const applyTheme = (
  theme: Theme,
  { persist = false }: { persist?: boolean } = {}
) => {
  const root = document.documentElement;

  if (persist) {
    root.classList.toggle("dark-theme", theme === "dark");
    root.classList.toggle("light-theme", theme === "light");
    try {
      localStorage.setItem(THEME_KEY, theme);
      // An explicit choice replaces a look opened from a shared link.
      sessionStorage.removeItem(LINK_THEME_KEY);
    } catch {
      // Storage can be unavailable in private browsing.
    }
  } else {
    root.classList.remove("dark-theme", "light-theme");
  }

  paintThemeColor(currentTheme());
  notifyPreferencesChanged();
};
