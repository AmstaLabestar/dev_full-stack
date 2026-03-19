import { projectMutationSchema } from "@/schemas/admin-project";
import { describe, expect, it } from "vitest";

describe("projectMutationSchema", () => {
  it("splits tags and trims optional video url", () => {
    const result = projectMutationSchema.parse({
      title: "SaaS Platform",
      slug: "saas-platform",
      category: "web",
      year: 2025,
      featured: false,
      tags: "Next.js, Prisma,  PostgreSQL ",
      summary: "Plateforme SaaS avec back-office, analytics et parcours admin.",
      githubUrl: "https://github.com/hamza/saas-platform",
      demoUrl: "https://demo.example.com/saas-platform",
      videoUrl: "",
      sortOrder: 2,
    });

    expect(result.tags).toEqual(["Next.js", "Prisma", "PostgreSQL"]);
    expect(result.videoUrl).toBeUndefined();
  });
});
