# CLAUDE.md

> Guidance for Claude when working in this repository.
> Last updated: manually maintained alongside the codebase.

---

## Project Overview

**Faith & Growth Tracker** — a personal full-stack discipline dashboard for one user (the developer). It tracks spiritual and physical growth across five modules: Bible Tracker, Prayer Log, Journal, Goals (Kanban), and Fitness. The primary goal of this project is **learning modern web development through building**, not just shipping features.

---

## Commands

```bash
bun dev          # Start dev server (http://localhost:3000)
bun build        # Production build
bun start        # Serve production build
bun lint         # Run ESLint
```

> Always use `bun` — never `npm` or `yarn`.

---

## Tech Stack

| Layer            | Technology                                      |
|------------------|-------------------------------------------------|
| Framework        | Next.js 16 (App Router)                         |
| Language         | TypeScript                                      |
| Styling          | Tailwind CSS v4 (`@tailwindcss/postcss`)        |
| UI Components    | shadcn/ui — New York style                      |
| Auth + Database  | Supabase (`@supabase/ssr`)                      |
| Email            | Resend + React Email                            |
| Charts           | Recharts                                        |
| Error Tracking   | Sentry (`@sentry/nextjs`)                       |
| Package Manager  | Bun                                             |
| Deployment       | Vercel                                          |

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL (browser-safe)
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anon key (browser-safe)
SUPABASE_SERVICE_ROLE_KEY         # Server-only; used in cron/admin routes
RESEND_API_KEY                    # Server-only email sending
CRON_SECRET                       # Bearer token for Vercel cron endpoints
```

> Only `NEXT_PUBLIC_` prefixed variables are available in the browser.
> Server-side secrets must never be imported in Client Components.

---

## Project Structure

```
app/
  page.tsx                        # Public landing page
  login/                          # Auth pages (login, signup)
  forgot-password/
  reset-password/
  dashboard/
    page.tsx                      # Home dashboard (live stats + verse of the day)
    bible-tracker/page.tsx
    prayer-log/page.tsx
    journal/page.tsx
    goals/page.tsx
    fitness/page.tsx
  api/
    verse/route.ts                # Daily verse endpoint
    send-daily/route.ts           # Cron: daily email
    send-weekly/route.ts          # Cron: weekly email
    send-monthly/route.ts         # Cron: monthly review email
    send-feedback/route.ts        # Feedback form submission
  email/
    daily-checkin.tsx             # React Email template
    weekly-summary.tsx
    monthly-review.tsx
  error.tsx                       # Route-level error boundary
  global-error.tsx                # App-level error boundary (outside root layout)

components/
  app-sidebar.tsx                 # Main navigation sidebar
  nav-main.tsx
  nav-user.tsx
  home-page/                      # Dashboard components
  bible-tracker/
  prayer-log/
  journal/
  goals/
  fitness/
  ui/                             # shadcn/ui primitives — do not modify directly

lib/
  supabase-server.ts              # Server client (Server Components, Route Handlers)
  supabase-browser.ts             # Browser client (Client Components only)
  utils.ts                        # Shared utilities (cn, etc.)

hooks/                            # Custom React hooks (data fetching per feature)

