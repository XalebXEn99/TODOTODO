# The Pink Panther To-Do

## Third-Party Code

| Package | Justification |
| --- | --- |
| next | React framework for server rendering, App Router, and server actions. |
| better-sqlite3 | Fast, synchronous local SQLite database driver for zero-network Node.js data persistence. |
| lucide-react | Lightweight icon library for task status badges, sort arrows, and overdue warning icons. |
| clsx | Utility functions for dynamic CSS class merging. |
| tailwind-merge | Utility functions for dynamic CSS class merging. |
| vitest | TypeScript-native test runner for executing deterministic tests against in-memory SQLite. |

## Database Design

- The `tasks` table stores each task with the following fields: `id`, `title`, `description`, `due_date`, `topic`, `status`, `is_archived`, and `created_at`.
- The `status` column uses the check constraint `status IN ('Todo', 'In-Progress', 'Complete')` to enforce fixed task statuses.
- Archiving is handled using the `is_archived` flag so tasks are never deleted from SQLite; they simply move between active and archived views.
- Overdue is derived dynamically using the rule `isOverdue = status !== 'Complete' && new Date(due_date) < new Date()`.

## Running It

- Node.js Version: v20.0.0 or higher.
- Install command: `npm install`
- Run dev server: `npm run dev` (Access at http://localhost:3000)
- Test command: `npm test`
