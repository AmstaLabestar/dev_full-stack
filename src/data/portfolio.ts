import type { PortfolioStaticContent } from "@/types/portfolio";

export const portfolioContent: PortfolioStaticContent = {
  profile: {
    name: "Hamza",
    role: "Developpeur Full-Stack",
    location: "Ouagadougou, Burkina Faso",
    intro:
      "Je conçois des produits web et mobiles robustes, de l architecture applicative jusqu a la mise en production, avec une exigence constante sur la performance, la maintenabilite et l experience utilisateur.",
    availability: "Disponible pour des missions produit a fort enjeu",
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
      detail: "Conception, livraison et evolution de produits numeriques concus pour des usages reels.",
    },
    {
      label: "Projets livres",
      value: "10+",
      detail: "Applications web, mobile, outils metier et plateformes pensees pour des environnements concrets.",
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
      outcomes: ["Codebase plus lisible", "Evolution technique mieux maitrisee"],
    },
    {
      title: "Delivery full-stack",
      description:
        "Je prends en charge le front, le back et la mise en production avec une attention constante a la qualite, a la vitesse de livraison et a la robustesse.",
      outcomes: ["Delais mieux tenus", "Moins de dette technique"],
    },
    {
      title: "Modernisation et optimisation",
      description:
        "Je reprends des produits existants pour ameliorer la performance, la clarte de l experience utilisateur et la stabilite operationnelle.",
      outcomes: ["Experience plus fluide", "Cycles de release plus stables"],
    },
  ],
  contactSteps: [
    {
      title: "Cadrage rapide",
      detail:
        "Un premier echange pour comprendre le contexte, les contraintes et le vrai besoin produit.",
    },
    {
      title: "Plan d execution",
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