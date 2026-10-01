import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ArchitecturePanel } from "./ArchitecturePanel";
import { profile } from "../../content/publicProfile";

const { parts } = profile.architecture;
const renderPanel = () =>
  render(<ArchitecturePanel {...profile.architecture} />);
const button = (label: string) =>
  screen.getByRole("button", { name: new RegExp(`^${label}`) });
const caption = () => document.querySelector(".arch-caption");

test("the first part is selected, and its caption shown, before any input", () => {
  renderPanel();
  expect(button(parts[0].label)).toHaveAttribute("aria-pressed", "true");
  parts
    .slice(1)
    .forEach((part) =>
      expect(button(part.label)).toHaveAttribute("aria-pressed", "false")
    );
  expect(caption()).toHaveTextContent(parts[0].caption);
  expect(caption()).toHaveAttribute("aria-live", "polite");
});

test("choosing a part selects only that part and swaps the caption", () => {
  renderPanel();
  const [backend, shell, contract] = parts;
  fireEvent.click(button(contract.label));
  expect(button(contract.label)).toHaveAttribute("aria-pressed", "true");
  expect(button(backend.label)).toHaveAttribute("aria-pressed", "false");
  expect(caption()).toHaveTextContent(contract.caption);

  fireEvent.click(button(shell.label));
  expect(button(shell.label)).toHaveAttribute("aria-pressed", "true");
  expect(button(contract.label)).toHaveAttribute("aria-pressed", "false");
  expect(caption()).toHaveTextContent(shell.caption);
});

test("parts are native buttons, so Tab, Enter and Space work", () => {
  renderPanel();
  for (const part of parts) {
    const element = button(part.label);
    expect(element.tagName).toBe("BUTTON");
    expect(element).toHaveAttribute("type", "button");
  }
});
