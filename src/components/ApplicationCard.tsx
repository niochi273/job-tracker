import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Application } from "@/types/application";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";
import Link from "next/link";
import { currencySigns } from "@/lib/currency";
import { Fact } from "@/app/(dashboard)/applications/[id]/page";
import { Briefcase, CircleDollarSign, MapPin } from "lucide-react";

export default function ApplicationCard({ app }: { app: Application }) {
  return (
    <>
      <Card className="p-4 flex flex-col relative gap-3  hover:shadow transition-shadow duration-100">
        <Link href={`/applications/${app.id}`} className="cursor-default">
          <CardHeader className="flex flex-row gap-5 items-center">
            <CardTitle className="text-3xl">{app.company}</CardTitle>

            <StatusBadge status={app.status} />
            <span className="ml-auto text-muted-foreground">
              {format(app.appliedAt, "d MMM yyyy")}
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="text-lg py-0.5">{app.position}</p>
            <Fact icon={<CircleDollarSign className="size-4" />}>
              <p className={!app.salaryRange ? "text-gray-400" : ""}>
                {app.salaryRange && app.currency
                  ? `${currencySigns[app.currency]}${app.salaryRange}/${app.salaryPeriod}`
                  : "Salary undisclosed"}
              </p>
            </Fact>
            <Fact icon={<Briefcase className="size-4" />}>
              <p className="capitalize">{app.workType}</p>
            </Fact>
            {app.location != null && (
              <Fact icon={<MapPin className="size-4" />}>
                <p>{app.location}</p>
              </Fact>
            )}
          </CardContent>
        </Link>
        <a
          href={app.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-violet-400 hover:underline absolute bottom-3 right-6"
        >
          View job posting →
        </a>
      </Card>
    </>
  );
}
