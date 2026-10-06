import type { Locale } from "@/i18n/locales";
import { homePath } from "@/i18n/routes";
import type { ReactNode } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import {
  caseStudyPath,
  nextCaseStudy,
  publishedCaseStudies,
  getCaseStudies,
} from "@/content/work/studies";
import { caseStudyBodies, polishCaseStudyBodies } from "@/content/work/bodies";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { CaseStudyToc } from "@/components/CaseStudy/CaseStudyToc";
import { caseStudyStructuredData } from "@/lib/structuredData";
import { headingsFromMdx } from "@/lib/headings";

type Params = { slug: string };

// Only published studies are exported; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return publishedCaseStudies.map(({ slug }) => ({ slug }));
}

const findStudy = (slug: string, locale: Locale) =>
  getCaseStudies(locale).find((study) => study.slug === slug);

export async function studyMetadata({
  params,
  locale = "en",
}: {
  params: Promise<Params>;
  locale?: Locale;
}) {
  const study = findStudy((await params).slug, locale);
  if (!study) {
    return {};
  }
  return pageMetadata({
    path: caseStudyPath(study.slug, locale),
    title: study.title,
    description: study.description,
  });
}

// The page renders its own article, so the MDX body skips the shared wrapper.
const Unwrapped = ({ children }: { children?: ReactNode }) => <>{children}</>;

// "On this page" lists the study's h2s. They are read from the MDX source at
// build time; the MDX h2 component gives each the matching id.
const readHeadings = async (slug: string, locale: Locale) =>
  headingsFromMdx(
    await readFile(
      join(
        process.cwd(),
        "src/content/work",
        `${slug}${locale === "pl" ? ".pl" : ""}.mdx`
      ),
      "utf8"
    )
  );

export async function CaseStudyPage({
  params,
  locale = "en",
}: {
  params: Promise<Params>;
  locale?: Locale;
}) {
  const { slug } = await params;
  const study = findStudy(slug, locale);
  const Body = (locale === "pl" ? polishCaseStudyBodies : caseStudyBodies)[
    slug
  ];
  if (!study || !Body) {
    notFound();
  }

  const headings = await readHeadings(slug, locale);
  const next = nextCaseStudy(slug, locale);
  const facts = [
    [locale === "pl" ? "Moja rola" : "My role", study.role],
    [locale === "pl" ? "Kiedy" : "When", study.period],
    [locale === "pl" ? "Zespół" : "Team", study.team],
    ["Stack", study.stack],
  ];

  return (
    <article className="case-study">
      <JsonLd data={caseStudyStructuredData(study, locale)} />
      <header className="case-study-hero band">
        <div className="page-wrap case-study-hero-grid">
          <div className="case-study-intro">
            <p className="eyebrow case-study-kicker">
              {locale === "pl" ? "Studium przypadku" : "Case study"} ·{" "}
              {study.company}
            </p>
            <h1 className="case-study-title">{study.title}</h1>
            <p className="case-study-description">{study.description}</p>
          </div>
          <div className="outcome-tile">
            <p className="eyebrow outcome-tile-label">
              {locale === "pl" ? "Rezultat" : "Outcome"}
            </p>
            <p className="outcome-tile-value">{study.outcome.value}</p>
            <p className="outcome-tile-text">{study.outcome.label}</p>
          </div>
        </div>
        <div className="case-study-facts-band">
          <dl className="page-wrap case-study-facts">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <div className="page-wrap case-study-body">
        <CaseStudyToc
          headings={headings}
          label={locale === "pl" ? "Na tej stronie" : "On this page"}
        />
        <div className="prose case-study-prose">
          <Body components={{ wrapper: Unwrapped }} />
          <nav
            className="case-study-pager"
            aria-label={locale === "pl" ? "Studia przypadków" : "Case studies"}
          >
            <Link className="pager-link" href={`${homePath(locale)}#work`}>
              <span className="eyebrow pager-label">
                <span aria-hidden="true">← </span>
                {locale === "pl" ? "Wszystkie realizacje" : "All work"}
              </span>
              <span className="pager-title">
                {locale === "pl"
                  ? "Wróć na stronę główną"
                  : "Back to the home page"}
              </span>
            </Link>
            {next && (
              <Link
                className="pager-link pager-link--next"
                href={caseStudyPath(next.slug, locale)}
              >
                <span className="eyebrow pager-label">
                  {locale === "pl"
                    ? "Kolejne studium przypadku"
                    : "Next case study"}
                  <span aria-hidden="true"> →</span>
                </span>
                <span className="pager-title">{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
