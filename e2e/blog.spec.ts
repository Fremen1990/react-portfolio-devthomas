import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { visiblePosts } from "../src/content/blog/.generated/posts";
import { blogArticlePath } from "../src/content/blog/model";
import { blogLabels } from "../src/content/blog/labels";
const first = visiblePosts[0];
const articlePaths = visiblePosts.flatMap((p) =>
  (["en", "pl"] as const).map((locale) => ({
    path: blogArticlePath(p.slug, locale),
    locale,
    post: p,
  }))
);
test("unpublished and unknown editions do not export routes", async ({
  request,
}) => {
  for (const path of ["/blog/de/unknown/", "/blog/en/not-published/"])
    expect((await request.get(path)).status()).toBe(404);
});
test("blog navigation works separately from homepage section scrolling", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await page.getByRole("link", { name: "Polski", exact: true }).first().click();
  await expect(page).toHaveURL(/\/blog\/pl\/(?:\?.*)?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Artykuły");
});
for (const { path, locale, post } of articlePaths) {
  test(`${path} reads without JS and links its translated edition`, async ({
    browser,
    request,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(path);
    await expect(page.locator("article.blog-article")).toHaveAttribute(
      "lang",
      locale
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      post.editions[locale].title
    );
    const other = locale === "en" ? "pl" : "en";
    await expect(
      page.locator(`link[rel="alternate"][hreflang="${other}"]`)
    ).toHaveAttribute(
      "href",
      `https://devthomas.pl${blogArticlePath(post.slug, other)}`
    );
    await page
      .getByRole("link", {
        name: other === "en" ? "English" : "Polski",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(blogArticlePath(post.slug, other) + "$")
    );
    expect((await request.get(`${path}card.jpg`)).status()).toBe(200);
    if (post.preview)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/
      );
    await context.close();
  });
}
for (const skin of ["standard", "terminal"] as const)
  for (const theme of ["light", "dark"] as const)
    for (const width of [1440, 768, 390, 320]) {
      test(`blog layout ${skin} ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        const paths = [
          "/blog/",
          "/blog/pl/",
          ...(first
            ? (["en", "pl"] as const).map((locale) =>
                blogArticlePath(first.slug, locale)
              )
            : []),
        ];
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        for (const path of paths) {
          await page.goto(`${path}?skin=${skin}&theme=${theme}`);
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth
            )
          ).toBe(true);
          expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
            []
          );
          if (path.includes(first?.slug ?? "__none__")) {
            // Diagram geometry must survive missing component CSS.
            for (const selector of [".client-architecture", ".auth-sequence"]) {
              const diagram = page.locator(selector);
              const graphic = diagram.getByRole("img");
              await expect(graphic).toBeVisible();
              const bounds = await graphic.boundingBox();
              expect(bounds?.width).toBeGreaterThanOrEqual(640);
              expect(bounds?.height).toBeLessThan(800);
              await expect(diagram.getByRole("region")).toHaveCSS(
                "overflow-x",
                "auto"
              );
              await expect(
                graphic.locator("path[marker-end]").first()
              ).not.toHaveCSS("stroke", "none");
            }
            const locale = path.startsWith("/blog/pl/") ? "pl" : "en";
            const toc = page.getByRole("navigation", {
              name: blogLabels[locale].toc,
            });
            for (const link of await toc.getByRole("link").all()) {
              const href = await link.getAttribute("href");
              expect(await page.locator(href!).count()).toBe(1);
            }
          }
          await page.screenshot({
            path: `test-results/blog-${skin}-${theme}-${width}-${path.replaceAll("/", "_")}.png`,
            fullPage: true,
          });
        }
        expect(errors).toEqual([]);
      });
    }

test("blog discovery and keyboard navigation reach the index and both editions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#writing .blog-list-item")).toHaveCount(
    Math.min(2, visiblePosts.length)
  );
  const destinations = [
    { query: "ls blog/", path: "/blog/" },
    ...articlePaths.map(({ post, locale, path }) => ({
      query: `cat blog/${locale}/${post.slug}.mdx`,
      path,
    })),
  ];
  for (const { query, path } of destinations) {
    await page.getByRole("button", { name: "Open command palette" }).click();
    await page.getByRole("combobox", { name: "Search commands" }).fill(query);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(path + "$"));
  }
  if (first) {
    const toc = page.getByRole("navigation", { name: blogLabels.pl.toc });
    const link = toc.getByRole("link").first();
    const href = await link.getAttribute("href");
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(href + "$"));
    await expect(page.locator(href!)).toBeInViewport();
  }
});

for (const [skin, theme, width] of [
  ["standard", "light", 1440],
  ["standard", "light", 390],
  ["terminal", "dark", 1440],
  ["terminal", "dark", 320],
] as const) {
  test(`blog review screenshots ${skin} ${theme} ${width}`, async ({
    page,
  }) => {
    test.skip(!first, "No article is available in this build");
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(
      `${blogArticlePath(first.slug, width < 800 ? "pl" : "en")}?skin=${skin}&theme=${theme}`
    );
    await page.screenshot({
      path: `test-results/review-${skin}-${theme}-${width}-header.png`,
    });
    await page.locator(".client-architecture").screenshot({
      path: `test-results/review-${skin}-${theme}-${width}-diagram.png`,
      style: ".site-header, .site-header * { visibility: hidden !important; }",
    });
  });
}

test("article diagrams keep their geometry without external stylesheets", async ({
  page,
}) => {
  test.skip(!first, "No article in this build");
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(blogArticlePath(first.slug, "pl"));
  await page.evaluate(() => {
    for (const sheet of Array.from(document.styleSheets)) sheet.disabled = true;
  });
  for (const selector of [".client-architecture", ".auth-sequence"]) {
    const figure = page.locator(selector);
    const region = figure.getByRole("region");
    const graphic = figure.getByRole("img");
    await expect(graphic).toBeVisible();
    expect((await graphic.boundingBox())?.width).toBeGreaterThanOrEqual(640);
    expect((await graphic.boundingBox())?.height).toBeLessThan(800);
    await region.focus();
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => region.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
  }
});
