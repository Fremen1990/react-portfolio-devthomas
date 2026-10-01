// Car Brain, the app I built on my own. Publication gate: while `published`
// is false, the card is not rendered and no store link appears anywhere (the
// page, structured data or the command palette). Flip it to true once the
// App Store listing is live.

export type CarBrainShot = {
  id: string;
  label: string;
  src: string;
  alt: string;
};

export type CarBrain = {
  published: boolean;
  eyebrow: string;
  years: string;
  title: string;
  text: string;
  tags: string[];
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
  published: false,
  eyebrow: "Shipped on my own",
  years: "2024–2025",
  title: "Car Brain: a vehicle-management app, built end to end",
  text: "Fuel, maintenance and expenses for one or many cars, with an analytics dashboard, service reminders, AI-powered insights and a night-driving theme. I built all of it: the React Native app for iOS and Android, the Appwrite backend and cloud functions, and the landing page.",
  tags: [
    "React Native",
    "iOS",
    "Android",
    "Appwrite",
    "Google & Apple sign-in",
  ],
  appStoreLabel: "Download on the App Store",
  appStoreUrl: "https://apps.apple.com/app/id6754179380",
  siteLabel: "car-brain.com",
  siteUrl: "https://car-brain.com/en",
  shotWidth: 392,
  shotHeight: 822,
  shots: [
    {
      id: "analytics",
      label: "Analytics",
      src: "/work/car-brain/cb-analytics.webp",
      alt: "Car Brain analytics screen with fuel-efficiency chart",
    },
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
