import React from "react";
import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { SelectedWork } from "./SelectedWork";
import { profile } from "../../content/publicProfile";
import { caseStudyFor, caseStudyPath } from "../../content/work/studies";

test("each contribution is an article named by its title, with its tags", () => {
  render(<SelectedWork />);
  const articles = screen.getAllByRole("article");
  expect(articles).toHaveLength(profile.contributions.length);
  profile.contributions.forEach((item, index) => {
    expect(articles[index]).toHaveAccessibleName(item.title);
    const tags = within(articles[index]).getByRole("list", {
      name: "Technologies",
    });
    expect(
      within(tags)
        .getAllByRole("listitem")
        .map((tag) => tag.textContent)
    ).toEqual(item.tags);
  });
});

test("each card links to its case study", () => {
  render(<SelectedWork />);
  for (const item of profile.contributions) {
    const study = caseStudyFor(item.id);
    expect(study).toBeDefined();
    const link = screen.getByRole("link", {
      name: new RegExp(`about ${study!.title}`),
    });
    // next/link drops the trailing slash outside the Next build.
    expect(link.getAttribute("href")).toBe(
      caseStudyPath(study!.slug).replace(/\/$/, "")
    );
  }
});

test("bars are decorative; their labels and values stay as text", () => {
  const { container } = render(<SelectedWork />);
  const bars = profile.contributions.flatMap((item) => item.bars ?? []);
  expect(bars.length).toBeGreaterThan(0);
  for (const bar of bars) {
    expect(screen.getByText(bar.label)).toBeVisible();
    expect(screen.getByText(bar.value)).toBeVisible();
  }
  const drawn = container.querySelectorAll(".bar");
  expect(drawn).toHaveLength(bars.length);
  drawn.forEach((element) =>
    expect(element).toHaveAttribute("aria-hidden", "true")
  );
});
