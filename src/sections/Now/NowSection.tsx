import React from "react";
import Link from "next/link";
import { getProfile } from "@/i18n/profile";
import type { Locale } from "@/i18n/locales";
import {
  carBrain as carBrainContent,
  type CarBrain,
} from "../../content/carBrain";
import { caseStudyFor, caseStudyPath } from "../../content/work/studies";
import { CarBrainShots } from "./CarBrainShots";

const Building = ({ locale = "en" }: { locale?: Locale }) => {
  const profile = getProfile(locale);
  const { building } = profile;
  const caseStudy = caseStudyFor(building.id, locale);
  const headingId = `${building.id}-heading`;

  return (
    <article
      id={building.id}
      aria-labelledby={headingId}
      className="now-card now-card--building band"
    >
      <p className="now-meta" data-pid={building.number}>
        <span className="eyebrow now-eyebrow">{building.eyebrow}</span>
        <span className="status-pill">
          <span className="status-dot" aria-hidden="true" />
          {building.status}
        </span>
      </p>
      <h3 id={headingId} className="now-title">
        {building.title}
      </h3>
      <p className="now-text">{building.text}</p>
      <ol
        className="pipeline"
        aria-label={
          locale === "pl" ? "Droga zmiany do wdrożenia" : "How a change ships"
        }
      >
        {building.steps.map((step, index) => (
          <li
            key={step}
            className={
              index === building.steps.length - 1
                ? "pipeline-step is-key"
                : "pipeline-step"
            }
          >
            {step}
          </li>
        ))}
      </ol>
      {caseStudy && (
        <p className="now-link">
          <Link href={caseStudyPath(caseStudy.slug, locale)}>
            {building.linkLabel}
            <span className="visually-hidden">
              {locale === "pl" ? " w TheEventa" : " at TheEventa"}
            </span>{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      )}
    </article>
  );
};

const Shipped = ({
  carBrain,
  locale = "en",
}: {
  carBrain: CarBrain;
  locale?: Locale;
}) => (
  <article
    id="car-brain"
    aria-labelledby="car-brain-heading"
    className="card now-card now-card--shipped"
  >
    <div className="now-shipped-copy">
      <p className="now-meta">
        <span className="eyebrow now-eyebrow">{carBrain.eyebrow}</span>
        <span className="now-years">{carBrain.years}</span>
      </p>
      <h3 id="car-brain-heading" className="now-title">
        {carBrain.title}
      </h3>
      <p className="now-text">{carBrain.text}</p>
      <ul
        className="tags"
        aria-label={locale === "pl" ? "Technologie" : "Technologies"}
      >
        {carBrain.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      <p className="now-actions">
        <a
          className="store-link"
          href={carBrain.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {carBrain.appStoreLabel}
        </a>
        <a
          className="now-site-link"
          href={carBrain.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {carBrain.siteLabel} <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>
    <CarBrainShots
      shots={carBrain.shots}
      width={carBrain.shotWidth}
      height={carBrain.shotHeight}
    />
  </article>
);

// TheEventa, which is still an MVP, and Car Brain, which ships only once its
// publication gate is open. Without Car Brain, TheEventa spans the row.
export const NowSection = ({
  carBrain = carBrainContent,
  locale = "en",
}: {
  carBrain?: CarBrain;
  locale?: Locale;
}) => (
  <div
    className={carBrain.published ? "now-grid" : "now-grid now-grid--single"}
  >
    <Building locale={locale} />
    {carBrain.published && <Shipped carBrain={carBrain} locale={locale} />}
  </div>
);
