import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Every exported page. Add new routes here as they ship.
const PAGES = ["/", "/colophon/"];

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
      "https://devthomas.pl/og-share.png"
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
    page.getByRole("heading", { level: 1, name: "Tomasz Stanisz" })
  ).toBeVisible();
  for (const name of ["Selected work", "How I work", "Background", "Contact"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
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

  test("the palette copies a link to the current look", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await usePreferences(page, "terminal", "dark");
    await page.goto("/colophon/");
    await page.keyboard.press("ControlOrMeta+k");
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
  await expect(themeColor).toHaveAttribute("content", "#10161b");
  await context.close();
});

test("the hero link scrolls to Selected work and focuses its heading", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore selected work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Selected work" })
  ).toBeFocused();
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
    await page.keyboard.press("ControlOrMeta+k");
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
      page.getByRole("heading", { level: 2, name: "Contact" })
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
    await page.keyboard.press("ControlOrMeta+k");
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
    await page.keyboard.press("ControlOrMeta+k");
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
      await page.keyboard.press("ControlOrMeta+k");
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

for (const skin of SKINS) {
  for (const width of [801, 900, 1024, 1100, 1280]) {
    test(`header items don't overlap at ${width}px (${skin})`, async ({
      page,
    }) => {
      await usePreferences(page, skin, "light");
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

  await page.keyboard.press("ControlOrMeta+k");
  await page
    .getByRole("combobox", { name: "Search commands" })
    .fill("how this site");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/colophon\/$/);
});
