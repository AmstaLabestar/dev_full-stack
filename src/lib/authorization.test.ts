import { describe, expect, it } from "vitest";
import {
  isAdminRole,
  isAdminSignInPath,
  isProtectedAdminPath,
} from "@/lib/authorization";

describe("authorization helpers", () => {
  it("detects admin role", () => {
    expect(isAdminRole("ADMIN")).toBe(true);
    expect(isAdminRole("USER")).toBe(false);
    expect(isAdminRole(undefined)).toBe(false);
  });

  it("detects protected admin routes", () => {
    expect(isProtectedAdminPath("/admin")).toBe(true);
    expect(isProtectedAdminPath("/admin/projects")).toBe(true);
    expect(isProtectedAdminPath("/projects")).toBe(false);
  });

  it("detects sign-in route", () => {
    expect(isAdminSignInPath("/admin/sign-in")).toBe(true);
    expect(isAdminSignInPath("/admin")).toBe(false);
  });
});
