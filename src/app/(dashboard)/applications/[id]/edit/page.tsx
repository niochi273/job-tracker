import ApplicationForm from "@/components/ApplicationForm";
import { updateApplication } from "@/app/actions/applications";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await db.query.applications.findFirst({
    where: eq(applications.id, id),
  });

  if (!app) {
    notFound();
  }

  const updateWithId = updateApplication.bind(null, app.id); // ← биндим id

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Application</h1>
      <ApplicationForm
        action={updateWithId}
        defaultValues={app}
        submitLabel="Save changes"
      />
    </main>
  );
}
