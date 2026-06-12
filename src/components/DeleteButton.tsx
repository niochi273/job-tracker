"use client";

import { deleteApplication } from "@/app/actions/applications";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => deleteApplication(id)}
    >
      <Trash2 className="size-4" />
      Delete
    </Button>
  );
}
