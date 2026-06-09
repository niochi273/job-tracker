export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export type WorkType = "remote" | "hybrid" | "onsite";

export type Application = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedAt: Date;
  deadline: Date | null;
  jobUrl: string;
  salaryRange: string | null;
  location: string | null;
  workType: WorkType;
  notes: string | null;
};
