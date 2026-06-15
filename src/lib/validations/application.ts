import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
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
    { message: "Please select a status" },
  ),
  jobUrl: z.url("Must be a valid URL"),
  workType: z.enum(["remote", "hybrid", "onsite"], {
    message: "Please select a work type",
  }),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  currency: z
    .enum(["USD", "EUR", "JPY", "GBP", "RUB"], {
      message: "Please select a currency",
    })
    .optional(),
  salaryPeriod: z
    .enum(["hour", "month", "year"], {
      message: "Please select a period",
    })
    .optional(),
  deadline: z.string().optional(),
  notes: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
