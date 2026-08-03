# Database Design

## ERD for the tasks table

For this lab, the ERD is intentionally simple because the app uses a single SQLite table: `tasks`.
There are no relationships to other tables, so the correct ERD is a single entity with its columns and constraints.

```mermaid
erDiagram
    TASKS {
        int id PK
        string title "NOT NULL"
        string description "NOT NULL"
        string due_date "NOT NULL"
        string topic "NOT NULL"
        string status "CHECK IN ('Todo','In-Progress','Complete')"
        int is_archived "NOT NULL DEFAULT 0"
        string created_at "DEFAULT CURRENT_TIMESTAMP"
    }
```
![ERDiagram](db-diagram-dark.png)

## How to draw this ERD

### Option 1: Mermaid Live Editor
1. Open https://mermaid.live/ in your browser.
2. Paste the Mermaid code block above into the editor.
3. Click the "Generate Diagram" or "Render" button.
4. Export the diagram as SVG or PNG if needed.


