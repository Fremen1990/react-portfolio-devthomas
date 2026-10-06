import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync, existsSync } from "node:fs";
import { localizedPath, headingPairs } from "../src/i18n/routes";
import { slugify } from "../src/lib/headings";
import { visiblePosts } from "../src/content/blog/.generated/posts";
const slug = visiblePosts[0].slug;
const english = [
  "/",
  "/work/orange-cms/",
  "/work/orange-e2e-testing/",
  "/work/theeventa-mvp/",
  "/colophon/",
  "/blog/",
  `/blog/en/${slug}/`,
];
const all = english.flatMap((p) => [p, localizedPath(p, "pl")]);

test("exported documents have language, reciprocal metadata, sitemap and bilingual 404", async ({
  request,
}) => {
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  for (const path of all) {
    const pl = path.startsWith("/pl/") || path.startsWith("/blog/pl/");
    const html = readFileSync(`out${path}index.html`, "utf8");
    expect(html).toContain(`<html lang="${pl ? "pl" : "en"}"`);
    expect(html).toContain(
      `rel="canonical" href="https://devthomas.pl${path}"`
    );
    for (const lang of ["en", "pl", "x-default"])
      expect(html).toContain(
        `hrefLang="${lang}" href="https://devthomas.pl${localizedPath(path, lang === "pl" ? "pl" : "en")}"`
      );
    expect(sitemap).toContain(`https://devthomas.pl${path}`);
  }
  expect(sitemap).not.toContain("/look/");
  const missing = readFileSync("out/404.html", "utf8");
  expect(missing).toContain("noindex");
  expect(missing).toContain("Nie znaleziono strony");
  for (const path of [
    "/pl/work/unknown/",
    "/de/",
    "/pl/blog/",
    "/blog/de/unknown/",
  ])
    expect((await request.get(path)).status()).toBe(404);
  expect(existsSync("out/en/index.html")).toBe(false);
  for (const look of [
    "standard-light",
    "standard-dark",
    "terminal-light",
    "terminal-dark",
  ]) {
    const html = readFileSync(`out/pl/look/${look}/index.html`, "utf8");
    expect(html).toContain('rel="canonical" href="https://devthomas.pl/pl/"');
    expect((await request.get(`/pl/look/${look}/card.jpg`)).status()).toBe(200);
  }
});
test("all Polish pages read and switch to their counterpart without JS", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const en of english) {
    const pl = localizedPath(en, "pl");
    await page.goto(pl);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(page.locator("h1")).toBeVisible();
    const link = page
      .locator(".language-switch")
      .getByRole("link", { name: "English", exact: true });
    await expect(link).toHaveAttribute("href", en);
    await link.click();
    await expect(page).toHaveURL(new RegExp(en + "$"));
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  }
  await context.close();
});
for (const skin of ["standard", "terminal"])
  for (const theme of ["light", "dark"])
    for (const width of [1440, 768, 390, 320]) {
      test(`localized layout ${skin} ${theme} ${width}`, async ({ page }) => {
        test.setTimeout(180000);
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        // Every page at desktop/mobile; four representative pairs at other widths.
        const paths =
          width === 1440 || width === 390
            ? all
            : [
                "/",
                "/pl/",
                "/work/orange-cms/",
                "/pl/work/orange-cms/",
                "/blog/",
                "/blog/pl/",
                `/blog/en/${slug}/`,
                `/blog/pl/${slug}/`,
              ];
        for (const path of paths) {
          await page.goto(`${path}?skin=${skin}&theme=${theme}`);
          await page.locator(".language-switch a").first().waitFor();
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth
            )
          ).toBe(true);
          const boxes = await page
            .locator(
              ".site-header .brand, .site-header button, .language-switch a, .site-header .site-nav a"
            )
            .evaluateAll((els) =>
              els
                .filter((el) => (el as HTMLElement).offsetParent !== null)
                .map((el) => {
                  const r = el.getBoundingClientRect();
                  return {
                    name: el.textContent,
                    left: r.left,
                    right: r.right,
                    top: r.top,
                    bottom: r.bottom,
                  };
                })
            );
          const header = await page.locator(".site-header").boundingBox();
          for (const box of boxes) {
            expect(box.top).toBeGreaterThanOrEqual(header!.y);
            expect(box.bottom).toBeLessThanOrEqual(
              header!.y + header!.height + 1
            );
          }
          for (const [i, a] of boxes.entries())
            for (const b of boxes.slice(i + 1))
              expect(
                a.left < b.right - 1 &&
                  b.left < a.right - 1 &&
                  a.top < b.bottom - 1 &&
                  b.top < a.bottom - 1,
                `${path}: ${a.name} overlaps ${b.name}`
              ).toBe(false);
          const scan = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          expect(scan.violations).toEqual([]);
          for (const a of await page.locator(".case-study-toc a").all()) {
            const href = await a.getAttribute("href");
            if (href?.startsWith("#"))
              expect(await page.locator(href).count()).toBe(1);
          }
          await page.screenshot({
            path: `test-results/localization/${skin}-${theme}-${width}-${path.replaceAll("/", "_")}.png`,
            fullPage: true,
          });
        }
        expect(errors).toEqual([]);
      });
    }
