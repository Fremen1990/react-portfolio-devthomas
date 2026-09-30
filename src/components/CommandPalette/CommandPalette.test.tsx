import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, expect, test, vi } from "vitest";
import NavBar from "../NavBar/NavBar";
import { SectionBand } from "../SectionBand/SectionBand";

const installMatchMedia = () => {
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes("min-width: 801px"),
      media: query,
      addEventListener() {},
      removeEventListener() {},
    }) as unknown as MediaQueryList;
};

const renderPage = () =>
  render(
    <>
      <NavBar />
      <SectionBand id="work" title="Selected work">
        <p>Work body</p>
      </SectionBand>
      <SectionBand id="contact" title="Contact">
        <p>Contact body</p>
      </SectionBand>
    </>
  );

const dialog = () => screen.getByRole("dialog", { hidden: true });
const input = () =>
  screen.getByRole("combobox", { name: "Search commands", hidden: true });
const pressShortcut = () =>
  fireEvent.keyDown(document.body, { key: "k", ctrlKey: true });

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove(
    "dark-theme",
    "light-theme",
    "skin-terminal"
  );
  window.history.replaceState(null, "", window.location.pathname);
  Element.prototype.scrollIntoView = vi.fn();
  vi.mocked(usePathname).mockReturnValue("/");
  installMatchMedia();
});

test("Ctrl+K opens the palette on the search field and closes it again", () => {
  renderPage();
  expect(dialog()).not.toHaveAttribute("open");

  pressShortcut();
  expect(dialog()).toHaveAttribute("open");
  expect(input()).toHaveFocus();

  pressShortcut();
  expect(dialog()).not.toHaveAttribute("open");
});

test("the header button opens the palette, and Escape returns focus to it", () => {
  renderPage();
  const button = screen.getByRole("button", { name: "Open command palette" });
  button.focus();
  fireEvent.click(button);
  expect(dialog()).toHaveAttribute("open");

  fireEvent.keyDown(input(), { key: "Escape" });
  expect(dialog()).not.toHaveAttribute("open");
  expect(button).toHaveFocus();
});

test("typing filters the list and Enter runs the highlighted command", () => {
  renderPage();
  pressShortcut();

  fireEvent.change(input(), { target: { value: "contact" } });
  const options = screen.getAllByRole("option", { hidden: true });
  expect(options[0]).toHaveTextContent("Go to Contact");
  expect(options[0]).toHaveAttribute("aria-selected", "true");
  expect(input()).toHaveAttribute("aria-activedescendant", options[0].id);

  fireEvent.keyDown(input(), { key: "Enter" });
  expect(dialog()).not.toHaveAttribute("open");
  expect(window.location.hash).toBe("#contact");
  expect(document.getElementById("contact-heading")).toHaveFocus();
});

test("arrow keys move the highlight and wrap around", () => {
  renderPage();
  pressShortcut();
  const options = () => screen.getAllByRole("option", { hidden: true });

  fireEvent.keyDown(input(), { key: "ArrowDown" });
  expect(options()[1]).toHaveAttribute("aria-selected", "true");
  fireEvent.keyDown(input(), { key: "ArrowUp" });
  fireEvent.keyDown(input(), { key: "ArrowUp" });
  expect(options().at(-1)).toHaveAttribute("aria-selected", "true");
});

test("a theme command updates the header's theme button", () => {
  renderPage();
  pressShortcut();
  fireEvent.change(input(), { target: { value: "dark theme" } });
  fireEvent.keyDown(input(), { key: "Enter" });

  expect(document.documentElement).toHaveClass("dark-theme");
  expect(
    screen.getByRole("button", { name: "Switch to light theme" })
  ).toHaveAttribute("aria-pressed", "true");
});

test("in the terminal skin, commands are typed and unknown ones are reported", () => {
  document.documentElement.classList.add("skin-terminal");
  const open = vi.spyOn(window, "open").mockReturnValue(null);
  renderPage();
  pressShortcut();

  fireEvent.change(input(), { target: { value: "nope" } });
  expect(screen.getAllByText("command not found: nope — type help")[0]).toBe(
    document.querySelector(".palette-empty")
  );

  fireEvent.change(input(), { target: { value: "cat cv" } });
  fireEvent.keyDown(input(), { key: "Enter" });
  expect(open).toHaveBeenCalledWith(
    "https://cv.devthomas.pl/",
    "_blank",
    "noopener,noreferrer"
  );
  open.mockRestore();
});

test("help lists every command and exit closes the palette", () => {
  renderPage();
  pressShortcut();
  const all = screen.getAllByRole("option", { hidden: true }).length;

  fireEvent.change(input(), { target: { value: "help" } });
  expect(screen.getAllByRole("option", { hidden: true })).toHaveLength(all);
  fireEvent.keyDown(input(), { key: "Enter" });
  expect(dialog()).toHaveAttribute("open");

  fireEvent.change(input(), { target: { value: "exit" } });
  fireEvent.keyDown(input(), { key: "Enter" });
  expect(dialog()).not.toHaveAttribute("open");
});

test("copying the email confirms it, and falls back to showing it", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  renderPage();

  pressShortcut();
  fireEvent.change(input(), { target: { value: "copy email" } });
  await act(async () => {
    fireEvent.keyDown(input(), { key: "Enter" });
  });
  expect(writeText).toHaveBeenCalledWith("thomas.dev666@gmail.com");
  expect(screen.getByText("Email address copied")).toBeInTheDocument();

  writeText.mockRejectedValueOnce(new Error("denied"));
  pressShortcut();
  fireEvent.change(input(), { target: { value: "copy email" } });
  await act(async () => {
    fireEvent.keyDown(input(), { key: "Enter" });
  });
  expect(
    screen.getByText("Couldn't copy. The address is thomas.dev666@gmail.com")
  ).toBeInTheDocument();
});

test("off the home page, section commands navigate back to the home page", () => {
  const push = vi.fn();
  vi.mocked(usePathname).mockReturnValue("/work/example/");
  vi.mocked(useRouter).mockReturnValue({ push } as unknown as ReturnType<
    typeof useRouter
  >);
  render(<NavBar />);

  pressShortcut();
  fireEvent.change(input(), { target: { value: "cd work" } });
  fireEvent.keyDown(input(), { key: "Enter" });
  expect(push).toHaveBeenCalledWith("/#work");

  pressShortcut();
  fireEvent.change(input(), { target: { value: "whoami" } });
  fireEvent.keyDown(input(), { key: "Enter" });
  expect(push).toHaveBeenCalledWith("/");
});

test("the shortcut is ignored while typing in another text field", () => {
  render(
    <>
      <input aria-label="Other field" />
      <NavBar />
    </>
  );
  const other = screen.getByRole("textbox", { name: "Other field" });
  fireEvent.keyDown(other, { key: "k", ctrlKey: true });
  expect(dialog()).not.toHaveAttribute("open");
});
