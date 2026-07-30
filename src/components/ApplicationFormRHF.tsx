"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Application } from "@/db/schema";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { applicationSchema as formSchema } from "@/lib/validations/application";
import {
  createApplicationFromData,
  updateApplication,
} from "@/lib/actions/applications";

interface ApplicationFormRHFInterface {
  mode: "new" | "edit";
  id?: string;
  defaultValues?: Application;
}

export default function ApplicationFormRHF({
  mode,
  id,
  defaultValues,
}: ApplicationFormRHFInterface) {
  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      company: defaultValues?.company ?? "",
      position: defaultValues?.position ?? "",
      status: defaultValues?.status ?? undefined,
      workType: defaultValues?.workType ?? undefined,
      jobUrl: defaultValues?.jobUrl ?? "",
      location: defaultValues?.location ?? "",
      salaryRange: defaultValues?.salaryRange ?? "",
      currency: defaultValues?.currency ?? undefined,
      salaryPeriod: defaultValues?.salaryPeriod ?? undefined,
      deadline: defaultValues?.deadline ?? undefined,
      notes: defaultValues?.notes ?? "",
    },
  });

  const [dateOpen, setDateOpen] = useState(false);
  const salaryValue = useWatch({ control: form.control, name: "salaryRange" });
  const hasSalary = !!salaryValue && salaryValue.length > 0;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (mode === "new") {
      await createApplicationFromData(data);
    } else if (id) {
      await updateApplication(data, id);
    }
    // redirect внутри Server Action перебросит на /applications
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto pb-0">
      <CardHeader>
        {mode === "new" ? (
          <>
            <CardTitle className="text-lg">Create Application</CardTitle>
            <CardDescription>
              Add a new application to your list.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="text-lg">Edit Application</CardTitle>
            <CardDescription>
              Change your current application data.
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="application-form">
          <FieldGroup>
            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company">Company</FieldLabel>
                  <Input
                    {...field}
                    id="company"
                    aria-invalid={fieldState.invalid}
                    placeholder="Apple"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="position"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="position">Position</FieldLabel>
                  <Input
                    {...field}
                    id="position"
                    placeholder="Software Engineer"
                    aria-invalid={fieldState.invalid}
                    maxLength={35}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="block sm:grid sm:grid-cols-2 gap-4 items-start">
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="select-status">
                        Application status
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="select-status"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select application status" />
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
                  </Field>
                )}
              />
              <Controller
                name="workType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="select-work-type">
                        Work type
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="select-work-type"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
            <Controller
              name="jobUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-url">Job URL</FieldLabel>
                  <Input
                    {...field}
                    id="job-url"
                    placeholder="Paste in hyperlink to a vacancy"
                    aria-invalid={fieldState.invalid}
                    maxLength={100}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    {...field}
                    id="location"
                    placeholder="Berlin, Germany"
                    aria-invalid={fieldState.invalid}
                    maxLength={35}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <FieldLabel>Salary</FieldLabel>
              <InputGroup>
                <Controller
                  name="salaryRange"
                  control={form.control}
                  render={({ field }) => (
                    <InputGroupInput
                      type="text"
                      inputMode="numeric"
                      placeholder="50000"
                      {...field}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(
                          /[^0-9]/g,
                          "",
                        );
                        field.onChange(onlyDigits);
                      }}
                    />
                  )}
                />
                {hasSalary && (
                  <>
                    <InputGroupAddon align="inline-start">
                      <Controller
                        name="currency"
                        control={form.control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="border-0 h-auto p-0 pl-2">
                              <SelectValue placeholder="USD" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="JPY">JPY</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="RUB">RUB</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Controller
                        name="salaryPeriod"
                        control={form.control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="border-0 h-auto p-0">
                              <SelectValue placeholder="year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hour">Hour</SelectItem>
                              <SelectItem value="month">Month</SelectItem>
                              <SelectItem value="year">Year</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </InputGroupAddon>
                  </>
                )}
              </InputGroup>
              {form.formState.errors.currency && (
                <FieldError errors={[form.formState.errors.currency]} />
              )}
            </Field>
            <Controller
              name="deadline"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="deadline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="notes">Notes</FieldLabel>
                  <Textarea
                    {...field}
                    id="notes"
                    placeholder="Optional..."
                    className="resize-none"
                    maxLength={200}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="application-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
