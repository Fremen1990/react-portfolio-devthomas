// Fired on document whenever the theme or skin changes, so every control that
// shows them (header buttons, command palette) stays in sync.
export const PREFERENCES_EVENT = "portfolio:preferences";

export const notifyPreferencesChanged = () => {
  document.dispatchEvent(new Event(PREFERENCES_EVENT));
};
