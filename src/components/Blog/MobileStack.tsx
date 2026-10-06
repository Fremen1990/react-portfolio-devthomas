import { useId } from "react";
import type { BlogLocale } from "@/content/blog/types";

const ink = "var(--text, #1c282c)";
const muted = "var(--text-secondary, #52646a)";
const accent = "var(--accent, #0f6b75)";
const surface = "var(--surface, #ffffff)";
const soft = "var(--accent-soft, #e2efee)";
const border = "var(--separator, #d4deda)";

export function MobileStack({ locale = "en" }: { locale?: BlogLocale }) {
  const pl = locale === "pl";
  const id = useId();
  const title = pl ? "Stos mobilny Car Brain" : "Car Brain mobile stack";
  const description = pl
    ? "Aplikacja Expo na iOS i Androida rozmawia z Appwrite: logowanie, tabele, pliki i funkcje. W oryginalnej aplikacji nie ma osobnego serwera API."
    : "The Expo app on iOS and Android talks to Appwrite for auth, tables, files and functions. There is no separate API server in the original app.";
  return (
    <figure className="mobile-stack" style={{ margin: "32px 0", minWidth: 0 }}>
      <div
        tabIndex={0}
        role="region"
        aria-label={`${title} — ${pl ? "przewijany diagram" : "scrollable diagram"}`}
        style={{
          overflowX: "auto",
          borderRadius: "var(--radius-surface, 16px)",
          border: `1px solid ${border}`,
          background: surface,
        }}
      >
        <svg
          data-diagram="stack"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 720 240"
          width={720}
          height={240}
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          style={{
            display: "block",
            width: "100%",
            minWidth: 640,
            height: "auto",
            fontFamily: "var(--font, system-ui, sans-serif)",
          }}
        >
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-desc`}>{description}</desc>
          <defs>
            <marker
              id={`${id}-arrow`}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={7}
              markerHeight={7}
              orient="auto-start-reverse"
            >
              <path
                d="M1 1L9 5L1 9"
                fill="none"
                stroke={accent}
                strokeWidth={1.5}
              />
            </marker>
          </defs>
          <rect width={720} height={240} fill={surface} />
          <rect
            x={28}
            y={36}
            width={230}
            height={150}
            rx={12}
            fill={surface}
            stroke={border}
            strokeWidth={1.5}
          />
          <text
            x={143}
            y={100}
            textAnchor="middle"
            fill={ink}
            fontSize={18}
            fontWeight={650}
          >
            {pl ? "Aplikacja Expo" : "Expo app"}
          </text>
          <text x={143} y={128} textAnchor="middle" fill={muted} fontSize={15}>
            iOS {pl ? "i" : "and"} Android
          </text>
          <path
            d="M258 111 H308"
            fill="none"
            stroke={accent}
            strokeWidth={1.7}
            markerEnd={`url(#${id}-arrow)`}
          />
          <text x={283} y={96} textAnchor="middle" fill={muted} fontSize={13}>
            SDK
          </text>
          <rect
            x={310}
            y={28}
            width={382}
            height={166}
            rx={12}
            fill={soft}
            stroke={accent}
            strokeWidth={2}
          />
          <text
            x={501}
            y={78}
            textAnchor="middle"
            fill={accent}
            fontSize={18}
            fontWeight={650}
          >
            Appwrite
          </text>
          <text x={501} y={112} textAnchor="middle" fill={accent} fontSize={15}>
            {pl
              ? "Logowanie · tabele · pliki · funkcje"
              : "Auth · tables · files · functions"}
          </text>
          <text x={501} y={146} textAnchor="middle" fill={muted} fontSize={15}>
            {pl ? "Bez mojego serwera API" : "No API server of my own"}
          </text>
        </svg>
      </div>
      <figcaption
        style={{ marginTop: 12, color: muted, fontSize: 14, lineHeight: 1.6 }}
      >
        {pl
          ? "Telefon rozmawia z Appwrite bezpośrednio. Na małym ekranie przewiń schemat w poziomie."
          : "The phone talks to Appwrite directly. On a narrow screen, scroll the diagram horizontally."}
      </figcaption>
    </figure>
  );
}
