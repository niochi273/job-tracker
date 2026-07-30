"use client";

import { deleteApplication } from "@/lib/actions/applications";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        if (confirm("Delete this application?")) {
          deleteApplication(id);
        }
      }}
    >
      <Trash2 className="size-4" />
      Delete
    </Button>
  );
}
