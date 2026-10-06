import type { ReactNode } from "react";
import Document from "@/components/Document";
export { metadata } from "@/components/Document";
export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="pl">{children}</Document>;
}
