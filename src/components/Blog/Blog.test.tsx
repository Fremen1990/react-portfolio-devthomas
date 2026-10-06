import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ClientArchitecture } from "./ClientArchitecture";
import { MobileStack } from "./MobileStack";
import { ProductScreens } from "./ProductScreens";
import { BlogList, BlogLanguages, LatestWriting } from "./BlogList";
import { BlogIndex, blogIndexMetadata } from "./BlogIndex";
import { visiblePosts } from "@/content/blog/.generated/posts";
import { pageMetadata } from "@/lib/metadata";
test("language switch keeps the same article", () => {
  render(<BlogLanguages locale="pl" slug="example" />);
  expect(screen.getByRole("link", { name: "Polski" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
    "href",
    expect.stringMatching(/^\/blog\/en\/example\/?$/)
  );
});
test("the title link does not wrap the language switch", () => {
  const post = visiblePosts[0];
  const { container } = render(<BlogList locale="en" posts={[post]} />);
  const item = container.querySelector(".blog-list-item");
  expect(item).toHaveClass("card");
  const title = screen.getByRole("link", { name: post.editions.en.title });
  expect(title.closest(".blog-languages")).toBeNull();
  expect(item?.querySelector(".blog-languages a")).toBeTruthy();
});
test("empty article list has no placeholder cards", () => {
  const { container } = render(<BlogList locale="en" posts={[]} />);
  expect(container.querySelectorAll("li")).toHaveLength(0);
});
test("latest writing matches the available records and hides when empty", () => {
  const { container } = render(<LatestWriting />);
  expect(container.querySelectorAll(".blog-list-item")).toHaveLength(
    Math.min(2, visiblePosts.length)
  );
  expect(Boolean(container.querySelector("#writing"))).toBe(
    visiblePosts.length > 0
  );
});
test("Polish index labels its language and has localized metadata", () => {
  render(<BlogIndex locale="pl" />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Artykuły"
  );
  expect(screen.getByRole("region")).toHaveAttribute("lang", "pl");
  expect(blogIndexMetadata("pl").alternates).toMatchObject({
    canonical: "/blog/pl/",
    languages: { en: "/blog/", pl: "/blog/pl/" },
  });
});
test("article metadata preserves independent canonicals and prevents draft indexing", () => {
  const m = pageMetadata({
    path: "/blog/pl/example/",
    title: "Przykład",
    languages: { en: "/blog/en/example/", pl: "/blog/pl/example/" },
    article: { locale: "pl" },
    noIndex: true,
  });
  expect(m.alternates?.canonical).toBe("/blog/pl/example/");
  expect(m.openGraph).toMatchObject({ type: "article", locale: "pl_PL" });
  expect(m.robots).toMatchObject({ index: false, follow: false });
});

test("mobile stack and sample screens stay in the article", () => {
  const { container } = render(
    <>
      <MobileStack locale="en" />
      <ProductScreens locale="en" />
    </>
  );
  expect(
    screen.getByRole("img", { name: /Car Brain mobile stack/ })
  ).toBeVisible();
  expect(container.querySelectorAll(".product-screens img")).toHaveLength(3);
});
for (const locale of ["en", "pl"] as const) {
  test(`architecture exposes its boundaries and planned data path (${locale})`, () => {
    const { container } = render(<ClientArchitecture locale={locale} />);
    const graphic = screen.getByRole("img");
    expect(graphic).toHaveAccessibleName(/3 /);
    expect(graphic).toHaveTextContent("React Native");
    expect(graphic).toHaveTextContent("Next.js");
    expect(graphic).toHaveTextContent("Appwrite");
    expect(graphic.querySelector('[data-edge="planned"]')).toHaveAttribute(
      "stroke-dasharray"
    );
    expect(graphic.querySelector('[data-edge="mobile"]')).not.toHaveAttribute(
      "stroke-dasharray"
    );
    expect(container.querySelector('[role="region"]')).toHaveAttribute(
      "tabindex",
      "0"
    );
  });
}
