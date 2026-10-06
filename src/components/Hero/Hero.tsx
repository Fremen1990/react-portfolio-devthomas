import React from "react";
import Image from "next/image";
import { getProfile } from "@/i18n/profile";
import type { Locale } from "@/i18n/locales";
import { ActionLink } from "../ActionLink/ActionLink";
import { ArchitecturePanel } from "../ArchitecturePanel/ArchitecturePanel";

/** Splits the headline around its accent word (the last occurrence). */
export const splitHeadline = (headline: string, accent: string) => {
  const at = headline.lastIndexOf(accent);
  if (!accent || at === -1) {
    return { before: headline, accent: "", after: "" };
  }
  return {
    before: headline.slice(0, at),
    accent,
    after: headline.slice(at + accent.length),
  };
};

// "See the work" has no click handler here: this renders on the server, and
// NavBar routes in-page section links through scrollToSection.
export const Hero = ({ locale = "en" }: { locale?: Locale }) => {
  const profile = getProfile(locale);
  const { hero } = profile;
  const headline = splitHeadline(hero.headline, hero.headlineAccent);

  return (
    <div className="hero band" id="home">
      <div className="page-wrap hero-grid">
        <div className="hero-main">
          <div className="hero-identity">
            <Image
              className="hero-portrait"
              src="/portrait.webp"
              width={720}
              height={480}
              alt={
                locale === "pl"
                  ? "Portret Tomasza Stanisza"
                  : "Portrait of Tomasz Stanisz"
              }
              preload
            />
            <div className="hero-heading">
              <p className="hero-name">{profile.name}</p>
              <p className="hero-role">
                <span className="hero-title">{profile.headline}</span>
                <span className="hero-separator"> · </span>
                <span className="hero-location">{hero.location}</span>
              </p>
            </div>
          </div>
          <div className="hero-about">
            <h1 id="home-heading" className="hero-headline" tabIndex={-1}>
              {headline.before}
              {headline.accent && (
                <span className="hero-accent">{headline.accent}</span>
              )}
              {headline.after}
            </h1>
            <p className="hero-intro">{hero.subline}</p>
          </div>
          <div className="action-row">
            <ActionLink href="#work" variant="bright">
              {hero.primaryAction}
            </ActionLink>
            <ActionLink href={profile.links.email} variant="quiet">
              {hero.secondaryAction}
            </ActionLink>
          </div>
        </div>
        <ArchitecturePanel {...profile.architecture} />
      </div>
    </div>
  );
};
