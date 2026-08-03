"use server";

import { revalidatePath } from "next/cache";
import { createTask, updateTask, archiveTask, unarchiveTask } from "../../db/tasks";
import type { TaskInput } from "@/types/task";

export async function createTaskAction(formData: FormData) {
  const data: TaskInput = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    due_date: String(formData.get("due_date") ?? ""),
    topic: String(formData.get("topic") ?? "").trim(),
    status: (String(formData.get("status") ?? "Todo") as TaskInput["status"]),
  };

  createTask(data);
  revalidatePath("/");
}

export async function updateTaskAction(formData: FormData) {
  const idValue = String(formData.get("id") ?? "");
  const taskId = Number(idValue);
  if (Number.isNaN(taskId)) return;

  const data: TaskInput = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    due_date: String(formData.get("due_date") ?? ""),
    topic: String(formData.get("topic") ?? "").trim(),
    status: (String(formData.get("status") ?? "Todo") as TaskInput["status"]),
  };

  updateTask(taskId, data);
  revalidatePath("/");
}

export async function archiveTaskAction(formData: FormData) {
  const idValue = String(formData.get("id") ?? "");
  const taskId = Number(idValue);
  if (Number.isNaN(taskId)) return;

  archiveTask(taskId);
  revalidatePath("/");
}

export async function unarchiveTaskAction(formData: FormData) {
  const idValue = String(formData.get("id") ?? "");
  const taskId = Number(idValue);
  if (Number.isNaN(taskId)) return;

  unarchiveTask(taskId);
  revalidatePath("/");
}
