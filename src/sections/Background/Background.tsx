import React from "react";
import { getProfile } from "@/i18n/profile";
import type { Locale } from "@/i18n/locales";

// A short timeline; the CV holds the full history.
export const Background = ({ locale = "en" }: { locale?: Locale }) => {
  const profile = getProfile(locale);
  return (
    <ol id="experience" className="timeline">
      {profile.timeline.map((entry) => (
        <li
          key={entry.name}
          className={
            entry.current ? "timeline-entry is-current" : "timeline-entry"
          }
        >
          <span className="timeline-dot" aria-hidden="true" />
          <span className="timeline-period">{entry.period}</span>
          <h3 className="timeline-name">{entry.name}</h3>
          <p className="timeline-detail">{entry.detail}</p>
        </li>
      ))}
    </ol>
  );
};

export const CvLink = ({ locale = "en" }: { locale?: Locale }) => {
  const profile = getProfile(locale);
  return (
    <a
      className="section-aside-link"
      href={profile.links.cv}
      target="_blank"
      rel="noopener noreferrer"
    >
      {profile.cvLinkLabel} <span aria-hidden="true">→</span>
    </a>
  );
};
