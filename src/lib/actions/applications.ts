"use server";

import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  ApplicationInput,
  applicationSchema,
} from "@/lib/validations/application";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  values?: {
    company?: string;
    position?: string;
    status?: string;
    jobUrl?: string;
    workType?: string;
    location?: string;
    salaryRange?: string;
    currency?: string;
    salaryPeriod?: string;
    deadline?: string;
    notes?: string;
  };
};

export async function deleteApplication(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  await db
    .delete(applications) // ← таблица
    .where(
      and(
        eq(applications.id, id), // эта подача
        eq(applications.userId, session.user.id), // И принадлежит юзеру
      ),
    );

  revalidatePath("/applications");
  redirect("/applications");
}

export async function createApplicationFromData(data: ApplicationInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const result = applicationSchema.safeParse(data);
  if (!result.success) {
    return { error: "Validation failed" };
  }

  const validData = result.data;
  await db.insert(applications).values({
    userId: session.user.id,
    company: validData.company,
    position: validData.position,
    status: validData.status,
    jobUrl: validData.jobUrl,
    workType: validData.workType,
    location: validData.location ?? null,
    salaryRange: validData.salaryRange ?? null,
    currency: validData.currency ?? null,
    salaryPeriod: validData.salaryPeriod ?? null,
    deadline: validData.deadline ?? null, // ← уже Date, не нужен new Date()
    notes: validData.notes ?? null,
    appliedAt: new Date(),
  });

  revalidatePath("/applications");
  redirect("/applications");
}

export async function updateApplication(data: ApplicationInput, id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const result = applicationSchema.safeParse(data);
  if (!result.success) {
    return { error: "Validation failed" };
  }

  const validData = result.data;
  await db
    .update(applications)
    .set({
      company: validData.company,
      position: validData.position,
      status: validData.status,
      jobUrl: validData.jobUrl,
      workType: validData.workType,
      location: validData.location ?? null,
      salaryRange: validData.salaryRange ?? null,
      currency: validData.currency ?? null,
      salaryPeriod: validData.salaryPeriod ?? null,
      deadline: validData.deadline ?? null,
      notes: validData.notes ?? null,
    })
    .where(
      and(
        eq(applications.id, id), // эта подача
        eq(applications.userId, session.user.id), // И принадлежит юзеру
      ),
    );

  revalidatePath("/applications");
  redirect("/applications");
}
