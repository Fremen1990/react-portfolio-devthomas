import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { visiblePosts } from "../src/content/blog/.generated/posts";
import { blogArticlePath } from "../src/content/blog/model";
import { carBrain } from "../src/content/carBrain";

// Original routes; Polish counterparts have full coverage in localization.spec.ts.
const PAGES = [
  "/",
  "/colophon/",
  "/blog/",
  "/blog/pl/",
  ...visiblePosts.flatMap((post) =>
    (["en", "pl"] as const).map((locale) => blogArticlePath(post.slug, locale))
  ),
  "/work/orange-cms/",
  "/work/orange-e2e-testing/",
  "/work/theeventa-mvp/",
];

const SKINS = ["standard", "terminal"] as const;
const THEMES = ["light", "dark"] as const;

type Skin = (typeof SKINS)[number];
type Theme = (typeof THEMES)[number];

const usePreferences = async (page: Page, skin: Skin, theme: Theme) => {
  await page.addInitScript(
    ([s, t]) => {
      localStorage.setItem("portfolio-theme", t);
      if (s === "terminal") localStorage.setItem("portfolio-skin", "terminal");
    },
    [skin, theme] as const
  );
};

// The shortcut listener attaches after hydration, which can lag behind the
// load event on a slow CI machine. Retry until the palette is open.
const openPalette = async (page: Page) => {
  const dialog = page.getByRole("dialog", { name: "Command palette" });
  await expect(async () => {
    if (!(await dialog.isVisible())) {
      await page.keyboard.press("ControlOrMeta+k");
    }
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();
};

for (const path of PAGES) {
  test(`${path} has a title, description, canonical and Open Graph tags`, async ({
    page,
  }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Tomasz Stanisz/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S/
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://devthomas.pl${path}`
    );
    for (const property of ["og:title", "og:description", "og:url"]) {
      await expect(
        page.locator(`meta[property="${property}"]`)
      ).toHaveAttribute("content", /\S/);
    }
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `https://devthomas.pl${path.startsWith("/blog/en/") || /^\/blog\/pl\/[^/]+\/$/.test(path) ? `${path}card.jpg` : path === "/blog/pl/" ? "/pl/look/standard-light/card.jpg" : "/og-share.png"}`
    );
  });
}

test("an unknown path shows the not-found page", async ({ page }) => {
  const response = await page.goto("/no-such-page/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Go to the portfolio" })
  ).toHaveAttribute("href", "/");
});

test("the home page is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /I turn complex requirements into working software/,
    })
  ).toBeVisible();
  for (const name of [
    "Proven in production",
    "Now building and shipped",
    "How I work, and where it shows",
    "Background",
    "Open to hands-on tech-lead roles",
  ]) {
    await expect(
      page.getByRole("heading", { level: 2, name, exact: true })
    ).toBeVisible();
  }
  // The architecture panel shows its first part's caption without scripts.
  await expect(
    page.getByRole("button", { name: /^Backend/, pressed: true })
  ).toBeVisible();
  await expect(
    page.getByText(/^The backend describes the frontend/)
  ).toBeVisible();
  await context.close();
});

for (const skin of SKINS) {
  test(`loads without console errors or hydration warnings (${skin})`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        errors.push(message.text());
      }
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await usePreferences(page, skin, "dark");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

test("a saved skin and theme apply before the page renders", async ({
  page,
}) => {
  await usePreferences(page, "terminal", "dark");
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/skin-terminal/);
  await expect(html).toHaveClass(/dark-theme/);
  await expect(
    page.getByRole("button", { name: "Switch to standard style" })
  ).toHaveAttribute("aria-pressed", "true");
});

