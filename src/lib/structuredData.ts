import { getProfile } from "@/i18n/profile";
import type { Locale } from "@/i18n/locales";
import { homePath } from "@/i18n/routes";
import { profile } from "@/content/publicProfile";
import { SITE_URL } from "@/lib/metadata";
import { caseStudyPath, type CaseStudy } from "@/content/work/studies";

// schema.org structured data (JSON-LD), so search engines can show Tomasz's
// name, role, photo and profiles, and recognise the case studies as his
// articles. Every fact here is already public on the site.

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const organization = (name: string) => ({ "@type": "Organization", name });

export const homeStructuredData = (locale: Locale = "en") => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      jobTitle: getProfile(locale).headline,
      description: getProfile(locale).introduction,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/portrait.jpg`,
      sameAs: [profile.links.linkedin, profile.links.github, profile.links.cv],
      address: { "@type": "PostalAddress", addressCountry: "PL" },
      worksFor: [organization("Orange Polska"), organization("TheEventa")],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Lodz",
      },
      knowsAbout: [
        "Frontend architecture",
        "Technical leadership",
        "End-to-end testing",
        "React",
        "TypeScript",
        "Next.js",
        "NestJS",
        "JSON Schema",
        "Playwright",
        "Cypress",
        "Storybook",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}${homePath(locale)}`,
      name: `${profile.name}, ${getProfile(locale).headline}`,
      inLanguage: locale,
      publisher: { "@id": PERSON_ID },
    },
  ],
});

export const caseStudyStructuredData = (
  study: CaseStudy,
  locale: Locale = "en"
) => {
  const url = `${SITE_URL}${caseStudyPath(study.slug, locale)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    url,
    mainEntityOfPage: url,
    inLanguage: locale,
    image: `${SITE_URL}/og-share.png`,
    about: organization(study.company),
    author: { "@type": "Person", "@id": PERSON_ID, name: profile.name },
    isPartOf: { "@id": WEBSITE_ID },
  };
};

// JSON.stringify doesn't escape "<", so a string containing "</script>"
// could end the tag early. Escaping it is the approach the Next.js JSON-LD
// guide recommends.
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
