"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { useForm } from "react-hook-form";

import type { ProjectActionState } from "@/app/admin/projects/actions";
import { saveProjectAction } from "@/app/admin/projects/actions";
import {
  adminFieldClassName,
  adminTextAreaClassName,
} from "@/components/admin/field-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  projectCategoryValues,
  projectFormSchema,
  type ProjectFormValues,
} from "@/schemas/admin-project";
import type { AdminProjectRecord } from "@/types/admin";

type ProjectFormCardProps = {
  mode: "create" | "edit";
  initialValues?: AdminProjectRecord;
};

const defaultValues: ProjectFormValues = {
  title: "",
  slug: "",
  category: "web",
  year: new Date().getFullYear(),
  featured: false,
  tags: "",
  summary: "",
  githubUrl: "https://github.com/",
  demoUrl: "https://",
  videoUrl: "",
  sortOrder: 0,
};

function toFormValues(initialValues?: AdminProjectRecord): ProjectFormValues {
  if (!initialValues) {
    return defaultValues;
  }

  return {
    title: initialValues.title,
    slug: initialValues.slug,
    category: initialValues.category,
    year: initialValues.year,
    featured: initialValues.featured,
    tags: initialValues.tags.join(", "),
    summary: initialValues.summary,
    githubUrl: initialValues.githubUrl,
    demoUrl: initialValues.demoUrl,
    videoUrl: initialValues.videoUrl ?? "",
    sortOrder: initialValues.sortOrder,
  };
}

export function ProjectFormCard({ mode, initialValues }: ProjectFormCardProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<ProjectActionState | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: toFormValues(initialValues),
  });

  const label = mode === "create" ? "Nouveau projet" : "Modifier le projet";

  return (
    <Card className="bg-white/6">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-white">
            {label}
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            {mode === "create"
              ? "Ajoute un nouveau cas d'usage visible sur le portfolio public."
              : "Ajuste le contenu, le tri et les liens sans quitter le dashboard."}
          </p>
        </div>

        <form
          className="grid gap-5"
          onSubmit={form.handleSubmit((values) => {
            setFeedback(null);
            startTransition(async () => {
              const result = await saveProjectAction({
                id: initialValues?.id,
                values,
              });

              if (result.fieldErrors) {
                for (const [field, message] of Object.entries(
                  result.fieldErrors,
                )) {
                  if (message) {
                    form.setError(field as keyof ProjectFormValues, {
                      message,
                    });
                  }
                }
              }

              setFeedback(result);

              if (result.status === "success") {
                if (mode === "create") {
                  form.reset(defaultValues);
                }

                router.refresh();
              }
            });
          })}
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <Field label="Titre" error={form.formState.errors.title?.message}>
              <input
                className={adminFieldClassName()}
                {...form.register("title")}
              />
            </Field>
            <Field label="Slug" error={form.formState.errors.slug?.message}>
              <input
                className={adminFieldClassName()}
                {...form.register("slug")}
              />
            </Field>
            <Field
              label="Categorie"
              error={form.formState.errors.category?.message}
            >
              <select
                className={adminFieldClassName()}
                {...form.register("category")}
              >
                {projectCategoryValues.map((category) => (
                  <option key={category} value={category}>
                    {category === "ai"
                      ? "IA"
                      : category === "web"
                        ? "Web"
                        : "Mobile"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Annee" error={form.formState.errors.year?.message}>
              <input
                className={adminFieldClassName()}
                type="number"
                {...form.register("year", { valueAsNumber: true })}
              />
            </Field>
            <Field label="Tags" error={form.formState.errors.tags?.message}>
              <input
                className={adminFieldClassName()}
                placeholder="Next.js, Prisma, PostgreSQL"
                {...form.register("tags")}
              />
            </Field>
            <Field
              label="Ordre"
              error={form.formState.errors.sortOrder?.message}
            >
              <input
                className={adminFieldClassName()}
                type="number"
                {...form.register("sortOrder", { valueAsNumber: true })}
              />
            </Field>
            <Field
              label="Lien GitHub"
              error={form.formState.errors.githubUrl?.message}
            >
              <input
                className={adminFieldClassName()}
                {...form.register("githubUrl")}
              />
            </Field>
            <Field
              label="Lien demo"
              error={form.formState.errors.demoUrl?.message}
            >
              <input
                className={adminFieldClassName()}
                {...form.register("demoUrl")}
              />
            </Field>
          </div>

          <Field
            label="Lien video"
            error={form.formState.errors.videoUrl?.message}
          >
            <input
              className={adminFieldClassName()}
              {...form.register("videoUrl")}
            />
          </Field>

          <Field label="Resume" error={form.formState.errors.summary?.message}>
            <textarea
              className={adminTextAreaClassName()}
              {...form.register("summary")}
            />
          </Field>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200">
            <input
              className="size-4 accent-cyan-300"
              type="checkbox"
              {...form.register("featured")}
            />
            Mettre en avant sur la landing page
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-5 text-sm">
              {feedback ? (
                <p
                  className={cn(
                    feedback.status === "success"
                      ? "text-emerald-300"
                      : "text-rose-300",
                  )}
                >
                  {feedback.message}
                </p>
              ) : null}
            </div>
            <Button type="submit" disabled={isPending} size="lg">
              {isPending
                ? "Enregistrement..."
                : mode === "create"
                  ? "Creer le projet"
                  : "Enregistrer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-200">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
