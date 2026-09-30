"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "../../content/publicProfile";
import { sections } from "../../content/navigation";
import { CommandPalette } from "../CommandPalette/CommandPalette";
import { scrollToSection } from "../../utils/scrollToSection";
import {
  applyTheme,
  paintThemeColor,
  readStoredTheme,
} from "../../utils/theme";
import { applySkin } from "../../utils/skin";
import { useMediaQuery, usePreferences } from "../../utils/preferences";
import { greetDevelopers } from "../../utils/consoleGreeting";

const sectionIds = sections.map((section) => section.id);
const DESKTOP_NAV_QUERY = "(min-width: 801px)";

const isApplePlatform = () =>
  /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

// The server can't know the platform; Apple devices switch to ⌘K after
// hydration.
const useShortcutLabel = () =>
  useSyncExternalStore(
    () => () => {},
    () => (isApplePlatform() ? "⌘K" : "Ctrl K"),
    () => "Ctrl K"
  );

const currentSectionId = () => {
  const header = document.querySelector(".site-header");
  const marker = (header?.getBoundingClientRect().height ?? 0) + 48;
  const atPageEnd =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (atPageEnd && document.getElementById("contact")) {
    return "contact";
  }

  let current = "";
  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= marker + 1) {
      current = id;
    }
  });
  return current;
};

const isModifiedClick = (event: ReactMouseEvent) =>
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey ||
  event.button !== 0;

const ThemeIcon = ({ name }: { name: "sun" | "moon" }) => {
  if (name === "sun") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon">
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, skin } = usePreferences();
  const dark = theme === "dark";
  const terminal = skin === "terminal";
  const isDesktop = useMediaQuery(DESKTOP_NAV_QUERY, true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const shortcutLabel = useShortcutLabel();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || isDesktop) {
        return;
      }
      const menu = document.getElementById("site-nav-links");
      if (!menu?.contains(document.activeElement)) {
        return;
      }
      event.preventDefault();
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, isDesktop]);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const onPopState = () => {
      const hash = window.location.hash;
      if (!hash) {
        return;
      }
      scrollToSection(null, hash, { updateHistory: false });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isHome]);

  // Section links outside the header, such as the hero's "Explore selected
  // work", are rendered on the server without handlers. Route them through the
  // same scroll-and-focus behaviour as the header links.
  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const onClick = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest('a[href^="#"]')
          : null;
      if (!link || link.closest(".site-header")) {
        return;
      }
      const hash = link.getAttribute("href") ?? "";
      if (!document.getElementById(`${hash.slice(1)}-heading`)) {
        return;
      }
      scrollToSection(event, hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveSection(currentSectionId());
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [isHome]);

  useEffect(() => {
    let media;
    try {
      media = window.matchMedia("(prefers-color-scheme: dark)");
    } catch {
      return undefined;
    }

    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      greetDevelopers();
    }
  }, []);

  // The server renders the light theme-color. Repaint it for the visitor's
  // theme and skin after hydration, and after each page navigation.
  useEffect(() => {
    paintThemeColor();
  }, [pathname, theme, skin]);

  const close = () => setOpen(false);

  const closeOnPlainClick = (event: ReactMouseEvent) => {
    if (isModifiedClick(event)) {
      return;
    }
    close();
  };

  const toggleTheme = () => {
    applyTheme(dark ? "light" : "dark", { persist: true });
  };

  const toggleSkin = () => {
    applySkin(terminal ? "default" : "terminal");
  };

  return (
    <header className="site-header">
      <div className="page-wrap site-header-inner">
        {isHome ? (
          <a
            className="brand"
            href="#home"
            onClick={(event) => {
              if (scrollToSection(event, "#home")) {
                close();
              }
            }}
          >
            <span className="brand-mark" aria-hidden="true">
              TS
            </span>
            <span className="brand-name">{profile.name}</span>
          </a>
        ) : (
          <Link className="brand" href="/" onClick={closeOnPlainClick}>
            <span className="brand-mark" aria-hidden="true">
              TS
            </span>
            <span className="brand-name">{profile.name}</span>
          </Link>
        )}
        <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"}>
          <div
            id="site-nav-links"
            className="site-nav-links"
            hidden={!isDesktop && !open}
          >
            {sections.map((link) => {
              if (!isHome) {
                return (
                  <Link
                    key={link.id}
                    href={`/#${link.id}`}
                    onClick={closeOnPlainClick}
                  >
                    {link.label}
                  </Link>
                );
              }
              const current = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={current ? "is-current" : undefined}
                  aria-current={current ? "true" : undefined}
                  onClick={(event) => {
                    if (scrollToSection(event, `#${link.id}`)) {
                      close();
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              className="nav-cv-menu"
              href={profile.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeOnPlainClick}
            >
              View CV
            </a>
          </div>
          <a
            className="nav-cv"
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeOnPlainClick}
          >
            View CV
          </a>
        </nav>
        <button
          type="button"
          className="palette-toggle"
          aria-label="Open command palette"
          aria-haspopup="dialog"
          aria-keyshortcuts="Meta+K Control+K"
          onClick={() => setPaletteOpen(true)}
        >
          <kbd>{shortcutLabel}</kbd>
        </button>
        <button
          type="button"
          className="skin-toggle"
          aria-pressed={terminal}
          aria-label={
            terminal ? "Switch to standard style" : "Switch to terminal style"
          }
          title={terminal ? "Standard style" : "Terminal style"}
          onClick={toggleSkin}
        >
          <span aria-hidden="true">{terminal ? "Aa" : ">_"}</span>
        </button>
        <button
          type="button"
          className="theme-toggle"
          aria-pressed={dark}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={toggleTheme}
        >
          <ThemeIcon name={dark ? "sun" : "moon"} />
        </button>
        <button
          type="button"
          className="nav-toggle"
          ref={menuButtonRef}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
      </div>
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        isHome={isHome}
      />
    </header>
  );
};

export default NavBar;
