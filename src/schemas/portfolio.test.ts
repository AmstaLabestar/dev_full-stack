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
    profileImageUrl: "https://example.com/profile.jpg",
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
      metrics: ["Performance", "UX premium"],
      imageUrl: "/uploads/images/app-web.jpg",
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
      metrics: ["Offline first", "Productivite terrain"],
      imageUrl: "/uploads/images/app-mobile.jpg",
      links: {
        github: "https://github.com/hamza/app-mobile",
        demo: "https://demo.example.com/app-mobile",
        video: "/uploads/videos/app-mobile-demo.mp4",
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
      metrics: ["RAG", "Supervision"],
      imageUrl: "/uploads/images/app-ai.jpg",
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
      achievements: ["Pilotage technique", "Standards partages"],
    },
    {
      company: "Scale",
      role: "Senior Engineer",
      period: "2020 - 2024",
      summary:
        "Construction de plateformes critiques avec forte exigence de qualite et de fiabilite.",
      achievements: ["Plateformes critiques", "Performance"],
    },
  ],
  skillGroups: [
    { title: "Frontend", items: ["Next.js", "TypeScript", "React"] },
    { title: "Backend", items: ["Node.js", "Prisma", "PostgreSQL"] },
    { title: "Platform", items: ["CI/CD", "Cloud", "Testing"] },
  ],
  services: [
    {
      title: "Architecture",
      description:
        "Structuration de produits maintenables et evolutifs pour la production.",
      outcomes: ["Clarte", "Scalabilite"],
    },
    {
      title: "Delivery",
      description:
        "Execution full-stack orientee qualite, visibilite et cadence de livraison.",
      outcomes: ["Vitesse", "Qualite"],
    },
    {
      title: "Optimisation",
      description:
        "Amelioration continue des performances, de l'UX et de la fiabilite.",
      outcomes: ["Performance", "Fiabilite"],
    },
  ],
  contactSteps: [
    { title: "Cadrage", detail: "Comprendre le contexte et les contraintes." },
    { title: "Plan", detail: "Proposer un plan d'execution pragmatique." },
    {
      title: "Lancement",
      detail: "Demarrer avec un cadre de delivery propre.",
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

  it("accepts uploaded asset paths for project videos", () => {
    const payloadWithUploadedVideo = {
      ...validPayload,
      projects: validPayload.projects.map((project, index) =>
        index === 1
          ? {
              ...project,
              links: {
                ...project.links,
                video: "/uploads/videos/mobile-demo.mp4",
              },
            }
          : project,
      ),
    };

    expect(portfolioSchema.safeParse(payloadWithUploadedVideo).success).toBe(
      true,
    );
  });
});
