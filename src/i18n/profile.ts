import { profile, type Profile } from "@/content/publicProfile";
import type { Locale } from "./locales";

const polish: Profile = {
  ...profile,
  headline: "Inżynier oprogramowania i Tech Lead",
  introduction:
    "Projektuję i tworzę aplikacje webowe i mobilne — od interfejsów po usługi backendowe. Łączę pracę nad kodem z architekturą, testowaniem i przywództwem technicznym.",
  hero: {
    headline: "Złożone wymagania przekuwam w działające aplikacje.",
    headlineAccent: "aplikacje",
    subline:
      "Aplikacje webowe i mobilne — od interfejsów po usługi backendowe, wraz z architekturą, testowaniem i przywództwem technicznym. Regularnie pracuję w godzinach wspólnych z zespołami w USA.",
    location: "Polska · Zdalnie",
    primaryAction: "Zobacz realizacje",
    secondaryAction: "Porozmawiajmy",
  },
  architecture: {
    title: "Orange Polska · wewnętrzny CMS · wybierz element",
    parts: profile.architecture.parts.map((part) => ({
      ...part,
      ...(
        {
          backend: {
            label: "Backend",
            short: "Konfiguracja i JSON Schema",
            caption:
              "Backend opisuje frontend: nawigacja, adresy URL, widoki i formularze przychodzą jako konfiguracja i schematy JSON.",
          },
          shell: {
            label: "Szkielet CMS",
            short: "Nawigacja, adresy, widoki",
            caption:
              "Aplikacja React jest uniwersalnym rendererem. Szkielet CMS buduje nawigację, adresy i widoki na podstawie danych z backendu.",
          },
          contract: {
            label: "Kontrola kontraktu",
            short: "Backend a frontend",
            caption:
              "Ścisła kontrola kontraktu porównuje dane z backendu z oczekiwaniami frontendu i zapisuje szczegółowe błędy dla programistów.",
          },
          forms: {
            label: "Formularze",
            short: "RJSF i własne widgety",
            caption:
              "RJSF renderuje schematy jako formularze, rozszerzone o nasze pola i widgety oparte na MUI.",
          },
          grids: {
            label: "Tabele danych",
            short: "MUI X, operacje zbiorcze",
            caption:
              "MUI X Data Grid wyświetla dane i skonfigurowane akcje, w tym operacje zbiorcze.",
          },
        } satisfies Record<
          string,
          Pick<
            Profile["architecture"]["parts"][number],
            "label" | "short" | "caption"
          >
        >
      )[part.id],
    })),
    footer: {
      ...profile.architecture.footer,
      label: "Nowe zasoby wdrożone bez zmian frontendu",
      value: "Dziesiątki",
    },
  },
  work: {
    eyebrow: "Wybrane realizacje · Orange Polska",
    linkLabel: "Przeczytaj studium przypadku",
  },
  contributions: [
    {
      ...profile.contributions[0],
      topic: "Architektura frontendu",
      period: "Od końca 2022",
      title: "CMS, który backend rozszerza bez zmian frontendu",
      summary:
        "Jeden wewnętrzny CMS dla wielu systemów legacy, zaprojektowany na lata. Wybrałem stack i pozwoliłem backendowi opisywać nawigację, widoki i formularze.",
      outcome:
        "Dziesiątki nowych zasobów trafiły na produkcję bez pracy nad frontendem.",
      decision:
        "React + TypeScript, MUI i RJSF zamiast czystego JS i własnych komponentów",
      tradeOff:
        "Trudniejsze debugowanie, wsparte kontrolą kontraktu i dedykowanymi logami",
    },
    {
      ...profile.contributions[1],
      topic: "Jakość i mentoring",
      period: "Od 2022",
      title: "Od dni ręcznej regresji do mniej niż godziny",
      summary:
        "Zamiast pisać propozycję, zbudowałem działający zestaw testów Cypress. Mój przełożony zatrudnił testera automatyzującego; przeszkoliłem dwie osoby i przez pierwszy rok przeglądałem każdą zmianę.",
      outcome: "1–3 dni → około godziny w Orange TV GO.",
      bars: profile.contributions[1].bars!.map((bar, i) => ({
        ...bar,
        label: [
          "Ręczna regresja, ponad 100 scenariuszy",
          "Cypress, Orange TV GO",
          "Cypress, wewnętrzny CMS (~80)",
        ][i],
        value: i === 0 ? "1–3 dni" : bar.value,
      })),
      tags: profile.contributions[1].tags.map((t) =>
        t === "Parallel runs" ? "Równoległe uruchomienia" : t
      ),
    },
  ],
  building: {
    ...profile.building,
    eyebrow: "Teraz tworzę",
    status: "MVP v1 w budowie",
    title:
      "TheEventa: prowadzę rozwój MVP rezerwacji wydarzeń z małym zespołem i agentami AI",
    text: "Tech Lead od września 2025, równolegle z pracą w Orange. Next.js, NestJS, panel administracyjny i projekt E2E w Playwright — każda zmiana przechodzi moją weryfikację.",
    steps: [
      "Projekt",
      "Ocena biznesowa",
      "AI + ocena biznesowa",
      "Implementacja",
      "Przegląd techniczny",
      "Moja akceptacja",
    ],
    linkLabel: "Jak prowadzę rozwój",
  },
  approach: [
    {
      label: "Architektura",
      text: "Od interfejsów konfigurowanych przez backend po produkty full stack.",
      proof: { href: "/pl/work/orange-cms/", label: "Przykład: CMS" },
    },
    {
      label: "Jakość",
      text: "Przegląd kodu i funkcji, weryfikacja ręczna oraz testy automatyczne.",
      proof: {
        href: "/pl/work/orange-e2e-testing/",
        label: "Przykład: 1–3 dni → ~1 h",
      },
    },
    {
      label: "Wsparcie techniczne",
      text: "Mentoring programistów i testerów poprzez praktyczny przegląd ich pracy.",
      proof: {
        href: "/pl/work/orange-e2e-testing/",
        label: "Przykład: szkolenie dwóch testerów",
      },
    },
    {
      label: "Społeczność",
      text: "Prowadzę ATOM (Akademia Tworzenia Oprogramowania).",
      note: "900 członków",
    },
  ],
  timeline: profile.timeline.map((entry, i) => ({
    ...entry,
    period: [
      "Wcześniejsza kariera",
      "maj–cze 2022",
      "paź 2022–obecnie",
      "wrz 2025–obecnie",
    ][i],
    name: i === 0 ? "Finanse i księgowość" : entry.name,
    detail: [
      entry.detail,
      "Junior Full Stack Developer",
      "Inżynieria oprogramowania i przywództwo techniczne",
      "Tech Lead · rola równoległa",
    ][i],
  })),
  cvLinkLabel: "Pełne CV i PDF (EN)",
  contact: {
    heading: "Otwarty na role Tech Leada z pracą nad kodem",
    line: "Pracuję z Polski, regularnie w godzinach wspólnych z zespołami w USA.",
  },
};
// A changed source shape requires an explicit translation update, never a silent
// English fallback. Required copy fields are also checked by localization tests.
if (
  profile.architecture.parts.some(
    (part) =>
      !["backend", "shell", "contract", "forms", "grids"].includes(part.id)
  ) ||
  profile.contributions.length !== 2 ||
  profile.timeline.length !== 4
) {
  throw new Error("Profile shape changed: update the complete Polish edition");
}
export const getProfile = (locale: Locale = "en"): Profile =>
  locale === "pl" ? polish : profile;
