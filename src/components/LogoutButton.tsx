"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <Button className="p-0" variant="ghost" size="sm" onClick={handleLogout}>
      <LogOut className="size-4" />
      <span className="hidden sm:block">Log out</span>
    </Button>
  );
}
