import type { PortfolioStaticContent } from "@/types/portfolio";

export const portfolioContent: PortfolioStaticContent = {
  profile: {
    name: "Hamza",
    role: "Developpeur Full-Stack",
    location: "Ouagadougou, Burkina Faso",
    intro:
      "Je conçois des produits web et mobiles robustes, du design system jusqu'aux workflows DevOps, avec une exigence forte sur la performance, la maintenabilité et l'expérience utilisateur.",
    availability: "Disponible pour des missions a fort impact",
    yearsOfExperience: 3,
    focusAreas: [
      "Architecture logicielle",
      "Applications SaaS",
      "Plateformes IA",
    ],
  },
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/AmstaLabestar",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hamza-bikienga-7b3b152aa/",
    },
    {
      label: "Email",
      href: "mailto:hamzabikienga07@gmail.com",
    },
  ],
  highlights: [
    {
      label: "Experience",
      value: "3+ ans",
      detail: "Conception, livraison et maintenance de produits numeriques utiles et durables.",
    },
    {
      label: "Projets lances",
      value: "10+",
      detail: "Applications web, mobile, outils metier et plateformes orientees terrain.",
    },
    {
      label: "Stack",
      value: "Full-stack",
      detail: "Next.js, React, Node.js, PostgreSQL, Prisma, CI/CD et cloud deployment.",
    },
  ],
  skillGroups: [
    {
      title: "Frontend engineering",
      items: ["Next.js", "TypeScript", "React", "Design systems", "a11y"],
    },
    {
      title: "Backend et data",
      items: ["Node.js", "Prisma", "Python", "Django", "PostgreSQL", "API design", "Caching"],
    },
    {
      title: "Delivery et plateforme",
      items: ["CI/CD", "Docker", "Monitoring", "Testing", "Cloud deployment"],
    },
  ],
  services: [
    {
      title: "Architecture produit",
      description:
        "Je structure des applications maintenables avec une separation claire entre domaine, interface, acces aux donnees et workflows de livraison.",
      outcomes: ["Codebase plus lisible", "Evolutivite mieux maitrisee"],
    },
    {
      title: "Delivery full-stack",
      description:
        "Je prends en charge le front, le back et la mise en production avec une attention constante a la qualite, a la rapidite de livraison et a la robustesse.",
      outcomes: ["Time-to-market reduit", "Moins de dette technique"],
    },
    {
      title: "Modernisation et optimisation",
      description:
        "Je reprends des produits existants pour ameliorer la performance, la clarte de l'experience utilisateur et la stabilite operationnelle.",
      outcomes: ["UX plus fluide", "Cycles de release plus stables"],
    },
  ],
  contactSteps: [
    {
      title: "Cadrage rapide",
      detail:
        "Un premier echange pour comprendre le contexte, les contraintes et le vrai besoin produit.",
    },
    {
      title: "Plan d'execution",
      detail:
        "Une proposition claire avec priorites, architecture cible et decoupage pragmatique.",
    },
    {
      title: "Lancement",
      detail:
        "Un demarrage propre avec standards de qualite, visibilite et livraison incrementale.",
    },
  ],
};
