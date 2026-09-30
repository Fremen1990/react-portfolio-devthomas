import React, { type ReactNode } from "react";

type SectionBandProps = { id: string; title: string; children: ReactNode };

export const SectionBand = ({ id, title, children }: SectionBandProps) => {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="page-section">
      <div className="page-wrap">
        <h2 id={headingId} className="section-heading" tabIndex={-1}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};
