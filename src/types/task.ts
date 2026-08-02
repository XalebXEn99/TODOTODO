export type TaskStatus = "Todo" | "In-Progress" | "Complete";
export type SortOption = "topic" | "status" | "due_date";

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: TaskStatus;
  is_archived: number;
  created_at: string;
}

export interface TaskInput {
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: TaskStatus;
}
