import { AdminSignInForm } from "@/components/auth/admin-sign-in-form";
import { Container } from "@/components/ui/container";

export default async function AdminSignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <Container className="flex justify-center">
        <AdminSignInForm />
      </Container>
    </main>
  );
}
