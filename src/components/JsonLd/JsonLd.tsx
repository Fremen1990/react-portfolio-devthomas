import { serializeJsonLd } from "@/lib/structuredData";

// Renders schema.org structured data for search engines.
export const JsonLd = ({ data }: { data: unknown }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);
