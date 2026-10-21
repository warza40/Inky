# Rachana Mandal — portfolio

Personal design portfolio for [rachanamandal.space](https://rachanamandal.space). Next.js App Router, React, and Tailwind CSS.

## Develop

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Quality checks

GitHub Actions (`.github/workflows/ci.yml`) runs these on every pull request and on pushes to `main`.

| Command                | What it does                                                       |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run lint`         | ESLint (Next.js core web vitals + TypeScript)                      |
| `npm run typecheck`    | `tsc --noEmit`                                                     |
| `npm run knip`         | Unused files, exports, and dependencies                            |
| `npm run format:check` | Prettier                                                           |
| `npm run format`       | Write Prettier formatting                                          |
| `npm run audit:deps`   | Production `npm audit` at high severity, plus a dev-only allowlist |
| `npm run check:links`  | Internal routes, public assets, and external URLs                  |
| `npm run build`        | Production build                                                   |
| `npm run check:routes` | HTTP status of the main routes (needs `npm run start`)             |
| `npm run check:a11y`   | axe WCAG 2.1 A/AA in Chromium (needs `npm run start`)              |
| `npm run check`        | Lint, types, knip, format, audit, and links                        |

Route and accessibility checks expect the production server:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
npm run check:routes
CHROME_PATH=/usr/bin/google-chrome npm run check:a11y
```

`check:a11y` uses Playwright's Chromium unless `CHROME_PATH` points at a local Chrome. Color contrast is printed and does not fail the job, because those fixes change the palette.

`check:links` skips the network when `CHECK_LINKS_INTERNAL_ONLY=1`.
