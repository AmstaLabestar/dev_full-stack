import { auth } from "@/auth";
import { AdminSignInForm } from "@/components/auth/admin-sign-in-form";
import { Container } from "@/components/ui/container";
import { redirect } from "next/navigation";

export default async function AdminSignInPage() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <Container className="flex justify-center">
        <AdminSignInForm />
      </Container>
    </main>
  );
}
