"use client";

import type { Task } from "@/types/task";
import { isTaskOverdue } from "@/utils/task-utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  archiveAction: (formData: FormData) => Promise<void>;
}

const statusColors: Record<string, string> = {
  Todo: "bg-amber-100 text-amber-800",
  "In-Progress": "bg-sky-100 text-sky-800",
  Complete: "bg-emerald-100 text-emerald-800",
};

export function TaskCard({ task, onEdit, archiveAction }: TaskCardProps) {
  const overdue = isTaskOverdue(task);

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{task.topic}</p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-950">{task.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[task.status]}`}>
            {task.status}
          </span>
          {overdue ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
              Overdue
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-700">{task.description}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-600">
        <p>
          Due <strong className="text-zinc-950">{task.due_date}</strong>
        </p>
        <div className="flex items-center gap-2">
          <form action={archiveAction} className="inline">
            <input type="hidden" name="id" value={task.id} />
            <button type="submit" className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100">
              Archive
            </button>
          </form>
          <button onClick={() => onEdit(task)} className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700">
            Edit
          </button>
        </div>
      </div>
    </article>
  );
}
