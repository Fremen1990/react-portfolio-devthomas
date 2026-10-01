import React from "react";
import Link from "next/link";
import { profile } from "../../content/publicProfile";

// How I work, each principle with a link to where it shows.
export const Approach = () => (
  <ul className="approach-grid">
    {profile.approach.map((item) => (
      <li key={item.label} className="approach-card">
        <p className="eyebrow approach-label">{item.label}</p>
        <p className="approach-text">{item.text}</p>
        {item.proof && (
          <Link className="approach-proof" href={item.proof.href}>
            {item.proof.label} <span aria-hidden="true">→</span>
          </Link>
        )}
        {item.note && <p className="approach-note">{item.note}</p>}
      </li>
    ))}
  </ul>
);
