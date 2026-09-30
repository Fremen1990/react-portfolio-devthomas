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
    period: "Since late 2022",
    team: "5 developers (including me), 3 testers, 1 product manager",
    stack: "React, TypeScript, MUI, JSON Schema, React JSON Schema Form (RJSF)",
    published: true,
  },
  {
    slug: "orange-e2e-testing",
    contributionId: "orange-e2e",
    title: "From days of manual regression to under an hour",
    description:
      "How I introduced automated end-to-end testing at Orange Polska, trained two testers, and cut regression checks from days to under an hour.",
    company: "Orange Polska",
    role: "I introduced automated end-to-end testing, built the test architecture and trained two testers",
    period: "Since 2022",
    team: "Me, one newly hired automation tester, and one manual tester who moved into automation",
    stack: "Cypress, TypeScript, Page Object Model",
    published: true,
  },
  {
    slug: "theeventa-mvp",
    contributionId: "theeventa",
    title: "One tech lead, AI agents and an MVP rebuilt from almost zero",
    description:
      "How I proposed a smaller team for TheEventa and built most of its MVP as a tech lead working with AI agents, with quality kept under my control.",
    company: "TheEventa",
    role: "Tech lead: architecture, full-stack development and an AI-assisted delivery process",
    period: "Since September 2025, alongside my role at Orange Polska",
    team: "Me, the CEO, and a DevOps collaborator for infrastructure",
    stack:
      "Next.js, NestJS, TypeScript, Playwright, Storybook; Cursor, Codex and Claude",
    published: true,
  },
];

export const publishedCaseStudies = caseStudies.filter(
  (study) => study.published
);

export const caseStudyPath = (slug: string) => `/work/${slug}/`;

export const caseStudyFor = (contributionId: string) =>
  publishedCaseStudies.find((study) => study.contributionId === contributionId);
