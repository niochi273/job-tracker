import { db } from "./index";
import { applications } from "./schema";

async function seed() {
  // опционально: очистить таблицу перед сидом
  await db.delete(applications);

  await db.insert(applications).values([
    {
      company: "Vercel",
      position: "Frontend Engineer Intern",
      status: "interview",
      appliedAt: new Date("2026-05-15"),
      deadline: new Date("2026-06-20"),
      jobUrl: "https://vercel.com/careers",
      salaryRange: "€2000-2500/mo",
      location: "Remote (EU)",
      workType: "remote",
      notes: "Прошёл первый созвон",
    },
    {
      company: "Stripe",
      position: "Software Engineer Intern",
      status: "applied",
      appliedAt: new Date("2026-05-28"),
      deadline: null,
      jobUrl: "https://stripe.com/jobs",
      salaryRange: null,
      location: "Dublin, Ireland",
      workType: "hybrid",
      notes: null,
    },
    {
      company: "N26",
      position: "Junior Fullstack Developer",
      status: "rejected",
      appliedAt: new Date("2026-05-10"),
      deadline: null,
      jobUrl: "https://n26.com/en-eu/careers",
      salaryRange: "€45k/year",
      location: "Berlin, Germany",
      workType: "onsite",
      notes: "Отказ после скрининга — мало опыта",
    },
  ]);

  console.log("✅ Seeded");
  process.exit(0);
}

seed();
