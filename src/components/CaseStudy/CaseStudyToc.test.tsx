import React from "react";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { CaseStudyToc } from "./CaseStudyToc";

const headings = [
  { id: "situation", text: "The situation" },
  { id: "decision", text: "The decision" },
  { id: "outcome", text: "The outcome" },
];

const placeHeadings = (tops: Record<string, number>) => {
  for (const { id } of headings) {
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement("h2");
      element.id = id;
      document.body.appendChild(element);
    }
    element.getBoundingClientRect = () => ({ top: tops[id] }) as DOMRect;
  }
};

beforeEach(() => {
  // A page taller than the window, so the list isn't at its last section.
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 5000,
  });
});

test("lists every section as an in-page link, with the first current", () => {
  placeHeadings({ situation: 300, decision: 900, outcome: 1500 });
  render(<CaseStudyToc headings={headings} />);
  expect(
    screen.getByRole("navigation", { name: "On this page" })
  ).toBeInTheDocument();
  headings.forEach(({ id, text }) =>
    expect(screen.getByRole("link", { name: text })).toHaveAttribute(
      "href",
      `#${id}`
    )
  );
  expect(screen.getByRole("link", { name: "The situation" })).toHaveAttribute(
    "aria-current",
    "location"
  );
});

test("marks the section that has scrolled under the header", async () => {
  placeHeadings({ situation: 300, decision: 900, outcome: 1500 });
  render(<CaseStudyToc headings={headings} />);

  placeHeadings({ situation: -700, decision: 40, outcome: 640 });
  await act(async () => {
    window.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });

  expect(screen.getByRole("link", { name: "The decision" })).toHaveAttribute(
    "aria-current",
    "location"
  );
  expect(
    screen.getByRole("link", { name: "The situation" })
  ).not.toHaveAttribute("aria-current");
});
