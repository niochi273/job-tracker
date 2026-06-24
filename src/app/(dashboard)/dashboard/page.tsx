import StatusChart from "@/components/StatusChart";
import { Card } from "@/components/ui/card";
import WorkTypeChart from "@/components/WorkTypeChart";
import { db } from "@/db";
import { Application, applications } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userApplications: Application[] = await db.query.applications.findMany({
    where: eq(applications.userId, session.user.id),
    orderBy: (apps, { desc }) => desc(apps.appliedAt),
  });

  const applicationsLength = userApplications.length;
  const active = userApplications.filter(
    (app) => app.status !== "rejected" && app.status !== "withdrawn",
  ).length;
  const offers = userApplications.filter((a) => a.status === "offer").length;

  const statusesCount: Record<string, number> = {};
  for (const app of userApplications) {
    statusesCount[app.status] = (statusesCount[app.status] ?? 0) + 1;
  }

  const statusData = Object.entries(statusesCount).map(([status, count]) => ({
    status,
    count,
  }));

  const workTypeCount: Record<string, number> = {};
  for (const app of userApplications) {
    workTypeCount[app.workType] = (workTypeCount[app.workType] ?? 0) + 1;
  }

  const workTypeData = Object.entries(workTypeCount).map(([type, count]) => ({
    type,
    count,
    fill: `var(--color-${type})`,
  }));

  const successRate =
    applicationsLength > 0
      ? Math.round((offers / applicationsLength) * 100)
      : 0;

  return (
    <div className="p-12 flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-3xl font-bold">{applicationsLength}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-3xl font-bold">{active}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Offers</p>
          <p className="text-3xl font-bold">{offers}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Success</p>
          <p className="text-3xl font-bold">{successRate}%</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            Applications by status
          </p>
          <StatusChart data={statusData} />
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            Applications by work type
          </p>
          <WorkTypeChart data={workTypeData} />
        </Card>
      </div>
    </div>
  );
}
