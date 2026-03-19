import { describe, expect, it } from "vitest";
import { adminSignInSchema } from "@/schemas/auth";

describe("adminSignInSchema", () => {
  it("accepts valid credentials", () => {
    expect(
      adminSignInSchema.safeParse({
        email: "admin@portfolio.dev",
        password: "ChangeMe123!",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid credentials", () => {
    expect(
      adminSignInSchema.safeParse({
        email: "invalid-email",
        password: "short",
      }).success,
    ).toBe(false);
  });
});
