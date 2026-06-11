import { pgTable, text, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";

// enum'ы — твои union-типы становятся Postgres enum'ами
export const statusEnum = pgEnum("status", [
  "wishlist",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
]);

export const workTypeEnum = pgEnum("work_type", ["remote", "hybrid", "onsite"]);

// таблица
export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  status: statusEnum("status").notNull().default("applied"),
  appliedAt: timestamp("applied_at").notNull().defaultNow(),
  deadline: timestamp("deadline"),
  jobUrl: text("job_url").notNull(),
  salaryRange: text("salary_range"),
  location: text("location"),
  workType: workTypeEnum("work_type").notNull(),
  notes: text("notes"),
});

// типы, сгенерированные ИЗ схемы
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
