import type { Portfolio } from "@/types/portfolio";

export const portfolioSeed: Portfolio = {
  profile: {
    name: "Hamza",
    role: "Senior Full-Stack Developer",
    location: "Paris, France",
    intro:
      "Je con�ois des produits web robustes, du design system jusqu'aux workflows DevOps, avec une exigence forte sur la performance, la maintenabilit� et l'exp�rience utilisateur.",
    availability: "Disponible pour des missions � fort impact",
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
      detail: "Produits B2B, plateformes internes et exp�riences client.",
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
        "Une plateforme d'analytics temps r�el pour �quipes produit avec tableaux de bord, pipelines d'�v�nements et exports automatis�s.",
      category: "web",
      year: 2025,
      featured: true,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Observability"],
      metrics: ["-38% sur le temps d'analyse", "99.95% de disponibilit�"],
      links: {
        github: "https://github.com/hamza/saas-analytics-suite",
        demo: "https://demo.example.com/analytics-suite",
      },
    },
    {
      slug: "field-ops-mobile",
      title: "Field Ops Mobile",
      summary:
        "Une application mobile pour op�rations terrain avec synchronisation offline, reporting photo et orchestration des interventions.",
      category: "mobile",
      year: 2024,
      featured: true,
      tags: ["React Native", "Offline First", "Push Notifications"],
      metrics: ["2x plus rapide sur site", "0 perte de donn�e offline"],
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
        "Un copilote IA pour support client combinant recherche documentaire, suggestions de r�ponse et supervision humaine.",
      category: "ai",
      year: 2026,
      featured: true,
      tags: ["LLM", "RAG", "Next.js", "Evaluation"],
      metrics: ["-42% sur le temps de r�ponse", "+18 pts de satisfaction"],
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
        "Pilotage de la roadmap technique, standardisation des pratiques de delivery et construction de produits SaaS multi-�quipes.",
      achievements: [
        "Mise en place d'une architecture modulaire partag�e entre quatre squads.",
        "R�duction du temps de release hebdomadaire � un d�ploiement quotidien.",
      ],
    },
    {
      company: "Scale Factory",
      role: "Senior Software Engineer",
      period: "2020 - 2023",
      summary:
        "Conception de plateformes m�tier, optimisation des performances frontend et industrialisation du cycle CI/CD.",
      achievements: [
        "Refonte d'un back-office critique utilis� par plus de 300 collaborateurs.",
        "Am�lioration du Core Web Vitals sur trois applications strat�giques.",
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
        "Je structure des applications maintenables avec une s�paration claire entre domaine, UI, acc�s aux donn�es et workflow de delivery.",
      outcomes: ["Codebase plus lisible", "�volutivit� ma�tris�e"],
    },
    {
      title: "Delivery full-stack",
      description:
        "Je prends en charge la cha�ne compl�te, du front premium jusqu'aux fondations backend, avec une attention particuli�re � la qualit� d'ex�cution.",
      outcomes: ["Time-to-market r�duit", "Dette technique contr�l�e"],
    },
    {
      title: "Modernisation & optimisation",
      description:
        "Je reprends des produits existants pour am�liorer la performance, l'exp�rience utilisateur et la fiabilit� op�rationnelle.",
      outcomes: ["Core Web Vitals am�lior�s", "Processus de release stabilis�"],
    },
  ],
  contactSteps: [
    {
      title: "Cadrage rapide",
      detail:
        "30 minutes pour comprendre le contexte, les contraintes et le niveau de maturit� du produit.",
    },
    {
      title: "Plan d'ex�cution",
      detail:
        "Une proposition claire avec priorit�s, architecture cible, risques et d�coupage pragmatique.",
    },
    {
      title: "Lancement",
      detail:
        "Un d�marrage propre avec standards de qualit�, livraison incr�mentale et visibilit� sur les prochaines �tapes.",
    },
  ],
};
