import type { PortfolioEditorialContent } from "@/types/portfolio";

export const portfolioEditorialSeed: PortfolioEditorialContent = {
  projects: [
    {
      slug: "smartcard",
      title: "SmartCard - Carte de reduction intelligente",
      summary:
        "Plateforme web qui permet aux consommateurs d'acheter des cartes de reduction digitales associees a des campagnes d'influence. Elle connecte les utilisateurs, les influenceurs et les commercants locaux afin d'offrir des remises exclusives et tracables sur des produits et services du quotidien.",
      category: "web",
      year: 2025,
      featured: true,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "API REST", "Observability"],
      metrics: [
        "Reduction du temps de traitement des campagnes",
        "Disponibilite ciblee a 99,95%",
        "Meilleure tracabilite des remises et usages",
      ],
      links: {
        github: "https://github.com/AmstaLabestar/fidelity_card",
        demo: "https://fidelitycard.tangagroup.com/",
      },
    },
    {
      slug: "localfood",
      title: "LocalFood - Marketplace de cuisine locale",
      summary:
        "Application mobile permettant aux cuisiniers locaux et particuliers de proposer leurs plats faits maison a proximite, avec decouverte geolocalisee, commande simplifiee et experience orientee usage local.",
      category: "mobile",
      year: 2025,
      featured: true,
      tags: ["React Native", "Offline First", "Geolocation", "Push Notifications"],
      metrics: [
        "Acces rapide a des repas locaux a proximite",
        "Synchronisation offline pour les usages terrain",
        "Reduction du temps de recherche de repas disponibles",
      ],
      links: {
        github: "https://github.com/AmstaLabestar/Mobile-myMeal",
        demo: "https://demo.example.com/localfood",
      },
    },
    {
      slug: "tailorpro",
      title: "TailorPro - Gestion intelligente pour couturiers",
      summary:
        "Application mobile offline-first permettant aux couturiers locaux de gerer leurs commandes, les mesures clients, les paiements et le suivi de livraison, avec une UX adaptee aux contraintes terrain.",
      category: "mobile",
      year: 2024,
      featured: true,
      tags: ["React Native", "Offline First", "Local Storage", "UX Research"],
      metrics: [
        "Reduction des erreurs de mesure et de suivi",
        "Adoption par des ateliers locaux",
        "Usage continu apres phase de test terrain",
      ],
      links: {
        github: "https://github.com/AmstaLabestar/tailor_managments",
        demo: "https://demo.example.com/tailorpro",
      },
    },
    {
      slug: "artisan-connect",
      title: "ArtisanConnect - Mise en relation artisans et clients",
      summary:
        "Application web progressive permettant de connecter rapidement les artisans locaux avec des clients a proximite. Le produit facilite la recherche, la prise de contact et la visibilite des services essentiels sur mobile.",
      category: "web",
      year: 2025,
      featured: true,
      tags: ["Next.js", "PWA", "Geolocation", "API REST", "Offline Support"],
      metrics: [
        "Reduction du temps de recherche d'un artisan qualifie",
        "Visibilite accrue pour les artisans locaux",
        "Acces mobile rapide aux services essentiels",
      ],
      links: {
        github: "https://github.com/AmstaLabestar/contact_artisan",
        demo: "https://demo.example.com/artisan-connect",
      },
    },
  ],
  experiences: [
    {
      company: "Neere Lab",
      role: "Developpeur web et mobile",
      period: "2023 - Aujourd'hui",
      summary:
        "Conception et developpement d'applications web et mobiles pour des besoins metier locaux, avec une attention particuliere sur l'impact produit, la fiabilite et l'experience utilisateur.",
      achievements: [
        "Livraison de produits adaptes a des usages terrain concrets.",
        "Mise en place de bases techniques reutilisables sur plusieurs projets.",
      ],
    },
    {
      company: "Freelance",
      role: "Consultant full-stack",
      period: "2018 - 2023",
      summary:
        "Accompagnement de projets web, mobile et metier sur la conception, le developpement et l'industrialisation, avec un fort focus sur la maintenabilite et la vitesse de livraison.",
      achievements: [
        "Conception de solutions adaptees au contexte local et aux contraintes reelles.",
        "Structuration de workflows de livraison plus fiables et plus simples a maintenir.",
      ],
    },
  ],
};
