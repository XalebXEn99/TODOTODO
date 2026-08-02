import { describe, expect, test } from "vitest";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { getAllTasks, getArchivedTasks, createTask, archiveTask } from "../db/tasks";
import { isTaskOverdue } from "../src/utils/task-utils";
import type { TaskInput } from "../src/types/task";

const schemaSql = fs.readFileSync(path.resolve(process.cwd(), "db", "schema.sql"), "utf-8");

function createTestDatabase() {
  const db = new Database(":memory:");
  db.exec(schemaSql);
  return db;
}

describe("Todo app database behavior", () => {
  test("creates and retrieves a task with all required fields", () => {
    const db = createTestDatabase();
    const taskData: TaskInput = {
      title: "Write lab report",
      description: "Summarize the local-first todo app design.",
      due_date: "2026-08-10",
      topic: "University",
      status: "Todo",
    };

    const id = createTask(taskData, db);
    const tasks = getAllTasks(db);

    expect(id).toBeGreaterThan(0);
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      id,
      title: taskData.title,
      description: taskData.description,
      due_date: taskData.due_date,
      topic: taskData.topic,
      status: taskData.status,
      is_archived: 0,
    });
  });

  test("archives a task so it leaves active tasks and appears in archived tasks", () => {
    const db = createTestDatabase();
    const taskData: TaskInput = {
      title: "Submit assignment",
      description: "Complete the COMS3011A submission.",
      due_date: "2026-08-05",
      topic: "University",
      status: "In-Progress",
    };

    const id = createTask(taskData, db);
    archiveTask(id, db);

    const activeTasks = getAllTasks(db);
    const archivedTasks = getArchivedTasks(db);

    expect(activeTasks).toHaveLength(0);
    expect(archivedTasks).toHaveLength(1);
    expect(archivedTasks[0].id).toBe(id);
    expect(archivedTasks[0].is_archived).toBe(1);
  });

  test("derives overdue only for incomplete tasks and not for completed tasks", () => {
    const db = createTestDatabase();
    const taskData1: TaskInput = {
      title: "Past incomplete task",
      description: "Overdue task should be flagged.",
      due_date: "2020-01-01",
      topic: "Work",
      status: "Todo",
    };

    const taskData2: TaskInput = {
      title: "Past completed task",
      description: "Completed tasks are not overdue.",
      due_date: "2020-01-01",
      topic: "Work",
      status: "Complete",
    };

    const id1 = createTask(taskData1, db);
    const id2 = createTask(taskData2, db);

    const tasks = getAllTasks(db);
    const overdueTask = tasks.find((task) => task.id === id1);
    const completedTask = tasks.find((task) => task.id === id2);

    expect(overdueTask).toBeDefined();
    expect(completedTask).toBeDefined();
    expect(isTaskOverdue(overdueTask!)).toBe(true);
    expect(isTaskOverdue(completedTask!)).toBe(false);
  });
});
