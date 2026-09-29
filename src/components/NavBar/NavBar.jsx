import React, { useEffect, useState } from "react";
import { profile } from "../../content/publicProfile";
import "./navbar.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "Background" },
  { href: "#contact", label: "Contact" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

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

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="page-wrap site-header-inner">
        <a className="brand" href="#home" onClick={close}>
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
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
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
