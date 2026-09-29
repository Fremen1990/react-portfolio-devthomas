import React from "react";

export const SectionBand = ({ id, title, children }) => {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="page-section">
      <div className="page-wrap">
        <h2 id={headingId} className="section-heading">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};
