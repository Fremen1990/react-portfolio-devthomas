import React, { type ReactNode } from "react";

type SectionBandProps = {
  id: string;
  title: string;
  /** Paper follows the theme; band is the dark brand band; teal is contact. */
  tone?: "paper" | "band" | "teal";
  /** Mono label above the heading. */
  eyebrow?: string;
  /** Shown beside the heading, e.g. a link to the CV. */
  aside?: ReactNode;
  children: ReactNode;
};

export const SectionBand = ({
  id,
  title,
  tone = "paper",
  eyebrow,
  aside,
  children,
}: SectionBandProps) => {
  const headingId = `${id}-heading`;
  const toneClass = {
    paper: "",
    band: " page-section--band band",
    teal: " page-section--teal",
  }[tone];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`page-section${toneClass}`}
    >
      <div className="page-wrap">
        <div className="section-head">
          <div className="section-head-text">
            {eyebrow && <p className="eyebrow section-eyebrow">{eyebrow}</p>}
            <h2 id={headingId} className="section-heading" tabIndex={-1}>
              {title}
            </h2>
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
};
