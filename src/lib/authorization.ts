export function isAdminRole(role: string | null | undefined): boolean {
  return role === "ADMIN";
}

export function isProtectedAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isAdminSignInPath(pathname: string): boolean {
  return pathname === "/admin/sign-in";
}
