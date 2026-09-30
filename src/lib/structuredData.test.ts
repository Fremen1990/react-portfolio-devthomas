import { expect, test } from "vitest";
import {
  caseStudyStructuredData,
  homeStructuredData,
  serializeJsonLd,
} from "./structuredData";
import { publishedCaseStudies } from "@/content/work/studies";

test("the home page describes Tomasz as a Person with his profiles", () => {
  const [person, website] = homeStructuredData()["@graph"];
  expect(person).toMatchObject({
    "@type": "Person",
    name: "Tomasz Stanisz",
    jobTitle: "Software Engineer & Tech Lead",
    url: "https://devthomas.pl/",
    image: "https://devthomas.pl/portrait.jpg",
  });
  expect(person.sameAs).toEqual([
    "https://www.linkedin.com/in/tomasz-stanisz/",
    "https://github.com/Fremen1990",
    "https://cv.devthomas.pl/",
  ]);
  expect(website).toMatchObject({
    "@type": "WebSite",
    publisher: { "@id": person["@id"] },
  });
});

test("each case study is an Article by Tomasz", () => {
  for (const study of publishedCaseStudies) {
    expect(caseStudyStructuredData(study)).toMatchObject({
      "@type": "Article",
      headline: study.title,
      url: `https://devthomas.pl/work/${study.slug}/`,
      author: { "@type": "Person", name: "Tomasz Stanisz" },
    });
  }
});

test("serialised data can't close its script tag early", () => {
  const html = serializeJsonLd({ text: "</script><script>alert(1)</script>" });
  expect(html).not.toContain("<");
  expect(JSON.parse(html)).toEqual({
    text: "</script><script>alert(1)</script>",
  });
});
