import type { BlogLocale } from "@/content/blog/types";

type Shot = {
  src: string;
  alt: string;
  caption: string;
};

const hero = {
  en: {
    src: "/blog/why-i-built-car-brain/dashboard.jpg",
    alt: "Car Brain home screen for the current car",
    caption:
      "Home: the current car, fuel use, and what is due soon. The numbers and the car are sample data. On this capture the last-service time is clipped by the add button.",
  },
  pl: {
    src: "/blog/why-i-built-car-brain/dashboard.jpg",
    alt: "Ekran główny Car Brain dla aktualnego auta",
    caption:
      "Ekran główny: aktualne auto, spalanie i to, co wkrótce do zrobienia. Liczby i auto to dane przykładowe. Na tym kadrze godzina ostatniego serwisu jest ucięta przez przycisk dodawania.",
  },
} as const satisfies Record<BlogLocale, Shot>;

const row = {
  en: [
    {
      src: "/blog/why-i-built-car-brain/refuels.jpg",
      alt: "Refuel records in Car Brain",
      caption: "Refuels, with search and a running cost summary.",
    },
    {
      src: "/blog/why-i-built-car-brain/services.jpg",
      alt: "Service records in Car Brain",
      caption:
        "Service history, split into what is done and what is coming up.",
    },
  ],
  pl: [
    {
      src: "/blog/why-i-built-car-brain/refuels.jpg",
      alt: "Tankowania w Car Brain",
      caption: "Lista tankowań z wyszukiwaniem i podsumowaniem kosztów.",
    },
    {
      src: "/blog/why-i-built-car-brain/services.jpg",
      alt: "Serwis w Car Brain",
      caption:
        "Historia serwisu: to, co już zrobione, i to, co dopiero nadchodzi.",
    },
  ],
} as const satisfies Record<BlogLocale, readonly Shot[]>;

function PhoneShot({
  shot,
  loading = "lazy",
}: {
  shot: Shot;
  loading?: "eager" | "lazy";
}) {
  return (
    <div className="product-screens-shot">
      <div className="phone-tile">
        {/* A plain img: the site is a static export with no image optimiser. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="phone-shot"
          src={shot.src}
          alt={shot.alt}
          width={560}
          height={1174}
          loading={loading}
          decoding="async"
        />
      </div>
      <p>{shot.caption}</p>
    </div>
  );
}

export function ProductScreens({
  locale = "en",
  variant = "row",
}: {
  locale?: BlogLocale;
  variant?: "hero" | "row";
}) {
  if (variant === "hero") {
    return (
      <figure className="product-screens product-screens-hero">
        <PhoneShot shot={hero[locale]} loading="eager" />
      </figure>
    );
  }
  const pl = locale === "pl";
  return (
    <figure className="product-screens">
      <div
        className="product-screens-row"
        tabIndex={0}
        role="region"
        aria-label={
          pl
            ? "Ekrany aplikacji. Na wąskim ekranie przewiń w poziomie."
            : "App screens. On a narrow screen, scroll sideways."
        }
      >
        {row[locale].map((shot) => (
          <PhoneShot shot={shot} key={shot.src} />
        ))}
      </div>
    </figure>
  );
}
