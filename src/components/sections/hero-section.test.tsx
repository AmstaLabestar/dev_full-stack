import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "@/components/sections/hero-section";

describe("HeroSection", () => {
  it("renders key profile information and CTA links", () => {
    render(
      <HeroSection
        profile={{
          name: "Hamza",
          role: "Senior Full-Stack Developer",
          location: "Paris, France",
          intro:
            "Je construis des produits web robustes avec une forte exigence sur l'architecture et l'experience utilisateur.",
          availability: "Disponible",
          yearsOfExperience: 8,
          focusAreas: ["Architecture", "Frontend", "Backend"],
        }}
        socialLinks={[
          {
            label: "GitHub",
            href: "https://github.com/hamza",
          },
          {
            label: "LinkedIn",
            href: "https://linkedin.com/in/hamza",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /hamza, architecte et .*veloppeur full-stack/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /voir les projets/i }),
    ).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/hamza",
    );
  });
});
