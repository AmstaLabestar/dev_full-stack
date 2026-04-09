import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

export default function Head() {
  const structuredDataJson = JSON.stringify([
    buildPersonJsonLd(),
    buildWebsiteJsonLd(),
  ]).replace(/</g, "\\u003c");

  return (
    <>
      <script
        id="portfolio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataJson,
        }}
      />
    </>
  );
}
