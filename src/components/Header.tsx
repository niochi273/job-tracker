import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/applications" className="font-bold text-lg">
          Job Tracker
        </Link>

        <Link href="/dashboard" className="font-bold text-lg">
          Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/applications/new">
            <Button size="sm">
              <Plus className="size-4" />
              New Application
            </Button>
          </Link>

          {session && (
            <span className="text-sm text-muted-foreground">
              {session.user.name}
            </span>
          )}

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
