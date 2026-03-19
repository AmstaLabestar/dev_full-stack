import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import { describe, expect, it } from "vitest";

describe("seo helpers", () => {
  it("builds person json ld with expected identity fields", () => {
    const result = buildPersonJsonLd();

    expect(result["@type"]).toBe("Person");
    expect(result.name).toBe("Hamza");
    expect(result.sameAs).toHaveLength(2);
  });

  it("builds website json ld in french", () => {
    const result = buildWebsiteJsonLd();

    expect(result["@type"]).toBe("WebSite");
    expect(result.inLanguage).toBe("fr-FR");
  });
});
