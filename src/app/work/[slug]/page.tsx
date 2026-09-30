import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { caseStudyPath, publishedCaseStudies } from "@/content/work/studies";
import { caseStudyBodies } from "@/content/work/bodies";

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

  const facts = [
    ["Company", study.company],
    ["My role", study.role],
    ["When", study.period],
    ["Team", study.team],
    ["Stack", study.stack],
  ];

  return (
    <article className="page-section case-study">
      <div className="page-wrap prose">
        <p className="case-study-kicker">
          <Link href="/#work">Selected work</Link> · Case study
        </p>
        <h1>{study.title}</h1>
        <dl className="case-study-facts">
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Body components={{ wrapper: Unwrapped }} />
        <p className="case-study-back">
          <Link href="/#work">← Back to selected work</Link>
        </p>
      </div>
    </article>
  );
}