middleware.ts                     # Route protection — must be named exactly this
supabase/migrations/              # Database migration files (Supabase CLI)
```

---

## Architecture & Key Patterns

### Supabase Client Usage

| Context                  | Client to use                          |
|--------------------------|----------------------------------------|
| Server Components        | `createSupabaseServerClient()`         |
| Route Handlers           | `createSupabaseServerClient()`         |
| Client Components        | `createSupabaseBrowserClient()`        |
| Cron/admin routes        | `createSupabaseServiceClient()`        |

Never use the service role key in browser-accessible code.

### Middleware & Route Protection

- **File must be named `middleware.ts`** at the project root and export a function named `middleware`.
- A prior version was mistakenly named `proxy.ts` — this caused route protection to silently not run. Do not rename it.
- Protected routes: all `/dashboard/**` paths redirect to `/login` if no authenticated session.
- Public routes: `/`, `/login`, `/forgot-password`, `/reset-password`, `/api/**`.

### Feature Architecture

Each feature follows this consistent build order:
1. `types.ts` (data shapes)
2. Component files (in `components/<feature>/`)
3. Page entry point (`app/dashboard/<feature>/page.tsx`)

### Styling Conventions

- **Dark theme:** background `#0a0a0f`, gold accent `#d4af37`
- **Fonts:** Cormorant Garamond (headings/display), DM Sans (body)
- **Tailwind v4** — no `tailwind.config.js`; configuration lives in CSS
- **Path alias:** `@/*` maps to the repo root
- Use Tailwind responsive utility classes for layouts — never inline `style` objects with fixed grid values, as these break responsiveness.

### Error Boundaries

- `app/error.tsx` — catches route-level errors, has access to root layout fonts via CSS variables.
- `app/global-error.tsx` — catches app-level errors, renders **outside the root layout**, so fonts must be imported directly via `next/font/google` (not via CSS variables from `layout.tsx`).

---

## Database (Supabase)

All tables use Row-Level Security (RLS). Every policy is scoped to the authenticated user: `auth.uid() = user_id`.

| Table           | Purpose                                                              |
|-----------------|----------------------------------------------------------------------|
| `profiles`      | User first name and email — auto-created on signup via DB trigger    |
| `bible_reading` | Individual reading sessions (book, chapter, date)                   |
| `prayer_log`    | Prayer requests and answered status                                  |
| `journal`       | Journal entries                                                      |
| `goals`         | Kanban goal cards with status (todo / in_progress / done)            |
| `fitness`       | Workout sessions with type and duration                              |
| `verses`        | Verse pool for the daily verse feature                               |

> RLS `ALL` policies cover INSERT — no separate INSERT policy is needed.
> Tables are created via the Supabase Table Editor UI, not raw SQL.
> Migrations live in `supabase/migrations/` and use the Supabase CLI + Docker Desktop.

**PGRST204 schema cache errors** can be resolved by running `SQL NOTIFY` to refresh the schema cache — no restart required.

---

## Cron Jobs (Vercel)

Defined in `vercel.json`. All cron routes verify requests with `Authorization: Bearer <CRON_SECRET>`.

| Route               | Schedule                     |
|---------------------|------------------------------|
| `/api/send-daily`   | Daily at 06:00               |
| `/api/send-weekly`  | Monday at 07:00              |
| `/api/send-monthly` | 1st of each month at 08:00   |

---

## Error Tracking (Sentry)

- Configured via `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- Registered in `instrumentation.ts` via the `register()` export
- `tracesSampleRate` is set to `0.1`
- Sentry org: `personal-projects-pf`, project: `faith-growth-tracker`

---

## Known Gotchas & Lessons Learned

| Issue | Resolution |
|---|---|
| Middleware silently not running | Must be named `middleware.ts` at root, exporting `middleware` |
| `global-error.tsx` fonts broken | Import fonts directly via `next/font/google` — CSS vars from layout are unavailable |
| PGRST204 schema cache errors | Run `SQL NOTIFY` in Supabase to refresh cache |
| RLS ALL policy and INSERT | `ALL` covers INSERT — no separate policy needed |
| Hydration errors from extensions | Grammarly etc. inject DOM attributes; use `suppressHydrationWarning` on `<body>` if needed |
| Inline style grid layouts | Break responsiveness — always use Tailwind responsive classes |
| shadcn sidebar URL constants | Do not create routes — routes come from `app/` file structure |

---

## Working Style

This is a **learning-first project**. The developer (Lian) builds one step at a time, runs commands independently, and pastes back output before proceeding. Claude should:

- **Never jump ahead** — wait for confirmation at each step.
- **Explain the reasoning** behind architectural decisions before suggesting code.
- **Scan project knowledge or the codebase first** before suggesting changes — do not assume file contents.
- **Prompt and guide** rather than providing unsolicited complete solutions.
- Ask before touching files that haven't been confirmed as relevant.

---

## Git Workflow

- `main` — stable, deployed branch
- `dev` — active development branch; merges into `main` when stable
- Commit and test between each meaningful step before moving forward