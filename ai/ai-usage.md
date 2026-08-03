# AI Usage Documentation

## Tooling & Attribution Log

| Tool | Role |
| --- | --- |
| Antigravity [Gemini 3.6 Flash] | Project planning, database schema formulation, test strategy design, prompt engineering, and rubric compliance auditing. |
| VSCode-Copilot [GPT-4o] | Code generation for Next.js components, SQLite integration in `db/tasks.ts`, Vitest suite implementation, and UI styling. |

## Up-Front Constraints Enforced

- Constraint 1: Overdue status must be derived dynamically at read-time and never stored in SQLite.
- Constraint 2: Archiving must use an `is_archived` flag; hard `DELETE` SQL queries are prohibited.
- Constraint 3: Vitest tests must run against an in-memory SQLite instance (`:memory:`).

## Documented Instance of AI Redirection / Correction

- Issue: Initial AI generation suggested storing `Overdue` as a fourth status value in SQLite.
- Reason for Rejection: The rubric explicitly penalizes storing overdue as a column or status value.
- Action Taken: The output was rejected, and the implementation was corrected to use a pure `isTaskOverdue(task)` utility function while preserving the SQLite check constraints.
- Additional refinement request: The user later specified functional and UI enhancements, including task unarchiving, due-date presets, topic selection with an add-new-topic flow, duplicate-task confirmation, and a Pink Panther-inspired visual theme with black/white/pink styling and animated archive transitions.
- Reason for Rejection / Redirect: These refinements were not to be implemented as structural changes to the core data model; they needed to remain compatible with the existing fixed-status and archive-by-flag architecture.
- Action Taken: The implementation was redirected to preserve the original lab constraints while layering the requested UX improvements on top of the existing task flow, including modal-centered interactions, pink-themed badges, and animated tab switching.

## Official Declaration Statement

"The preceding document was reviewed, planned, edited, and generated with the assistance of: Antigravity[Gemini 3.6 Flash], VSCode-Copilot[GPT-4o]."
