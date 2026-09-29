# Tomasz Stanisz — portfolio

Public portfolio for Tomasz Stanisz, Software Engineer & Tech Lead. It leads with selected work, then how that work is done, then a short background and contact.

Live site: [https://devthomas.pl/](https://devthomas.pl/)

CV: [https://cv.devthomas.pl/](https://cv.devthomas.pl/)

## Setup

The app is a React client built with Create React App (`react-scripts`). Public copy lives in `src/content/publicProfile.js`.

Use Node.js 24, the current Active LTS (Krypton), and npm 11. `package.json` `engines` accepts Node `>=24.15.0 <25` and npm `>=11 <12`. `.npmrc` sets `engine-strict=true`. The lockfile is npm's `package-lock.json`; install with npm, not another package manager.

```bash
nvm use 24
npm ci
npm start
```

`npm start` serves the development build at [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm test -- --watchAll=false
npm run build
npm run prettier:check
```

`npm test` runs the navigation and theme suite once and exits. `npm run build` writes the production bundle to `build/`. GitHub Actions runs the tests before the build on Node 24.21.0. The workflow does not set `CI=false`.

The publish step pushes the `build/` directory to the `build` branch. That action is pinned to commit `ac113f6bfe8896e85a373534242c949a7ea74c98`. Do not run it locally as part of a normal check.

## Active structure

- `public/index.html` — document metadata, the saved-theme bootstrap, and a no-JavaScript fallback with name, role, CV, and email
- `src/App.js` — Hero, Selected work, How I work, Background, Contact
- `src/content/publicProfile.js` — the public wording and links
- `src/components/NavBar/` — section navigation, mobile menu, and theme control
- `src/utils/scrollToSection.js` — in-page navigation, fragment history, and destination focus
- `src/utils/theme.js` — light/dark choice in `localStorage`, otherwise the operating-system preference
- `src/pages/Work/`, `src/pages/Experience/`, `src/pages/Background/`, `src/pages/Contact/` — the four sections after the hero
- `src/FooterPanel/` — copyright and GitHub

Older practice components, including the carousel, skills wall, and timeline pages, are still in the repository and are not mounted. They are not the live page.

## Behavior

- Section links keep their fragment URLs. A normal click moves focus to that section's heading and scrolls it below the sticky header. Modified clicks (Command, Control, Shift, Alt, or a non-primary button) are left to the browser.
- Back returns to the previous fragment.
- When the operating system asks for reduced motion, the same navigation jumps instead of animating.
- Escape closes the mobile menu only while focus is inside that open menu, then returns focus to Menu. Escape elsewhere does not move focus.
- Below 801px the closed menu is not in the tab order. At 801px and above the section links stay available, including after a resize from an open or closed mobile menu.
- The theme button stores `dark` or `light` under `portfolio-theme`. With nothing stored, the page follows `prefers-color-scheme`.
- Each "Scope and approach" control is a native disclosure. All three start closed and can stay open independently. The same is true of Earlier projects and Earlier training.
- Without JavaScript, the fallback in `public/index.html` still shows the name, role, CV, and email.

## Verification

Automated coverage is the Jest suite above, plus a production build. It checks focus after Escape and after choosing a section, hash updates, Back, reduced motion, closed-menu removal from keyboard navigation, desktop links after a resize, and the saved theme. It does not replace a browser pass.

Look at 1440, 768, 390, and 320px, and at both sides of the 801px navigation switch. Check both themes, zoom, the long email, open disclosures, and that the page does not scroll sideways.

On 2026-09-29, `https://3d-portfolio.devthomas.pl/` did not resolve (DNS `NXDOMAIN`). The footer does not link to it. GitHub, this portfolio, and the CV remain linked.

Training entries that previously said "Present" now record a start date only. Ongoing study was not confirmed, and no completion date was added. Orange's October 2022 start is still the date already published here; it is provisional until that month is confirmed directly.
