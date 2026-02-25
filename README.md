# Recall

> Turn what you save into who you become.

Recall is a minimal daily reflection tool. It watches what you save, surfaces one thing at the right moment, and asks you one question about it. No dashboards. No organisation. No noise. Just you and something you once found worth keeping.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| API | oRPC — end-to-end type-safe with OpenAPI |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Better-Auth |
| Styling | Tailwind CSS + shadcn/ui |
| Monorepo | Turborepo |
| Runtime | Bun |
| Linting | Biome |
| Git Hooks | Husky |

---

## Project Structure

```
recall/
├── apps/
│   └── web/          # Next.js fullstack application
├── packages/
│   ├── api/          # Business logic and API layer
│   ├── auth/         # Auth configuration
│   └── db/           # Prisma schema and database queries
```

---

## Getting Started

**1. Install dependencies**

```bash
bun install
```

**2. Configure environment**

Copy the example env file and fill in your database credentials:

```bash
cp apps/web/.env.example apps/web/.env
```

Update `apps/web/.env` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/recall"
```

**3. Push the database schema**

```bash
bun run db:push
```

**4. Start the development server**

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) to see the app running.

---

## Scripts

| Script | What it does |
|---|---|
| `bun run dev` | Start all apps in development mode |
| `bun run build` | Build all apps for production |
| `bun run check` | Run Biome formatting and lint fix |
| `bun run check-types` | TypeScript type check across all packages |
| `bun run db:push` | Push schema changes to the database |
| `bun run db:generate` | Regenerate the Prisma client |
| `bun run db:migrate` | Run database migrations |
| `bun run db:studio` | Open Prisma Studio to inspect data |
| `bun run prepare` | Initialise Husky git hooks |

---

## Code Quality

Biome handles both formatting and linting in a single tool — no ESLint, no Prettier.

Husky runs checks automatically on every commit. To run manually:

```bash
bun run check
```

---

## License

MIT
