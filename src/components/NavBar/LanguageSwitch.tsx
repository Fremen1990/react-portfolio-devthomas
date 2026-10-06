"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { localizedPath, translatedFragment } from "@/i18n/routes";
import { usePreferences } from "@/utils/preferences";

/** Plain links work in exported HTML. Hydration adds the current fragment and
 * resolved appearance, including when storage is blocked. */
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { theme, skin } = usePreferences();
  const [hash, setHash] = useState("");
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const update = () => {
      setHash(window.location.hash);
      setEnhanced(true);
    };
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("portfolio:fragment", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("portfolio:fragment", update);
      window.removeEventListener("popstate", update);
    };
  }, [pathname]);
  return (
    <nav
      className="language-switch"
      aria-label={locale === "pl" ? "Język strony" : "Site language"}
    >
      {(["en", "pl"] as const).map((target) => {
        const path = localizedPath(pathname, target);
        const fragment = translatedFragment(pathname, hash, target);
        const params = enhanced
          ? `?${new URLSearchParams({ skin: skin === "default" ? "standard" : skin, theme })}`
          : "";
        return (
          <a
            key={target}
            href={`${path}${params}${fragment}`}
            hrefLang={target}
            lang={target}
            aria-label={target === "en" ? "English" : "Polski"}
            aria-current={target === locale ? "page" : undefined}
          >
            {target.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}
