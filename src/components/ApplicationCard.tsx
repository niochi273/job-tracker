import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Application } from "@/types/application";
import { format } from "date-fns";

export default function ApplicationCard({ app }: { app: Application }) {
  return (
    <>
      <Card className="p-4 flex flex-col gap-3">
        <div className="flex flex-row gap-5 items-center">
          <h2 className="text-3xl font-medium">{app.company}</h2>
          <Badge className="mt-1">{app.status}</Badge>
          <span className="ml-auto text-muted-foreground">
            {format(app.appliedAt, "d MMM yyyy")}
          </span>
        </div>
        <p>{app.position}</p>
        <p className={!app.salaryRange ? "text-gray-400" : ""}>
          {app.salaryRange ?? "Salary undisclosed"}
        </p>
        <p>{app.workType}</p>
        {app.location != null && <p>{app.location}</p>}
      </Card>
      <a
        href={app.jobUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-violet-400 hover:underline absolute bottom-2 right-5"
      >
        View job →
      </a>
    </>
  );
}

// компанию (крупно), позицию, статус (как Badge), локацию, тип работы, дату подачи
