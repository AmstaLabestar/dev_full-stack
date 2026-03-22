"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ImageIcon, VideoIcon } from "lucide-react";

import {
  uploadProjectAssetAction,
  type ProjectAssetUploadState,
} from "@/app/admin/projects/actions";
import { adminFieldClassName } from "@/components/admin/field-styles";
import { Badge } from "@/components/ui/badge";
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
    <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/30 p-5">
      <div className="space-y-2">
        <Badge variant="secondary">Medias du projet</Badge>
        <div>
          <h3 className="font-display text-2xl font-semibold text-white">
            Uploader les visuels et demonstrations
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            L image et la video ne se saisissent pas en URL ici. Elles se
            televersent directement pour alimenter la fiche projet publique.
          </p>
        </div>
      </div>

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
    </section>
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
  const isImage = assetType === "image";
  const label = isImage ? "Image a uploader" : "Video a uploader";
  const Icon = isImage ? ImageIcon : VideoIcon;

  return (
    <Card className="border-white/8 bg-white/4 shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white">
            <Icon className="size-4 text-cyan-200" />
            <h4 className="font-display text-xl font-semibold">{label}</h4>
          </div>
          <p className="text-sm leading-6 text-slate-400">
            {isImage
              ? "Formats acceptes : PNG, JPG, WEBP ou SVG. Taille maximale : 4 Mo."
              : "Formats acceptes : MP4, WEBM ou MOV. Taille maximale : 25 Mo."}
          </p>
        </div>

        {currentUrl ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              Fichier actuel
            </p>
            {isImage ? (
              <Image
                src={currentUrl}
                alt={projectTitle}
                width={960}
                height={480}
                className="mt-3 h-40 w-full rounded-xl object-cover"
              />
            ) : null}
            <div className={cn(isImage ? "mt-4" : "mt-3")}>
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
          <p className="rounded-2xl border border-dashed border-white/10 bg-slate-950/35 px-4 py-4 text-sm text-slate-500">
            Aucun fichier n est encore associe a ce projet.
          </p>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Selection du fichier
          </label>
          <input
            className={cn(adminFieldClassName(), "py-3")}
            type="file"
            accept={accept}
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
            }}
          />
          <p className="text-xs text-slate-500">
            {file ? `Pret a envoyer : ${file.name}` : "Aucun fichier selectionne."}
          </p>
        </div>

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
            {isPending ? "Upload..." : isImage ? "Uploader l image" : "Uploader la video"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}