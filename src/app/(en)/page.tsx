import { HomePage } from "@/sections/HomePage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  return <HomePage />;
}
