import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders a button with the requested variant", () => {
    render(<Button variant="outline">Explorer</Button>);

    const button = screen.getByRole("button", { name: "Explorer" });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("border-border");
  });
});
