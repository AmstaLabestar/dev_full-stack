import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { portfolioEditorialSeed } from "@/data/portfolio-editorial-seed";
import { portfolioContent } from "@/data/portfolio";
import { hashPassword } from "@/lib/password";

const connectionString =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_URL must be defined to run the seed.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
  }),
});

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@portfolio.dev";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await hashPassword(adminPassword);

  const profile = await prisma.portfolioProfile.upsert({
    where: { id: "portfolio-profile" },
    update: {
      name: portfolioContent.profile.name,
      role: portfolioContent.profile.role,
      location: portfolioContent.profile.location,
      intro: portfolioContent.profile.intro,
      availability: portfolioContent.profile.availability,
      yearsOfExperience: portfolioContent.profile.yearsOfExperience,
      focusAreas: portfolioContent.profile.focusAreas,
    },
    create: {
      id: "portfolio-profile",
      name: portfolioContent.profile.name,
      role: portfolioContent.profile.role,
      location: portfolioContent.profile.location,
      intro: portfolioContent.profile.intro,
      availability: portfolioContent.profile.availability,
      yearsOfExperience: portfolioContent.profile.yearsOfExperience,
      focusAreas: portfolioContent.profile.focusAreas,
    },
  });

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Hamza Admin",
      passwordHash,
      role: "ADMIN",
    },
    create: {
      name: "Hamza Admin",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.socialLink.deleteMany({ where: { profileId: profile.id } });
  await prisma.highlight.deleteMany({ where: { profileId: profile.id } });
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.asset.deleteMany();

  await prisma.socialLink.createMany({
    data: portfolioContent.socialLinks.map((link, index) => ({
      label: link.label,
      href: link.href,
      sortOrder: index,
      profileId: profile.id,
    })),
  });

  await prisma.highlight.createMany({
    data: portfolioContent.highlights.map((highlight, index) => ({
      label: highlight.label,
      value: highlight.value,
      detail: highlight.detail,
      sortOrder: index,
      profileId: profile.id,
    })),
  });

  await prisma.project.createMany({
    data: portfolioEditorialSeed.projects.map((project, index) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      category: project.category,
      year: project.year,
      featured: project.featured,
      tags: project.tags,
      imageUrl: null,
      githubUrl: project.links.github,
      demoUrl: project.links.demo ?? "",
      videoUrl: project.links.video,
      sortOrder: index,
    })),
  });

  await prisma.experience.createMany({
    data: portfolioEditorialSeed.experiences.map((experience, index) => ({
      company: experience.company,
      role: experience.role,
      period: experience.period,
      summary: experience.summary,
      sortOrder: index,
    })),
  });

  await prisma.asset.create({
    data: {
      type: "cv",
      title: "CV principal",
      fileName: "hamza-cv.pdf",
      storageKey: "uploads/cv/hamza-cv.pdf",
      mimeType: "application/pdf",
      size: 0,
      url: "/uploads/cv/hamza-cv.pdf",
      isCurrent: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

