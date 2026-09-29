import React from "react";
import { profile } from "../content/publicProfile";
import Profile from "../assets/img/profile/portrait.jpg";
import { ActionLink } from "./ActionLink/ActionLink";
import { scrollToSection } from "../utils/scrollToSection";

const MyTitleMessage = () => {
  return (
    <div className="hero" id="home">
      <div className="page-wrap hero-grid">
        <div className="hero-heading">
          <h1 id="home-heading" className="hero-name" tabIndex={-1}>
            {profile.name}
          </h1>
          <p className="hero-role">{profile.headline}</p>
        </div>
        <img
          className="hero-portrait"
          src={Profile}
          width="1024"
          height="682"
          alt="Portrait of Tomasz Stanisz"
        />
        <div className="hero-copy">
          <p className="hero-intro">{profile.introduction}</p>
          <p className="hero-availability">{profile.availability}</p>
          <div className="action-row">
            <ActionLink
              href="#work"
              onClick={(event) => scrollToSection(event, "#work")}
            >
              Explore selected work
            </ActionLink>
            <ActionLink href={profile.links.cv} external variant="quiet">
              View CV
            </ActionLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTitleMessage;
