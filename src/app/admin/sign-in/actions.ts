"use server";

import AuthError from "next-auth";
import { signIn } from "@/auth";
import { adminSignInSchema } from "@/schemas/auth";

export type AdminSignInState = {
  error?: string;
};

export async function adminSignInAction(
  _previousState: AdminSignInState,
  formData: FormData,
): Promise<AdminSignInState> {
  const parsedCredentials = adminSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedCredentials.success) {
    return {
      error: "Identifiants invalides.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsedCredentials.data.email,
      password: parsedCredentials.data.password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Email ou mot de passe incorrect.",
      };
    }

    throw error;
  }

  return {};
}
