import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SelectedWork } from "./SelectedWork";
import { profile } from "../../content/publicProfile";

test("each project shows its outcome as a labelled callout", () => {
  render(<SelectedWork />);
  for (const item of profile.contributions) {
    if (!item.outcome) continue;
    const callout = screen.getByText(item.outcome).closest("div");
    expect(callout).toHaveClass("contribution-outcome");
    expect(callout).toHaveTextContent(/^Outcome/);
  }
  expect(document.querySelectorAll(".contribution-outcome")).toHaveLength(3);
});

test("technologies are a list of tags, with any note after them", () => {
  render(<SelectedWork />);
  const lists = screen.getAllByRole("list", { name: "Technologies" });
  expect(lists).toHaveLength(profile.contributions.length);
  profile.contributions.forEach((item, index) => {
    const tags = [...lists[index].querySelectorAll("li")];
    expect(tags.map((tag) => tag.textContent)).toEqual(item.technologies);
  });
  expect(
    screen.getByText("Additional backend contributions in Go")
  ).toBeInTheDocument();
});
