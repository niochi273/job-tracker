import ApplicationCard from "@/components/ApplicationCard";
import { db } from "@/db";

export default async function ApplicationsPage() {
  const applications = await db.query.applications.findMany({
    orderBy: (apps, { desc }) => desc(apps.appliedAt),
  });

  return (
    <main className="w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        {/* сюда позже кнопку "New Application" */}
      </div>

      <div className="flex flex-col gap-3 ">
        {applications.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No applications yet. Add your first one to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {applications.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
