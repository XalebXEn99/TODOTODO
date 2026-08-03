"use client";

import { AnimatePresence, motion } from "framer-motion";
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
      <div className="flex flex-col gap-4 rounded-[2rem] border border-pink-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-pink-700">The Pink Panther To-Do</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "active"
                ? "bg-black text-white"
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
                ? "bg-black text-white"
                : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
            onClick={() => setActiveTab("archived")}
          >
            Archived Tasks
          </button>
          <button
            type="button"
            onClick={openNewTaskForm}
            className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
          >
            Add Task
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "active" ? (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <TaskList tasks={activeTasks} onEdit={openEditTaskForm} archiveAction={archiveTaskAction} />
          </motion.div>
        ) : (
          <motion.div
            key="archived"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-950">Archived Tasks</h3>
                <p className="text-sm text-zinc-600">Archived tasks remain stored locally and can be reviewed anytime.</p>
              </div>
            </div>
            {archived.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-pink-200 bg-pink-50/70 p-8 text-center text-zinc-600">
                <p className="text-lg font-semibold text-zinc-900">No archived tasks</p>
                <p className="mt-2 text-sm">Archive tasks from the Active tab to view them here.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {archived.map((task) => (
                  <motion.article
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="rounded-[1.5rem] border border-pink-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-pink-700">{task.topic}</p>
                        <h4 className="mt-2 text-lg font-semibold text-zinc-950">{task.title}</h4>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">{task.status}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-zinc-700">{task.description}</p>
                    <p className="mt-4 text-sm text-zinc-600">Due date: <strong className="text-zinc-950">{task.due_date}</strong></p>
                    <form action={unarchiveTaskAction} className="mt-4 inline-block">
                      <input type="hidden" name="id" value={task.id} />
                      <button type="submit" className="rounded-full bg-pink-600 px-3 py-1 text-xs font-semibold text-white hover:bg-pink-700">
                        Unarchive
                      </button>
                    </form>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
