import { siteConfig } from "@/lib/site-config";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hamza",
    jobTitle: "Developpeur full-stack senior",
    description: siteConfig.description,
    email: siteConfig.email,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "Independant",
    },
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Architecture logicielle",
      "UI/UX",
      "DevOps",
      "IA",
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "fr-FR",
  };
}
