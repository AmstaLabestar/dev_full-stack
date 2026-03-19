import type {
  Experience,
  Highlight,
  PortfolioProfile,
  Project,
  SocialLink,
} from "@/generated/prisma/client";
import { portfolioSchema } from "@/schemas/portfolio";
import type { Portfolio } from "@/types/portfolio";

type PortfolioRecord = PortfolioProfile & {
  socialLinks: SocialLink[];
  highlights: Highlight[];
};

export type PortfolioSnapshot = {
  profile: PortfolioRecord;
  projects: Project[];
  experiences: Experience[];
};

export function mapPortfolioSnapshotToDomain(
  snapshot: PortfolioSnapshot,
): Portfolio {
  return portfolioSchema.parse({
    profile: {
      name: snapshot.profile.name,
      role: snapshot.profile.role,
      location: snapshot.profile.location,
      intro: snapshot.profile.intro,
      availability: snapshot.profile.availability,
      yearsOfExperience: snapshot.profile.yearsOfExperience,
      focusAreas: snapshot.profile.focusAreas,
    },
    socialLinks: snapshot.profile.socialLinks
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((link) => ({
        label: link.label,
        href: link.href,
      })),
    highlights: snapshot.profile.highlights
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((highlight) => ({
        label: highlight.label,
        value: highlight.value,
        detail: highlight.detail,
      })),
    projects: snapshot.projects
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((project) => ({
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        category: project.category,
        year: project.year,
        featured: project.featured,
        tags: project.tags,
        metrics: [
          `Livraison ${project.category}`,
          `Focus produit ${project.year}`,
        ],
        links: {
          github: project.githubUrl,
          demo: project.demoUrl,
          video: project.videoUrl ?? undefined,
        },
      })),
    experiences: snapshot.experiences
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((experience) => ({
        company: experience.company,
        role: experience.role,
        period: experience.period,
        summary: experience.summary,
        achievements: [
          "Pilotage technique structure",
          "Execution produit fiabilisee",
        ],
      })),
    skillGroups: [
      {
        title: "Frontend engineering",
        items: ["Next.js", "TypeScript", "React"],
      },
      {
        title: "Backend & data",
        items: ["Node.js", "Prisma", "PostgreSQL"],
      },
      {
        title: "Delivery & platform",
        items: ["CI/CD", "Testing", "Cloud deployment"],
      },
    ],
    services: [
      {
        title: "Architecture produit",
        description:
          "Structuration d'applications maintenables avec separation claire des responsabilites.",
        outcomes: ["Evolutivite maitrisee", "Base technique durable"],
      },
      {
        title: "Delivery full-stack",
        description:
          "Prise en charge du front, du backend et des workflows de mise en production.",
        outcomes: ["Livraison plus rapide", "Qualite homogene"],
      },
      {
        title: "Optimisation",
        description:
          "Amelioration progressive de la performance, de l'UX et de la fiabilite.",
        outcomes: ["Experience plus fluide", "Moins d'incidents"],
      },
    ],
    contactSteps: [
      {
        title: "Cadrage rapide",
        detail: "Comprehension du contexte et des contraintes metier.",
      },
      {
        title: "Plan d'execution",
        detail: "Proposition claire avec priorites et decoupage pragmatique.",
      },
      {
        title: "Lancement",
        detail: "Demarrage avec standards de qualite et visibilite produit.",
      },
    ],
  });
}
