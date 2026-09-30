export type ExternalLink = { href: string; label: string };

export type Contribution = {
  id: string;
  number: string;
  employer: string;
  heading: string;
  meta: string;
  status?: string;
  summary: string;
  bullets: string[];
  technologies: string;
  featured?: boolean;
  scopeTitle: string;
  scope: string[];
};

export type Role = {
  employer: string;
  title: string;
  formalTitle?: string;
  time: string;
  note?: string;
};

export type Profile = {
  name: string;
  headline: string;
  introduction: string;
  availability: string;
  contactInvitation: string;
  financeSummary: string;
  links: {
    cv: string;
    portfolio: string;
    linkedin: string;
    email: string;
    emailLabel: string;
    github: string;
  };
  contributions: Contribution[];
  roles: Role[];
  howIWork: { label: string; text: string }[];
  additionalBreadth: string;
  credentials: string[];
  earlierProjectsNote: string;
  earlierProjects: { title: string; summary: string; links: ExternalLink[] }[];
  training: { title: string; date: string }[];
};

export const profile: Profile = {
  name: "Tomasz Stanisz",
  headline: "Software Engineer & Tech Lead",
  introduction:
    "I design and build web and mobile applications, from user interfaces to backend services. I combine hands-on engineering with architecture, testing and technical leadership.",
  availability: "Based in Poland · Remote roles · Regular US-hours overlap",
  contactInvitation:
    "Open to hands-on engineering roles with technical leadership and mentoring. Based in Poland, with regular overlap with US teams.",
  financeSummary:
    "Before moving into software engineering, I worked in finance and accounting at Accenture, Marsh McLennan, AkzoNobel and Tate & Lyle. My experience includes financial reporting, reconciliations and month-end processes, giving me practical domain context for financial and business software.",
  links: {
    cv: "https://cv.devthomas.pl/",
    portfolio: "https://devthomas.pl/",
    linkedin: "https://www.linkedin.com/in/tomasz-stanisz/",
    email: "mailto:thomas.dev666@gmail.com",
    emailLabel: "thomas.dev666@gmail.com",
    github: "https://github.com/Fremen1990",
  },
  contributions: [
    {
      id: "theeventa",
      number: "01",
      employer: "TheEventa",
      heading: "Application ownership for an event-booking MVP",
      meta: "Tech Lead · September 2025–Present",
      status: "Concurrent role · MVP v1 under development",
      summary:
        "I lead application architecture and development across TheEventa's Next.js frontend, NestJS backend, internal admin panel and Playwright E2E project.",
      bullets: [
        "Lead development spanning authentication and SSO, event objects and their related spaces, organizations, image management, and pricing that recalculates as selected options change.",
        "Own frontend wizard forms, the frontend design system and Storybook, alongside the landing page and blog.",
        "Review code, feature implementations, and manual and automated tests, with personal oversight of agent-assisted workflows.",
      ],
      technologies: "Next.js, NestJS, TypeScript, Playwright, Storybook",
      featured: true,
      scopeTitle: "Scope and approach",
      scope: [
        "Agent-assisted workflows cover design preparation, implementation, and review of code, design, business analysis, and architecture.",
        "Infrastructure, monitoring, and server administration are handled by a separate DevOps collaborator.",
      ],
    },
    {
      id: "orange-engineering",
      number: "02",
      employer: "Orange Polska",
      heading: "Frontend architecture for a backend-configured CMS",
      meta: "Frontend architecture and development",
      summary:
        "At Orange Polska, I design and develop the frontend architecture of an internal CMS. Its React and TypeScript interface is generated from JSON schemas and backend-supplied configuration.",
      bullets: [
        "Build frontend behavior for configured navigation, forms, data grids and actions, including bulk operations.",
        "Provide technical guidance and code review for three developers working on the CMS.",
        "Contribute to a streaming platform, including a feedback form and backend submission flow that makes user opinions available to the Product Owner.",
      ],
      technologies:
        "React, TypeScript, JSON Schema · Additional backend contributions in Go",
      scopeTitle: "Scope and approach",
      scope: [
        "Use React JSON Schema Form (RJSF) to render schema-defined forms.",
        "Extend form behavior and presentation with custom fields and custom widgets.",
        "Use Material UI for interface components and MUI X Data Grid Pro for data grids.",
        "Implement frontend behavior for configured navigation and actions, including bulk operations.",
      ],
    },
    {
      id: "orange-e2e",
      number: "03",
      employer: "Orange Polska",
      heading: "Establishing an E2E testing practice",
      meta: "Test automation and mentoring",
      summary:
        "I established a separate Cypress E2E project from scratch, including its test architecture and parallel execution. I trained two junior testers and reviewed their code during the project's first year.",
      bullets: [],
      technologies: "Cypress, TypeScript",
      scopeTitle: "Scope and approach",
      scope: [
        "Implemented the Page Object Model to organize application interactions into reusable page objects.",
        "Applied DRY principles to shared test logic and reusable interactions.",
        "Implemented parallel execution of E2E tests.",
      ],
    },
  ],
  roles: [
    {
      employer: "Orange Polska",
      title: "Software Engineering & Technical Leadership",
      formalTitle: "Inżynier DevOps",
      time: "October 2022–Present",
    },
    {
      employer: "TheEventa",
      title: "Tech Lead",
      time: "September 2025–Present",
      note: "Concurrent role. MVP v1 under development.",
    },
    {
      employer: "DareDrop",
      title: "Junior Full Stack Developer",
      time: "May–June 2022 · US startup",
    },
  ],
  howIWork: [
    {
      label: "Architecture",
      text: "I design frontend architecture and work across application layers, from backend-configured interfaces to full-stack product development.",
    },
    {
      label: "Quality",
      text: "I review code and feature behavior, combining manual checks with automated testing.",
    },
    {
      label: "Technical guidance",
      text: "I guide developers and mentor junior testers through practical feedback and code review.",
    },
    {
      label: "Community leadership",
      text: "I lead ATOM (Akademia Tworzenia Oprogramowania), a programming community with 900 members.",
    },
  ],
  additionalBreadth:
    "Additional breadth: React Native, backend contributions in Go, and Python used as needed.",
  credentials: [
    "Associate Cloud Engineer Certification — Google. Issued July 2024; expires July 2027.",
    "Master's degree, Finance and Accounting — University of Lodz, 2012–2014.",
    "Bachelor's degree, Finance and Accounting — University of Lodz, 2009–2012.",
    "English: approximately C1, used professionally.",
  ],
  earlierProjectsNote: "Earlier projects from training and early practice.",
  earlierProjects: [
    {
      title: "Head Hunter",
      summary: "Bootcamp team project for connecting students and recruiters.",
      links: [
        {
          href: "https://github.com/Fremen1990/head-hunter-frontend",
          label: "Frontend source",
        },
        {
          href: "https://github.com/Fremen1990/head-hunter-backend",
          label: "Backend source",
        },
        {
          href: "https://www.youtube.com/watch?v=TStajdI8jhw",
          label: "Watch the demo",
        },
      ],
    },
    {
      title: "Dev Social Media",
      summary: "Earlier full-stack practice project.",
      links: [
        {
          href: "https://github.com/Fremen1990/DevSocialMedia-frontend",
          label: "Frontend source",
        },
        {
          href: "https://github.com/Fremen1990/DevSocialMedia-backend",
          label: "Backend source",
        },
      ],
    },
    {
      title: "MERN shop",
      summary: "Earlier learning project for an online shop.",
      links: [
        {
          href: "https://github.com/Fremen1990/E-Commerce-MERN-NODE-REACT",
          label: "Source code",
        },
      ],
    },
    {
      title: "Phaser game",
      summary: "Earlier 2D game practice.",
      links: [
        {
          href: "https://dev-thomas-thom-phase-game.netlify.app",
          label: "See the live game",
        },
        {
          href: "https://github.com/Fremen1990/The-Game---Phaser-2d",
          label: "Source code",
        },
      ],
    },
  ],
  // Start dates only where current study was not confirmed. Do not invent an end date.
  training: [
    { title: "NextJS 14 Ultimate", date: "Started January 2024" },
    { title: "NextJS Masters", date: "September 2023–October 2023" },
    { title: "Udemy Courses and Certificates", date: "Started 2020" },
    {
      title: "Pluralsight - Technology platform for programmers",
      date: "Started September 2021",
    },
    { title: "GraphQL Mastery - Michał Taszycki", date: "March 2023" },
    { title: "MEGAK - one year Full-Stack Bootcamp", date: "June 2022" },
    {
      title: "KursReacta - 12 tyg Reacta - Michał Taszycki",
      date: "October 2020",
    },
    { title: "StudiujeIT - One year IT bootcamp", date: "October 2020" },
    {
      title: "WebSamuraj - From beginner to Web Developer",
      date: "October 2019–2020",
    },
  ],
};
