# Repository Guidelines

## Project Structure & Module Organization
This Next.js admin frontend keeps feature code in `src/`, with shared building blocks using the underscore prefix convention: `_components/` for reusable UI, `_layouts/` for page shells, `_stores/` for Zustand state, `_service/` for API clients, `_utils/` for helpers, `_datas/` for static tables, and `_commomActions/` for cross-cutting handlers. Screens live under `src/app` (e.g., `src/app/(admin)` for the dashboard, `src/app/signin`), while library helpers sit in `lib/` and domain typings in `types/`. Static assets belong in `public/`, and import aliases `@/*` and `@/assets/*` resolve to `src/` and `public/assets/`.

## Build, Test, and Development Commands
Run `npm run dev` (or `yarn dev`) to start the app on http://localhost:2131 with hot reload. `npm run build` produces the optimized production bundle, and `npm run start` serves that build. `npm run lint` executes ESLint with the Next.js core-web-vitals rules. Deploying behind PM2 uses `npm run pm2`, which builds first and then applies `ecosystem.config.js`.

## Coding Style & Naming Conventions
Stick with TypeScript (`strict` mode enabled) and prefer `.tsx` modules for React. Components and hooks should use PascalCase (`PaymentTable.tsx`) and camelCase (`usePaymentStore.ts`), matching the existing directories. Keep shared Emotion styles in `_theme/`, and favor CSS-in-JS via Emotion when styling components; fall back to `globals.css` only for app-wide resets. Use relative aliases starting with `@/` rather than long relative paths, and ensure lint runs clean before pushing—note that `no-explicit-any` is disabled but should still be used sparingly.

## Testing Guidelines
There is no automated test runner wired up yet (no `test` script). Until one is introduced, treat `npm run lint` plus interactive QA of critical journeys (signin, payment flows, admin dashboards) as the minimum gating check. When adding tests, colocate files as `<name>.test.tsx` beside the component or store, and aim to cover async service wrappers and Zustand selectors. Document any new tooling or coverage targets in this guide.

## Commit & Pull Request Guidelines
Keep commits small, focused, and written in imperative mood; recent history favors concise Korean summaries (`수정`, `원복`), which is acceptable—just ensure the scope is clear. Reference related Jira or GitHub issues in the body when applicable. For pull requests, include: 1) a short problem/solution summary, 2) screenshots or GIFs for UI-facing changes, 3) notes on manual checks run (`npm run lint`, local scenario walkthroughs), and 4) any follow-up tasks needed post-merge.
