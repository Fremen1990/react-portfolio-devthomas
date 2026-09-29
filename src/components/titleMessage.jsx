import React from "react";
import { profile } from "../content/publicProfile";
import Profile from "../assets/img/profile/portrait.jpg";
import { ActionLink } from "./ActionLink/ActionLink";

const MyTitleMessage = () => {
  return (
    <div className="hero" id="home">
      <div className="page-wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">{profile.headline}</p>
          <p className="hero-intro">{profile.introduction}</p>
          <p className="hero-availability">{profile.availability}</p>
          <div className="action-row">
            <ActionLink href="#work">Explore selected work</ActionLink>
            <ActionLink href={profile.links.cv} external variant="quiet">
              View CV
            </ActionLink>
          </div>
        </div>
        <img
          className="hero-portrait"
          src={Profile}
          width="1024"
          height="682"
          alt="Portrait of Tomasz Stanisz"
        />
      </div>
    </div>
  );
};

export default MyTitleMessage;
