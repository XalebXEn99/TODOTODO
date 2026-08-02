# Local-First Todo App

A simple local-first Todo application built with Next.js App Router and SQLite using `better-sqlite3`.

## Third-Party Code

| Package | Purpose |
| --- | --- |
| `next` | App Router framework and server rendering support. |
| `react` | UI rendering library. |
| `react-dom` | React DOM bindings for the browser. |
| `better-sqlite3` | Synchronous SQLite access for local persistence. |
| `clsx` | Conditional class name composition in React components. |
| `lucide-react` | Optional icon rendering support. |
| `tailwindcss` | Utility-first CSS styling framework. |
| `@tailwindcss/postcss` | Tailwind PostCSS integration. |
| `typescript` | Static typing and compile-time safety. |
| `vitest` | Test runner for deterministic unit tests. |
| `eslint` | Linting and code quality checks. |
| `eslint-config-next` | Official Next.js ESLint configuration. |
| `@types/node`, `@types/react`, `@types/react-dom` | TypeScript declarations for Node.js and React. |

## Database Design

The application stores tasks in a single `tasks` table. Each task includes four required fields and archival state.

- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `title` TEXT NOT NULL
- `description` TEXT NOT NULL DEFAULT ''
- `due_date` TEXT NOT NULL
- `topic` TEXT NOT NULL
- `status` TEXT CHECK(status IN ('Todo', 'In-Progress', 'Complete')) NOT NULL DEFAULT 'Todo'
- `is_archived` INTEGER NOT NULL DEFAULT 0
- `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP

Important design decisions:
- Required fields are enforced at the database schema level.
- Task statuses are fixed and validated in the database.
- Archived tasks remain stored in SQLite and are excluded from active queries.
- Overdue status is derived in application logic and is not stored in the database.

## Running It

- Node.js version: **v20+**
- Install dependencies:
  ```bash
  npm install
  ```
- Run the development server:
  ```bash
  npm run dev
  ```
- Run tests:
  ```bash
  npm test
  ```

## AI Declaration

The preceding document was created and reviewed with the assistance of GitHub Copilot[GPT-4o].