test.describe("share links", () => {
  const html = (page: Page) => page.locator("html");
  const themeColor = (page: Page) => page.locator('meta[name="theme-color"]');

  test("open the exact skin and theme, over the visitor's saved light theme", async ({
    page,
  }) => {
    await usePreferences(page, "standard", "light");
    await page.goto("/?skin=terminal&theme=dark");
    await expect(html(page)).toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/dark-theme/);
    await expect(themeColor(page)).toHaveCount(1);
    await expect(themeColor(page)).toHaveAttribute("content", "#07090a");
    // The visitor's own saved choice is untouched.
    expect(
      await page.evaluate(() => [
        localStorage.getItem("portfolio-theme"),
        localStorage.getItem("portfolio-skin"),
      ])
    ).toEqual(["light", null]);
  });

  test("the look holds for the visit: reloads and other pages", async ({
    page,
  }) => {
    await page.goto("/?skin=terminal&theme=dark");
    await page.reload();
    await expect(html(page)).toHaveClass(/skin-terminal/);
    await page.goto("/colophon/");
    await expect(html(page)).toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/dark-theme/);
  });

  test("a new visit returns to the visitor's own look", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const first = await context.newPage();
    await first.goto("/?skin=terminal&theme=dark");
    await expect(html(first)).toHaveClass(/skin-terminal/);

    // A new tab has a fresh session; saved choices (none here) apply.
    const second = await context.newPage();
    await second.goto("/");
    await expect(html(second)).not.toHaveClass(/skin-terminal/);
    await expect(html(second)).not.toHaveClass(/dark-theme/);
    await context.close();
  });

  test("the visitor's own choice replaces the linked look", async ({
    page,
  }) => {
    await page.goto("/?skin=terminal&theme=dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page
      .getByRole("button", { name: "Switch to standard style" })
      .click();
    await page.goto("/");
    await expect(html(page)).not.toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/light-theme/);
    expect(
      await page.evaluate(() => localStorage.getItem("portfolio-theme"))
    ).toBe("light");
  });

  test("a choice made after opening the link survives a reload of that link", async ({
    page,
  }) => {
    await page.goto("/?skin=terminal&theme=dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page
      .getByRole("button", { name: "Switch to standard style" })
      .click();

    await page.reload();
    expect(page.url()).toContain("?skin=terminal&theme=dark");
    await expect(html(page)).not.toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/light-theme/);
    // The standard header is a dark band in both themes.
    await expect(themeColor(page)).toHaveAttribute("content", "#0f1413");
  });

  test("changing only one part keeps the other from the link after a reload", async ({
    page,
  }) => {
    await page.goto("/?skin=terminal&theme=dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page.reload();
    await expect(html(page)).toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/light-theme/);
  });

  test("Back to the link page keeps the visitor's choice", async ({ page }) => {
    await page.goto("/?skin=terminal&theme=dark");
    await page
      .getByRole("button", { name: "Switch to standard style" })
      .click();
    await page.goto("/colophon/");
    await page.goBack();
    expect(page.url()).toContain("?skin=terminal&theme=dark");
    await expect(html(page)).not.toHaveClass(/skin-terminal/);
  });

  test("opening the link again in a new tab shows the linked look", async ({
    page,
    context,
  }) => {
    await page.goto("/?skin=terminal&theme=dark");
    await page
      .getByRole("button", { name: "Switch to standard style" })
      .click();
    const again = await context.newPage();
    await again.goto("/?skin=terminal&theme=dark");
    await expect(html(again)).toHaveClass(/skin-terminal/);
    await expect(html(again)).toHaveClass(/dark-theme/);
  });

  test("one parameter works alone, and invalid values are ignored", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/?theme=light");
    await expect(html(page)).toHaveClass(/light-theme/);
    await expect(html(page)).not.toHaveClass(/skin-terminal/);

    const other = await context.newPage();
    await other.goto("/?skin=neon&theme=purple");
    await expect(html(other)).not.toHaveClass(/skin-terminal/);
    await expect(html(other)).not.toHaveClass(/light-theme|dark-theme/);
    await context.close();
  });

  test("still apply when storage is blocked", async ({ page }) => {
    await page.addInitScript(() => {
      for (const name of ["localStorage", "sessionStorage"]) {
        Object.defineProperty(window, name, {
          get() {
            throw new Error("storage blocked");
          },
        });
      }
    });
    await page.goto("/?skin=terminal&theme=dark");
    await expect(html(page)).toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/dark-theme/);
  });

  test("copying still works when the Clipboard API is refused", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.addInitScript(() => {
      navigator.clipboard.writeText = () =>
        Promise.reject(new DOMException("denied", "NotAllowedError"));
    });
    await page.goto("/");
    await openPalette(page);
    await page.getByRole("combobox", { name: "Search commands" }).fill("share");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Link copied")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "https://devthomas.pl/look/standard-light/"
    );
  });

  for (const skin of SKINS) {
    test(`the message appears at the top, below the header (${skin})`, async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await usePreferences(page, skin, "dark");
      await page.goto("/");
      await openPalette(page);
      await page
        .getByRole("combobox", { name: "Search commands" })
        .fill("copy email");
      await page.keyboard.press("Enter");
      const toast = page.getByText("Email address copied");
      await expect(toast).toBeVisible();
      const header = await page.locator(".site-header").boundingBox();
      await expect
        .poll(async () => (await toast.boundingBox())?.y ?? -1)
        .toBeGreaterThanOrEqual((header?.y ?? 0) + (header?.height ?? 0));
      expect((await toast.boundingBox())?.y).toBeLessThan(200);
    });
  }

  test("the palette copies a link to the current look", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await usePreferences(page, "terminal", "dark");
    await page.goto("/colophon/");
    await openPalette(page);
    await page.getByRole("combobox", { name: "Search commands" }).fill("share");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Link copied")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "https://devthomas.pl/colophon/?skin=terminal&theme=dark"
    );
  });
});

