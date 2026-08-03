"use client";

import { useMemo, useState } from "react";
import type { Task } from "@/types/task";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { createTaskAction, updateTaskAction, archiveTaskAction, unarchiveTaskAction } from "@/app/actions";

interface TaskManagerProps {
  tasks: Task[];
  archivedTasks: Task[];
}

export function TaskManager({ tasks, archivedTasks }: TaskManagerProps) {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const activeTasks = useMemo(() => tasks, [tasks]);
  const archived = useMemo(() => archivedTasks, [archivedTasks]);
  const allTasks = useMemo(() => [...tasks, ...archivedTasks], [tasks, archivedTasks]);
  const existingTopics = useMemo(() => Array.from(new Set(allTasks.map((task) => task.topic.trim()).filter(Boolean))), [allTasks]);

  const openNewTaskForm = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const openEditTaskForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingTask(undefined);
    setIsFormOpen(false);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Local Todo App</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Manage tasks without deleting them</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "active"
                ? "bg-sky-600 text-white"
                : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active Tasks
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "archived"
                ? "bg-sky-600 text-white"
                : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
            onClick={() => setActiveTab("archived")}
          >
            Archived Tasks
          </button>
          <button
            type="button"
            onClick={openNewTaskForm}
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Add Task
          </button>
        </div>
      </div>

      {activeTab === "active" ? (
        <TaskList tasks={activeTasks} onEdit={openEditTaskForm} archiveAction={archiveTaskAction} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-950">Archived Tasks</h2>
              <p className="text-sm text-zinc-600">Archived tasks remain stored locally and can be reviewed anytime.</p>
            </div>
          </div>
          {archived.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-600">
              <p className="text-lg font-semibold text-zinc-900">No archived tasks</p>
              <p className="mt-2 text-sm">Archive tasks from the Active tab to view them here.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {archived.map((task) => (
                <article key={task.id} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{task.topic}</p>
                      <h3 className="mt-2 text-lg font-semibold text-zinc-950">{task.title}</h3>
                    </div>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">{task.status}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-700">{task.description}</p>
                  <p className="mt-4 text-sm text-zinc-600">Due date: <strong className="text-zinc-950">{task.due_date}</strong></p>
                  <form action={unarchiveTaskAction} className="mt-4 inline-block">
                    <input type="hidden" name="id" value={task.id} />
                    <button type="submit" className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700">
                      Unarchive
                    </button>
                  </form>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {isFormOpen ? (
        <TaskForm
          task={editingTask}
          existingTasks={allTasks}
          existingTopics={existingTopics}
          onClose={closeForm}
          action={editingTask ? updateTaskAction : createTaskAction}
        />
      ) : null}
    </section>
  );
}
