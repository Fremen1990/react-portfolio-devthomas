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
} from "@/content/work/studies";
import { caseStudyBodies } from "@/content/work/bodies";
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

const findStudy = (slug: string) =>
  publishedCaseStudies.find((study) => study.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const study = findStudy((await params).slug);
  if (!study) {
    return {};
  }
  return pageMetadata({
    path: caseStudyPath(study.slug),
    title: study.title,
    description: study.description,
  });
}

// The page renders its own article, so the MDX body skips the shared wrapper.
const Unwrapped = ({ children }: { children?: ReactNode }) => <>{children}</>;

// "On this page" lists the study's h2s. They are read from the MDX source at
// build time; the MDX h2 component gives each the matching id.
const readHeadings = async (slug: string) =>
  headingsFromMdx(
    await readFile(
      join(process.cwd(), "src/content/work", `${slug}.mdx`),
      "utf8"
    )
  );

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = findStudy(slug);
  const Body = caseStudyBodies[slug];
  if (!study || !Body) {
    notFound();
  }

  const headings = await readHeadings(slug);
  const next = nextCaseStudy(slug);
  const facts = [
    ["My role", study.role],
    ["When", study.period],
    ["Team", study.team],
    ["Stack", study.stack],
  ];

  return (
    <article className="case-study">
      <JsonLd data={caseStudyStructuredData(study)} />
      <header className="case-study-hero band">
        <div className="page-wrap case-study-hero-grid">
          <div className="case-study-intro">
            <p className="eyebrow case-study-kicker">
              Case study · {study.company}
            </p>
            <h1 className="case-study-title">{study.title}</h1>
            <p className="case-study-description">{study.description}</p>
          </div>
          <div className="outcome-tile">
            <p className="eyebrow outcome-tile-label">Outcome</p>
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
        <CaseStudyToc headings={headings} />
        <div className="prose case-study-prose">
          <Body components={{ wrapper: Unwrapped }} />
          <nav className="case-study-pager" aria-label="Case studies">
            <Link className="pager-link" href="/#work">
              <span className="eyebrow pager-label">
                <span aria-hidden="true">← </span>All work
              </span>
              <span className="pager-title">Back to the home page</span>
            </Link>
            {next && (
              <Link
                className="pager-link pager-link--next"
                href={caseStudyPath(next.slug)}
              >
                <span className="eyebrow pager-label">
                  Next case study<span aria-hidden="true"> →</span>
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
