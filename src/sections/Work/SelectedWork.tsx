import React from "react";
import Link from "next/link";
import { profile } from "../../content/publicProfile";
import { caseStudyFor, caseStudyPath } from "../../content/work/studies";

export const SelectedWork = () => {
  return (
    <div>
      {profile.contributions.map((item) => {
        const headingId = `${item.id}-heading`;
        const hasScope = Array.isArray(item.scope) && item.scope.length > 0;
        const caseStudy = caseStudyFor(item.id);

        return (
          <article
            key={item.id}
            id={item.id}
            aria-labelledby={headingId}
            className={
              item.featured
                ? "contribution contribution--featured"
                : "contribution"
            }
          >
            <div>
              <p className="contribution-number">{item.number}</p>
              <h3 id={headingId} className="contribution-heading">
                {item.heading}
              </h3>
              <p className="meta">{item.employer}</p>
              <p className="meta">{item.meta}</p>
              {item.status && (
                <p className="contribution-status">{item.status}</p>
              )}
            </div>
            <div>
              <p className="contribution-summary">{item.summary}</p>
              {item.bullets.length > 0 && (
                <ul className="contribution-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              <p className="contribution-tech">
                <strong>Technologies: </strong>
                {item.technologies}
              </p>
              {hasScope && (
                <details className="scope">
                  <summary>
                    <span className="visually-hidden">{item.heading}: </span>
                    {item.scopeTitle}
                  </summary>
                  <ul className="scope-list">
                    {item.scope.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </details>
              )}
              {caseStudy && (
                <p className="contribution-case-study">
                  <Link href={caseStudyPath(caseStudy.slug)}>
                    Read the case study
                    <span className="visually-hidden">
                      {" "}
                      about {caseStudy.title}
                    </span>{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
