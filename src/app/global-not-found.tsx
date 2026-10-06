import Link from "next/link";
import Document from "@/components/Document";
export const metadata = {
  title: "Page not found / Nie znaleziono strony",
  robots: { index: false },
};
export default function NotFound() {
  return (
    <Document locale="en">
      <section className="page-section">
        <div className="page-wrap">
          <h1>Page not found</h1>
          <p lang="pl">Nie znaleziono strony.</p>
          <p>
            <Link href="/">Go to the portfolio</Link> ·{" "}
            <Link href="/pl/" lang="pl">
              Przejdź do portfolio
            </Link>
          </p>
        </div>
      </section>
    </Document>
  );
}
