import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Every exported page. Add new routes here as they ship.
const PAGES = ["/"];

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

test("a ?skin= link opens in that style, saves it, and can switch back", async ({
  page,
}) => {
  const html = page.locator("html");

  await page.goto("/?skin=terminal");
  await expect(html).toHaveClass(/skin-terminal/);
  expect(
    await page.evaluate(() => localStorage.getItem("portfolio-skin"))
  ).toBe("terminal");

  await page.goto("/");
  await expect(html).toHaveClass(/skin-terminal/);

  await page.goto("/?skin=standard");
  await expect(html).not.toHaveClass(/skin-terminal/);
  expect(
    await page.evaluate(() => localStorage.getItem("portfolio-skin"))
  ).toBeNull();
});

test("a ?skin= link still applies when storage is blocked", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("storage blocked");
      },
    });
  });
  await page.goto("/?skin=terminal");
  await expect(page.locator("html")).toHaveClass(/skin-terminal/);
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

for (const skin of SKINS) {
  for (const theme of THEMES) {
    test(`no sideways scroll at 320px (${skin}, ${theme})`, async ({
      page,
    }) => {
      await usePreferences(page, skin, theme);
      await page.setViewportSize({ width: 320, height: 700 });
      await page.goto("/");
      await page.evaluate(() =>
        document.querySelectorAll("details").forEach((d) => (d.open = true))
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test(`no accessibility violations (${skin}, ${theme})`, async ({
      page,
    }) => {
      await usePreferences(page, skin, theme);
      await page.goto("/");
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
