// Car Brain's publication gate. Flip it to true once the App Store listing is
// live again. The links sit behind the gate on purpose: while it is false the
// build drops them, so no store link ships in any page or script, including
// the command palette's.
export const CAR_BRAIN_PUBLISHED: boolean = false;

export type CarBrainLinks = { appStoreUrl: string; siteUrl: string };

export const carBrainLinks: CarBrainLinks | null = CAR_BRAIN_PUBLISHED
  ? {
      appStoreUrl: "https://apps.apple.com/app/id6754179380",
      siteUrl: "https://car-brain.com/en",
    }
  : null;
