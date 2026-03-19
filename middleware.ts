import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isAdminRole, isAdminSignInPath } from "@/lib/authorization";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const isAdmin = isAdminRole(
    typeof token?.role === "string" ? token.role : undefined,
  );

  if (isAdminSignInPath(pathname) && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isAdminSignInPath(pathname) && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
