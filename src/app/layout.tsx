import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import FooterPanel from "@/components/FooterPanel/FooterPanel";
import { SITE_URL } from "@/lib/metadata";

// Every stylesheet is imported here, in this order, and nowhere else. The
// Terminal skin must load after all component styles: its rules are scoped
// with :where() so they win on order, not specificity. Next puts page-level
// CSS after layout CSS, so a component importing its own sheet would load
// after the skin and override it.
import "@/index.css";
import "@/App.css";
import "@/components/NavBar/navbar.css";
import "@/components/ActionLink/ActionLink.css";
import "@/components/Hero/Hero.css";
import "@/sections/Work/SelectedWork.css";
import "@/sections/Experience/Experience.css";
import "@/sections/Background/Background.css";
import "@/components/FooterPanel/footer.css";
import "@/components/CommandPalette/palette.css";
import "@/components/Prose/prose.css";
import "@/design/skin-terminal.css";

// Only Latin is preloaded; Polish characters (latin-ext) still load on demand
// through unicode-range.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Not preloaded: the browser only downloads it once the Terminal skin uses it.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: { url: "/favicon.webp", type: "image/webp" } },
};

// Applies the saved theme and skin before first paint, so a returning visitor
// never sees the other look flash, and adds the theme-color meta tag.
//
// ?skin=terminal or ?skin=standard in the URL picks the skin and saves it, so
// a shared link opens in that style. It still applies when storage is blocked.
//
// theme-color is deliberately not in Next's metadata: this script has to set
// it before paint, and React replaces a server-rendered meta tag whose content
// changed, leaving two. paintThemeColor() in src/utils/theme.ts owns it after
// hydration; the colours here match THEME_COLORS there.
const applySavedPreferences = `(function () {
  var root = document.documentElement;
  var theme = null;
  var storedSkin = null;
  var linkedSkin = null;
  try {
    linkedSkin = new URLSearchParams(window.location.search).get("skin");
  } catch (error) {}
  try {
    theme = localStorage.getItem("portfolio-theme");
    if (linkedSkin === "terminal") {
      localStorage.setItem("portfolio-skin", "terminal");
    }
    if (linkedSkin === "standard") {
      localStorage.removeItem("portfolio-skin");
    }
    storedSkin = localStorage.getItem("portfolio-skin");
  } catch (error) {}
  var terminal =
    linkedSkin === "terminal" ||
    (linkedSkin !== "standard" && storedSkin === "terminal");
  if (theme === "dark") root.classList.add("dark-theme");
  if (theme === "light") root.classList.add("light-theme");
  if (terminal) root.classList.add("skin-terminal");
  try {
    var dark =
      theme === "dark" ||
      (theme !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    var colors = terminal
      ? { light: "#f3f1e7", dark: "#07090a" }
      : { light: "#f7f8fa", dark: "#10161b" };
    var meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = dark ? colors.dark : colors.light;
    document.head.appendChild(meta);
  } catch (error) {}
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
      // The inline script adds theme and skin classes before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedPreferences }} />
      </head>
      <body>
        <div className="App">
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <NavBar />
          <main id="main">{children}</main>
          <FooterPanel />
        </div>
      </body>
    </html>
  );
}
