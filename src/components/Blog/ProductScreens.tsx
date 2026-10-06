import type { BlogLocale } from "@/content/blog/types";

type Shot = {
  src: string;
  alt: string;
  caption: string;
};

const shots = {
  en: [
    {
      src: "/blog/why-i-built-car-brain/dashboard.jpg",
      alt: "Car Brain home screen for the current car",
      caption: "Home: the current car, fuel use, and what is due soon.",
    },
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
      src: "/blog/why-i-built-car-brain/dashboard.jpg",
      alt: "Ekran główny Car Brain dla aktualnego auta",
      caption:
        "Ekran główny: aktualne auto, spalanie i to, co wkrótce do zrobienia.",
    },
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

export function ProductScreens({ locale = "en" }: { locale?: BlogLocale }) {
  const pl = locale === "pl";
  return (
    <figure className="product-screens">
      <div
        className="product-screens-row"
        tabIndex={0}
        role="region"
        aria-label={pl ? "Ekrany aplikacji" : "App screens"}
      >
        {shots[locale].map((shot, index) => (
          <div className="product-screens-shot" key={shot.src}>
            <div className="phone-tile">
              {/* A plain img: the site is a static export with no image optimiser. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="phone-shot"
                src={shot.src}
                alt={shot.alt}
                width={560}
                height={1174}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
            <p>{shot.caption}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