test("developers get a console greeting in production", async ({ page }) => {
  const logs: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "log") logs.push(message.text());
  });
  await page.goto("/");
  await expect
    .poll(() => logs.join("\n"))
    .toContain("github.com/Fremen1990/react-portfolio-devthomas");
});

test("theme and skin controls switch and persist across reloads", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to terminal style" }).click();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();

  const html = page.locator("html");
  await expect(html).toHaveClass(/skin-terminal/);
  await expect(html).toHaveClass(/dark-theme/);
  const themeColor = page.locator('meta[name="theme-color"]');
  await expect(themeColor).toHaveCount(1);
  await expect(themeColor).toHaveAttribute("content", "#07090a");
});

test("theme-color follows the operating system when nothing is saved", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/");
  const themeColor = page.locator('meta[name="theme-color"]');
  await expect(themeColor).toHaveCount(1);
  await expect(themeColor).toHaveAttribute("content", "#0f1413");
  await context.close();
});

test("the hero link scrolls to the work and focuses its heading", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "See the work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Proven in production" })
  ).toBeFocused();
});

for (const skin of SKINS) {
  test(`the architecture panel works from the keyboard (${skin})`, async ({
    page,
  }) => {
    await usePreferences(page, skin, "dark");
    await page.goto("/");
    const backend = page.locator(".arch-node--root");
    const forms = page.getByRole("button", { name: /RJSF \+ custom widgets/ });
    await expect(backend).toHaveAttribute("aria-pressed", "true");

    // Tab from the backend part through the shell and contract parts.
    await backend.focus();
    for (let step = 0; step < 3; step += 1) {
      await page.keyboard.press("Tab");
    }
    await expect(forms).toBeFocused();
    const outline = await forms.evaluate(
      (element) => getComputedStyle(element).outlineStyle
    );
    expect(outline).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect(forms).toHaveAttribute("aria-pressed", "true");
    await expect(backend).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".arch-caption")).toHaveText(/^RJSF renders/);

    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Space");
    await expect(forms).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".arch-caption")).not.toHaveText(/^RJSF renders/);
  });
}

test("motion stops under reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator("#orange-e2e").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const running = await page.evaluate(
    () =>
      document
        .getAnimations()
        .filter((animation) => animation.playState === "running").length
  );
  expect(running).toBe(0);
  // The bars show at full length, without the entrance.
  const transform = await page
    .locator("#orange-e2e .bar--accent")
    .first()
    .evaluate((element) => getComputedStyle(element).transform);
  expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
  await context.close();
});

test("the E2E bars grow in once they scroll into view", async ({ page }) => {
  await page.goto("/");
  const bars = page.locator("#orange-e2e [data-reveal]");
  await expect(bars).toHaveAttribute("data-reveal", "armed");
  await page.locator("#orange-e2e").scrollIntoViewIfNeeded();
  await expect(bars).toHaveAttribute("data-reveal", "revealed");
});

test("Car Brain is visible while its store link remains gated", async ({
  page,
}) => {
  for (const path of ["/", "/look/standard-light/"]) {
    await page.goto(path);
    const html = await page.content();
    expect(html.includes("apps.apple.com")).toBe(carBrain.published);
    await expect(
      page.getByRole("heading", { level: 3, name: carBrain.title, exact: true })
    ).toHaveCount(1);
  }
});

