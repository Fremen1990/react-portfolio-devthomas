import type { BlogPost } from "./types";

// Approved bilingual editions. Dates describe the intended release; update if deployment moves.
export const blogPosts: BlogPost[] = [
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
