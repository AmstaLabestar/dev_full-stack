import type { PortfolioRepository } from "@/repositories/portfolio.repository";
import { PortfolioService } from "@/services/portfolio.service";
import { describe, expect, it } from "vitest";

describe("PortfolioService", () => {
  it("returns featured projects sorted by year descending", async () => {
    const repository: PortfolioRepository = {
      getPortfolio: async () => ({
        profile: {
          name: "Hamza",
          role: "Senior Full-Stack Developer",
          location: "Paris",
          intro:
            "Un profil senior qui construit des produits web robustes et maintenables pour des equipes produit ambitieuses.",
          availability: "Disponible",
          yearsOfExperience: 8,
          focusAreas: ["Architecture", "Product", "Delivery"],
        },
        socialLinks: [
          { label: "GitHub", href: "https://github.com/hamza" },
          { label: "LinkedIn", href: "https://linkedin.com/in/hamza" },
        ],
        highlights: [
          {
            label: "Experience",
            value: "8+",
            detail: "Pilotage de produits en production.",
          },
          {
            label: "Stack",
            value: "Full-stack",
            detail: "Frontend, backend et DevOps.",
          },
          {
            label: "Impact",
            value: "Produit",
            detail: "Vision orientee usage et business.",
          },
        ],
        projects: [
          {
            slug: "legacy",
            title: "Legacy",
            summary:
              "Migration d'une plateforme ancienne vers une stack moderne avec forte exigence de fiabilite.",
            category: "web",
            year: 2022,
            featured: true,
            tags: ["Migration"],
            metrics: ["Stabilite", "Migration"],
            links: {
              github: "https://github.com/hamza/legacy",
              demo: "https://demo.example.com/legacy",
            },
          },
          {
            slug: "mobile",
            title: "Mobile",
            summary:
              "Application mobile pour operations terrain avec experience offline et reporting.",
            category: "mobile",
            year: 2024,
            featured: true,
            tags: ["Offline"],
            metrics: ["Offline", "Terrain"],
            links: {
              github: "https://github.com/hamza/mobile",
              demo: "https://demo.example.com/mobile",
            },
          },
          {
            slug: "copilot",
            title: "Copilot",
            summary:
              "Copilote IA metier avec orchestration, supervision et validation humaine en production.",
            category: "ai",
            year: 2026,
            featured: true,
            tags: ["AI"],
            metrics: ["RAG", "Support"],
            links: {
              github: "https://github.com/hamza/copilot",
              demo: "https://demo.example.com/copilot",
            },
          },
          {
            slug: "internal",
            title: "Internal",
            summary:
              "Back-office interne pour suivi operationnel, indicateurs et workflows equipes.",
            category: "web",
            year: 2025,
            featured: false,
            tags: ["Back-office"],
            metrics: ["Ops", "KPIs"],
            links: {
              github: "https://github.com/hamza/internal",
              demo: "https://demo.example.com/internal",
            },
          },
        ],
        experiences: [
          {
            company: "Nova",
            role: "Lead Engineer",
            period: "2023 - Aujourd'hui",
            summary:
              "Pilotage de la roadmap technique et coordination delivery.",
            achievements: ["Roadmap technique", "Delivery multi-equipes"],
          },
          {
            company: "Scale",
            role: "Senior Engineer",
            period: "2020 - 2023",
            summary:
              "Construction de plateformes critiques et optimisation du cycle de delivery.",
            achievements: ["Plateformes critiques", "Optimisation delivery"],
          },
        ],
        skillGroups: [
          {
            title: "Frontend",
            items: ["Next.js", "TypeScript", "React"],
          },
          {
            title: "Backend",
            items: ["Node.js", "Prisma", "PostgreSQL"],
          },
          {
            title: "Platform",
            items: ["CI/CD", "Testing", "Cloud"],
          },
        ],
        services: [
          {
            title: "Architecture",
            description: "Structuration de produits maintenables.",
            outcomes: ["Clarte", "Scalabilite"],
          },
          {
            title: "Delivery",
            description: "Execution full-stack orientee production.",
            outcomes: ["Vitesse", "Qualite"],
          },
          {
            title: "Optimisation",
            description:
              "Amelioration continue de l'experience et des performances.",
            outcomes: ["Performance", "Fiabilite"],
          },
        ],
        contactSteps: [
          {
            title: "Cadrage",
            detail: "Comprendre le contexte du projet.",
          },
          {
            title: "Plan",
            detail: "Proposer un plan d'execution clair.",
          },
          {
            title: "Lancement",
            detail: "Demarrer la livraison de maniere incremental.",
          },
        ],
      }),
    };

    const service = new PortfolioService(repository);
    const result = await service.getLandingPageData();

    expect(result.featuredProjects.map((project) => project.slug)).toEqual([
      "copilot",
      "mobile",
      "legacy",
    ]);
    expect(result.experiences).toHaveLength(2);
    expect(result.skillGroups).toHaveLength(3);
    expect(result.services).toHaveLength(3);
    expect(result.contactSteps).toHaveLength(3);
    expect(result.profile.availability).toContain("Architecture");
    expect(result.profile.availability).toContain("Product");
    expect(result.profile.availability).toContain("Delivery");
  });
});
