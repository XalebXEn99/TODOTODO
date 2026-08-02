"use client";

import { useMemo, useState } from "react";
import type { Task, SortOption } from "@/types/task";
import { TaskCard } from "@/components/TaskCard";
import { SortControls } from "@/components/SortControls";
import { sortTasks } from "@/utils/task-utils";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  archiveAction: (formData: FormData) => Promise<void>;
}

export function TaskList({ tasks, onEdit, archiveAction }: TaskListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("topic");

  const sortedTasks = useMemo(() => sortTasks(tasks, sortBy), [tasks, sortBy]);

  if (tasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-600">
        <p className="text-lg font-semibold text-zinc-900">No tasks found.</p>
        <p className="mt-2 text-sm">Use the Add Task button to create your first local task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-zinc-950">Active Tasks</h2>
        <SortControls activeSort={sortBy} onChange={setSortBy} />
      </div>
      <div className="grid gap-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} archiveAction={archiveAction} />
        ))}
      </div>
    </div>
  );
}
