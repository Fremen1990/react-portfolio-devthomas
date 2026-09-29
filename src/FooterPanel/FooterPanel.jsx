import React from "react";
import { profile } from "../content/publicProfile";
import "./footer.css";

const FooterPanel = () => {
  return (
    <footer className="site-footer">
      <div className="page-wrap site-footer-inner">
        <p>© Tomasz Stanisz {new Date().getFullYear()}</p>
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
