"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/auth-guard";
import type { ProjectFormValues } from "@/schemas/admin-project";
import { projectFormSchema } from "@/schemas/admin-project";
import { adminService } from "@/services/admin.service";

export type ProjectActionState = {
  status: "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof ProjectFormValues, string>>;
};

function normalizeFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): Partial<Record<keyof ProjectFormValues, string>> {
  return Object.fromEntries(
    Object.entries(fieldErrors)
      .filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length))
      .map(([key, value]) => [key, value[0]]),
  ) as Partial<Record<keyof ProjectFormValues, string>>;
}

function revalidateAdminProjectViews() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function saveProjectAction(input: {
  id?: string;
  values: ProjectFormValues;
}): Promise<ProjectActionState> {
  await requireAdminSession();

  const parsed = projectFormSchema.safeParse(input.values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Le formulaire projet contient des erreurs.",
      fieldErrors: normalizeFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    if (input.id) {
      await adminService.updateProject(input.id, parsed.data);
    } else {
      await adminService.createProject(parsed.data);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("unique")
    ) {
      return {
        status: "error",
        message: "Le slug doit etre unique.",
        fieldErrors: {
          slug: "Ce slug est deja utilise.",
        },
      };
    }

    throw error;
  }

  revalidateAdminProjectViews();

  return {
    status: "success",
    message: input.id ? "Projet mis a jour." : "Projet cree.",
  };
}

export async function deleteProjectAction(id: string) {
  await requireAdminSession();
  await adminService.deleteProject(id);
  revalidateAdminProjectViews();

  return {
    status: "success" as const,
    message: "Projet supprime.",
  };
}
