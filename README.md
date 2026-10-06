# Tomasz Stanisz — portfolio

Public portfolio for Tomasz Stanisz, Software Engineer & Tech Lead, aimed at hiring managers for senior and tech-lead roles. It opens with a headline and a clickable diagram of the Orange Polska CMS, then shows the work proven in production, what is being built now, how the work is done, a short background and contact. The CV is the full document; this site is the showcase.

Live site: [https://devthomas.pl/](https://devthomas.pl/)

CV: [https://cv.devthomas.pl/](https://cv.devthomas.pl/)

## Setup

The site is built with Next.js (App Router) as a static export: `next build` writes one HTML file per page to `out/`, and Hostinger serves those files. Public copy lives in `src/content/publicProfile.ts`.

Use Node.js 24, the current Active LTS (Krypton), and npm 11. `package.json` `engines` accepts Node `>=24.15.0 <25` and npm `>=11 <12`. `.npmrc` sets `engine-strict=true`. The lockfile is npm's `package-lock.json`; install with npm, not another package manager.

```bash
nvm use 24
npm ci
npm run dev
```

`npm run dev` serves the development build at [http://localhost:3000](http://localhost:3000). `npm run preview` serves the last static build from `out/`.

## Checks

```bash
npm run lint
npm run typecheck
npm run prettier:check
npm test
npm run build
npx playwright install chromium   # once
npm run test:e2e
```

- `npm run lint` runs ESLint with `eslint-config-next` (React, hooks, accessibility, Next.js and TypeScript rules).
- `npm run typecheck` runs `tsc --noEmit`. The code is TypeScript with `strict` on.
- `npm test` runs the Vitest unit suite once (`npm run test:watch` keeps it running).
- `npm run build` writes the static site to `out/`.
- `npm run test:e2e` serves `out/` and runs the Playwright suite in `e2e/`: metadata and Open Graph tags on every page, the not-found page, reading without JavaScript, the saved skin and theme before paint, share links and `/look/` pages painting their look from the first frame, `theme-color`, the hero link, the architecture panel from the keyboard, motion stopping under reduced motion, the Car Brain publication gate, no console errors, no sideways scroll at 320px, header fit from 320 to 1280px, and an axe accessibility scan in both skins and both themes. Build first.

GitHub Actions runs all of these on Node 24.21.0, through the shared steps in `.github/actions/check/`. `ci.yml` runs them on every pull request. `publish.yml` runs them on `main` and then pushes `out/` to the `build` branch, which Hostinger serves. The publish action is pinned to commit `ac113f6bfe8896e85a373534242c949a7ea74c98`. Do not run it locally as part of a normal check.

## Active structure

- `src/components/Document.tsx` — the page shell: fonts (`next/font`, self-hosted at build), the inline script that applies a saved theme and skin before first paint, the header and footer, and every stylesheet in cascade order
- `src/app/page.tsx` — the home page, rendered by `src/sections/HomePage.tsx` (shared with the `/look/` copies): the hero, then Work ("Proven in production"), Now, Approach, Background and Contact
- `src/app/colophon/page.mdx` — "How this site is built", linked from the footer and the palette. Its performance table is a dated snapshot; re-measure before changing it.
- `src/app/work/[slug]/page.tsx` — case study pages. Facts and the published flag live in `src/content/work/studies.ts`, the text in `src/content/work/<slug>.mdx` (mapped in `bodies.ts`). A published study gets its page, a link from its card on the home page, and a palette command (`cat work/<slug>.md`). Each page has a dark header band with the study's `outcome` tile and a fact strip, an "On this page" list built from the MDX `h2`s (`src/lib/headings.ts`, highlighted by `src/components/CaseStudy/CaseStudyToc.tsx`), and a link to the next study (`nextCaseStudy`). `src/components/Flow/` draws the step diagrams; `<Options>`, `<Option chosen>` and `<Differently>` (`src/components/CaseStudy/CaseStudyParts.tsx`) lay out the options and the retrospective without changing their wording.
- `src/app/(en)/look/[look]/` — the home page per look (`page.tsx`) and its 1200×630 preview card (`card.jpg/route.tsx`, drawn with `next/og` using the subset TTF fonts in `src/assets/fonts/`). The looks are listed in `src/content/looks.ts`.
- `src/app/sitemap.ts` — `out/sitemap.xml`: the home page, the case studies and the colophon (not the `/look/` copies). `public/robots.txt` points to it.
- `src/lib/structuredData.ts` — schema.org JSON-LD: a `Person` and `WebSite` on the home page and its look copies, an `Article` on each case study. Rendered by `src/components/JsonLd/`, with `<` escaped.
- `src/app/not-found.tsx` — exported as `out/404.html`
- `src/mdx-components.tsx` — how MDX pages render: one article in the prose style (`src/components/Prose/prose.css`), an id on every `h2`, tables that scroll on their own, external links in a new tab, and the case-study components
- `src/lib/metadata.ts` — title, description, canonical and Open Graph tags for each page
- `src/content/publicProfile.ts` — the public wording and links: hero, architecture panel, work cards, the Now building card, approach, timeline and contact
- `src/content/carBrain.ts` and `src/content/carBrainLinks.ts` — the Car Brain card and its publication gate. While `CAR_BRAIN_PUBLISHED` is `false`, the card is not rendered and the build contains no store link. The links sit behind the gate, so the build drops them; client code imports only `carBrainLinks.ts`, never the card content.
- `src/components/NavBar/` — section navigation ("← All work" on case studies), mobile menu, and the theme and style controls
- `src/components/Hero/` and `src/components/ArchitecturePanel/` — the hero band and its clickable CMS diagram
- Client components are kept small: NavBar with the command palette, `ArchitecturePanel`, `src/sections/Now/CarBrainShots.tsx`, `src/components/RevealOnView/` (the E2E bars' entrance) and `CaseStudyToc`. Everything else is a Server Component.
- `src/utils/scrollToSection.ts` — in-page navigation, fragment history, and destination focus
- `src/utils/theme.ts` — light/dark choice in `localStorage`, otherwise the operating-system preference
- `src/utils/skin.ts` — standard or Terminal style in `localStorage`; `src/design/skin-terminal.css` holds every Terminal rule, scoped under `html.skin-terminal`
- `src/commands.ts` — the command palette's commands as data, and the filter that ranks them
- `src/components/CommandPalette/` — the ⌘K palette (a native `<dialog>` with a combobox), mounted by NavBar
- `src/content/navigation.ts` — the home page sections in page order. The header shows those with `header: true`; the palette and the section headings use `title`.
- `src/utils/preferences.ts` — keeps controls in sync with the current theme and skin, and lets the server render before either is known
- `src/sections/Work/`, `src/sections/Now/`, `src/sections/Approach/`, `src/sections/Background/`, `src/sections/Contact/` — the sections after the hero, rendered to static HTML through `src/components/SectionBand/`
- `src/components/FooterPanel/` — copyright and GitHub

All CSS is imported in `src/components/Document.tsx` and nowhere else, with `skin-terminal.css` last. The Terminal rules use `:where()`, so they win on order, not specificity. Next.js loads page-level CSS after layout CSS, so a component importing its own stylesheet would load after the skin and override it.

The standard skin keeps the CV's palette and fonts. The header, the hero, the approach section and the Now building card are dark bands in both themes, and contact is a teal band. Inside a `.band` (and the header's inner row) `src/index.css` re-points the generic tokens (`--text`, `--surface`, `--accent`, …) to band values, so components inside need no colours of their own; the Terminal skin resets them to its own tokens.

## Versions

Releases are tagged on `main` and listed on the repository's Releases page. `package.json` carries the same version.

- `v3.0.0` — the B+ v2 redesign on Next.js (current, live at devthomas.pl)
- `v2.0.0` — the 2026 revamp of the original site (Create React App)
- `v1.0.0` — the original portfolio, 2021–2026 (Create React App)

## Behavior

- Section links keep their fragment URLs. A normal click moves focus to that section's heading and scrolls it below the sticky header. This includes section links outside the header, such as the hero's "See the work". Off the home page, the section links and the brand lead back to `/`. Modified clicks (Command, Control, Shift, Alt, or a non-primary button) are left to the browser.
- Back returns to the previous fragment.
- When the operating system asks for reduced motion, the same navigation jumps instead of animating.
- Escape closes the mobile menu only while focus is inside that open menu, then returns focus to Menu. Escape elsewhere does not move focus.
- Below 801px the closed menu is not in the tab order. At 801px and above the section links stay available, including after a resize from an open or closed mobile menu.
- The theme button stores `dark` or `light` under `portfolio-theme`. With nothing stored, the page follows `prefers-color-scheme`.
- The `>_` button switches between the standard style and the optional Terminal style, independently of light/dark. It stores `terminal` under `portfolio-skin` and removes the key for the standard style. The inline script in `src/components/Document.tsx` applies a saved skin before first paint. JetBrains Mono is self-hosted and not preloaded, so the browser downloads it only when Terminal is used.
- ⌘K (Ctrl+K elsewhere) opens the command palette from anywhere except other text fields. From 1024px wide, a header button opens it too. It can go to a section, open the CV, LinkedIn, GitHub or this repository, copy the email address, and switch theme or style. Arrow keys choose, Enter runs, and Escape or a click outside closes it and returns focus. In the Terminal style, the same palette is a shell prompt: each command has an alias (`cd work`, `cat cv`, `theme dark`), `help` lists them all, `exit` closes it, and unknown input reports `command not found`. Everything in it is also reachable without it.
- Share links pick the exact look: `?skin=terminal|standard` and `?theme=dark|light`, together or alone, on any page (for example `/?skin=terminal&theme=dark`). A link applies only for that visit. It holds across reloads and pages in that tab through `sessionStorage` (`portfolio-link-skin`, `portfolio-link-theme`), and never overwrites the visitor's saved choice. The parameters apply only when the link is opened, not on a reload or Back/Forward, so a choice made after arriving survives a refresh even though the parameters stay in the address bar. Using the theme or style controls saves the visitor's own choice and replaces the linked look. System dark-mode changes don't override a linked theme. Invalid values are ignored, and links still apply when storage is blocked.
- The home page also has one address per look: `/look/standard-light/`, `/look/standard-dark/`, `/look/terminal-light/` and `/look/terminal-dark/`. Each is a full copy of the home page that opens in that look under the same visit-only rule, names `/` as its canonical page, and carries its own link-preview card (`/look/<slug>/card.jpg`, rendered at build time). Static hosting ignores the query string, so `?skin=` links can't have their own previews; these pages can.
- The palette's "Copy link to this look" (`share` in the Terminal style) copies a link to the current look: the `/look/…` page on the home page, or `?skin=…&theme=…` on other pages.
- The inline script also creates the `theme-color` meta tag for the current skin and theme (`#0f1413` in both standard themes, because the header is a dark band), and `paintThemeColor` updates it. It is not part of Next's metadata, because React replaces a server-rendered meta tag whose content changed.
- The architecture panel's parts are native toggle buttons with `aria-pressed`; the caption below is announced politely. The server renders the first part selected, so its caption shows without JavaScript. Car Brain's screen switcher works the same way, with the image size reserved so switching never shifts the layout.
- Motion is small: a dot running down the panel's connector, the E2E bars growing once when they scroll into view, and hover states. Under reduced motion all of it stops and the bars show at full length.
- In production, the browser console shows a short greeting with a link to this repository (`src/utils/consoleGreeting.ts`).
- Every page is pre-rendered HTML, so the whole page reads without JavaScript. The theme and style controls need it.

## Verification

The Vitest suite checks focus after Escape and after choosing a section, hash updates, Back, reduced motion, closed-menu removal from keyboard navigation, desktop links after a resize, the saved theme and skin, the hero's section link, and links off the home page. The Playwright suite covers the built site in a real browser. Neither replaces a manual browser pass.

Look at 1440, 768, 390, and 320px, and at both sides of the 801px navigation switch. Check both skins and both themes, zoom, the long email, the architecture panel and the case-study "On this page" list, and that the page does not scroll sideways. Flip `CAR_BRAIN_PUBLISHED` locally to check the Car Brain card too.

On 2026-09-29, `https://3d-portfolio.devthomas.pl/` did not resolve (DNS `NXDOMAIN`). The footer does not link to it. GitHub, this portfolio, and the CV remain linked.

Orange's October 2022 start is still the date already published here; it is provisional until that month is confirmed directly.

## Bilingual blog

The blog shares the existing MDX renderer, design tokens, standard/Terminal skins and light/dark themes. `/blog/` is the English index and `/blog/pl/` the Polish index. Article editions use `/blog/en/<slug>/` and `/blog/pl/<slug>/`, with one stable English slug. Language choices never redirect automatically.

Maintain approved articles in `src/content/blog/catalog.ts` and MDX bodies under `src/content/blog/articles/`. The typed registry requires English and Polish titles, descriptions, topics and body references together. Set `publishedAt` to the actual release date, and only set `published: true` when both editions have been reviewed and publication is authorized. `updatedAt` is for substantive later changes. The optional `developmentAsOf` renders a dated development note. Reading time is derived independently from each body.

`npm run prepare:blog` validates the registry and generates concrete static article routes, metadata and localized share-card routes. It runs before dev, build, lint, typecheck and unit tests. Generated files in `src/content/blog/.generated/`, `src/app/(en)/blog/en/` and the article subdirectories of `src/app/(pl)/blog/pl/` are ignored: never edit or commit them. Concrete routes allow an empty initial catalogue without exporting a placeholder article. Run checks sequentially, because preparation replaces those generated files.

The homepage shows up to two published articles between Background and Contact and hides the section when none exist. Both indexes and published editions appear in the command palette and sitemap. The production catalogue includes the approved Car Brain/Appwrite article in English and Polish. It builds normally without private manuscript files or BLOG_PREVIEW_DIR.

### Private local manuscript review

For this sibling career workspace, use `npm run dev:blog -- --port 3012`. It selects the private manuscripts automatically and binds to 127.0.0.1. Open `http://127.0.0.1:3012/blog/` exactly: another project may already use `localhost` on the same port. Stop the previous portfolio dev server before switching modes. Run lint/build/test in a separate checkout or after stopping the preview, because their preparation hooks replace generated routes.

Unreviewed manuscripts do not belong in this public repository. A local-only `BLOG_PREVIEW_DIR` may point to a private directory containing `posts.json` and the referenced EN/PL MDX files. Records must be unpublished and have no release date. The generator rejects this mode in CI. Preview pages have visible draft labels and `noindex`, and are excluded from the sitemap. This is a local review facility, not access control: **never upload a preview build or expose its server publicly**.

```bash
BLOG_PREVIEW_DIR=/absolute/path/to/private/drafts npm run dev
```

For automated preview verification, use the same environment for preparation/build and the following Playwright run. Tests discover the generated article editions. A normal build without `BLOG_PREVIEW_DIR` removes generated private routes and body copies and exports only published records:

```bash
env -u BLOG_PREVIEW_DIR npm run build
npm run test:e2e
```

Article headings must have unique, non-empty generated IDs. Polish characters are normalized for heading anchors. Use `ClientArchitecture` only for the Car Brain article, with `locale="en"` or `locale="pl"`; it distinguishes implemented authentication from planned web data paths. Publication does not enable the independent Car Brain launch card or App Store links.

## English / Polish localization

English URLs stay unchanged. Polish portfolio pages live under `/pl/`, including
`/pl/work/<slug>/`, `/pl/colophon/` and `/pl/look/<look>/`. The bilingual blog
keeps `/blog/`, `/blog/pl/`, `/blog/en/<slug>/` and `/blog/pl/<slug>/`.
There is no automatic locale selection or redirect.

- `(en)` and `(pl)` are separate root layout groups sharing
  `src/components/Document.tsx`. Raw exported HTML has the correct document
  language. Crossing locale roots may reload the document; appearance is retained.
- `src/i18n/routes.ts` owns route identities, pairs and explicit heading
  correspondence. Keep existing English heading IDs; add semantic EN/PL pairs
  when adding translated headings. Unknown fragments reset to the page top.
- `src/content/publicProfile.ts` owns shared facts/links and English wording;
  `src/i18n/profile.ts` owns Polish wording. Stable contribution IDs, companies,
  links, publication flags and numerical bar widths are shared. Case study
  translations are `<slug>.pl.mdx`; metadata is paired in `studies.ts`.
- The header language links work without JavaScript. With JavaScript they retain
  the current equivalent fragment and resolved theme/skin. Below 640px the same
  control occupies a second row; desktop navigation starts at 1100px.
- Stylesheets are imported only by `Document.tsx`, with Terminal overrides last.
  `src/i18n/localization.css` owns the shared language control and header offsets.
- Blog preparation now writes routes to `src/app/(en)/blog/en/<slug>/` and
  `src/app/(pl)/blog/pl/<slug>/`. Its manifest recognizes old generated leaf
  directories for migration, never broad application directories. Keep generated
  paths ignored. Normal preparation excludes private previews.
- `global-not-found.tsx` provides the bilingual static 404 with `noindex`.
  Locale metadata uses reciprocal alternatives and English `x-default`. Look
  previews canonicalize to the corresponding homepage and stay out of the sitemap.
- `npm test` checks locale pairs, headings, shared facts, commands and generator
  migration. `e2e/localization.spec.ts` covers raw exports and rendered EN/PL UI.
  Set `PLAYWRIGHT_PORT` when another project's preview occupies the default 4173.

Run checks sequentially: lint, typecheck, Prettier, unit tests, production build,
then Playwright. Generation hooks modify generated files; do not run checks
concurrently with a private preview in the same checkout.
