"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import type { ExperienceActionState } from "@/app/admin/experiences/actions";
import { saveExperienceAction } from "@/app/admin/experiences/actions";
import {
  adminFieldClassName,
  adminTextAreaClassName,
} from "@/components/admin/field-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  experienceFormSchema,
  type ExperienceFormValues,
} from "@/schemas/admin-experience";
import type { AdminExperienceRecord } from "@/types/admin";

type ExperienceFormCardProps = {
  mode: "create" | "edit";
  initialValues?: AdminExperienceRecord;
};

const defaultValues: ExperienceFormValues = {
  company: "",
  role: "",
  period: "",
  summary: "",
  sortOrder: 0,
};

function toFormValues(
  initialValues?: AdminExperienceRecord,
): ExperienceFormValues {
  if (!initialValues) {
    return defaultValues;
  }

  return {
    company: initialValues.company,
    role: initialValues.role,
    period: initialValues.period,
    summary: initialValues.summary,
    sortOrder: initialValues.sortOrder,
  };
}

export function ExperienceFormCard({
  mode,
  initialValues,
}: ExperienceFormCardProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<ExperienceActionState | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: toFormValues(initialValues),
  });

  return (
    <Card className="border-white/10 bg-white/6">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-semibold text-white">
            {mode === "create"
              ? "Nouvelle experience"
              : "Modifier l'experience"}
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Structure le parcours professionnel affiche dans le portfolio public.
          </p>
          <p className="rounded-2xl border border-cyan-300/15 bg-cyan-400/8 px-4 py-3 text-sm leading-6 text-cyan-100/90">
            L ordre le plus faible passe en premier dans la section experience du
            portfolio public.
          </p>
        </div>

        <form
          className="grid gap-5"
          onSubmit={form.handleSubmit((values) => {
            setFeedback(null);
            startTransition(async () => {
              const result = await saveExperienceAction({
                id: initialValues?.id,
                values,
              });

              if (result.fieldErrors) {
                for (const [field, message] of Object.entries(
                  result.fieldErrors,
                )) {
                  if (message) {
                    form.setError(field as keyof ExperienceFormValues, {
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
            <Field
              label="Societe"
              error={form.formState.errors.company?.message}
            >
              <input
                className={adminFieldClassName()}
                {...form.register("company")}
              />
            </Field>
            <Field label="Role" error={form.formState.errors.role?.message}>
              <input
                className={adminFieldClassName()}
                {...form.register("role")}
              />
            </Field>
            <Field
              label="Periode"
              error={form.formState.errors.period?.message}
            >
              <input
                className={adminFieldClassName()}
                {...form.register("period")}
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
          </div>

          <Field label="Resume" error={form.formState.errors.summary?.message}>
            <textarea
              className={adminTextAreaClassName()}
              {...form.register("summary")}
            />
          </Field>

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
                  ? "Creer l'experience"
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
  children: React.ReactNode;
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