import { z } from "zod";

export const applicationSchema = z
  .object({
    company: z
      .string()
      .nonempty("Company must not be empty")
      .max(21, "Company title must be at most 21 characters."),
    position: z
      .string()
      .nonempty("Position must not be empty")
      .max(35, "Position must be at most 35 characters."),
    status: z.enum(
      [
        "wishlist",
        "applied",
        "screening",
        "interview",
        "offer",
        "rejected",
        "withdrawn",
      ],
      { message: "Select application status" },
    ),
    workType: z.enum(["remote", "onsite", "hybrid"], {
      message: "Select work type",
    }),
    jobUrl: z
      .url({ message: "The input must be a valid url" })
      .max(100, "Url is too long"),
    location: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
    salaryRange: z.string().regex(/^\d*$/, "Only digits allowed").optional(),
    currency: z
      .enum(["USD", "EUR", "JPY", "GBP", "RUB"], { message: "Select currency" })
      .optional(),
    salaryPeriod: z
      .enum(["hour", "month", "year"], { message: "Select period" })
      .optional(),
    deadline: z.date().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.salaryRange) {
        return !!data.currency && !!data.salaryPeriod;
      }
      return true;
    },
    { message: "Select currency and period for salary", path: ["currency"] },
  );

export type ApplicationInput = z.infer<typeof applicationSchema>;
