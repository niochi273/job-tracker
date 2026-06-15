"use client";

import { useActionState } from "react";
import { type ActionState } from "@/app/actions/applications";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Application } from "@/db/schema";
import { format } from "date-fns";

type Props = {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Partial<Application>;
  submitLabel?: string;
};

export default function ApplicationForm({
  action,
  defaultValues,
  submitLabel = "Create application",
}: Props) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-xl">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          defaultValue={state.values?.company ?? defaultValues?.company ?? ""}
        />
        {state.errors?.company && (
          <p className="text-sm text-red-400">{state.errors.company[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          name="position"
          defaultValue={state.values?.position ?? defaultValues?.position ?? ""}
        />
        {state.errors?.position && (
          <p className="text-sm text-red-400">{state.errors.position[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          defaultValue={state.values?.status ?? defaultValues?.status ?? ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wishlist">Wishlist</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.status && (
          <p className="text-sm text-red-400">{state.errors.status[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="jobUrl">Job Url</Label>
        <Input
          id="jobUrl"
          name="jobUrl"
          defaultValue={
            state.values?.jobUrl ?? defaultValues?.jobUrl ?? "https://"
          }
        />
        {state.errors?.jobUrl && (
          <p className="text-sm text-red-400">{state.errors.jobUrl[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="workType">Work type</Label>
        <Select
          name="workType"
          defaultValue={state.values?.workType ?? defaultValues?.workType ?? ""}
        >
          <SelectTrigger id="workType">
            <SelectValue placeholder="Select work type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.workType && (
          <p className="text-sm text-red-400">{state.errors.workType[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          defaultValue={state.values?.location ?? defaultValues?.location ?? ""}
        />
        {state.errors?.location && (
          <p className="text-sm text-red-400">{state.errors.location[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="salaryRange">Salary range</Label>
        <Input
          id="salaryRange"
          name="salaryRange"
          defaultValue={
            state.values?.salaryRange ?? defaultValues?.salaryRange ?? ""
          }
        />
        {state.errors?.salaryRange && (
          <p className="text-sm text-red-400">{state.errors.salaryRange[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          name="deadline"
          type="date"
          defaultValue={
            state.values?.deadline ??
            (defaultValues?.deadline
              ? format(defaultValues.deadline, "yyyy-MM-dd")
              : "")
          }
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={state.values?.notes ?? defaultValues?.notes ?? ""}
          placeholder="Optional..."
        />
        {state.errors?.notes && (
          <p className="text-sm text-red-400">{state.errors.notes[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
