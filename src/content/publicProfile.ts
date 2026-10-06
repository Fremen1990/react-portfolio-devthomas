export type ExternalLink = { href: string; label: string };

/** One part of the hero's CMS architecture panel. */
export type ArchitecturePart = {
  id: string;
  label: string;
  short: string;
  caption: string;
  /** The part's line in the Terminal skin's `tree` output. */
  tree: string;
};

/** A bar in a work card. Widths are illustrative, not to scale. */
export type WorkBar = {
  label: string;
  value: string;
  /** Bar length in percent of the card's width. */
  width: number;
  tone: "baseline" | "accent";
  /** Left out on phones, to keep the card short. */
  phoneHidden?: boolean;
};

export type Contribution = {
  id: string;
  number: string;
  topic: string;
  period: string;
  title: string;
  summary: string;
  /** The measurable or visible result, shown highlighted under the summary. */
  outcome: string;
  decision?: string;
  tradeOff?: string;
  bars?: WorkBar[];
  tags: string[];
};

export type ApproachItem = {
  label: string;
  text: string;
  proof?: ExternalLink;
  /** Plain text in place of a proof link. */
  note?: string;
};

export type TimelineEntry = {
  period: string;
  name: string;
  detail: string;
  current?: boolean;
};

export type Profile = {
  name: string;
  /** Job title, for metadata, structured data and the hero. */
  headline: string;
  /** Default meta description and structured data. */
  introduction: string;
  hero: {
    headline: string;
    /** The word in `headline` set in the accent colour. */
    headlineAccent: string;
    subline: string;
    location: string;
    primaryAction: string;
    secondaryAction: string;
  };
  architecture: {
    title: string;
    parts: ArchitecturePart[];
    footer: { label: string; value: string };
  };
  work: { eyebrow: string; linkLabel: string };
  contributions: Contribution[];
  building: {
    id: string;
    number: string;
    eyebrow: string;
    status: string;
    title: string;
    text: string;
    steps: string[];
    linkLabel: string;
  };
  approach: ApproachItem[];
  timeline: TimelineEntry[];
  cvLinkLabel: string;
  contact: { heading: string; line: string };
  links: {
    cv: string;
    portfolio: string;
    linkedin: string;
    email: string;
    emailLabel: string;
    github: string;
    source: string;
  };
};

