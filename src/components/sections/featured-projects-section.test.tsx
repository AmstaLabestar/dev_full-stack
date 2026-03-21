import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";

describe("FeaturedProjectsSection", () => {
  it("renders project links, image and metrics", () => {
    render(
      <FeaturedProjectsSection
        projects={[
          {
            slug: "ai-copilot",
            title: "AI Copilot",
            summary: "Un copilote IA concu pour la production.",
            category: "ai",
            year: 2026,
            featured: true,
            tags: ["LLM", "RAG"],
            metrics: ["Latence reduite", "Supervision humaine"],
            imageUrl: "/uploads/images/ai-copilot.jpg",
            links: {
              github: "https://github.com/hamza/ai-copilot",
              demo: "https://demo.example.com/ai-copilot",
              video: "https://video.example.com/ai-copilot",
            },
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /ai copilot/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/latence reduite/i)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /capture du projet ai copilot/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute(
      "href",
      "https://github.com/hamza/ai-copilot",
    );
    expect(screen.getByRole("link", { name: /projet/i })).toHaveAttribute(
      "href",
      "https://demo.example.com/ai-copilot",
    );
  });

  it("hides project link when absent and keeps video", () => {
    render(
      <FeaturedProjectsSection
        projects={[
          {
            slug: "tailorpro",
            title: "TailorPro",
            summary: "Application mobile concue pour les couturiers.",
            category: "mobile",
            year: 2025,
            featured: true,
            tags: ["React Native"],
            metrics: ["Offline first", "Terrain"],
            imageUrl: "/uploads/images/tailorpro.jpg",
            links: {
              github: "https://github.com/hamza/tailorpro",
              video: "https://video.example.com/tailorpro",
            },
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /code/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /projet/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /video/i })).toHaveAttribute(
      "href",
      "https://video.example.com/tailorpro",
    );
  });
});
