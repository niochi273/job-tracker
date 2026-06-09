import ApplicationCard from "@/components/ApplicationCard";
import { placeholderApplications } from "@/lib/placeholder-data";

export default function ApplicationsPage() {
  const applications = placeholderApplications;

  return (
    <main className="w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        {/* сюда позже кнопку "New Application" */}
      </div>

      <div className="flex flex-col gap-3 ">
        {applications.map((app) => (
          <div key={app.id} className="relative">
            <ApplicationCard app={app} />
          </div>
        ))}
      </div>
    </main>
  );
}
