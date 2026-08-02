import { Task, SortOption, TaskStatus } from "@/types/task";

const statusOrder: Record<TaskStatus, number> = {
  Todo: 0,
  "In-Progress": 1,
  Complete: 2,
};

export function isTaskOverdue(task: Task): boolean {
  const dueDate = new Date(`${task.due_date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return task.status !== "Complete" && dueDate < today;
}

export function sortTasks(tasks: Task[], sortBy: SortOption): Task[] {
  return [...tasks].sort((left, right) => {
    if (sortBy === "topic") {
      return left.topic.localeCompare(right.topic, undefined, { sensitivity: "base" });
    }

    if (sortBy === "status") {
      return statusOrder[left.status] - statusOrder[right.status];
    }

    if (sortBy === "due_date") {
      return new Date(left.due_date).getTime() - new Date(right.due_date).getTime();
    }

    return 0;
  });
}
