# Job Application Tracker

A fullstack web app to track job and internship applications — companies, positions, statuses, deadlines, and notes.

## Tech Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Drizzle ORM** + **PostgreSQL** (Neon)
- **Tailwind CSS** + **shadcn/ui**
- **Zod** for validation

## Features

- Create, read, update, and delete applications (full CRUD)
- Track application status (wishlist, applied, screening, interview, offer, rejected, withdrawn)
- Store deadlines, salary ranges, locations, work type, and notes
- Server-side data fetching and mutations via Server Actions
- Form validation with inline error messages

## Getting Started

```bash
npm install
npm run dev
```

Set up your `.env.local`:

```
DATABASE_URL="your-postgres-connection-string"
```

Run migrations and seed:

```bash
npm run db:push
npm run db:seed
```

## Roadmap

- [ ] User authentication (Better Auth)
- [ ] AI-powered email classification (FastAPI + ML)
- [ ] Kanban board view
- [ ] Application timeline / events
