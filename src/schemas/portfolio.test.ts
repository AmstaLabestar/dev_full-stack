import { describe, expect, it } from "vitest";
import { portfolioSchema } from "@/schemas/portfolio";

const validPayload = {
  profile: {
    name: "Hamza",
    role: "Senior Engineer",
    location: "Paris",
    intro:
      "Un profil full-stack qui construit des produits robustes avec une forte exigence de qualite.",
    availability: "Disponible",
    yearsOfExperience: 7,
    focusAreas: ["Architecture", "Frontend", "Backend"],
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/hamza" },
    { label: "LinkedIn", href: "https://linkedin.com/in/hamza" },
  ],
  highlights: [
    {
      label: "Experience",
      value: "7+",
      detail: "Delivery de produits complexes.",
    },
    { label: "Stack", value: "Full-stack", detail: "Expertise front et back." },
    { label: "Impact", value: "Produit", detail: "Approche orientee usage." },
  ],
  projects: [
    {
      slug: "app-web",
      title: "App Web",
      summary:
        "Une application web complete orientee performances et experience utilisateur premium.",
      category: "web" as const,
      year: 2024,
      featured: true,
      tags: ["Next.js"],
      links: {
        github: "https://github.com/hamza/app-web",
        demo: "https://demo.example.com/app-web",
      },
    },
    {
      slug: "app-mobile",
      title: "App Mobile",
      summary:
        "Une application mobile concue pour des workflows terrain exigeants avec synchronisation offline.",
      category: "mobile" as const,
      year: 2025,
      featured: false,
      tags: ["React Native"],
      links: {
        github: "https://github.com/hamza/app-mobile",
        demo: "https://demo.example.com/app-mobile",
      },
    },
    {
      slug: "app-ai",
      title: "App AI",
      summary:
        "Une application IA axee productivite, supervision et pertinence des reponses generees.",
      category: "ai" as const,
      year: 2026,
      featured: true,
      tags: ["LLM"],
      links: {
        github: "https://github.com/hamza/app-ai",
        demo: "https://demo.example.com/app-ai",
      },
    },
  ],
  experiences: [
    {
      company: "Nova",
      role: "Lead Engineer",
      period: "2024 - Aujourd'hui",
      summary:
        "Pilotage technique et alignement des pratiques entre produit, design et engineering.",
    },
    {
      company: "Scale",
      role: "Senior Engineer",
      period: "2020 - 2024",
      summary:
        "Construction de plateformes critiques avec forte exigence de qualite et de fiabilite.",
    },
  ],
};

describe("portfolioSchema", () => {
  it("accepts a valid payload", () => {
    expect(portfolioSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects invalid urls", () => {
    const invalidPayload = {
      ...validPayload,
      projects: [
        {
          ...validPayload.projects[0],
          links: {
            ...validPayload.projects[0].links,
            github: "github.com/hamza/app-web",
          },
        },
        ...validPayload.projects.slice(1),
      ],
    };

    expect(portfolioSchema.safeParse(invalidPayload).success).toBe(false);
  });
});
