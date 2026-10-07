import React from "react";
import Link from "next/link";
import { getProfile } from "@/i18n/profile";
import type { Locale } from "@/i18n/locales";
import { carBrainFor, type CarBrain } from "../../content/carBrain";
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

const IndependentProduct = ({
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
        <span className="now-years">{carBrain.role}</span>
      </p>
      <h3 id="car-brain-heading" className="now-title">
        {carBrain.title}
      </h3>
      <p className="now-text">{carBrain.text}</p>
      <dl className="now-details">
        <div>
          <dt>Stack</dt>
          <dd>{carBrain.tags.join(" · ")}</dd>
        </div>
        <div>
          <dt>{locale === "pl" ? "Główne funkcje" : "Key features"}</dt>
          <dd>{carBrain.features}</dd>
        </div>
        <div>
          <dt>{locale === "pl" ? "AI i automatyzacja" : "AI & automation"}</dt>
          <dd>{carBrain.automation}</dd>
        </div>
      </dl>
      <p className="now-text">{carBrain.architecture}</p>
      <p className="now-text">
        <strong>Status: </strong>
        {carBrain.status}
      </p>
      <p className="now-actions">
        <Link
          className="now-site-link"
          href={`/blog/${locale}/why-i-built-car-brain/`}
        >
          {carBrain.articleLabel} <span aria-hidden="true">→</span>
        </Link>
        {carBrain.published && carBrain.appStoreUrl && (
          <a
            className="store-link"
            href={carBrain.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {carBrain.appStoreLabel}
          </a>
        )}
      </p>
    </div>
    <CarBrainShots
      label={carBrain.screensLabel}
      caption={carBrain.sampleNote}
      shots={carBrain.shots}
      width={carBrain.shotWidth}
      height={carBrain.shotHeight}
    />
  </article>
);

// Product visibility is separate from App Store availability.
export const NowSection = ({
  carBrain,
  locale = "en",
}: {
  carBrain?: CarBrain;
  locale?: Locale;
}) => (
  <div className="now-grid">
    <Building locale={locale} />
    <IndependentProduct
      carBrain={carBrain ?? carBrainFor(locale)}
      locale={locale}
    />
  </div>
);
