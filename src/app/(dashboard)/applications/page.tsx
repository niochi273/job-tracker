import ApplicationCard from "@/components/ApplicationCard";
import StatusBadge from "@/components/StatusBadge";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Application, ApplicationStatus } from "@/types/application";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ApplicationsPage() {
  const statuses: Partial<Record<ApplicationStatus, number>> = {};
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // layout уже гарантирует, что session есть, но TS этого не знает:
  if (!session) {
    redirect("/login");
  }

  const userApplications: Application[] = await db.query.applications.findMany({
    where: eq(applications.userId, session.user.id), // ← фильтр по юзеру
    orderBy: (apps, { desc }) => desc(apps.appliedAt),
  });

  for (const app of userApplications) {
    statuses[app.status] = (statuses[app.status] ?? 0) + 1;
  }

  return (
    <main className="w-full mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <div className="mt-1 border rounded-2xl py-1 px-2 flex gap-3">
          {Object.entries(statuses).map(([status, count]) => (
            <span className="capitalize text-sm" key={status}>
              {status}: {count}
            </span>
          ))}
        </div>
      </div>

      {userApplications.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No applications yet. Add your first one to get started.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {userApplications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </main>
  );
}
