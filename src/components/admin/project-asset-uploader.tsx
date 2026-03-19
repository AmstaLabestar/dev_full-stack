"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  uploadProjectAssetAction,
  type ProjectAssetUploadState,
} from "@/app/admin/projects/actions";
import { adminFieldClassName } from "@/components/admin/field-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectAssetUploaderProps = {
  projectId: string;
  projectTitle: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
};

export function ProjectAssetUploader({
  projectId,
  projectTitle,
  imageUrl,
  videoUrl,
}: ProjectAssetUploaderProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <AssetUploadCard
        projectId={projectId}
        projectTitle={projectTitle}
        assetType="image"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        currentUrl={imageUrl}
      />
      <AssetUploadCard
        projectId={projectId}
        projectTitle={projectTitle}
        assetType="video"
        accept="video/mp4,video/webm,video/quicktime"
        currentUrl={videoUrl}
      />
    </div>
  );
}

type AssetUploadCardProps = {
  projectId: string;
  projectTitle: string;
  assetType: "image" | "video";
  accept: string;
  currentUrl?: string | null;
};

function AssetUploadCard({
  projectId,
  projectTitle,
  assetType,
  accept,
  currentUrl,
}: AssetUploadCardProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<ProjectAssetUploadState | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const label = assetType === "image" ? "Image projet" : "Video projet";

  return (
    <Card className="border-white/8 bg-slate-950/35 shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold text-white">
            {label}
          </h3>
          <p className="text-sm leading-6 text-slate-400">
            {assetType === "image"
              ? "PNG, JPG, WEBP ou SVG. 4 Mo maximum."
              : "MP4, WEBM ou MOV. 25 Mo maximum."}
          </p>
        </div>

        {currentUrl ? (
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
            {assetType === "image" ? (
              <Image
                src={currentUrl}
                alt={projectTitle}
                width={960}
                height={480}
                className="h-40 w-full rounded-xl object-cover"
              />
            ) : null}
            <div className={cn(assetType === "image" ? "mt-4" : "")}>
              <Link
                href={currentUrl}
                target="_blank"
                className="text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
              >
                Ouvrir le fichier actuel
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Aucun fichier courant.</p>
        )}

        <input
          className={cn(adminFieldClassName(), "py-3")}
          type="file"
          accept={accept}
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
          }}
        />

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
            variant="outline"
            size="lg"
            disabled={isPending || !file}
            onClick={() => {
              startTransition(async () => {
                if (!file) {
                  return;
                }

                const formData = new FormData();
                formData.set("projectId", projectId);
                formData.set("projectTitle", projectTitle);
                formData.set("assetType", assetType);
                formData.set("file", file);

                const result = await uploadProjectAssetAction(formData);
                setFeedback(result);

                if (result.status === "success") {
                  setFile(null);
                  router.refresh();
                }
              });
            }}
          >
            {isPending
              ? "Upload..."
              : `Uploader ${assetType === "image" ? "l image" : "la video"}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
