import type { Metadata } from "next";
import { ActionLink } from "@/components/ActionLink/ActionLink";
import { profile } from "@/content/publicProfile";

export const metadata: Metadata = {
  title: `Page not found · ${profile.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-section" aria-labelledby="not-found-heading">
      <div className="page-wrap">
        <h1 id="not-found-heading" className="section-heading">
          Page not found
        </h1>
        <p className="prose">
          There is nothing at this address. The portfolio, CV and contact
          details are one click away.
        </p>
        <div className="action-row">
          <ActionLink href="/">Go to the portfolio</ActionLink>
          <ActionLink href={profile.links.cv} external variant="quiet">
            View CV
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
