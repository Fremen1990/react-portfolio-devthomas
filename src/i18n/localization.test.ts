import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import {
  headingPairs,
  localizedPath,
  translatedFragment,
  pageIdentity,
  routePath,
} from "./routes";
import { getProfile } from "./profile";
import { getCaseStudies } from "@/content/work/studies";
import { createCommands, buildShareUrl, type CommandContext } from "@/commands";
import { headingsFromMdx, slugify } from "@/lib/headings";
import { pageMetadata } from "@/lib/metadata";
import {
  homeStructuredData,
  caseStudyStructuredData,
} from "@/lib/structuredData";
import { isHomePath } from "@/content/looks";
const pairs = [
  ["/", "/pl/"],
  ["/colophon/", "/pl/colophon/"],
  ["/work/orange-cms/", "/pl/work/orange-cms/"],
  ["/look/terminal-dark/", "/pl/look/terminal-dark/"],
  ["/blog/", "/blog/pl/"],
  ["/blog/en/example/", "/blog/pl/example/"],
];
test.each(pairs)("round trips %s and %s", (en, pl) => {
  expect(localizedPath(en, "pl")).toBe(pl);
  expect(localizedPath(pl, "en")).toBe(en);
  expect(routePath(pageIdentity(pl)!, "en")).toBe(en);
  const m = pageMetadata({ path: pl });
  expect(m.alternates).toMatchObject({
    canonical: pl,
    languages: { en, pl, "x-default": en },
  });
  expect(m.openGraph).toMatchObject({ locale: "pl_PL" });
});
test("explicit fragments and appearance settings survive, unknown fragments reset", () => {
  expect(localizedPath("/work/orange-cms/?theme=dark#the-decision", "pl")).toBe(
    "/pl/work/orange-cms/?theme=dark#decyzja"
  );
  expect(translatedFragment("/pl/work/orange-cms/", "#decyzja", "en")).toBe(
    "#the-decision"
  );
  expect(translatedFragment("/work/orange-cms/", "#unmapped", "pl")).toBe("");
  expect(translatedFragment("/", "#experience", "pl")).toBe("#experience");
  expect(isHomePath("/pl/look/terminal-dark/")).toBe(true);
  expect(buildShareUrl("/pl/", { theme: "dark", skin: "terminal" })).toBe(
    "https://devthomas.pl/pl/look/terminal-dark/"
  );
});
test("every translated body covers all headings with semantic correspondence", () => {
  for (const [key, map] of Object.entries(headingPairs)) {
    const [kind, slug] = key.split("/");
    const paths =
      kind === "work"
        ? [`src/content/work/${slug}.mdx`, `src/content/work/${slug}.pl.mdx`]
        : kind === "article"
          ? [
              `src/content/blog/articles/${slug}/en.mdx`,
              `src/content/blog/articles/${slug}/pl.mdx`,
            ]
          : [
              "src/app/(en)/colophon/page.mdx",
              "src/app/(pl)/pl/colophon/page.mdx",
            ];
    const [en, pl] = paths.map((p) =>
      headingsFromMdx(readFileSync(p, "utf8")).map((h) => h.id)
    );
    for (const h of en) {
      expect(Object.keys(map).map(slugify)).toContain(h);
    }
    for (const h of pl) {
      expect(Object.values(map).map(slugify)).toContain(h);
    }
  }
});
test("required profile wording is nonempty; identities, links and numeric evidence stay shared", () => {
  const en = getProfile("en"),
    pl = getProfile("pl");
  expect(pl.name).toBe(en.name);
  expect(pl.links).toBe(en.links);
  const validate = (v: unknown): void => {
    if (typeof v === "string") expect(v.trim()).not.toBe("");
    else if (v && typeof v === "object") Object.values(v).forEach(validate);
  };
  validate(pl);
  expect(
    pl.contributions.map((c) => [c.id, c.number, c.bars?.map((b) => b.width)])
  ).toEqual(
    en.contributions.map((c) => [c.id, c.number, c.bars?.map((b) => b.width)])
  );
  expect(pl.timeline.slice(1).map((t) => [t.name, t.current])).toEqual(
    en.timeline.slice(1).map((t) => [t.name, t.current])
  );
  expect(pl.approach[3].text).toContain(
    "ATOM (Akademia Tworzenia Oprogramowania)"
  );
  for (const [i, study] of getCaseStudies("pl").entries()) {
    const original = getCaseStudies("en")[i];
    expect([
      study.slug,
      study.company,
      study.stack,
      study.published,
      study.contributionId,
    ]).toEqual([
      original.slug,
      original.company,
      original.stack,
      original.published,
      original.contributionId,
    ]);
    expect(caseStudyStructuredData(study, "pl").inLanguage).toBe("pl");
  }
  expect(homeStructuredData("pl")["@graph"][1].inLanguage).toBe("pl");
});
test("command IDs and aliases stable; localized destinations and bilingual keywords", () => {
  const en = createCommands("en"),
    pl = createCommands("pl");
  expect(pl.map((c) => [c.id, c.alias])).toEqual(
    en.map((c) => [c.id, c.alias])
  );
  const paths: string[] = [];
  const noop = () => {};
  const ctx: CommandContext = {
    goToPage: (path: string) => {
      paths.push(path);
    },
    goToSection: noop,
    openExternal: noop,
    copyEmail: noop,
    copyShareLink: noop,
    setTheme: noop,
    setSkin: noop,
  };
  pl.find((c) => c.id === "blog")!.run(ctx);
  pl.find((c) => c.id === "case-study-orange-cms")!.run(ctx);
  pl.find((c) => c.id === "colophon")!.run(ctx);
  expect(paths).toEqual(["/blog/pl/", "/pl/work/orange-cms/", "/pl/colophon/"]);
  expect(en.find((c) => c.id === "section-work")!.keywords).toContain(
    "Realizacje"
  );
});
