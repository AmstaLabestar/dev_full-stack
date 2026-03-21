import { projectMutationSchema } from "@/schemas/admin-project";
import { describe, expect, it } from "vitest";

describe("projectMutationSchema", () => {
  it("splits tags before persistence", () => {
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
      sortOrder: 2,
    });

    expect(result.tags).toEqual(["Next.js", "Prisma", "PostgreSQL"]);
  });

  it("allows an empty project link", () => {
    const result = projectMutationSchema.parse({
      title: "Mobile App",
      slug: "mobile-app",
      category: "mobile",
      year: 2025,
      featured: true,
      tags: "React Native, Offline",
      summary: "Application mobile avec acces principal via video et distribution privee.",
      githubUrl: "https://github.com/hamza/mobile-app",
      demoUrl: "",
      sortOrder: 1,
    });

    expect(result.demoUrl).toBe("");
  });
});
