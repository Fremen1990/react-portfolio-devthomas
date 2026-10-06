import React from "react";
import Link from "next/link";
import { profile } from "../../content/publicProfile";

const FooterPanel = ({ locale = "en" }: { locale?: "en" | "pl" }) => {
  return (
    <footer className="site-footer">
      <div className="page-wrap site-footer-inner">
        <p>© Tomasz Stanisz {new Date().getFullYear()}</p>
        <p className="footer-note">
          {locale === "pl"
            ? "Dwa style, jeden kod · "
            : "Two skins, one codebase · "}
          <Link href={locale === "pl" ? "/pl/colophon/" : "/colophon/"}>
            {locale === "pl"
              ? "Jak powstała ta strona"
              : "How this site is built"}
          </Link>
        </p>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default FooterPanel;
