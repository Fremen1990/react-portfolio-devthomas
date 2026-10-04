import { expect, test } from "vitest";
import {
  blogArticlePath,
  blogIndexPath,
  isBlogLocale,
  selectBlogPosts,
  validateBlogPosts,
  readingMinutes,
  formatBlogDate,
} from "./model";
import type { BlogPost } from "./types";
import { headingsFromMdx } from "@/lib/headings";
const post = (
  slug = "sample",
  published = true,
  date = "2026-10-04"
): BlogPost => ({
  slug,
  published,
  publishedAt: published ? date : undefined,
  editions: {
    en: {
      title: "Example",
      description: "Description",
      body: "en.mdx",
      topics: [],
    },
    pl: { title: "Przykład", description: "Opis", body: "pl.mdx", topics: [] },
  },
});
test("both editions publish as one record and newest comes first", () => {
  expect(
    selectBlogPosts([
      post("older", true, "2026-09-01"),
      post("draft", false),
      post("newer"),
    ]).map((p) => p.slug)
  ).toEqual(["newer", "older"]);
});
test("drafts need an explicit preview and no fabricated publication date", () => {
  const p = post("draft", false);
  expect(selectBlogPosts([p])).toEqual([]);
  expect(selectBlogPosts([p], true)).toEqual([p]);
  expect(p.publishedAt).toBeUndefined();
});
test("a missing or blank translation fails validation", () => {
  const p = post();
  p.editions.pl.title = " ";
  expect(() => validateBlogPosts([p])).toThrow(/pl edition/);
});
test("duplicate slugs and impossible dates are rejected", () => {
  expect(() => validateBlogPosts([post(), post()])).toThrow(/duplicate/);
  expect(() => validateBlogPosts([post("sample", true, "2026-02-30")])).toThrow(
    /date/
  );
});
test("a publication needs a date and an update cannot predate it", () => {
  const p = post();
  delete p.publishedAt;
  expect(() => validateBlogPosts([p])).toThrow(/release date/);
  const q = post();
  q.updatedAt = "2026-09-01";
  expect(() => validateBlogPosts([q])).toThrow(/update date/);
});
test("body paths must stay relative to the manuscript directory", () => {
  const p = post();
  p.editions.en.body = "../secret.mdx";
  expect(() => validateBlogPosts([p])).toThrow(/body path/);
});
test("language routes never redirect or fall back to English", () => {
  expect(blogIndexPath("en")).toBe("/blog/");
  expect(blogIndexPath("pl")).toBe("/blog/pl/");
  expect(blogArticlePath("sample", "pl")).toBe("/blog/pl/sample/");
  expect(isBlogLocale("de")).toBe(false);
});
test("reading estimates are computed from each edition, excluding fenced code", () => {
  expect(readingMinutes("word ".repeat(401))).toBe(3);
  expect(readingMinutes("Słowo ".repeat(201))).toBe(2);
  expect(readingMinutes("Hello\n```ts\n" + "code ".repeat(500) + "\n```")).toBe(
    1
  );
});
test("Polish dates and heading links retain meaningful labels", () => {
  expect(formatBlogDate("2026-10-04", "pl")).toContain("października");
  expect(
    headingsFromMdx("## Współdzielenie danych\n## Żądania i błędy").map(
      (h) => h.id
    )
  ).toEqual(["wspoldzielenie-danych", "zadania-i-bledy"]);
});
