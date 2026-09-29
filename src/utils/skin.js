export const SKIN_KEY = "portfolio-skin";

// "default" has no class and no extra font. Every other skin maps to an
// html class and the Google Fonts stylesheet it needs.
export const SKINS = {
  terminal: {
    className: "skin-terminal",
    fontHref:
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap",
  },
};

export const readStoredSkin = () => {
  try {
    const value = localStorage.getItem(SKIN_KEY);
    return SKINS[value] ? value : null;
  } catch (error) {
    return null;
  }
};

export const currentSkin = () => {
  const root = document.documentElement;
  const match = Object.keys(SKINS).find((name) =>
    root.classList.contains(SKINS[name].className)
  );
  return match || "default";
};

// Load a skin's font only when that skin is first used.
export const loadSkinFont = (skin) => {
  const href = SKINS[skin]?.fontHref;
  if (!href || document.querySelector(`link[data-skin-font="${skin}"]`)) {
    return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.skinFont = skin;
  document.head.appendChild(link);
};

export const applySkin = (skin) => {
  const root = document.documentElement;
  Object.keys(SKINS).forEach((name) => {
    root.classList.toggle(SKINS[name].className, name === skin);
  });
  loadSkinFont(skin);
  try {
    if (SKINS[skin]) {
      localStorage.setItem(SKIN_KEY, skin);
    } else {
      localStorage.removeItem(SKIN_KEY);
    }
  } catch (error) {
    // Storage can be unavailable in private browsing.
  }
};