for (const path of PAGES) {
  for (const skin of SKINS) {
    for (const theme of THEMES) {
      for (const width of [320, 801]) {
        test(`${path} has no sideways scroll at ${width}px (${skin}, ${theme})`, async ({
          page,
        }) => {
          await usePreferences(page, skin, theme);
          await page.setViewportSize({ width, height: 700 });
          await page.goto(path);
          await page.evaluate(() =>
            document.querySelectorAll("details").forEach((d) => (d.open = true))
          );
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth
          );
          expect(overflow).toBeLessThanOrEqual(0);
        });
      }

      test(`${path} has no accessibility violations (${skin}, ${theme})`, async ({
        page,
      }) => {
        await usePreferences(page, skin, theme);
        await page.goto(path);
        await page.evaluate(() =>
          document.querySelectorAll("details").forEach((d) => (d.open = true))
        );
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }
}

test.describe("command palette", () => {
  test("opens with the keyboard, traps focus, and runs a section command", async ({
    page,
  }) => {
    await page.goto("/");
    await openPalette(page);
    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible();
    const search = page.getByRole("combobox", { name: "Search commands" });
    await expect(search).toBeFocused();

    // The page behind the modal dialog is inert: Tab never reaches it.
    for (let step = 0; step < 3; step += 1) {
      await page.keyboard.press("Tab");
      const onPageBehind = await page.evaluate(() => {
        const active = document.activeElement;
        return Boolean(
          active && active !== document.body && !active.closest("dialog")
        );
      });
      expect(onPageBehind).toBe(false);
    }
    await search.focus();

    await search.fill("contact");
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Open to hands-on tech-lead roles",
      })
    ).toBeFocused();
  });

  test("the header button opens it and Escape returns focus", async ({
    page,
  }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open command palette" });
    await button.click();
    await expect(
      page.getByRole("dialog", { name: "Command palette" })
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: "Command palette" })
    ).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("copies the email address", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await openPalette(page);
    await page
      .getByRole("combobox", { name: "Search commands" })
      .fill("copy email");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Email address copied")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "thomas.dev666@gmail.com"
    );
  });

  test("is a shell prompt in the terminal skin", async ({ page }) => {
    await usePreferences(page, "terminal", "dark");
    await page.goto("/");
    await openPalette(page);
    await expect(page.getByText("tomasz@devthomas:~$")).toBeVisible();
    await page.getByRole("combobox", { name: "Search commands" }).fill("nope");
    await expect(
      page.locator(".palette-empty", {
        hasText: "command not found: nope — type help",
      })
    ).toBeVisible();
    await page
      .getByRole("combobox", { name: "Search commands" })
      .fill("theme light");
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveClass(/light-theme/);
  });

  for (const skin of SKINS) {
    test(`has no accessibility violations while open (${skin})`, async ({
      page,
    }) => {
      await usePreferences(page, skin, "dark");
      await page.goto("/");
      await openPalette(page);
      await expect(
        page.getByRole("dialog", { name: "Command palette" })
      ).toBeVisible();
      const results = await new AxeBuilder({ page })
        .include("dialog")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

const HEADER_CASES = [
  ...[320, 360, 390].flatMap((width) =>
    THEMES.map((theme) => ({ width, theme }))
  ),
  ...[801, 900, 1024, 1100, 1280].map((width) => ({
    width,
    theme: "light" as const,
  })),
];

for (const skin of SKINS) {
  for (const { width, theme } of HEADER_CASES) {
    test(`header items don't overlap at ${width}px (${skin}, ${theme})`, async ({
      page,
    }) => {
      await usePreferences(page, skin, theme);
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/");
      const boxes = await page.evaluate(() =>
        [
          ...document.querySelectorAll(
            ".site-header .brand, .site-header .site-nav-links > a:not(.nav-cv-menu), .site-header .nav-cv, .site-header button"
          ),
        ]
          .filter((element) => (element as HTMLElement).offsetParent !== null)
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              name: element.textContent?.trim() || element.className,
              // Text that spills out of its box (e.g. a pseudo-element suffix)
              // overlaps neighbours without changing the box itself.
              overflows:
                element.clientWidth > 0 &&
                element.scrollWidth > element.clientWidth + 1,
              left: rect.left,
              right: rect.right,
              top: rect.top,
              bottom: rect.bottom,
            };
          })
      );
      for (const box of boxes) {
        expect(box.overflows, `${box.name} overflows its box`).toBe(false);
      }
      for (const [i, a] of boxes.entries()) {
        for (const b of boxes.slice(i + 1)) {
          const overlap =
            a.left < b.right - 1 &&
            b.left < a.right - 1 &&
            a.top < b.bottom - 1 &&
            b.top < a.bottom - 1;
          expect(overlap, `${a.name} overlaps ${b.name}`).toBe(false);
        }
      }
    });
  }
}

