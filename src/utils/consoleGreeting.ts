import { profile } from "../content/publicProfile";

let greeted = false;

// A short hello for developers who open devtools. Logged once per page load.
export const greetDevelopers = (log: typeof console.log = console.log) => {
  if (greeted) {
    return false;
  }
  greeted = true;
  log(
    `%c${profile.name}%c · ${profile.headline}\n\n` +
      `You opened the console, so you probably build things too.\n` +
      `This site is open source: ${profile.links.source}\n` +
      `Press ⌘K (Ctrl K) for the command palette, try the >_ button,\n` +
      `or share a link with ?skin=terminal&theme=dark.`,
    "font: 700 14px/1.6 system-ui, sans-serif; color: #14a3a3",
    "font: 400 13px/1.6 system-ui, sans-serif"
  );
  return true;
};
