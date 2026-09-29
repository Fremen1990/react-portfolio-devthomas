import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
  screen.getAllByRole("link", { name: "View CV" }).forEach((link) => {
    expect(link).toHaveAttribute("href", "https://cv.devthomas.pl/");
  });
  expect(
    screen.queryByRole("link", { name: "Experience" })
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
});

test("marks the section currently below the header", async () => {
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: 800,
  });
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    writable: true,
    value: 0,
  });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 5000,
  });

  const ids = ["work", "approach", "about", "contact"];
  const sections = ids.map((id) => {
    const section = document.createElement("section");
    section.id = id;
    document.body.appendChild(section);
    return section;
  });

  const tops = {
    work: 400,
    approach: 900,
    about: 1400,
    contact: 1900,
  };
  sections.forEach((section) => {
    section.getBoundingClientRect = () => ({
      top: tops[section.id],
      bottom: tops[section.id] + 400,
      left: 0,
      right: 0,
      width: 0,
      height: 400,
      x: 0,
      y: tops[section.id],
      toJSON: () => {},
    });
  });

  const flush = () =>
    act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

  render(<NavBar />);
  await flush();
  expect(screen.getByRole("link", { name: "Work" })).not.toHaveAttribute(
    "aria-current"
  );

  tops.work = 0;
  window.dispatchEvent(new Event("scroll"));
  await flush();
  expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
    "aria-current",
    "true"
  );
  expect(screen.getByRole("link", { name: "Approach" })).not.toHaveAttribute(
    "aria-current"
  );
  screen.getAllByRole("link", { name: "View CV" }).forEach((link) => {
    expect(link).not.toHaveAttribute("aria-current");
  });

  sections.forEach((section) => section.remove());
});

test("theme control stores the chosen appearance", () => {
  localStorage.removeItem("portfolio-theme");
  document.documentElement.classList.remove("dark-theme", "light-theme");

  render(<NavBar />);

  const toggle = screen.getByRole("button", { name: "Switch to dark theme" });
  expect(toggle).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(toggle);
  expect(document.documentElement).toHaveClass("dark-theme");
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(toggle).toHaveAttribute("aria-label", "Switch to light theme");
  expect(localStorage.getItem("portfolio-theme")).toBe("dark");

  fireEvent.click(toggle);
  expect(document.documentElement).toHaveClass("light-theme");
  expect(document.documentElement).not.toHaveClass("dark-theme");
  expect(localStorage.getItem("portfolio-theme")).toBe("light");

  localStorage.removeItem("portfolio-theme");
  document.documentElement.classList.remove("dark-theme", "light-theme");
});

test("choosing a link closes the open menu", () => {
  render(<NavBar />);

  const menu = screen.getByRole("button", { name: "Menu" });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "true");

  fireEvent.click(screen.getByRole("link", { name: "Approach" }));
  expect(menu).toHaveAttribute("aria-expanded", "false");
});
