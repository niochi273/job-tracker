# Job Application Tracker

A full-stack web app for tracking job applications — log the roles you apply to, keep notes and deadlines, and see your job search at a glance through a stats dashboard.

**Live demo:** https://job-tracker-weld-nine.vercel.app

<!-- Screenshots: add PNGs to a screenshots/ folder in the repo, then the images below will render. -->

![Applications list](screenshots/applications.png)

![Dashboard](screenshots/dashboard.png)

![Application form](screenshots/form.png)

---

## Features

- **Full CRUD for applications** — create, view, edit, and delete job applications, each with company, position, status, job posting URL, location, work type, salary, deadline, and notes.
- **Authentication & data isolation** — email/password auth via Better Auth. Every user only ever sees and edits their own applications; all queries are scoped to the logged-in user.
- **Analytics dashboard** — KPI cards (total applications, active, offers, success rate) plus a bar chart of applications by status and a donut chart of applications by work type.
- **Status filtering** — filter the list by application status straight from the URL, so a filtered view can be reloaded or shared.
- **Rich forms with validation** — built with React Hook Form and validated with Zod on both the client (instant feedback) and the server (never trusting the client).
- **Salary with currency & period** — enter an amount and pick a currency (USD/EUR/JPY/GBP/RUB) and period (hour/month/year); currency and period are required only when an amount is given.
- **Deadline date picker** — pick application deadlines with a calendar UI.
- **Loading states** — skeleton placeholders while data loads.
- **Deployed** — running in production on Vercel with a serverless Neon Postgres database.

---

## Tech stack

| Area      | Tech                                                                                 |
| --------- | ------------------------------------------------------------------------------------ |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)      |
| Language  | [TypeScript](https://www.typescriptlang.org/) (strict)                               |
| Database  | [PostgreSQL](https://www.postgresql.org/) on [Neon](https://neon.tech/) (serverless) |
| ORM       | [Drizzle ORM](https://orm.drizzle.team/)                                             |
| Auth      | [Better Auth](https://www.better-auth.com/)                                          |
| Forms     | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)            |
| UI        | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)       |
| Charts    | [Recharts](https://recharts.org/)                                                    |
| Hosting   | [Vercel](https://vercel.com/)                                                        |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or newer
- A package manager (this project uses [pnpm](https://pnpm.io/), but npm works too)
- A [Neon](https://neon.tech/) Postgres database (or any Postgres connection string)

### 1. Clone and install

```bash
git clone https://github.com/niochi273/job-tracker.git
cd job-tracker
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```bash
# Postgres connection string (from Neon)
DATABASE_URL="postgresql://user:password@host/dbname"

# Better Auth
BETTER_AUTH_SECRET="a-long-random-secret-string"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

Generate a secret with:

```bash
openssl rand -base64 32
```

### 3. Push the database schema

```bash
pnpm drizzle-kit push
```

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), register an account, and start adding applications.

---

## Project structure

```
src/
├── app/
│   ├── (auth)/               # Login and register pages
│   ├── (dashboard)/          # Auth-protected app
│   │   ├── applications/     # List, detail, new, edit
│   │   └── dashboard/        # Stats + charts
│   └── actions/              # Server Actions (create, update, delete)
├── components/               # UI components and forms
├── db/                       # Drizzle schema and client
└── lib/
    └── validations/          # Shared Zod schema (client + server)
```

---

## Notes

This project was built as a hands-on way to learn full-stack development end to end: the App Router, Server Components and Server Actions, a typed database layer with Drizzle, real authentication with per-user data isolation, form handling with React Hook Form, and data visualization with Recharts — all deployed to production.
