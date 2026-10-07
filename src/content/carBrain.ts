import { CAR_BRAIN_PUBLISHED, carBrainLinks } from "./carBrainLinks";

// The product card is visible during development; store links remain gated.

export type CarBrainShot = {
  id: string;
  label: string;
  src: string;
  alt: string;
};

export type CarBrain = {
  published: boolean;
  eyebrow: string;
  title: string;
  text: string;
  tags: string[];
  role: string;
  architecture: string;
  features: string;
  automation: string;
  status: string;
  articleLabel: string;
  screensLabel: string;
  sampleNote: string;
  appStoreLabel: string;
  appStoreUrl: string;
  siteLabel: string;
  siteUrl: string;
  /** Screenshot size in pixels: 2× the displayed width. */
  shotWidth: number;
  shotHeight: number;
  shots: CarBrainShot[];
};

export const carBrain: CarBrain = {
  published: CAR_BRAIN_PUBLISHED,
  eyebrow: "Independent product",
  title: "Car Brain",
  role: "Creator & Developer",
  text: "A vehicle-management app I’m building for iOS, Android and the web around a shared Appwrite backend.",
  architecture:
    "React Native powers the mobile app and Next.js the web client under development. Both use TypeScript. Cloud functions handle AI insights and VIN decoding.",
  features:
    "Vehicle management · Maintenance, fuel & costs · Reports & analytics",
  automation:
    "AI-powered vehicle insights · VIN decoding with automatic form filling",
  status: "Mobile app reactivation and web development in progress.",
  articleLabel: "Why I built Car Brain",
  screensLabel: "Car Brain screens",
  sampleNote: "App screens with sample data.",
  tags: ["React Native", "Next.js", "TypeScript", "Appwrite"],
  appStoreLabel: "Download on the App Store",
  appStoreUrl: carBrainLinks?.appStoreUrl ?? "",
  siteLabel: "car-brain.com",
  siteUrl: carBrainLinks?.siteUrl ?? "",
  shotWidth: 392,
  shotHeight: 822,
  shots: [
    {
      id: "refuels",
      label: "Refuels",
      src: "/work/car-brain/cb-refuels.webp",
      alt: "Car Brain refuel records with cost and efficiency totals",
    },
    {
      id: "services",
      label: "Services",
      src: "/work/car-brain/cb-services.webp",
      alt: "Car Brain service records by category",
    },
    {
      id: "themes",
      label: "Themes",
      src: "/work/car-brain/cb-settings.webp",
      alt: "Car Brain theme settings including Night Driving",
    },
  ],
};

export const carBrainFor = (locale: "en" | "pl"): CarBrain => {
  if (locale === "en") return carBrain;
  const shots = {
    refuels: {
      label: "Tankowania",
      alt: "Car Brain: historia tankowań, kosztów i zużycia paliwa",
    },
    services: {
      label: "Serwis",
      alt: "Car Brain: historia serwisowa według kategorii",
    },
    themes: {
      label: "Motywy",
      alt: "Car Brain: ustawienia motywów, w tym trybu nocnej jazdy",
    },
  };
  return {
    ...carBrain,
    eyebrow: "Własny produkt",
    role: "Twórca i programista",
    text: "Rozwijam aplikację do zarządzania pojazdami na iOS, Androida i przeglądarkę, ze wspólnym backendem Appwrite.",
    architecture:
      "Aplikacja mobilna korzysta z React Native, a powstająca wersja webowa z Next.js. Obie używają TypeScriptu. Funkcje chmurowe obsługują analizę AI i dekodowanie VIN.",
    features:
      "Zarządzanie pojazdami · Serwis, paliwo i koszty · Raporty i analityka",
    automation:
      "Analiza danych pojazdu z AI · Dekodowanie VIN i automatyczne uzupełnianie formularza",
    status:
      "Trwają prace nad przywróceniem aplikacji mobilnej i rozwojem wersji webowej.",
    articleLabel: "Dlaczego tworzę Car Brain",
    screensLabel: "Ekrany Car Brain",
    sampleNote: "Ekrany aplikacji z przykładowymi danymi.",
    appStoreLabel: "Pobierz z App Store",
    shots: carBrain.shots.map((shot) => ({
      ...shot,
      ...shots[shot.id as keyof typeof shots],
    })),
  };
};
