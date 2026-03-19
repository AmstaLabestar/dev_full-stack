import { auth } from "@/auth";
import { isAdminRole } from "@/lib/authorization";
import { redirect } from "next/navigation";

export async function requireAdminSession() {
  const session = await auth();

  if (!session?.user || !isAdminRole(session.user.role)) {
    redirect("/admin/sign-in");
  }

  return session;
}
