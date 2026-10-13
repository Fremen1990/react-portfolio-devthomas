import type { BlogPost } from "./types";

// Approved bilingual editions. Dates describe the intended release; update if deployment moves.
export const blogPosts: BlogPost[] = [
  {
    slug: "your-api-key-is-private-until-you-ship-it",
    published: true,
    editions: {
      en: {
        title: "Your API key is private. Until you ship it.",
        description:
          "A working VIN lookup put a provider credential on the wrong side of the client/server boundary. The Appwrite Function fix, its tradeoffs, and the shortcut I removed.",
        topics: ["Car Brain", "Expo", "Appwrite", "Architecture"],
        body: "your-api-key-is-private-until-you-ship-it/en.mdx",
      },
      pl: {
        title:
          "Twój klucz API jest prywatny. Dopóki nie wyślesz go z aplikacją.",
        description:
          "Działający odczyt VIN umieścił klucz dostawcy po niewłaściwej stronie granicy klient–serwer. Funkcja Appwrite, jej koszty i usunięcie starej ścieżki.",
        topics: ["Car Brain", "Expo", "Appwrite", "Architektura"],
        body: "your-api-key-is-private-until-you-ship-it/pl.mdx",
      },
    },
    publishedAt: "2026-10-13",
  },
  {
    slug: "why-i-built-car-brain",
    published: true,
    editions: {
      en: {
        title: "Why I built Car Brain, and why this stack",
        description:
          "Why Car Brain exists, and why I would pick React Native, Expo and Appwrite again for a mobile app like this.",
        topics: ["Car Brain", "Expo", "Appwrite"],
        body: "why-i-built-car-brain/en.mdx",
      },
      pl: {
        title: "Dlaczego zbudowałem Car Brain i dlaczego taki stos",
        description:
          "Dlaczego powstał Car Brain i dlaczego przy takiej aplikacji mobilnej wybrałbym znowu React Native, Expo i Appwrite.",
        topics: ["Car Brain", "Expo", "Appwrite"],
        body: "why-i-built-car-brain/pl.mdx",
      },
    },
    publishedAt: "2026-10-06",
  },
  {
    slug: "building-mobile-and-web-clients-around-one-appwrite-backend",
    published: true,
    developmentAsOf: "2026-10-04",
    editions: {
      en: {
        title: "Building mobile and web clients around one Appwrite backend",
        description:
          "Three platforms, two clients, one backend. How I am extending Car Brain to the web—and why sessions and cached screens still need their own design.",
        topics: ["Architecture", "React Native", "Appwrite"],
        body: "building-mobile-and-web-clients-around-one-appwrite-backend/en.mdx",
      },
      pl: {
        title: "Aplikacja mobilna i webowa ze wspólnym backendem Appwrite",
        description:
          "Trzy platformy, dwa klienty, jeden backend. Jak rozwijam Car Brain o web i dlaczego sesje oraz cache nadal wymagają własnych decyzji.",
        topics: ["Architektura", "React Native", "Appwrite"],
        body: "building-mobile-and-web-clients-around-one-appwrite-backend/pl.mdx",
      },
    },
    publishedAt: "2026-10-04",
  },
];
