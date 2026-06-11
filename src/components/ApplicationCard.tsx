import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Application } from "@/types/application";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

export default function ApplicationCard({ app }: { app: Application }) {
  return (
    <>
      <Card className="p-4 flex flex-col relative gap-3  hover:shadow transition-shadow duration-100">
        <CardHeader className="flex flex-row gap-5 items-center">
          <Link href={`/applications/${app.id}`}>
            <CardTitle className="text-3xl">{app.company}</CardTitle>
          </Link>
          <StatusBadge status={app.status} />
          <span className="ml-auto text-muted-foreground">
            {format(app.appliedAt, "d MMM yyyy")}
          </span>
        </CardHeader>
        <CardContent>
          <p>{app.position}</p>
          <p className={!app.salaryRange ? "text-gray-400" : ""}>
            {app.salaryRange ?? "Salary undisclosed"}
          </p>
          <p className="capitalize">{app.workType}</p>
          {app.location != null && <p>{app.location}</p>}
        </CardContent>
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
