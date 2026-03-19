"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/auth-guard";
import type { ExperienceFormValues } from "@/schemas/admin-experience";
import { experienceFormSchema } from "@/schemas/admin-experience";
import { adminService } from "@/services/admin.service";

export type ExperienceActionState = {
  status: "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof ExperienceFormValues, string>>;
};

function normalizeFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): Partial<Record<keyof ExperienceFormValues, string>> {
  return Object.fromEntries(
    Object.entries(fieldErrors)
      .filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length))
      .map(([key, value]) => [key, value[0]]),
  ) as Partial<Record<keyof ExperienceFormValues, string>>;
}

function revalidateAdminExperienceViews() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/experiences");
}

export async function saveExperienceAction(input: {
  id?: string;
  values: ExperienceFormValues;
}): Promise<ExperienceActionState> {
  await requireAdminSession();

  const parsed = experienceFormSchema.safeParse(input.values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Le formulaire experience contient des erreurs.",
      fieldErrors: normalizeFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  if (input.id) {
    await adminService.updateExperience(input.id, parsed.data);
  } else {
    await adminService.createExperience(parsed.data);
  }

  revalidateAdminExperienceViews();

  return {
    status: "success",
    message: input.id ? "Experience mise a jour." : "Experience creee.",
  };
}

export async function deleteExperienceAction(id: string): Promise<void> {
  await requireAdminSession();
  await adminService.deleteExperience(id);
  revalidateAdminExperienceViews();
}
