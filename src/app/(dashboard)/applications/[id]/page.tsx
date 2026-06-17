import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  CircleArrowLeft,
  CircleDollarSign,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import DeleteButton from "@/components/DeleteButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { currencySigns } from "@/lib/currency";
import Fact from "@/components/Fact";

export default async function ApplicationDetailPage({
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

  return (
    <>
      <div className="mx-auto max-w-3xl w-full px-4 py-4  sm:px-2">
        <nav className="mb-2">
          <Link href="/applications">
            <Button variant="outline">
              <CircleArrowLeft /> Back
            </Button>
          </Link>
        </nav>
        <header className="flex flex-row items-center">
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center">
              <h1 className="text-4xl font-medium">{app.company}</h1>
              <StatusBadge status={app.status} />
            </div>
            <p className="text-lg text-muted-foreground">{app.position}</p>
          </div>
          <a
            href={app.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
          >
            View job posting
            <ExternalLink className="size-4" />
          </a>
        </header>

        <Separator className="my-4" />
        <main className="mx-auto">
          {/* Facts */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-medium text-muted-foreground">
                  Role facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Fact icon={<CircleDollarSign className="size-4" />}>
                  <span
                    className={!app.salaryRange ? "text-muted-foreground" : ""}
                  >
                    {app.salaryRange && app.currency
                      ? `${currencySigns[app.currency]}${app.salaryRange}/${app.salaryPeriod}`
                      : "Salary undisclosed"}
                  </span>
                </Fact>
                <Fact icon={<Briefcase className="size-4" />}>
                  <span className="capitalize">{app.workType}</span>
                </Fact>
                {app.location && (
                  <Fact icon={<MapPin className="size-4" />}>
                    {app.location}
                  </Fact>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-medium text-muted-foreground">
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Fact icon={<Calendar className="size-4" />}>
                  <span className="text-muted-foreground">Applied&nbsp;</span>
                  {format(app.appliedAt, "d MMM yyyy")}
                </Fact>
                <Fact icon={<Calendar className="size-4" />}>
                  <span className="text-muted-foreground">Deadline&nbsp;</span>
                  {app.deadline ? (
                    <span className="font-medium">
                      {format(app.deadline, "d MMM yyyy")}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </Fact>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          {app.notes && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-muted-foreground">
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {app.notes}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 mt-6">
            <Link href={`/applications/${id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <DeleteButton id={id} />
          </div>
        </main>
      </div>
    </>
  );
}
