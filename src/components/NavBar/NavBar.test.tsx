import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, expect, test, vi, type Mock } from "vitest";
import NavBar from "./NavBar";
import { Hero } from "../Hero/Hero";
import { SectionBand } from "../SectionBand/SectionBand";

const mediaState = {
  desktop: true,
  reduce: false,
  dark: false,
};

type MediaListener = (event: { matches: boolean; media: string }) => void;

const installMatchMedia = (overrides: Partial<typeof mediaState> = {}) => {
  Object.assign(mediaState, {
    desktop: true,
    reduce: false,
    dark: false,
    ...overrides,
  });
  const listeners: { query: string; listener: MediaListener }[] = [];
  window.matchMedia = (query: string) => {
    const list = {
      media: query,
      addEventListener: (type: string, listener: MediaListener) => {
        if (type === "change") {
          listeners.push({ query, listener });
        }
      },
      removeEventListener: (_type: string, listener: MediaListener) => {
        const index = listeners.findIndex(
          (item) => item.query === query && item.listener === listener
        );
        if (index >= 0) {
          listeners.splice(index, 1);
        }
      },
      addListener() {},
      removeListener() {},
      dispatchEvent() {
        return false;
      },
    };
    Object.defineProperty(list, "matches", {
      get() {
        if (query.includes("min-width: 801px")) {
          return mediaState.desktop;
        }
        if (query.includes("prefers-reduced-motion")) {
          return mediaState.reduce;
        }
        if (query.includes("prefers-color-scheme: dark")) {
          return mediaState.dark;
        }
        return false;
      },
    });
    return list as unknown as MediaQueryList;
  };

  return {
    setDark(dark: boolean) {
      mediaState.dark = dark;
      listeners
        .filter((item) => item.query.includes("prefers-color-scheme: dark"))
        .forEach((item) => item.listener({ matches: dark, media: item.query }));
    },
    setDesktop(desktop: boolean) {
      mediaState.desktop = desktop;
      listeners
        .filter((item) => item.query.includes("min-width: 801px"))
        .forEach((item) =>
          item.listener({ matches: desktop, media: item.query })
        );
    },
  };
};

const renderPage = () =>
  render(
    <>
      <NavBar />
      <Hero />
      <SectionBand id="work" title="Selected work">
        <p>Work body</p>
      </SectionBand>
      <SectionBand id="approach" title="How I work">
        <p>Approach body</p>
      </SectionBand>
      <SectionBand id="about" title="Background">
        <p>Background body</p>
      </SectionBand>
      <SectionBand id="contact" title="Contact">
        <p>Contact body</p>
      </SectionBand>
    </>
  );