test("the build notes page is linked from the footer and the palette", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "How this site is built" }).click();
  await expect(page).toHaveURL(/\/colophon\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "How this site is built" })
  ).toBeVisible();

  // Off the home page, the header leads back to the sections.
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);

  await openPalette(page);
  await page
    .getByRole("combobox", { name: "Search commands" })
    .fill("how this site");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/colophon\/$/);
});

test("a case study is linked from its project and from the palette", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: /^Read the case study about A CMS the backend can extend without frontend changes/,
    })
    .click();
  await expect(page).toHaveURL(/\/work\/orange-cms\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "A CMS the backend can extend without frontend changes",
    })
  ).toBeVisible();
  await expect(
    page
      .getByRole("list", {
        name: "How a screen is built: the backend describes it, the frontend renders it.",
      })
      .getByRole("listitem")
  ).toHaveCount(4);

  await expect(
    page.getByRole("navigation", { name: "On this page" }).getByRole("link")
  ).toHaveCount(7);
  await page
    .getByRole("navigation", { name: "Case studies" })
    .getByRole("link", { name: /Next case study/ })
    .click();
  await expect(page).toHaveURL(/\/work\/orange-e2e-testing\/$/);

  await page
    .getByRole("navigation", { name: "Case studies" })
    .getByRole("link", { name: /All work/ })
    .click();
  await expect(page).toHaveURL(/\/#work$/);

  await openPalette(page);
  await page
    .getByRole("combobox", { name: "Search commands" })
    .fill("cat work/orange-cms.md");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/orange-cms\/$/);
});

test("an unpublished or unknown case study is a 404", async ({ page }) => {
  const response = await page.goto("/work/no-such-study/");
  expect(response?.status()).toBe(404);
});

test.describe("look pages", () => {
  const html = (page: Page) => page.locator("html");

  for (const slug of [
    "standard-light",
    "standard-dark",
    "terminal-light",
    "terminal-dark",
  ]) {
    test(`/look/${slug}/ has its own preview card and points search engines home`, async ({
      page,
      request,
    }) => {
      const response = await page.goto(`/look/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://devthomas.pl/"
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        `https://devthomas.pl/look/${slug}/`
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        `https://devthomas.pl/look/${slug}/card.jpg`
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        `https://devthomas.pl/look/${slug}/card.jpg`
      );

      const card = await request.get(`/look/${slug}/card.jpg`);
      expect(card.status()).toBe(200);
      expect(card.headers()["content-type"]).toContain("image/jpeg");
      const bytes = await card.body();
      const { format, width, height } = await sharp(bytes).metadata();
      expect({ format, width, height }).toEqual({
        format: "jpeg",
        width: 1200,
        height: 630,
      });
      // Some apps (WhatsApp) skip preview images much over 300 kB.
      expect(bytes.length).toBeLessThan(300 * 1024);
    });
  }

  test("a look page opens in its look, over the visitor's saved choice", async ({
    page,
  }) => {
    await usePreferences(page, "standard", "light");
    await page.goto("/look/terminal-dark/");
    await expect(html(page)).toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/dark-theme/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /I turn complex requirements into working software/,
      })
    ).toBeVisible();
  });

  test("a choice made on a look page survives a reload", async ({ page }) => {
    await page.goto("/look/terminal-dark/");
    await page
      .getByRole("button", { name: "Switch to standard style" })
      .click();
    await page.reload();
    await expect(html(page)).not.toHaveClass(/skin-terminal/);
    await expect(html(page)).toHaveClass(/dark-theme/);
  });

  test("section links work in place on a look page", async ({ page }) => {
    await page.goto("/look/standard-dark/");
    await page.getByRole("link", { name: "See the work" }).click();
    await expect(page).toHaveURL(/\/look\/standard-dark\/#work$/);
    await expect(
      page.getByRole("heading", { level: 2, name: "Proven in production" })
    ).toBeFocused();
  });

  test("the palette on the home page copies the look page link", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await usePreferences(page, "terminal", "dark");
    await page.goto("/");
    await openPalette(page);
    await page.getByRole("combobox", { name: "Search commands" }).fill("share");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Link copied")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "https://devthomas.pl/look/terminal-dark/"
    );
  });
});

