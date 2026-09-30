import { notFound } from "next/navigation";
import { HomePage } from "@/sections/HomePage";
import { pageMetadata } from "@/lib/metadata";
import { findLook, looks } from "@/content/looks";
import { profile } from "@/content/publicProfile";

type Params = { look: string };

// One copy of the home page per look, so each shared link has its own
// preview card. The inline script in the layout applies the look.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return looks.map(({ slug }) => ({ look: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const look = findLook((await params).look);
  if (!look) {
    return {};
  }
  const path = `/look/${look.slug}/`;
  return pageMetadata({
    path,
    // Search engines should treat these as the home page.
    canonical: "/",
    image: {
      url: `${path}card.png`,
      alt: `${profile.name}, ${profile.headline}. Portfolio in the ${look.label}.`,
    },
  });
}

export default async function LookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  if (!findLook((await params).look)) {
    notFound();
  }
  return <HomePage />;
}
