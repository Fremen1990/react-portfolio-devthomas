import React, { useEffect, useState } from "react";
import { profile } from "../../content/publicProfile";
import { scrollToSection } from "../../utils/scrollToSection";
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

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  const close = () => setOpen(false);

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
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
        <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"}>
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
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            View CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
