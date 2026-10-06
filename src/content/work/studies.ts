import type { Locale } from "@/i18n/locales";
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
  /** The headline result, shown as a tile in the page's header band. */
  outcome: { value: string; label: string };
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
    outcome: {
      value: "Dozens",
      label: "of new resources in production without frontend work",
    },
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
    outcome: {
      value: "~1 h",
      label: "Orange TV GO regression, down from 1–3 days",
    },
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
    outcome: {
      value: "MVP v1",
      label:
        "in progress: most of the MVP built with a small team and AI agents",
    },
    published: true,
  },
];

export const publishedCaseStudies = caseStudies.filter(
  (study) => study.published
);

export const caseStudyPath = (slug: string, locale: Locale = "en") =>
  `${locale === "pl" ? "/pl" : ""}/work/${slug}/`;

export const caseStudyFor = (contributionId: string, locale: Locale = "en") =>
  getCaseStudies(locale).find(
    (study) => study.contributionId === contributionId
  );

/** The study after `slug` in page order, wrapping round to the first. */
export const nextCaseStudy = (slug: string, locale: Locale = "en") => {
  const publishedCaseStudies = getCaseStudies(locale);
  const index = publishedCaseStudies.findIndex((study) => study.slug === slug);
  if (index === -1 || publishedCaseStudies.length < 2) {
    return undefined;
  }
  return publishedCaseStudies[(index + 1) % publishedCaseStudies.length];
};

const polish: Record<
  string,
  Pick<
    CaseStudy,
    "title" | "description" | "role" | "period" | "team" | "outcome"
  >
> = {
  "orange-cms": {
    title: "CMS, który backend rozszerza bez zmian frontendu",
    description:
      "Jak zaprojektowałem CMS oparty na schematach w Orange Polska dla rosnącej liczby systemów legacy — korzyści i koszty tej decyzji.",
    role: "Wybrałem stack i zaprojektowałem architekturę frontendu",
    period: "Od końca 2022",
    team: "5 programistów (w tym ja), 3 testerów, 1 product manager",
    outcome: {
      value: "Dziesiątki",
      label: "nowych zasobów na produkcji bez pracy nad frontendem",
    },
  },
  "orange-e2e-testing": {
    title: "Od dni ręcznej regresji do mniej niż godziny",
    description:
      "Jak wprowadziłem automatyczne testy end-to-end w Orange Polska, przeszkoliłem dwie osoby i skróciłem regresję z dni do mniej niż godziny.",
    role: "Wprowadziłem automatyzację E2E, zbudowałem architekturę testów i przeszkoliłem dwie osoby",
    period: "Od 2022",
    team: "Ja, nowo zatrudniony tester automatyzujący i tester manualny przechodzący do automatyzacji",
    outcome: {
      value: "~1 h",
      label: "regresja Orange TV GO, wcześniej 1–3 dni",
    },
  },
  "theeventa-mvp": {
    title: "Jeden Tech Lead, agenci AI i MVP zbudowane niemal od zera",
    description:
      "Jak zaproponowałem mniejszy zespół TheEventa i zbudowałem większość MVP z agentami AI, zachowując osobistą kontrolę jakości.",
    role: "Tech Lead: architektura, rozwój full stack i proces dostarczania z pomocą AI",
    period: "Od września 2025, równolegle z pracą w Orange Polska",
    team: "Ja, CEO i współpracownik DevOps odpowiedzialny za infrastrukturę",
    outcome: {
      value: "MVP v1",
      label: "w budowie: większość MVP powstała z małym zespołem i agentami AI",
    },
  },
};
export const getCaseStudies = (locale: Locale = "en"): CaseStudy[] =>
  publishedCaseStudies.map((study) => {
    if (locale === "en") return study;
    if (!polish[study.slug])
      throw new Error(`Missing Polish case study: ${study.slug}`);
    return { ...study, ...polish[study.slug] };
  });
