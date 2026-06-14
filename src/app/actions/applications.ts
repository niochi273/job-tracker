"use server";

import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@/lib/auth";
import { applicationSchema } from "@/lib/validations/application";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createApplication(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  // 1. собрать данные из формы
  const raw = {
    company: formData.get("company"),
    position: formData.get("position"),
    status: formData.get("status"),
    jobUrl: formData.get("jobUrl"),
    workType: formData.get("workType"),
    location: formData.get("location") || undefined,
    salaryRange: formData.get("salaryRange") || undefined,
    deadline: formData.get("deadline") || undefined,
    notes: formData.get("notes") || undefined,
  };

  // 2. валидировать через Zod
  const result = applicationSchema.safeParse(raw);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      message: "Validation failed",
    };
  }

  // 3. записать в базу
  const data = result.data;
  await db.insert(applications).values({
    userId: session.user.id,
    company: data.company,
    position: data.position,
    status: data.status,
    jobUrl: data.jobUrl,
    workType: data.workType,
    location: data.location ?? null,
    salaryRange: data.salaryRange ?? null,
    deadline: data.deadline ? new Date(data.deadline) : null,
    notes: data.notes ?? null,
    appliedAt: new Date(),
  });

  // 4. обновить кеш и перенаправить
  revalidatePath("/applications");
  redirect("/applications");
}

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

export async function updateApplication(
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const raw = {
    company: formData.get("company"),
    position: formData.get("position"),
    status: formData.get("status"),
    jobUrl: formData.get("jobUrl"),
    workType: formData.get("workType"),
    location: formData.get("location") || undefined,
    salaryRange: formData.get("salaryRange") || undefined,
    deadline: formData.get("deadline") || undefined,
    notes: formData.get("notes") || undefined,
  };

  const result = applicationSchema.safeParse(raw);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      message: "Validation failed",
    };
  }

  const data = result.data;
  await db
    .update(applications)
    .set({
      company: data.company,
      position: data.position,
      status: data.status,
      jobUrl: data.jobUrl,
      workType: data.workType,
      location: data.location ?? null,
      salaryRange: data.salaryRange ?? null,
      deadline: data.deadline ? new Date(data.deadline) : null,
      notes: data.notes ?? null,
    })
    .where(
      and(
        eq(applications.id, id), // эта подача
        eq(applications.userId, session.user.id), // И принадлежит юзеру
      ),
    );

  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);
  redirect(`/applications/${id}`);
}
