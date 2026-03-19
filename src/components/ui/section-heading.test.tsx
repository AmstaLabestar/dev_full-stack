import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "@/components/ui/section-heading";

describe("SectionHeading", () => {
  it("renders eyebrow, title and description", () => {
    render(
      <SectionHeading
        eyebrow="Systeme"
        title="Une base UI premium"
        description="Des primitives coherentes pour tout le portfolio."
      />,
    );

    expect(screen.getByText("Systeme")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Une base UI premium" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/primitives coherentes pour tout le portfolio/i),
    ).toBeInTheDocument();
  });
});
