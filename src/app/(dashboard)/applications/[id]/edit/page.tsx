import { db } from "@/db";
import { applications } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ApplicationFormRHF from "@/components/ApplicationFormRHF";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const app = await db.query.applications.findFirst({
    where: and(
      eq(applications.id, id),
      eq(applications.userId, session.user.id), // ← только своя подача
    ),
  });

  if (!app) {
    notFound();
  }

  return (
    <main className="p-6">
      <ApplicationFormRHF mode="edit" id={id} defaultValues={app} />
    </main>
  );
}
