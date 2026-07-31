"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function StatusFilter({
  validStatuses,
}: {
  validStatuses: readonly string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  console.log(status);

  return (
    <>
      <Select
        value={status ?? ""}
        onValueChange={(v) =>
          router.push(v ? `/applications?status=${v}` : "/applications")
        }
      >
        <SelectTrigger className="mt-1 mr-auto">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {validStatuses.map((validStatus, i) => (
              <SelectItem
                className="cursor-pointer"
                key={i}
                value={validStatus}
              >
                {validStatus}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {status != null && (
        <Button
          onClick={() => router.push("/applications")}
          variant="destructive"
          className="mt-1"
        >
          <X />
        </Button>
      )}
    </>
  );
}
