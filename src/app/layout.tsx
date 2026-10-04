import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
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
import "@/sections/Now/now.css";
import "@/sections/Approach/Approach.css";
import "@/sections/Background/Background.css";
import "@/components/FooterPanel/footer.css";
import "@/components/CommandPalette/palette.css";
import "@/components/Prose/prose.css";
import "@/components/CaseStudy/case-study.css";
import "@/components/Blog/blog.css";
import "@/design/skin-terminal.css";

// The standard skin shares the CV's type system (cv.devthomas.pl): Fraunces
// for display, Geist for text and Geist Mono for labels. Only Latin is
// preloaded; Polish characters (latin-ext) still load on demand through
// unicode-range.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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

// Applies the theme and skin before first paint, so a visitor never sees the
// other look flash, and adds the theme-color meta tag.
//
// Precedence: ?skin= / ?theme= in the URL (or a /look/<skin>-<theme>/ page), then a look opened from such a link
// earlier in this tab (sessionStorage), then the visitor's saved choice
// (localStorage), then the system setting. The URL counts only when the link
// is actually opened: on a reload or Back/Forward the parameters are still in
// the address bar, and applying them again would undo a choice the visitor
// made after arriving. A shared link lasts only for the
// visit and never overwrites saved choices. It still applies when storage is
// blocked. Keys and values match src/utils/theme.ts and src/utils/skin.ts.
//
// theme-color is deliberately not in Next's metadata: this script has to set
// it before paint, and React replaces a server-rendered meta tag whose content
// changed, leaving two. paintThemeColor() in src/utils/theme.ts owns it after
// hydration; the colours here match THEME_COLORS there.
const applySavedPreferences = `(function () {
  var root = document.documentElement;
  var params = null;
  var navigation = "navigate";
  try {
    navigation = performance.getEntriesByType("navigation")[0].type;
  } catch (error) {}
  try {
    if (navigation !== "reload" && navigation !== "back_forward") {
      params = new URLSearchParams(window.location.search);
    }
  } catch (error) {}
  var pick = function (value, allowed) {
    return allowed.indexOf(value) === -1 ? null : value;
  };
  // /look/<skin>-<theme>/ works like ?skin=&theme=, under the same rule.
  var look = null;
  if (params) {
    look = window.location.pathname.match(
      new RegExp("^/look/(terminal|standard)-(dark|light)/?$")
    );
  }
  var linkSkin =
    (params && pick(params.get("skin"), ["terminal", "standard"])) ||
    (look && look[1]);
  var linkTheme =
    (params && pick(params.get("theme"), ["dark", "light"])) ||
    (look && look[2]);
  var read = function (storage, key) {
    try {
      return window[storage].getItem(key);
    } catch (error) {
      return null;
    }
  };
  try {
    if (linkSkin) sessionStorage.setItem("portfolio-link-skin", linkSkin);
    if (linkTheme) sessionStorage.setItem("portfolio-link-theme", linkTheme);
  } catch (error) {}
  var skin =
    linkSkin ||
    pick(read("sessionStorage", "portfolio-link-skin"), ["terminal", "standard"]) ||
    (read("localStorage", "portfolio-skin") === "terminal" ? "terminal" : "standard");
  var theme =
    linkTheme ||
    pick(read("sessionStorage", "portfolio-link-theme"), ["dark", "light"]) ||
    pick(read("localStorage", "portfolio-theme"), ["dark", "light"]);
  var terminal = skin === "terminal";
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
      : { light: "#0f1413", dark: "#0f1413" };
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
      className={[
        fraunces.variable,
        geist.variable,
        geistMono.variable,
        jetBrainsMono.variable,
      ].join(" ")}
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
