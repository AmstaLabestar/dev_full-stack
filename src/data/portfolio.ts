import type { Portfolio } from "@/types/portfolio";

export const portfolioSeed: Portfolio = {
  profile: {
    name: "Hamza",
    role: "Full-Stack Developer",
    location: "Ouagadougou, Burkina Faso",
    intro:
      "Je conçois des produits web robustes, du design system jusqu'aux workflows DevOps, avec une exigence forte sur la performance, la maintenabilité et l'expérience utilisateur.",
    availability: "Disponible pour des missions à fort impact",
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
      value: "3+ ans",
      detail: "Conception, delivery et maintenance de produits critiques.",
    },
    {
      label: "Projets lances",
      value: "10+",
      detail: "Produits B2B, plateformes internes et expériences client.",
    },
    {
      label: "Stack",
      value: "Full-stack",
      detail: "React.js, Node.js, PostgreSQL, CI/CD et cloud deployment.",
    },
  ],
  projects: [
    {
      slug: "saas-analytics-suite",
      title: "SaaS Analytics Suite",
      summary:
        "Une plateforme d'analytics temps réel pour équipes produit avec tableaux de bord, pipelines d'événements et exports automatisés.",
      category: "web",
      year: 2025,
      featured: true,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Observability"],
      metrics: ["-38% sur le temps d'analyse", "99.95% de disponibilité"],
      links: {
        github: "https://github.com/hamza/saas-analytics-suite",
        demo: "https://demo.example.com/analytics-suite",
      },
    },
    {
      slug: "field-ops-mobile",
      title: "Field Ops Mobile",
      summary:
        "Une application mobile pour opérations terrain avec synchronisation offline, reporting photo et orchestration des interventions.",
      category: "mobile",
      year: 2024,
      featured: true,
      tags: ["React Native", "Offline First", "Push Notifications"],
      metrics: ["2x plus rapide sur site", "0 perte de donnée offline"],
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
        "Un copilote IA pour support client combinant recherche documentaire, suggestions de réponse et supervision humaine.",
      category: "ai",
      year: 2026,
      featured: true,
      tags: ["LLM", "RAG", "Next.js", "Evaluation"],
      metrics: ["-42% sur le temps de réponse", "+18 pts de satisfaction"],
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
        "Pilotage de la roadmap technique, standardisation des pratiques de delivery et construction de produits SaaS multi-équipes.",
      achievements: [
        "Mise en place d'une architecture modulaire partagée entre quatre squads.",
        "Réduction du temps de release hebdomadaire à un déploiement quotidien.",
      ],
    },
    {
      company: "Scale Factory",
      role: "Senior Software Engineer",
      period: "2020 - 2023",
      summary:
        "Conception de plateformes métier, optimisation des performances frontend et industrialisation du cycle CI/CD.",
      achievements: [
        "Refonte d'un back-office critique utilisé par plus de 300 collaborateurs.",
        "Amélioration du Core Web Vitals sur trois applications stratégiques.",
      ],
    },
  ],
  skillGroups: [
    {
      title: "Frontend engineering",
      items: ["Next.js", "TypeScript", "React", "Design systems", "a11y"],
    },
    {
      title: "Backend & data",
      items: ["Node.js", "Prisma", "PostgreSQL", "API design", "Caching"],
    },
    {
      title: "Delivery & platform",
      items: ["CI/CD", "Docker", "Monitoring", "Testing", "Cloud deployment"],
    },
  ],
  services: [
    {
      title: "Architecture produit",
      description:
        "Je structure des applications maintenables avec une séparation claire entre domaine, UI, accès aux données et workflow de delivery.",
      outcomes: ["Codebase plus lisible", "Évolutivité maîtrisée"],
    },
    {
      title: "Delivery full-stack",
      description:
        "Je prends en charge la chaîne complète, du front premium jusqu'aux fondations backend, avec une attention particulière à la qualité d'exécution.",
      outcomes: ["Time-to-market réduit", "Dette technique contrôlée"],
    },
    {
      title: "Modernisation & optimisation",
      description:
        "Je reprends des produits existants pour améliorer la performance, l'expérience utilisateur et la fiabilité opérationnelle.",
      outcomes: ["Core Web Vitals améliorés", "Processus de release stabilisé"],
    },
  ],
  contactSteps: [
    {
      title: "Cadrage rapide",
      detail:
        "30 minutes pour comprendre le contexte, les contraintes et le niveau de maturité du produit.",
    },
    {
      title: "Plan d'exécution",
      detail:
        "Une proposition claire avec priorités, architecture cible, risques et découpage pragmatique.",
    },
    {
      title: "Lancement",
      detail:
        "Un démarrage propre avec standards de qualité, livraison incrémentale et visibilité sur les prochaines étapes.",
    },
  ],
};
