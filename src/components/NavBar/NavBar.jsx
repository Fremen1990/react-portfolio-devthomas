import React, { useEffect, useState } from "react";
import { profile } from "../../content/publicProfile";
import { scrollToSection } from "../../utils/scrollToSection";
import { applyTheme, currentTheme, readStoredTheme } from "../../utils/theme";
import "./navbar.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "Background" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = links.map((link) => link.href.slice(1));

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

const ThemeIcon = ({ name }) => {
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
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dark, setDark] = useState(() => currentTheme() === "dark");

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let media;
    try {
      media = window.matchMedia("(prefers-color-scheme: dark)");
    } catch (error) {
      return undefined;
    }

    const onChange = (event) => {
      if (readStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? "dark" : "light");
      setDark(event.matches);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    applyTheme(next, { persist: true });
    setDark(next === "dark");
  };

  return (
    <header className="site-header">
      <div className="page-wrap site-header-inner">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            scrollToSection(event, "#home");
            close();
          }}
        >
          <span className="brand-mark" aria-hidden="true">
            TS
          </span>
          <span>{profile.name}</span>
        </a>
        <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"}>
          <div className="site-nav-links">
            {links.map((link) => {
              const current = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={current ? "is-current" : undefined}
                  aria-current={current ? "true" : undefined}
                  onClick={(event) => {
                    scrollToSection(event, link.href);
                    close();
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
              onClick={close}
            >
              View CV
            </a>
          </div>
          <a
            className="nav-cv"
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            View CV
          </a>
        </nav>
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
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
      </div>
    </header>
  );
};

export default NavBar;
