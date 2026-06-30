import ApplicationForm from "@/components/ApplicationForm";
import { createApplication } from "@/app/actions/applications";
import ApplicationFormRHF from "@/components/ApplicationFormRHF";

export default function NewApplicationPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl text-center font-bold mb-6">New Application</h1>
      <ApplicationFormRHF />
    </main>
  );
}