test.describe("search basics", () => {
  test("the sitemap lists every page except the look copies", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const locations = [
      ...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g),
    ]
      .map((match) => match[1])
      .sort();
    expect(locations).toEqual(
      PAGES.flatMap((path) =>
        path.startsWith("/blog/") ? [path] : [path, `/pl${path}`]
      )
        .filter(
          (path) =>
            !visiblePosts.some(
              (post) =>
                post.preview &&
                (["en", "pl"] as const).some(
                  (locale) => blogArticlePath(post.slug, locale) === path
                )
            )
        )
        .map((path) => `https://devthomas.pl${path}`)
        .sort()
    );
  });

  test("robots.txt points to the sitemap", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://devthomas.pl/sitemap.xml");
  });

  const jsonLd = async (page: Page) =>
    JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .textContent()) ?? "{}"
    );

  for (const path of ["/", "/look/terminal-dark/"]) {
    test(`${path} describes Tomasz as a Person`, async ({ page }) => {
      await page.goto(path);
      const data = await jsonLd(page);
      const person = data["@graph"].find(
        (node: { "@type": string }) => node["@type"] === "Person"
      );
      expect(person).toMatchObject({
        name: "Tomasz Stanisz",
        jobTitle: "Software Engineer & Tech Lead",
      });
      expect(person.sameAs).toContain(
        "https://www.linkedin.com/in/tomasz-stanisz/"
      );
    });
  }

  test("a case study is described as an Article", async ({ page }) => {
    await page.goto("/work/orange-cms/");
    expect(await jsonLd(page)).toMatchObject({
      "@type": "Article",
      headline: "A CMS the backend can extend without frontend changes",
      author: { name: "Tomasz Stanisz" },
    });
  });
});

for (const skin of SKINS) {
  for (const width of [320, 360, 390]) {
    test(`the open mobile menu fits and works at ${width}px (${skin})`, async ({
      page,
    }) => {
      await usePreferences(page, skin, "dark");
      await page.setViewportSize({ width, height: 740 });
      await page.goto("/");
      await page.getByRole("button", { name: "Menu" }).click();

      const menu = page.locator("#site-nav-links");
      await expect(menu).toBeVisible();
      const box = await menu.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);

      // Every item is a comfortable touch target.
      const items = menu.locator("a:visible, button:visible");
      for (const item of await items.all()) {
        expect((await item.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);

      // Below 380px the style switch lives in the menu instead of the header.
      const skinItem = menu.getByRole("button", { name: /Use .* style/ });
      const headerSkin = page.locator(".site-header .skin-toggle");
      if (width < 380) {
        await expect(headerSkin).toBeHidden();
        await skinItem.click();
        await expect(page.locator("html")).toHaveClass(
          skin === "terminal" ? /^(?!.*skin-terminal)/ : /skin-terminal/
        );
      } else {
        await expect(skinItem).toBeHidden();
        await expect(headerSkin).toBeVisible();
      }
    });
  }
}

test("a saved dark theme paints the CV dark palette from the first frame", async ({
  page,
}) => {
  await usePreferences(page, "standard", "dark");
  // Sample the background on the first animation frame with a <body>:
  // frames run just before paint, after render-blocking CSS, and before a
  // missing or late theme would be corrected by React.
  await page.addInitScript(() => {
    const sample = () => {
      if (document.body) {
        (window as unknown as { firstBackground: string }).firstBackground =
          getComputedStyle(document.body).backgroundColor;
      } else {
        requestAnimationFrame(sample);
      }
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => (window as unknown as { firstBackground: string }).firstBackground
    )
  ).toBe("rgb(15, 20, 19)");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#0f1413"
  );
});

for (const [path, skinClass, background] of [
  ["/?skin=terminal&theme=dark", true, "rgb(7, 9, 10)"],
  ["/look/terminal-dark/", true, "rgb(7, 9, 10)"],
  ["/look/standard-light/", false, "rgb(247, 245, 240)"],
] as const) {
  test(`${path} paints its look from the first frame`, async ({ page }) => {
    // The visitor's saved look is the opposite, so a flash would show.
    await usePreferences(
      page,
      skinClass ? "standard" : "terminal",
      skinClass ? "light" : "dark"
    );
    await page.addInitScript(() => {
      const sample = () => {
        if (document.body) {
          (window as unknown as { first: string[] }).first = [
            getComputedStyle(document.body).backgroundColor,
            document.documentElement.className,
          ];
        } else {
          requestAnimationFrame(sample);
        }
      };
      requestAnimationFrame(sample);
    });
    await page.goto(path);
    const [firstBackground, firstClasses] = await page.evaluate(
      () => (window as unknown as { first: string[] }).first
    );
    expect(firstBackground).toBe(background);
    expect(firstClasses.includes("skin-terminal")).toBe(skinClass);
  });
}
