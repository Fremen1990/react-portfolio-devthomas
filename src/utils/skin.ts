import { notifyPreferencesChanged } from "./preferenceEvents";

export const SKIN_KEY = "portfolio-skin";
// A skin opened from a shared link (?skin=), kept for this tab only.
export const LINK_SKIN_KEY = "portfolio-link-skin";

// "default" has no class. Every other skin maps to an html class. Fonts come
// from next/font in the layout; a skin's font downloads only once it is used.
export type Skin = "default" | "terminal";

export const SKINS: Record<Exclude<Skin, "default">, { className: string }> = {
  terminal: { className: "skin-terminal" },
};

const namedSkins = Object.keys(SKINS) as Array<keyof typeof SKINS>;

export const currentSkin = (): Skin => {
  const root = document.documentElement;
  const match = namedSkins.find((name) =>
    root.classList.contains(SKINS[name].className)
  );
  return match || "default";
};

export const applySkin = (skin: Skin) => {
  const root = document.documentElement;
  namedSkins.forEach((name) => {
    root.classList.toggle(SKINS[name].className, name === skin);
  });
  try {
    if (skin !== "default") {
      localStorage.setItem(SKIN_KEY, skin);
    } else {
      localStorage.removeItem(SKIN_KEY);
    }
    // An explicit choice replaces a look opened from a shared link.
    sessionStorage.removeItem(LINK_SKIN_KEY);
  } catch {
    // Storage can be unavailable in private browsing.
  }
  notifyPreferencesChanged();
};
