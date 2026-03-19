import type { Portfolio } from "@/types/portfolio";

export const portfolioSeed: Portfolio = {
  profile: {
    name: "Hamza",
    role: "Senior Full-Stack Developer",
    location: "Paris, France",
    intro:
      "Je conçois des produits web robustes, du design system jusqu'aux workflows DevOps, avec une exigence forte sur la performance, la maintenabilité et l'experience utilisateur.",
    availability: "Disponible pour des missions a fort impact",
    yearsOfExperience: 8,
    focusAreas: [
      "Architecture logicielle",
      "Applications SaaS",
      "Plateformes IA",
    ],
  },
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/hamza",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hamza",
    },
    {
      label: "Email",
      href: "https://example.com/contact",
    },
  ],
  highlights: [
    {
      label: "Experience",
      value: "8+ ans",
      detail: "Conception, delivery et maintenance de produits critiques.",
    },
    {
      label: "Projets lances",
      value: "24",
      detail: "Produits B2B, plateformes internes et experiences client.",
    },
    {
      label: "Stack",
      value: "Full-stack",
      detail: "Next.js, Node.js, PostgreSQL, CI/CD et cloud deployment.",
    },
  ],
  projects: [
    {
      slug: "saas-analytics-suite",
      title: "SaaS Analytics Suite",
      summary:
        "Une plateforme d'analytics temps reel pour equipes produit avec tableaux de bord, pipelines d'evenements et exports automatises.",
      category: "web",
      year: 2025,
      featured: true,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Observability"],
      links: {
        github: "https://github.com/hamza/saas-analytics-suite",
        demo: "https://demo.example.com/analytics-suite",
      },
    },
    {
      slug: "field-ops-mobile",
      title: "Field Ops Mobile",
      summary:
        "Une application mobile pour operations terrain avec synchronisation offline, reporting photo et orchestration des interventions.",
      category: "mobile",
      year: 2024,
      featured: true,
      tags: ["React Native", "Offline First", "Push Notifications"],
      links: {
        github: "https://github.com/hamza/field-ops-mobile",
        demo: "https://demo.example.com/field-ops-mobile",
        video: "https://video.example.com/field-ops-mobile",
      },
    },
    {
      slug: "ai-support-copilot",
      title: "AI Support Copilot",
      summary:
        "Un copilote IA pour support client combinant recherche documentaire, suggestions de reponse et supervision humaine.",
      category: "ai",
      year: 2026,
      featured: true,
      tags: ["LLM", "RAG", "Next.js", "Evaluation"],
      links: {
        github: "https://github.com/hamza/ai-support-copilot",
        demo: "https://demo.example.com/ai-support-copilot",
      },
    },
  ],
  experiences: [
    {
      company: "Nova Studio",
      role: "Lead Full-Stack Engineer",
      period: "2023 - Aujourd'hui",
      summary:
        "Pilotage de la roadmap technique, standardisation des pratiques de delivery et construction de produits SaaS multi-equipes.",
    },
    {
      company: "Scale Factory",
      role: "Senior Software Engineer",
      period: "2020 - 2023",
      summary:
        "Conception de plateformes metier, optimisation des performances frontend et industrialisation du cycle CI/CD.",
    },
  ],
};
