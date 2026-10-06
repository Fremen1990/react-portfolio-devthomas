import {
  mkdtempSync,
  mkdirSync,
  cpSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";

test("private preview routes are removed by the next production preparation", () => {
  const root = mkdtempSync(join(tmpdir(), "blog-generation-"));
  try {
    for (const file of [
      "scripts/prepare-blog.mjs",
      "src/content/blog/catalog.ts",
      "src/content/blog/model.ts",
      "src/content/blog/types.ts",
      "src/content/blog/package.json",
      "src/lib/headings.ts",
    ]) {
      const dest = join(root, file);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(join(process.cwd(), file), dest);
    }
    // Isolate this fixture from the live catalogue and its manuscript files.
    writeFileSync(
      join(root, "src/content/blog/catalog.ts"),
      "export const blogPosts = [];"
    );
    writeFileSync(join(root, "package.json"), '{"type":"module"}');
    const drafts = join(root, "private");
    mkdirSync(drafts);
    const p = {
      slug: "review-only",
      published: false,
      editions: {
        en: {
          title: "Private EN",
          description: "English",
          topics: [],
          body: "en.mdx",
        },
        pl: {
          title: "Prywatny PL",
          description: "Polski",
          topics: [],
          body: "pl.mdx",
        },
      },
    };
    writeFileSync(join(drafts, "posts.json"), JSON.stringify([p]));
    writeFileSync(join(drafts, "en.mdx"), "## Evidence\nPrivate manuscript EN");
    writeFileSync(join(drafts, "pl.mdx"), "## Dowody\nPrywatny szkic PL");
    const run = (preview: string, ci = "") =>
      execFileSync(process.execPath, ["scripts/prepare-blog.mjs"], {
        cwd: root,
        env: { ...process.env, BLOG_PREVIEW_DIR: preview, CI: ci },
        stdio: "pipe",
      });
    // Migrate only previously generated, recognized leaf directories.
    const generated = join(root, "src/content/blog/.generated");
    mkdirSync(generated, { recursive: true });
    const legacy = "src/app/blog/en/legacy-draft";
    mkdirSync(join(root, legacy), { recursive: true });
    writeFileSync(join(root, legacy, "page.tsx"), "old generated route");
    const protectedPage = join(root, "src/app/blog/pl/page.tsx");
    mkdirSync(dirname(protectedPage), { recursive: true });
    writeFileSync(protectedPage, "owned index");
    writeFileSync(join(generated, "routes.json"), JSON.stringify([legacy]));
    run(drafts);
    expect(existsSync(join(root, legacy))).toBe(false);
    expect(readFileSync(protectedPage, "utf8")).toBe("owned index");
    expect(
      existsSync(join(root, "src/app/(en)/blog/en/review-only/page.tsx"))
    ).toBe(true);
    expect(
      existsSync(
        join(root, "src/app/(pl)/blog/pl/review-only/card.jpg/route.tsx")
      )
    ).toBe(true);
    expect(
      readFileSync(join(root, "src/content/blog/.generated/posts.ts"), "utf8")
    ).toContain('"preview": true');
    expect(() => run(drafts, "true")).toThrow();
    run("");
    expect(existsSync(join(root, "src/app/(en)/blog/en/review-only"))).toBe(
      false
    );
    expect(existsSync(join(root, "src/app/(pl)/blog/pl/review-only"))).toBe(
      false
    );
    expect(
      readFileSync(join(root, "src/content/blog/.generated/posts.ts"), "utf8")
    ).not.toContain("review-only");
    run(""); // Repeated production preparation is idempotent.
    // A real publication builds both editions through the same pipeline.
    const articles = join(root, "src/content/blog/articles");
    mkdirSync(articles);
    cpSync(join(drafts, "en.mdx"), join(articles, "en.mdx"));
    cpSync(join(drafts, "pl.mdx"), join(articles, "pl.mdx"));
    writeFileSync(
      join(root, "src/content/blog/catalog.ts"),
      `export const blogPosts = ${JSON.stringify([{ ...p, published: true, publishedAt: "2026-10-04" }])};`
    );
    run("");
    expect(
      readFileSync(join(root, "src/content/blog/.generated/posts.ts"), "utf8")
    ).toContain('"preview": false');
    expect(
      existsSync(join(root, "src/app/(en)/blog/en/review-only/page.tsx"))
    ).toBe(true);
    expect(
      existsSync(join(root, "src/app/(pl)/blog/pl/review-only/page.tsx"))
    ).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}, 15000);
