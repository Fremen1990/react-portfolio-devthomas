import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { expect, test } from "vitest";
import { headingsFromMdx, slugify, textOf } from "./headings";
import { publishedCaseStudies } from "../content/work/studies";

test("slugs are lower case, hyphenated and drop apostrophes", () => {
  expect(slugify("What I'd do differently")).toBe("what-id-do-differently");
  expect(slugify("Options I considered")).toBe("options-i-considered");
  expect(slugify("  The outcome so far ")).toBe("the-outcome-so-far");
});

test("headings come from level-2 lines only, outside code fences", () => {
  const source = [
    "# Title",
    "## First **part**",
    "### Not listed",
    "```md",
    "## Inside a fence",
    "```",
    "<Differently>",
    "",
    "## What I'd do differently",
  ].join("\n");
  expect(headingsFromMdx(source)).toEqual([
    { id: "first-part", text: "First part" },
    { id: "what-id-do-differently", text: "What I'd do differently" },
  ]);
});

test("the h2 component's id matches the listed heading", () => {
  const children = ["What I", React.createElement("em", null, "'d"), " do"];
  expect(slugify(textOf(children))).toBe(slugify("What I'd do"));
});

test("every case study has sections to list, ending with its retrospective", () => {
  for (const study of publishedCaseStudies) {
    const source = readFileSync(
      join(process.cwd(), "src/content/work", `${study.slug}.mdx`),
      "utf8"
    );
    const headings = headingsFromMdx(source);
    expect(headings.length).toBeGreaterThan(3);
    expect(headings.at(-1)?.id).toBe("what-id-do-differently");
    expect(new Set(headings.map((heading) => heading.id)).size).toBe(
      headings.length
    );
  }
});
