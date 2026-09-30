import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SelectedWork } from "./SelectedWork";
import { profile } from "../../content/publicProfile";

test("each project shows its outcome under the summary", () => {
  render(<SelectedWork />);
  for (const item of profile.contributions) {
    if (!item.outcome) continue;
    const outcome = screen.getByText(item.outcome);
    expect(outcome.closest("p")).toHaveClass("contribution-outcome");
    expect(outcome.closest("p")).toHaveTextContent(/^Outcome:/);
  }
  expect(document.querySelectorAll(".contribution-outcome")).toHaveLength(3);
});