for (const width of [639, 640, 1099, 1100])
  for (const skin of ["standard", "terminal"]) {
    test(`header boundary ${width} ${skin}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/pl/?skin=${skin}&theme=dark`);
      const brand = await page.locator(".brand").boundingBox(),
        switchBox = await page.locator(".language-switch").boundingBox();
      if (width < 640)
        expect(switchBox!.y).toBeGreaterThanOrEqual(
          brand!.y + brand!.height - 1
        );
      else expect(Math.abs(switchBox!.y - brand!.y)).toBeLessThan(15);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true);
      const boxes = await page
        .locator(
          ".site-header .brand, .site-header button, .language-switch a, .site-header .site-nav a"
        )
        .evaluateAll((els) =>
          els
            .filter((el) => (el as HTMLElement).offsetParent !== null)
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {
                name: el.textContent,
                left: r.left,
                right: r.right,
                top: r.top,
                bottom: r.bottom,
              };
            })
        );
      for (const [i, a] of boxes.entries())
        for (const b of boxes.slice(i + 1))
          expect(
            a.left < b.right - 1 &&
              b.left < a.right - 1 &&
              a.top < b.bottom - 1 &&
              b.top < a.bottom - 1,
            `${a.name} overlaps ${b.name}`
          ).toBe(false);
      const menu = page.getByRole("button", { name: "Menu", exact: true });
      if (width < 1100) {
        await menu.click();
        await expect(
          page.getByRole("link", { name: "Realizacje", exact: true })
        ).toBeVisible();
        await page
          .getByRole("link", { name: "Realizacje", exact: true })
          .focus();
        await page.keyboard.press("Escape");
        await expect(menu).toBeFocused();
      } else await expect(menu).toBeHidden();
    });
  }
test("switch keeps headings, appearance and browser history even with blocked storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const store of ["localStorage", "sessionStorage"])
      Object.defineProperty(window, store, {
        get() {
          throw new Error("blocked");
        },
      });
  });
  await page.goto("/work/orange-cms/?skin=terminal&theme=dark#the-decision");
  const pl = page
    .locator(".language-switch")
    .getByRole("link", { name: "Polski" });
  await expect(pl).toHaveAttribute(
    "href",
    /\/pl\/work\/orange-cms\/\?skin=terminal&theme=dark#decyzja/
  );
  await pl.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  await expect(page.locator("html")).toHaveClass(/skin-terminal/);
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page).toHaveURL(/#decyzja$/);
  await page.goBack();
  await expect(page).toHaveURL(/#the-decision$/);
  await page.goForward();
  await expect(page).toHaveURL(/#decyzja$/);
  await page.keyboard.press("Control+k");
  await page
    .getByRole("combobox", { name: "Szukaj poleceń" })
    .fill("Realizacje");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/pl\/#work$/);
});
test("blog headings use explicit EN PL correspondence", async ({ page }) => {
  const [en, pl] = Object.entries(headingPairs[`article/${slug}`])[0];
  await page.goto(`/blog/en/${slug}/#${slugify(en)}`);
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "Polski" })
    .click();
  await expect(page).toHaveURL(new RegExp("#" + slugify(pl) + "$"));
});
test("English stays default regardless of browser language; modified click leaves current page", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "pl-PL" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const popupPromise = context.waitForEvent("page");
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "Polski" })
    .click({ modifiers: ["Meta"] });
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await expect(popup.locator("html")).toHaveAttribute("lang", "pl");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
});

test("homepage scrolling updates language links and unknown fragment resets", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "See the work", exact: true }).click();
  await expect(
    page.locator(".language-switch").getByRole("link", { name: "Polski" })
  ).toHaveAttribute("href", /#work$/);
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "Polski" })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  await page.goto("/work/orange-cms/#missing-fragment");
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "Polski" })
    .click();
  expect(new URL(page.url()).hash).toBe("");
});

test("Polish look previews retain appearance and localized share cards on desktop and mobile", async ({
  page,
}) => {
  test.setTimeout(90000);
  for (const width of [1440, 390])
    for (const skin of ["standard", "terminal"])
      for (const theme of ["light", "dark"]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/pl/look/${skin}-${theme}/`);
        await expect(page.locator("html")).toHaveAttribute("lang", "pl");
        await expect(page.locator("html")).toHaveClass(
          new RegExp(`${theme}-theme`)
        );
        if (skin === "terminal")
          await expect(page.locator("html")).toHaveClass(/skin-terminal/);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
          )
        ).toBe(true);
        await expect(
          page
            .locator(".language-switch")
            .getByRole("link", { name: "English" })
        ).toHaveAttribute("href", new RegExp(`^/look/${skin}-${theme}/\\?`));
        await page.screenshot({
          path: `test-results/localization/viewport-pl-${skin}-${theme}-${width}.png`,
        });
      }
});
test("Polish palette is keyboard accessible, announces copying and passes axe", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  for (const skin of ["standard", "terminal"]) {
    await page.goto(`/pl/?skin=${skin}&theme=dark`);
    await page.keyboard.press("Control+k");
    await expect(
      page.getByRole("dialog", { name: "Paleta poleceń" })
    ).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page
      .getByRole("combobox", { name: "Szukaj poleceń" })
      .fill("copy email");
    await page.keyboard.press("Enter");
    await expect(page.locator(".palette-toast")).toHaveText(
      "Skopiowano adres e-mail"
    );
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe("thomas.dev666@gmail.com");
  }
});
