import type { Task, TaskInput } from "@/types/task";
import type { Database as DatabaseType } from "better-sqlite3";
import db from "./index";

const selectActiveTasksSql = `
  SELECT id, title, description, due_date, topic, status, is_archived, created_at
  FROM tasks
  WHERE is_archived = 0
  ORDER BY created_at DESC
`;

const selectArchivedTasksSql = `
  SELECT id, title, description, due_date, topic, status, is_archived, created_at
  FROM tasks
  WHERE is_archived = 1
  ORDER BY created_at DESC
`;

export function getAllTasks(database: DatabaseType = db): Task[] {
  return database.prepare(selectActiveTasksSql).all() as Task[];
}

export function getArchivedTasks(database: DatabaseType = db): Task[] {
  return database.prepare(selectArchivedTasksSql).all() as Task[];
}

export function createTask(data: TaskInput, database: DatabaseType = db): number {
  const statement = database.prepare(
    `INSERT INTO tasks (title, description, due_date, topic, status) VALUES (?, ?, ?, ?, ?)`
  );

  const result = statement.run(
    data.title.trim(),
    data.description.trim(),
    data.due_date,
    data.topic.trim(),
    data.status
  );

  return Number(result.lastInsertRowid);
}

export function updateTask(id: number, data: TaskInput, database: DatabaseType = db): void {
  const statement = database.prepare(
    `UPDATE tasks SET title = ?, description = ?, due_date = ?, topic = ?, status = ? WHERE id = ?` 
  );

  statement.run(
    data.title.trim(),
    data.description.trim(),
    data.due_date,
    data.topic.trim(),
    data.status,
    id
  );
}

export function archiveTask(id: number, database: DatabaseType = db): void {
  const statement = database.prepare(`UPDATE tasks SET is_archived = 1 WHERE id = ?`);
  statement.run(id);
}

export function unarchiveTask(id: number, database: DatabaseType = db): void {
  const statement = database.prepare(`UPDATE tasks SET is_archived = 0 WHERE id = ?`);
  statement.run(id);
}
