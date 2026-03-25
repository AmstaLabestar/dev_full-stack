import type {
  Experience,
  Highlight,
  PortfolioProfile,
  Project,
  SocialLink,
} from "@prisma/client";
import { describe, expect, it } from "vitest";
import { mapPortfolioSnapshotToDomain } from "@/repositories/portfolio.mapper";

describe("mapPortfolioSnapshotToDomain", () => {
  it("maps Prisma records into the portfolio domain shape", () => {
    const profile: PortfolioProfile & {
      socialLinks: SocialLink[];
      highlights: Highlight[];
    } = {
      id: "portfolio-profile",
      name: "Hamza",
      role: "Senior Full-Stack Developer",
      location: "Paris",
      intro:
        "Je construis des plateformes robustes, maintenables et orientees produit pour des equipes ambitieuses.",
      availability: "Disponible",
      yearsOfExperience: 8,
      focusAreas: ["Architecture", "Frontend", "Backend"],
      socialLinks: [
        {
          id: "social-2",
          label: "LinkedIn",
          href: "https://linkedin.com/in/hamza",
          sortOrder: 1,
          profileId: "portfolio-profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "social-1",
          label: "GitHub",
          href: "https://github.com/hamza",
          sortOrder: 0,
          profileId: "portfolio-profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      highlights: [
        {
          id: "highlight-2",
          label: "Stack",
          value: "Full-stack",
          detail: "Frontend, backend et infrastructure.",
          sortOrder: 1,
          profileId: "portfolio-profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "highlight-1",
          label: "Impact",
          value: "24",
          detail: "Produits lances en production.",
          sortOrder: 0,
          profileId: "portfolio-profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "highlight-3",
          label: "Experience",
          value: "8+",
          detail: "Pilotage technique et delivery produit.",
          sortOrder: 2,
          profileId: "portfolio-profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const projects: Project[] = [
      {
        id: "project-2",
        slug: "mobile-app",
        title: "Mobile App",
        summary:
          "Une application mobile concue pour des workflows terrain robustes et offline.",
        category: "mobile",
        year: 2024,
        featured: false,
        tags: ["React Native"],
        imageUrl: null,
        githubUrl: "https://github.com/hamza/mobile-app",
        demoUrl: "https://demo.example.com/mobile-app",
        videoUrl: null,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "project-1",
        slug: "ai-copilot",
        title: "AI Copilot",
        summary:
          "Un copilote IA concu pour assister les operations metier avec supervision humaine.",
        category: "ai",
        year: 2026,
        featured: true,
        tags: ["LLM", "RAG"],
        imageUrl: null,
        githubUrl: "https://github.com/hamza/ai-copilot",
        demoUrl: "https://demo.example.com/ai-copilot",
        videoUrl: "https://video.example.com/ai-copilot",
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "project-3",
        slug: "saas-suite",
        title: "SaaS Suite",
        summary:
          "Une suite SaaS analytiques concue pour la performance et la lisibilite produit.",
        category: "web",
        year: 2025,
        featured: true,
        tags: ["Next.js", "PostgreSQL"],
        imageUrl: null,
        githubUrl: "https://github.com/hamza/saas-suite",
        demoUrl: "https://demo.example.com/saas-suite",
        videoUrl: null,
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const experiences: Experience[] = [
      {
        id: "experience-1",
        company: "Nova",
        role: "Lead Engineer",
        period: "2023 - Aujourd'hui",
        summary:
          "Pilotage technique et structuration des pratiques de delivery.",
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "experience-2",
        company: "Scale",
        role: "Senior Engineer",
        period: "2020 - 2023",
        summary:
          "Construction de plateformes critiques et optimisation des performances.",
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const result = mapPortfolioSnapshotToDomain({
      profile,
      projects,
      experiences,
    });

    expect(result.socialLinks[0]?.label).toBe("GitHub");
    expect(result.highlights).toHaveLength(3);
    expect(result.projects[0]?.slug).toBe("ai-copilot");
    expect(result.projects[0]?.metrics).toHaveLength(2);
    expect(result.projects[0]?.links.video).toBe(
      "https://video.example.com/ai-copilot",
    );
    expect(result.experiences[0]?.achievements).toHaveLength(2);
    expect(result.skillGroups).toHaveLength(3);
  });
});
