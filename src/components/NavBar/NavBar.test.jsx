import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";

test("menu reports expanded state and closes on Escape", () => {
  render(<NavBar />);

  const menu = screen.getByRole("button", { name: "Menu" });
  expect(menu).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "true");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("navigation points at work, approach, background, contact, and the CV", () => {
  render(<NavBar />);

  expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
    "href",
    "#work"
  );
  expect(screen.getByRole("link", { name: "Approach" })).toHaveAttribute(
    "href",
    "#approach"
  );
  expect(screen.getByRole("link", { name: "Background" })).toHaveAttribute(
    "href",
    "#about"
  );
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "href",
    "#contact"
  );
  expect(screen.getByRole("link", { name: "View CV" })).toHaveAttribute(
    "href",
    "https://cv.devthomas.pl/"
  );
  expect(
    screen.queryByRole("link", { name: "Experience" })
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
});

test("choosing a link closes the open menu", () => {
  render(<NavBar />);

  const menu = screen.getByRole("button", { name: "Menu" });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "true");

  fireEvent.click(screen.getByRole("link", { name: "Approach" }));
  expect(menu).toHaveAttribute("aria-expanded", "false");
});
