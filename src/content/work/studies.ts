// Case studies: the facts shown on each /work/<slug>/ page and used by the
// home page and the command palette. The text lives in <slug>.mdx, mapped in
// src/content/work/bodies.ts. Keep this file free of MDX imports so the
// palette's client bundle stays small.

export type CaseStudy = {
  slug: string;
  /** The home page contribution this study expands (publicProfile ids). */
  contributionId: string;
  title: string;
  /** One sentence for search results and link previews. */
  description: string;
  company: string;
  role: string;
  period: string;
  team: string;
  stack: string;
  /** Unpublished studies are not built, linked or listed. */
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "orange-cms",
    contributionId: "orange-engineering",
    title: "A CMS the backend can extend without frontend changes",
    description:
      "How I designed a schema-driven CMS at Orange Polska in front of a growing set of legacy systems, and what it cost and gained.",
    company: "Orange Polska",
    role: "I chose the stack and designed the frontend architecture",
    period: "Since 2022",
    team: "5 developers (including me), 3 testers, 1 product manager",
    stack: "React, TypeScript, MUI, JSON Schema, React JSON Schema Form (RJSF)",
    published: true,
  },
];

export const publishedCaseStudies = caseStudies.filter(
  (study) => study.published
);

export const caseStudyPath = (slug: string) => `/work/${slug}/`;

export const caseStudyFor = (contributionId: string) =>
  publishedCaseStudies.find((study) => study.contributionId === contributionId);
