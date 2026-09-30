import { notifyPreferencesChanged } from "./preferenceEvents";

export const SKIN_KEY = "portfolio-skin";

// "default" has no class. Every other skin maps to an html class. Fonts come
// from next/font in the layout; a skin's font downloads only once it is used.
export const SKINS = {
  terminal: { className: "skin-terminal" },
};

export const currentSkin = () => {
  const root = document.documentElement;
  const match = Object.keys(SKINS).find((name) =>
    root.classList.contains(SKINS[name].className)
  );
  return match || "default";
};

export const applySkin = (skin) => {
  const root = document.documentElement;
  Object.keys(SKINS).forEach((name) => {
    root.classList.toggle(SKINS[name].className, name === skin);
  });
  try {
    if (SKINS[skin]) {
      localStorage.setItem(SKIN_KEY, skin);
    } else {
      localStorage.removeItem(SKIN_KEY);
    }
  } catch (error) {
    // Storage can be unavailable in private browsing.
  }
  notifyPreferencesChanged();
};
