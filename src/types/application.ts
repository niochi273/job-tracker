export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export type WorkType = "remote" | "hybrid" | "onsite";

export type CurrencyType = "USD" | "EUR" | "GBP" | "JPY" | "RUB";

export type SalaryPeriodType = "hour" | "month" | "year";

export type Application = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedAt: Date;
  deadline: Date | null;
  jobUrl: string;
  salaryRange: string | null;
  currency: CurrencyType | null;
  salaryPeriod: SalaryPeriodType | null;
  location: string | null;
  workType: WorkType;
  notes: string | null;
};
