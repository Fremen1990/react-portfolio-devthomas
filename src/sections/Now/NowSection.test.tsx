import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { NowSection } from "./NowSection";
import { carBrain } from "../../content/carBrain";
import { carBrainLinks } from "../../content/carBrainLinks";
import { profile } from "../../content/publicProfile";
import { caseStudyPath } from "../../content/work/studies";

describe("while Car Brain is unpublished", () => {
  const hidden = { ...carBrain, published: false };

  test("the build carries no links for it", () => {
    if (!carBrain.published) {
      expect(carBrainLinks).toBeNull();
      expect(carBrain.appStoreUrl).toBe("");
    }
  });

  test("only TheEventa renders, across the full row", () => {
    const { container } = render(<NowSection carBrain={hidden} />);
    expect(
      screen.getByRole("article", { name: profile.building.title })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("article", { name: carBrain.title })
    ).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass("now-grid--single");
  });

  test("no store or site link reaches the page", () => {
    const { container } = render(<NowSection carBrain={hidden} />);
    expect(container.innerHTML).not.toContain("apps.apple.com");
    expect(container.innerHTML).not.toContain("car-brain.com");
  });
});

describe("once Car Brain is published", () => {
  const shown = {
    ...carBrain,
    published: true,
    appStoreUrl: "https://apps.apple.com/app/id6754179380",
    siteUrl: "https://car-brain.com/en",
  };

  test("both cards render side by side, with the store link", () => {
    const { container } = render(<NowSection carBrain={shown} />);
    expect(
      screen.getByRole("article", { name: carBrain.title })
    ).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass("now-grid--single");
    expect(
      screen.getByRole("link", { name: carBrain.appStoreLabel })
    ).toHaveAttribute("href", shown.appStoreUrl);
  });

  test("the screen buttons swap the screenshot", () => {
    render(<NowSection carBrain={shown} />);
    const [first, second] = carBrain.shots;
    const tab = (label: string) => screen.getByRole("button", { name: label });

    expect(screen.getByRole("img", { name: first.alt })).toHaveAttribute(
      "src",
      first.src
    );
    expect(tab(first.label)).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(tab(second.label));
    const image = screen.getByRole("img", { name: second.alt });
    expect(image).toHaveAttribute("src", second.src);
    expect(image).toHaveAttribute("width", String(carBrain.shotWidth));
    expect(image).toHaveAttribute("height", String(carBrain.shotHeight));
    expect(tab(second.label)).toHaveAttribute("aria-pressed", "true");
    expect(tab(first.label)).toHaveAttribute("aria-pressed", "false");
  });
});

test("TheEventa links to its case study", () => {
  render(<NowSection carBrain={{ ...carBrain, published: false }} />);
  // next/link drops the trailing slash outside the Next build.
  expect(
    screen.getByRole("link", { name: /How I run delivery/ })
  ).toHaveAttribute("href", caseStudyPath("theeventa-mvp").replace(/\/$/, ""));
});
