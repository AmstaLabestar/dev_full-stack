import { experienceFormSchema } from "@/schemas/admin-experience";
import { describe, expect, it } from "vitest";

describe("experienceFormSchema", () => {
  it("accepts a valid experience payload", () => {
    const result = experienceFormSchema.parse({
      company: "Nova Labs",
      role: "Lead Engineer",
      period: "2023 - Aujourd'hui",
      summary:
        "Pilotage technique, priorisation produit et structuration des pratiques de delivery.",
      sortOrder: 0,
    });

    expect(result.company).toBe("Nova Labs");
  });
});
