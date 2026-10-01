import React from "react";
import { profile } from "../../content/publicProfile";

// A short timeline; the CV holds the full history.
export const Background = () => (
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

export const CvLink = () => (
  <a
    className="section-aside-link"
    href={profile.links.cv}
    target="_blank"
    rel="noopener noreferrer"
  >
    {profile.cvLinkLabel} <span aria-hidden="true">→</span>
  </a>
);
