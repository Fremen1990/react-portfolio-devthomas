import React from "react";
import Image from "next/image";
import { profile } from "../../content/publicProfile";
import { ActionLink } from "../ActionLink/ActionLink";

// "Explore selected work" has no click handler here: this renders on the
// server, and NavBar routes in-page section links through scrollToSection.
export const Hero = () => (
  <div className="hero" id="home">
    <div className="page-wrap hero-grid">
      <div className="hero-heading">
        <h1 id="home-heading" className="hero-name" tabIndex={-1}>
          {profile.name}
        </h1>
        <p className="hero-role">{profile.headline}</p>
      </div>
      <Image
        className="hero-portrait"
        src="/portrait.webp"
        width={720}
        height={480}
        alt="Portrait of Tomasz Stanisz"
        preload
      />
      <div className="hero-copy">
        <p className="hero-intro">{profile.introduction}</p>
        <p className="hero-availability">
          <span className="dot" aria-hidden="true" />
          {profile.availability}
        </p>
        <div className="action-row">
          <ActionLink href="#work">Explore selected work</ActionLink>
          <ActionLink href={profile.links.cv} external variant="quiet">
            View CV
          </ActionLink>
        </div>
      </div>
    </div>
  </div>
);
