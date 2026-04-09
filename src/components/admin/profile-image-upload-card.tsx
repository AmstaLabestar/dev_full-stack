"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  finalizeProfileImageUploadAction,
  uploadProfileImageAction,
  type ProfileImageUploadActionState,
} from "@/app/admin/profile/actions";
import { adminFieldClassName } from "@/components/admin/field-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { uploadFileToBlob, getUploadErrorMessage } from "@/lib/blob-client-upload";
import { cn } from "@/lib/utils";

type ProfileImageUploadCardProps = {
  profileId: string;
  blobUploadsEnabled: boolean;
  uploadsEnabled: boolean;
};

export function ProfileImageUploadCard({
  profileId,
  blobUploadsEnabled,
  uploadsEnabled,
}: ProfileImageUploadCardProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<ProfileImageUploadActionState | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="bg-white/6">
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-white">
            Televerser une photo de profil
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            PNG, JPG, WEBP ou SVG. 4 Mo maximum. La nouvelle image sera affichee dans le hero public.
          </p>
          {!uploadsEnabled ? (
            <p className="text-sm leading-6 text-amber-200">
              Upload indisponible tant que Vercel Blob n&apos;est pas configure pour la production.
            </p>
          ) : null}
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-200">
          <span>Image</span>
          <input
            className={cn(adminFieldClassName(), "py-3")}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
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
            ) : uploadProgress !== null ? (
              <p className="text-cyan-200">Upload en cours {uploadProgress}%</p>
            ) : null}
          </div>
          <Button
            type="button"
            size="lg"
            disabled={isPending || !file || !uploadsEnabled}
            onClick={() => {
              startTransition(async () => {
                if (!file) {
                  return;
                }

                setFeedback(null);
                setUploadProgress(blobUploadsEnabled ? 0 : null);

                try {
                  const result = blobUploadsEnabled
                    ? await finalizeProfileImageUploadAction({
                        profileId,
                        blob: await uploadFileToBlob("image", file, (event) => {
                          setUploadProgress(Math.round(event.percentage));
                        }),
                      })
                    : await (async () => {
                        const formData = new FormData();
                        formData.set("profileId", profileId);
                        formData.set("file", file);
                        return uploadProfileImageAction(formData);
                      })();

                  setFeedback(result);

                  if (result.status === "success") {
                    setFile(null);
                    router.refresh();
                  }
                } catch (error) {
                  setFeedback({
                    status: "error",
                    message: getUploadErrorMessage(
                      error,
                      "Impossible de televerser la photo pour le moment.",
                    ),
                  });
                } finally {
                  setUploadProgress(null);
                }
              });
            }}
          >
            {isPending ? "Upload..." : "Mettre a jour la photo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
