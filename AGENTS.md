<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project guide

Tomasz Stanisz's public portfolio, live at https://devthomas.pl. It is aimed at hiring managers for senior and tech-lead roles. `README.md` is the full reference; this file lists what an agent most needs before changing anything.

## Stack and hosting

- Next.js 16 (App Router) with `output: "export"`: `npm run build` writes static HTML to `out/`. There is no server at runtime.
- On every push to `main`, `.github/workflows/publish.yml` runs all checks and pushes `out/` to the `build` branch, which Hostinger serves. **Merging to `main` deploys the live site.**
- Hostinger serves only real files, so every route must be exported as its own `index.html` (`trailingSlash: true`). No rewrites, redirects, middleware or server actions.
- React 19, TypeScript in `strict` mode, plain CSS with design tokens, MDX via `@next/mdx`.
- Node 24 and npm 11 (`engine-strict`). Use npm, never yarn or pnpm.

## Commands

```bash
npm run dev             # http://localhost:3000
npm run lint            # ESLint (eslint-config-next + TypeScript rules)
npm run typecheck       # tsc --noEmit
npm run prettier:check  # Prettier 3, trailingComma "es5"
npm test                # Vitest unit tests
npm run build           # static export to out/
npm run test:e2e        # Playwright + axe against out/ (build first)
```

All of these must pass before a change is done. CI (`.github/actions/check/`) runs the same list on every pull request.

## Where things live

- `src/app/` — routes. `layout.tsx` is the shell; `page.tsx` is the home page; `colophon/page.mdx` is "How this site is built".
- `src/content/publicProfile.ts` — all public wording and links, typed by `Profile`. `src/content/navigation.ts` — the home page sections.
- `src/sections/` — the home page sections, rendered as Server Components.
- `src/components/NavBar/` — the only client entry point: header, theme and skin controls, and it mounts `CommandPalette/`.
- `src/commands.ts` — the ⌘K palette's commands as data, plus the filter.
- `src/utils/` — theme, skin, preferences store, `scrollToSection`, console greeting.
- `src/design/skin-terminal.css` — every rule of the optional Terminal skin.
- `src/content/work/` — case studies: facts and `published` in `studies.ts`, text in `<slug>.mdx`, mapped in `bodies.ts`. Pages render at `/work/<slug>/`.
- `src/content/looks.ts` and `src/app/look/[look]/` — one copy of the home page per skin and theme, each with a preview card rendered at build time from `card.jpg/route.tsx`. Card colours mirror the CSS tokens; keep them in sync when the design changes.
- `e2e/site.spec.ts` — Playwright suite. Add each new route to `PAGES`.

## Rules that are easy to break

- **CSS order.** Every stylesheet is imported in `src/app/layout.tsx`, and nowhere else, with `skin-terminal.css` last. Its rules are scoped as `:where(html.skin-terminal) …` and win on order, not specificity. A component that imports its own CSS loads after the skin and breaks it.
- **Terminal skin coverage.** New UI needs Terminal styles in `skin-terminal.css`, and must be checked in both skins and both themes.
- **Theme and skin state.** Read it with `usePreferences()`, and change it with `applyTheme` or `applySkin`. Don't read `document` or `localStorage` during render, because the server renders without them.
- **Before-paint script.** The inline script in `layout.tsx` applies the theme and skin before paint (share-link `?skin=`/`?theme=` first, then the visit's link choice in `sessionStorage`, then saved choices), and owns the `theme-color` meta tag. Keep its colours in sync with `THEME_COLORS` in `src/utils/theme.ts`. Don't add `themeColor` to Next metadata, because React would duplicate the tag.
- **Client code.** Keep content in Server Components. Add `"use client"` only where interaction needs it.
- **Section links.** In-page section links go through `scrollToSection`, which moves focus to the section's heading. Off the home page they point to `/#id`.
- **Per-page metadata.** Every page sets it with `pageMetadata()` from `src/lib/metadata.ts`. New public pages also belong in `src/app/sitemap.ts` (the Playwright suite checks the sitemap matches `PAGES`).
- **Accessibility.** Keyboard access, visible focus, reduced motion, and no sideways scroll at 320px are all required. The axe scans must stay at zero violations.

## Content

- Never invent facts about Tomasz's work: no numbers, employers, dates or outcomes that he has not confirmed. Mark gaps and ask him.
- Write in plain, direct English. Case studies and posts are drafted from his answers, and nothing is published without his review. Open such changes as PRs and do not merge them yourself.
- Check with Tomasz before naming anything internal to Orange Polska or TheEventa.

## Git

- Use plain descriptive branch names such as `feature/case-studies` or `fix/header-overlap`. Never use a `claude/` prefix.
- Don't add attribution trailers (`Co-Authored-By`, "Generated with …") to commits or PRs.
- Keep each PR small and focused, with a description of what changed and how it was verified.
- Don't push directly to `main` for code changes.
