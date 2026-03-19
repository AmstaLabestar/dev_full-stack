import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";

describe("FeaturedProjectsSection", () => {
  it("renders project links and metrics", () => {
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
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/hamza/ai-copilot",
    );
  });
});
