import { HomePage } from "@/sections/HomePage";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({ path: "/pl/" });
export default function Page() {
  return <HomePage locale="pl" />;
}
