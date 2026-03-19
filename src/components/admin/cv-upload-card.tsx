"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  uploadCvAction,
  type CvUploadActionState,
} from "@/app/admin/cv/actions";
import { adminFieldClassName } from "@/components/admin/field-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CvUploadCard() {
  const router = useRouter();
  const [title, setTitle] = useState("CV principal");
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<CvUploadActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="bg-white/6">
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-white">
            Televerser un nouveau CV
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            PDF uniquement, 5 Mo maximum. La nouvelle version deviendra
            automatiquement active.
          </p>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-200">
          <span>Titre</span>
          <input
            className={adminFieldClassName()}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-200">
          <span>Fichier PDF</span>
          <input
            className={cn(adminFieldClassName(), "py-3")}
            type="file"
            accept="application/pdf"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
            }}
          />
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
          <Button
            type="button"
            size="lg"
            disabled={isPending || !file}
            onClick={() => {
              startTransition(async () => {
                if (!file) {
                  return;
                }

                const formData = new FormData();
                formData.set("title", title);
                formData.set("file", file);

                const result = await uploadCvAction(formData);
                setFeedback(result);

                if (result.status === "success") {
                  setFile(null);
                  router.refresh();
                }
              });
            }}
          >
            {isPending ? "Upload..." : "Mettre a jour le CV"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
