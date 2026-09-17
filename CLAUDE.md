# Knowledge Base

Multi-tenant: users upload documents, ask questions and get answers with
citations (RAG). This is a learning and portfolio project — code quality and
being able to explain every decision matter more than speed.

## Stack

Monorepo: pnpm workspaces + Turborepo. TypeScript 6 (strict, NodeNext), Node 24.
Planned apps: Next.js 16 (web), NestJS 12 (api), BullMQ worker.
Postgres + pgvector, Redis, S3. API contract: oRPC + zod. ORM: Drizzle.

## Layout

```
apps/                  applications (empty for now): web, api, worker
packages/
  contracts/           @kb/contracts — zod schemas and the API contract
  eslint-config/       @kb/eslint-config — shared ESLint flat config
  typescript-config/   @kb/typescript-config — shared tsconfigs
```

Rule: apps are entry points only, logic lives in packages.
Dependency direction: apps → packages, never the other way around.
`web` never imports server-side packages or the database.

## Commands

```bash
pnpm install
pnpm lint                          # all packages
pnpm check-types
pnpm lint --filter=@kb/contracts   # single package, by name from package.json
```

The type-checking task is called `check-types` (not `typecheck`).

## Conventions

- Cross-package imports use the package name (`@kb/contracts`), never `../../`.
- Inside a package, relative imports carry the `.js` extension (NodeNext).
- Shared tool versions live in `catalog` in `pnpm-workspace.yaml`; packages use `catalog:`.
- Local packages are referenced as `workspace:*`.
- zod schemas are camelCase (`healthResponseSchema`), types are PascalCase (`HealthResponse`).
- Commit messages follow Conventional Commits: `feat(contracts): add health schema`.
- Notable decisions are recorded in `docs/adr/`.

## Do not

- Add dependencies to `contracts` beyond zod and @orpc/contract — it must stay
  free of frameworks, database and environment concerns.
- Commit secrets. Only `.env.example` is tracked; real `.env` files are ignored.
- Cross package boundaries or read another module's tables directly.
- Bump tool versions outside of `catalog`.
