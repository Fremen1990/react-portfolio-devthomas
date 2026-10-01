import React, { type CSSProperties } from "react";
import Link from "next/link";
import { profile, type Contribution } from "../../content/publicProfile";
import { caseStudyFor, caseStudyPath } from "../../content/work/studies";
import { RevealOnView } from "../../components/RevealOnView/RevealOnView";

const Bars = ({ bars }: { bars: NonNullable<Contribution["bars"]> }) => (
  <RevealOnView className="work-bars-wrap">
    <ul className="work-bars">
      {bars.map((bar) => (
        <li
          key={bar.label}
          className={`bar-row${bar.phoneHidden ? " bar-row--extra" : ""}`}
        >
          <span className="bar-label">{bar.label}</span>
          <span className={`bar-value bar-value--${bar.tone}`}>
            {bar.value}
          </span>
          {/* Illustrative, not to scale; the text above carries the values. */}
          <span
            className={`bar bar--${bar.tone}`}
            aria-hidden="true"
            style={{ "--bar": `${bar.width}%` } as CSSProperties}
          />
        </li>
      ))}
    </ul>
  </RevealOnView>
);

export const SelectedWork = () => (
  <div className="work-grid">
    {profile.contributions.map((item) => {
      const headingId = `${item.id}-heading`;
      const caseStudy = caseStudyFor(item.id);

      return (
        <article
          key={item.id}
          id={item.id}
          aria-labelledby={headingId}
          className="card work-card"
        >
          <p className="eyebrow work-eyebrow">
            <span className="work-number">{item.number}</span>
            <span className="work-topic">
              <span aria-hidden="true"> · </span>
              {item.topic}
            </span>
            <span aria-hidden="true"> · </span>
            <span className="work-period">{item.period}</span>
          </p>
          <h3 id={headingId} className="work-title">
            {item.title}
          </h3>
          <p className="work-summary">{item.summary}</p>
          <p className="work-outcome">{item.outcome}</p>
          {(item.decision || item.tradeOff) && (
            <dl className="work-decisions">
              {item.decision && (
                <div className="work-decision">
                  <dt>Decision</dt>
                  <dd>{item.decision}</dd>
                </div>
              )}
              {item.tradeOff && (
                <div className="work-decision">
                  <dt>Trade-off</dt>
                  <dd>{item.tradeOff}</dd>
                </div>
              )}
            </dl>
          )}
          {item.bars && <Bars bars={item.bars} />}
          <ul className="tags work-tags" aria-label="Technologies">
            {item.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          {caseStudy && (
            <p className="work-link">
              <Link href={caseStudyPath(caseStudy.slug)}>
                {profile.work.linkLabel}
                <span className="visually-hidden">
                  {" "}
                  about {caseStudy.title}
                </span>{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          )}
        </article>
      );
    })}
  </div>
);
