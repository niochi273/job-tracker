import type { ApplicationStatus } from "@/types/application";
import { Badge } from "./ui/badge";

const statusStyles: Record<ApplicationStatus, string> = {
  wishlist: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  applied: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  screening: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  interview: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  offer: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
  withdrawn: "bg-zinc-500/15 text-zinc-500 border-zinc-500/30",
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge className={`capitalize mt-1 ${statusStyles[status]}`}>
      {status}
    </Badge>
  );
}
