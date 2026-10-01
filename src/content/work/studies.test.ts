import { expect, test } from "vitest";
import { nextCaseStudy, publishedCaseStudies } from "./studies";

test("next case study cycles CMS → E2E → TheEventa → CMS", () => {
  const order = ["orange-cms", "orange-e2e-testing", "theeventa-mvp"];
  order.forEach((slug, index) => {
    expect(nextCaseStudy(slug)?.slug).toBe(order[(index + 1) % order.length]);
  });
  expect(nextCaseStudy("missing")).toBeUndefined();
});

test("every published study has an outcome for its header tile", () => {
  for (const study of publishedCaseStudies) {
    expect(study.outcome.value).not.toBe("");
    expect(study.outcome.label).not.toBe("");
  }
});
