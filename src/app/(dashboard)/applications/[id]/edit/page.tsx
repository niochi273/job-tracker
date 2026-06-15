import ApplicationForm from "@/components/ApplicationForm";
import { updateApplication } from "@/app/actions/applications";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    notFound(); // чужая подача → не найдётся → 404
  }

  const updateWithId = updateApplication.bind(null, app.id); // ← биндим id

  return (
    <main className="p-6">
      <h1 className="text-2xl text-center font-bold mb-6">Edit Application</h1>
      <ApplicationForm
        action={updateWithId}
        defaultValues={app}
        submitLabel="Save changes"
      />
    </main>
  );
}