beforeEach(() => {
  localStorage.removeItem("portfolio-theme");
  localStorage.removeItem("portfolio-skin");
  document.documentElement.classList.remove(
    "dark-theme",
    "light-theme",
    "skin-terminal"
  );
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`
  );
  Element.prototype.scrollIntoView = vi.fn();
  vi.mocked(usePathname).mockReturnValue("/");
  installMatchMedia();
});

test("Escape inside the open menu closes it and returns focus to Menu", () => {
  installMatchMedia({ desktop: false });
  renderPage();

  const menu = screen.getByRole("button", { name: "Menu" });
  expect(menu).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "true");

  const work = screen.getByRole("link", { name: "Work" });
  work.focus();
  expect(work).toHaveFocus();

  fireEvent.keyDown(work, { key: "Escape" });
  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(menu).toHaveFocus();
});

test("Escape outside the open menu does not close it or move focus", () => {
  installMatchMedia({ desktop: false });
  renderPage();

  const menu = screen.getByRole("button", { name: "Menu" });
  const theme = screen.getByRole("button", { name: "Switch to dark theme" });
  fireEvent.click(menu);
  theme.focus();

  fireEvent.keyDown(theme, { key: "Escape" });
  expect(menu).toHaveAttribute("aria-expanded", "true");
  expect(theme).toHaveFocus();
});

test("a closed mobile menu is removed from keyboard navigation", () => {
  installMatchMedia({ desktop: false });
  render(<NavBar />);

  expect(screen.queryByRole("link", { name: "Work" })).not.toBeInTheDocument();
  expect(document.getElementById("site-nav-links")).toHaveAttribute("hidden");

  fireEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
  expect(document.getElementById("site-nav-links")).not.toHaveAttribute(
    "hidden"
  );
});

test("desktop links stay available after resizing an open or closed mobile menu", () => {
  const media = installMatchMedia({ desktop: false });
  render(<NavBar />);

  expect(screen.queryByRole("link", { name: "Work" })).not.toBeInTheDocument();
  act(() => media.setDesktop(true));
  expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();

  act(() => media.setDesktop(false));
  fireEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(screen.getByRole("link", { name: "Approach" })).toBeInTheDocument();
  act(() => media.setDesktop(true));
  expect(screen.getByRole("link", { name: "Approach" })).toBeInTheDocument();
  expect(document.getElementById("site-nav-links")).not.toHaveAttribute(
    "hidden"
  );
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

  const tops: Record<string, number> = {
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

test("without a saved choice, the control follows the OS color scheme", () => {
  installMatchMedia({ dark: true });
  render(<NavBar />);

  const toggle = screen.getByRole("button", { name: "Switch to light theme" });
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(localStorage.getItem("portfolio-theme")).toBeNull();
  expect(document.documentElement).not.toHaveClass("dark-theme");
  expect(document.documentElement).not.toHaveClass("light-theme");
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

test("the standard style is the default", () => {
  render(<NavBar />);

  const skin = screen.getByRole("button", {
    name: "Switch to terminal style",
  });
  expect(skin).toHaveAttribute("aria-pressed", "false");
  expect(document.documentElement).not.toHaveClass("skin-terminal");
  expect(localStorage.getItem("portfolio-skin")).toBeNull();
});

test("style control switches to terminal, stores it, and switches back", () => {
  render(<NavBar />);

  const skin = screen.getByRole("button", {
    name: "Switch to terminal style",
  });
  fireEvent.click(skin);
  expect(document.documentElement).toHaveClass("skin-terminal");
  expect(skin).toHaveAttribute("aria-pressed", "true");
  expect(skin).toHaveAttribute("aria-label", "Switch to standard style");
  expect(localStorage.getItem("portfolio-skin")).toBe("terminal");

  fireEvent.click(skin);
  expect(document.documentElement).not.toHaveClass("skin-terminal");
  expect(skin).toHaveAttribute("aria-pressed", "false");
  expect(localStorage.getItem("portfolio-skin")).toBeNull();
});

test("style and theme are independent choices", () => {
  render(<NavBar />);

  fireEvent.click(
    screen.getByRole("button", { name: "Switch to terminal style" })
  );
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));

  expect(document.documentElement).toHaveClass("skin-terminal");
  expect(document.documentElement).toHaveClass("dark-theme");
  expect(localStorage.getItem("portfolio-skin")).toBe("terminal");
  expect(localStorage.getItem("portfolio-theme")).toBe("dark");
});

test("a saved terminal style is shown as selected", () => {
  document.documentElement.classList.add("skin-terminal");
  render(<NavBar />);

  expect(
    screen.getByRole("button", { name: "Switch to standard style" })
  ).toHaveAttribute("aria-pressed", "true");
});

test("choosing a section link closes the menu, focuses its heading, and sets the hash", () => {
  installMatchMedia({ desktop: false });
  const focus = vi.spyOn(HTMLElement.prototype, "focus");
  renderPage();

  const menu = screen.getByRole("button", { name: "Menu" });
  fireEvent.click(menu);
  (Element.prototype.scrollIntoView as Mock).mockClear();
  focus.mockClear();

  fireEvent.click(screen.getByRole("link", { name: "Approach" }));

  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(document.getElementById("approach-heading")).toHaveFocus();
  expect(document.getElementById("approach-heading")).toHaveClass("nav-target");
  expect(window.location.hash).toBe("#approach");
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
    behavior: "smooth",
    block: "start",
  });
  expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  focus.mockRestore();
});

test("modified clicks keep native link behavior", () => {
  renderPage();
  const work = screen.getByRole("link", { name: "Work" });

  expect(fireEvent.click(work, { metaKey: true })).toBe(true);
  expect(window.location.hash).toBe("");
  expect(document.getElementById("work-heading")).not.toHaveFocus();

  expect(fireEvent.click(work, { ctrlKey: true })).toBe(true);
  expect(fireEvent.click(work, { shiftKey: true })).toBe(true);
  expect(fireEvent.click(work, { altKey: true })).toBe(true);
  expect(fireEvent.click(work, { button: 1 })).toBe(true);
  expect(window.location.hash).toBe("");
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
});

test("reduced motion scrolls instantly and still focuses the heading", () => {
  installMatchMedia({ reduce: true });
  renderPage();

  fireEvent.click(screen.getByRole("link", { name: "Work" }));

  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
    behavior: "auto",
    block: "start",
  });
  expect(document.getElementById("work-heading")).toHaveFocus();
});

test("the browser Back button restores the previous fragment and focus", async () => {
  renderPage();

  fireEvent.click(screen.getByRole("link", { name: "Work" }));
  fireEvent.click(screen.getByRole("link", { name: "Contact" }));
  expect(window.location.hash).toBe("#contact");

  // jsdom traverses history on a nested timeout.
  await act(async () => {
    window.history.back();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(window.location.hash).toBe("#work");
  expect(document.getElementById("work-heading")).toHaveFocus();
});

test("the home brand link focuses the hero heading", () => {
  renderPage();

  fireEvent.click(
    screen.getByRole("link", { name: "devthomas.pl Tomasz Stanisz" })
  );

  expect(window.location.hash).toBe("#home");
  expect(document.getElementById("home-heading")).toHaveFocus();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});

test("the hero's section link scrolls and focuses like the header links", () => {
  renderPage();

  const explore = screen.getByRole("link", { name: "Explore selected work" });
  expect(fireEvent.click(explore)).toBe(false);

  expect(window.location.hash).toBe("#work");
  expect(document.getElementById("work-heading")).toHaveFocus();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});

test("in-page links without a section heading keep native behavior", () => {
  render(
    <>
      <a href="#main">Skip to content</a>
      <NavBar />
      <main id="main">Main content</main>
    </>
  );

  const skip = screen.getByRole("link", { name: "Skip to content" });
  expect(fireEvent.click(skip)).toBe(true);
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
});

test("off the home page, the brand and section links lead back to the home page", () => {
  vi.mocked(usePathname).mockReturnValue("/work/example/");
  render(<NavBar />);

  expect(
    screen.getByRole("link", { name: "devthomas.pl Tomasz Stanisz" })
  ).toHaveAttribute("href", "/");
  for (const [name, href] of [
    ["Work", "/#work"],
    ["Approach", "/#approach"],
    ["Background", "/#about"],
    ["Contact", "/#contact"],
  ]) {
    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
    expect(link).not.toHaveAttribute("aria-current");
  }
});

test("a system dark-mode change doesn't override a theme opened from a shared link", () => {
  const media = installMatchMedia({ dark: false });
  sessionStorage.setItem("portfolio-link-theme", "light");
  document.documentElement.classList.add("light-theme");
  render(<NavBar />);

  act(() => media.setDark(true));
  expect(document.documentElement).toHaveClass("light-theme");
  expect(
    screen.getByRole("button", { name: "Switch to dark theme" })
  ).toBeInTheDocument();
  sessionStorage.clear();
});

test("without a saved or linked theme, a system change is followed", () => {
  const media = installMatchMedia({ dark: false });
  render(<NavBar />);
  act(() => media.setDark(true));
  expect(
    screen.getByRole("button", { name: "Switch to light theme" })
  ).toBeInTheDocument();
});

test("on a look page, section links stay on the page", () => {
  vi.mocked(usePathname).mockReturnValue("/look/terminal-dark/");
  render(<NavBar />);
  expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
    "href",
    "#work"
  );
});
