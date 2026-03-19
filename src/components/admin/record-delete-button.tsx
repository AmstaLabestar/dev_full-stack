"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type RecordDeleteButtonProps = {
  label: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function RecordDeleteButton({ label, action }: RecordDeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Supprimer definitivement ${label} ?`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <Button type="submit" variant="outline" size="sm">
        <Trash2 className="size-4" />
        Supprimer
      </Button>
    </form>
  );
}
