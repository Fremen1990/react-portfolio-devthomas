import type { BlogLocale } from "@/content/blog/types";

export function MobileStack({ locale = "en" }: { locale?: BlogLocale }) {
  const pl = locale === "pl";
  const title = pl ? "Stos mobilny Car Brain" : "Car Brain mobile stack";
  return (
    <figure className="mobile-stack" aria-label={title}>
      <div className="mobile-stack-layout">
        <div className="mobile-stack-node mobile-stack-expo">
          <p className="mobile-stack-title">
            {pl ? "Aplikacja Expo" : "Expo app"}
          </p>
          <p className="mobile-stack-muted">iOS {pl ? "i" : "and"} Android</p>
        </div>
        <div className="mobile-stack-arrow" aria-hidden="true">
          <span className="mobile-stack-sdk">SDK</span>
          <svg
            className="mobile-stack-arrow-icon"
            width={28}
            height={16}
            viewBox="0 0 28 16"
            focusable="false"
          >
            <path
              d="M1 8 H20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
            />
            <path
              d="M16 3 L23 8 L16 13"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
            />
          </svg>
        </div>
        <div className="mobile-stack-node mobile-stack-appwrite">
          <p className="mobile-stack-title">Appwrite</p>
          <p>
            {pl
              ? "Logowanie · tabele · pliki · funkcje"
              : "Auth · tables · files · functions"}
          </p>
          <p className="mobile-stack-muted">
            {pl ? "Bez mojego serwera API" : "No API server of my own"}
          </p>
        </div>
      </div>
      <figcaption>
        {pl
          ? "Telefon rozmawia z Appwrite bezpośrednio."
          : "The phone talks to Appwrite directly."}
      </figcaption>
    </figure>
  );
}
