import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum([
    "wishlist",
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "withdrawn",
  ]),
  jobUrl: z.url("Must be a valid URL"),
  workType: z.enum(["remote", "hybrid", "onsite"]),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  deadline: z.string().optional(),
  notes: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
