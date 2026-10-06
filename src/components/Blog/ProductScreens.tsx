import type { BlogLocale } from "@/content/blog/types";

const shots = {
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
    {
      src: "/blog/why-i-built-car-brain/settings.jpg",
      alt: "Theme settings in Car Brain, including night driving",
      caption: "Themes, including the red night-driving mode.",
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
    {
      src: "/blog/why-i-built-car-brain/settings.jpg",
      alt: "Ustawienia motywu w Car Brain, w tym jazda nocą",
      caption: "Motywy, w tym czerwony tryb jazdy nocą.",
    },
  ],
} as const;

export function ProductScreens({ locale = "en" }: { locale?: BlogLocale }) {
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
        {shots[locale].map((shot) => (
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
                loading="lazy"
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
