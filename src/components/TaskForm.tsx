"use client";

import { useMemo } from "react";
import type { Task, TaskInput } from "@/types/task";
import type { TaskStatus } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  action: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

const statusOptions: TaskStatus[] = ["Todo", "In-Progress", "Complete"];

export function TaskForm({ task, action, onClose }: TaskFormProps) {
  const defaultValues = useMemo(
    () => ({
      title: task?.title ?? "",
      description: task?.description ?? "",
      due_date: task?.due_date ?? new Date().toISOString().slice(0, 10),
      topic: task?.topic ?? "",
      status: task?.status ?? "Todo",
    }),
    [task]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <dialog open className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/10">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {task ? "Edit Task" : "New Task"}
            </h2>
            <p className="text-sm text-zinc-500">All fields are required.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100">
            Close
          </button>
        </header>

        <form action={action} method="post" className="grid gap-4">
          {task ? <input type="hidden" name="id" value={task.id} /> : null}

          <input
            name="title"
            defaultValue={defaultValues.title}
            placeholder="Task title"
            required
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:bg-white"
          />

          <textarea
            name="description"
            defaultValue={defaultValues.description}
            rows={3}
            placeholder="Description"
            required
            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:bg-white"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-zinc-700">
              Due date
              <input
                name="due_date"
                type="date"
                defaultValue={defaultValues.due_date}
                required
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-zinc-700">
              Topic
              <input
                name="topic"
                defaultValue={defaultValues.topic}
                placeholder="Work, Personal, University"
                required
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:bg-white"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            Status
            <select
              name="status"
              defaultValue={defaultValues.status}
              required
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:bg-white"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-600 hover:bg-zinc-100">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
              {task ? "Save Task" : "Add Task"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