export const profile: Profile = {
  name: "Tomasz Stanisz",
  headline: "Software Engineer & Tech Lead",
  introduction:
    "I design and build web and mobile applications, from user interfaces to backend services. I combine hands-on engineering with architecture, testing and technical leadership.",
  hero: {
    headline: "I turn complex requirements into working software.",
    headlineAccent: "software",
    subline:
      "Web and mobile applications, from user interfaces to backend services, with the architecture, testing and technical leadership around them. Regular overlap with US teams.",
    location: "Poland · Remote",
    primaryAction: "See the work",
    secondaryAction: "Get in touch",
  },
  architecture: {
    title: "Orange Polska · internal CMS · click a part",
    parts: [
      {
        id: "backend",
        label: "Backend",
        short: "Configuration and JSON Schemas",
        caption:
          "The backend describes the frontend: navigation, URLs, views and forms all arrive as configuration and JSON Schemas.",
        tree: "├── backend/",
      },
      {
        id: "shell",
        label: "CMS shell",
        short: "Navigation, URLs, views",
        caption:
          "The React app is a generic renderer. The CMS shell builds navigation, URLs and views from whatever the backend sends.",
        tree: "│   ├── shell/",
      },
      {
        id: "contract",
        label: "Contract checker",
        short: "Backend vs frontend",
        caption:
          "A strict contract checker compares what the backend sends with what the frontend expects, and logs detailed errors for developers.",
        tree: "│   ├── contract/",
      },
      {
        id: "forms",
        label: "Forms",
        short: "RJSF + custom widgets",
        caption:
          "RJSF renders the schemas straight into forms, extended with our own custom fields and widgets on MUI.",
        tree: "│   ├── forms/",
      },
      {
        id: "grids",
        label: "Data grids",
        short: "MUI X, bulk actions",
        caption:
          "MUI X Data Grid shows the data with configured actions, including bulk operations.",
        tree: "│   └── grids/",
      },
    ],
    footer: {
      label: "New resources shipped with no frontend changes",
      value: "Dozens",
    },
  },
  work: {
    eyebrow: "Selected work · Orange Polska",
    linkLabel: "Read the case study",
  },
  contributions: [
    {
      id: "orange-engineering",
      number: "01",
      topic: "Frontend architecture",
      period: "Since late 2022",
      title: "A CMS the backend can extend without frontend changes",
      summary:
        "One internal CMS in front of many legacy systems, built to last for years. I chose the stack and let the backend describe navigation, views and forms.",
      outcome:
        "Dozens of new resources reached production without frontend work.",
      decision:
        "React + TypeScript, MUI and RJSF over vanilla JS and custom components",
      tradeOff:
        "Harder debugging, answered with a contract checker and dedicated logging",
      tags: ["React", "TypeScript", "RJSF", "MUI X", "Go"],
    },
    {
      id: "orange-e2e",
      number: "02",
      topic: "Quality and mentoring",
      period: "Since 2022",
      title: "From days of manual regression to under an hour",
      summary:
        "Instead of writing a proposal, I built a working Cypress suite. My manager hired an automation tester; I trained two testers and reviewed every change in the first year.",
      outcome: "1–3 days → about an hour on Orange TV GO.",
      bars: [
        {
          label: "Manual regression, 100+ scenarios",
          value: "1–3 days",
          width: 100,
          tone: "baseline",
        },
        {
          label: "Cypress, Orange TV GO",
          value: "~1 h",
          width: 6,
          tone: "accent",
        },
        {
          label: "Cypress, internal CMS (~80)",
          value: "~30 min",
          width: 3,
          tone: "accent",
          phoneHidden: true,
        },
      ],
      tags: ["Cypress", "TypeScript", "Page Object Model", "Parallel runs"],
    },
  ],
  building: {
    id: "theeventa",
    number: "03",
    eyebrow: "Now building",
    status: "MVP v1 in progress",
    title:
      "TheEventa: leading an event-booking MVP with a small team and AI agents",
    text: "Tech Lead since September 2025, alongside Orange. Next.js, NestJS, an admin panel and a Playwright E2E project, with every change signed off by me.",
    steps: [
      "Design",
      "Business review",
      "AI + business review",
      "Build",
      "Eng. review",
      "My sign-off",
    ],
    linkLabel: "How I run delivery",
  },
  approach: [
    {
      label: "Architecture",
      text: "From backend-configured interfaces to full-stack products.",
      proof: { label: "Proof: the CMS", href: "/work/orange-cms/" },
    },
    {
      label: "Quality",
      text: "Code and feature review, manual checks plus automated tests.",
      proof: {
        label: "Proof: 1–3 days → ~1 h",
        href: "/work/orange-e2e-testing/",
      },
    },
    {
      label: "Guidance",
      text: "Mentoring developers and testers through practical review.",
      proof: {
        label: "Proof: trained two testers",
        href: "/work/orange-e2e-testing/",
      },
    },
    {
      label: "Community",
      text: "I lead ATOM (Akademia Tworzenia Oprogramowania).",
      note: "900 members",
    },
  ],
  timeline: [
    {
      period: "Earlier career",
      name: "Finance & accounting",
      detail: "Accenture, Marsh McLennan, AkzoNobel, Tate & Lyle",
    },
    {
      period: "May–Jun 2022",
      name: "DareDrop",
      detail: "Junior Full Stack Developer",
    },
    {
      period: "Oct 2022–now",
      name: "Orange Polska",
      detail: "Software Engineering & Technical Leadership",
      current: true,
    },
    {
      period: "Sep 2025–now",
      name: "TheEventa",
      detail: "Tech Lead · concurrent",
      current: true,
    },
  ],
  cvLinkLabel: "Full CV and PDF",
  contact: {
    heading: "Open to hands-on tech-lead roles",
    line: "Based in Poland, with regular overlap with US teams.",
  },
  links: {
    cv: "https://cv.devthomas.pl/",
    portfolio: "https://devthomas.pl/",
    linkedin: "https://www.linkedin.com/in/tomasz-stanisz/",
    email: "mailto:thomas.dev666@gmail.com",
    emailLabel: "thomas.dev666@gmail.com",
    github: "https://github.com/Fremen1990",
    source: "https://github.com/Fremen1990/react-portfolio-devthomas",
  },
};
