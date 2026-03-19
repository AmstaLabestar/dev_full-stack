"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type RecordDeleteButtonProps = {
  label: string;
  onDelete: () => Promise<{ status: "success" | "error"; message: string }>;
};

export function RecordDeleteButton({
  label,
  onDelete,
}: RecordDeleteButtonProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const confirmed = window.confirm(
              `Supprimer definitivement ${label} ?`,
            );

            if (!confirmed) {
              return;
            }

            const result = await onDelete();
            setMessage(result.message);
          });
        }}
      >
        <Trash2 className="size-4" />
        {isPending ? "Suppression..." : "Supprimer"}
      </Button>
      {message ? <p className="text-xs text-slate-400">{message}</p> : null}
    </div>
  );
}
