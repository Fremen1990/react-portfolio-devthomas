# Tomasz Stanisz — portfolio

Public portfolio for Tomasz Stanisz, Software Engineer & Tech Lead. It leads with selected work, then how that work is done, then a short background and contact.

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
- `npm run test:e2e` serves `out/` and runs the Playwright suite in `e2e/`: metadata and Open Graph tags on every page, the not-found page, reading without JavaScript, the saved skin and theme before paint, `theme-color`, the hero link, no console errors, no sideways scroll at 320px, and an axe accessibility scan in both skins and both themes. Build first.

GitHub Actions runs all of these on Node 24.21.0, through the shared steps in `.github/actions/check/`. `ci.yml` runs them on every pull request. `publish.yml` runs them on `main` and then pushes `out/` to the `build` branch, which Hostinger serves. The publish action is pinned to commit `ac113f6bfe8896e85a373534242c949a7ea74c98`. Do not run it locally as part of a normal check.

## Active structure

- `src/app/layout.tsx` — the page shell: fonts (`next/font`, self-hosted at build), the inline script that applies a saved theme and skin before first paint, the header and footer, and every stylesheet in cascade order
- `src/app/page.tsx` — the home page: Hero, Selected work, How I work, Background, Contact
- `src/app/colophon/page.mdx` — "How this site is built", linked from the footer and the palette. Its performance table is a dated snapshot; re-measure before changing it.
- `src/app/work/[slug]/page.tsx` — case study pages. Facts and the published flag live in `src/content/work/studies.ts`, the text in `src/content/work/<slug>.mdx` (mapped in `bodies.ts`). A published study gets its page, a "Read the case study" link under its project, and a palette command (`cat work/<slug>.md`). `src/components/Flow/` draws the step diagrams.
- `src/app/not-found.tsx` — exported as `out/404.html`
- `src/mdx-components.tsx` — how MDX pages render: one article in the prose style (`src/components/Prose/prose.css`), tables that scroll on their own, and external links in a new tab
- `src/lib/metadata.ts` — title, description, canonical and Open Graph tags for each page
- `src/content/publicProfile.ts` — the public wording and links
- `src/components/NavBar/` — section navigation, mobile menu, and the theme and style controls (the only client component)
- `src/utils/scrollToSection.ts` — in-page navigation, fragment history, and destination focus
- `src/utils/theme.ts` — light/dark choice in `localStorage`, otherwise the operating-system preference
- `src/utils/skin.ts` — standard or Terminal style in `localStorage`; `src/design/skin-terminal.css` holds every Terminal rule, scoped under `html.skin-terminal`
- `src/commands.ts` — the command palette's commands as data, and the filter that ranks them
- `src/components/CommandPalette/` — the ⌘K palette (a native `<dialog>` with a combobox), mounted by NavBar
- `src/content/navigation.ts` — the home page sections, shared by the header and the palette
- `src/utils/preferences.ts` — keeps controls in sync with the current theme and skin, and lets the server render before either is known
- `src/sections/Work/`, `src/sections/Experience/`, `src/sections/Background/`, `src/sections/Contact/` — the four sections after the hero, rendered to static HTML
- `src/components/FooterPanel/` — copyright and GitHub

All CSS is imported in `src/app/layout.tsx` and nowhere else, with `skin-terminal.css` last. The Terminal rules use `:where()`, so they win on order, not specificity. Next.js loads page-level CSS after layout CSS, so a component importing its own stylesheet would load after the skin and override it.

## Behavior

- Section links keep their fragment URLs. A normal click moves focus to that section's heading and scrolls it below the sticky header. This includes section links outside the header, such as the hero's "Explore selected work". Off the home page, the section links and the brand lead back to `/`. Modified clicks (Command, Control, Shift, Alt, or a non-primary button) are left to the browser.
- Back returns to the previous fragment.
- When the operating system asks for reduced motion, the same navigation jumps instead of animating.
- Escape closes the mobile menu only while focus is inside that open menu, then returns focus to Menu. Escape elsewhere does not move focus.
- Below 801px the closed menu is not in the tab order. At 801px and above the section links stay available, including after a resize from an open or closed mobile menu.
- The theme button stores `dark` or `light` under `portfolio-theme`. With nothing stored, the page follows `prefers-color-scheme`.
- The `>_` button switches between the standard style and the optional Terminal style, independently of light/dark. It stores `terminal` under `portfolio-skin` and removes the key for the standard style. The inline script in `src/app/layout.tsx` applies a saved skin before first paint. JetBrains Mono is self-hosted and not preloaded, so the browser downloads it only when Terminal is used.
- ⌘K (Ctrl+K elsewhere) opens the command palette from anywhere except other text fields. From 1024px wide, a header button opens it too. It can go to a section, open the CV, LinkedIn, GitHub or this repository, copy the email address, and switch theme or style. Arrow keys choose, Enter runs, and Escape or a click outside closes it and returns focus. In the Terminal style, the same palette is a shell prompt: each command has an alias (`cd work`, `cat cv`, `theme dark`), `help` lists them all, `exit` closes it, and unknown input reports `command not found`. Everything in it is also reachable without it.
- Share links pick the exact look: `?skin=terminal|standard` and `?theme=dark|light`, together or alone, on any page (for example `/?skin=terminal&theme=dark`). A link applies only for that visit. It holds across reloads and pages in that tab through `sessionStorage` (`portfolio-link-skin`, `portfolio-link-theme`), and never overwrites the visitor's saved choice. The parameters apply only when the link is opened, not on a reload or Back/Forward, so a choice made after arriving survives a refresh even though the parameters stay in the address bar. Using the theme or style controls saves the visitor's own choice and replaces the linked look. System dark-mode changes don't override a linked theme. Invalid values are ignored, and links still apply when storage is blocked.
- The palette's "Copy link to this look" (`share` in the Terminal style) copies such a link for the current page, style and theme.
- The inline script also creates the `theme-color` meta tag for the current skin and theme, and `paintThemeColor` updates it. It is not part of Next's metadata, because React replaces a server-rendered meta tag whose content changed.
- Each "Scope and approach" control is a native disclosure. All three start closed and can stay open independently. The same is true of Earlier projects and Earlier training.
- In production, the browser console shows a short greeting with a link to this repository (`src/utils/consoleGreeting.ts`).
- Every page is pre-rendered HTML, so the whole page reads without JavaScript. The theme and style controls need it.

## Verification

The Vitest suite checks focus after Escape and after choosing a section, hash updates, Back, reduced motion, closed-menu removal from keyboard navigation, desktop links after a resize, the saved theme and skin, the hero's section link, and links off the home page. The Playwright suite covers the built site in a real browser. Neither replaces a manual browser pass.

Look at 1440, 768, 390, and 320px, and at both sides of the 801px navigation switch. Check both themes, zoom, the long email, open disclosures, and that the page does not scroll sideways.

On 2026-09-29, `https://3d-portfolio.devthomas.pl/` did not resolve (DNS `NXDOMAIN`). The footer does not link to it. GitHub, this portfolio, and the CV remain linked.

Training entries that previously said "Present" now record a start date only. Ongoing study was not confirmed, and no completion date was added. Orange's October 2022 start is still the date already published here; it is provisional until that month is confirmed directly.
