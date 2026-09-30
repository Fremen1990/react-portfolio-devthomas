import { useSyncExternalStore } from "react";
import { PREFERENCES_EVENT } from "./preferenceEvents";
import { currentTheme, type Theme } from "./theme";
import { currentSkin, type Skin } from "./skin";

const subscribe = (callback: () => void) => {
  document.addEventListener(PREFERENCES_EVENT, callback);
  return () => document.removeEventListener(PREFERENCES_EVENT, callback);
};

// A string keeps the snapshot stable between reads.
const getSnapshot = () => `${currentTheme()}|${currentSkin()}`;

// The server can't know a visitor's choice. The inline script in the layout
// applies it before paint, and React switches to the real value right after
// hydration without a mismatch warning.
const getServerSnapshot = () => "light|default";

export const usePreferences = (): { theme: Theme; skin: Skin } => {
  const [theme, skin] = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  ).split("|") as [Theme, Skin];
  return { theme, skin };
};

export const useMediaQuery = (query: string, serverValue: boolean) =>
  useSyncExternalStore(
    (callback) => {
      let media;
      try {
        media = window.matchMedia(query);
      } catch {
        return () => {};
      }
      if (!media || typeof media.addEventListener !== "function") {
        return () => {};
      }
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => {
      try {
        return window.matchMedia(query).matches;
      } catch {
        return serverValue;
      }
    },
    () => serverValue
  );
