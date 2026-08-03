"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Task, TaskStatus } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  existingTasks: Task[];
  existingTopics: string[];
  action: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

const statusOptions: TaskStatus[] = ["Todo", "In-Progress", "Complete"];
const dueDatePresets = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "week", label: "In 1 week" },
  { value: "two-weeks", label: "In 2 weeks" },
  { value: "custom", label: "Custom date" },
];

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return formatDate(next);
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function TaskForm({ task, existingTasks, existingTopics, action, onClose }: TaskFormProps) {
  const today = formatDate(new Date());

  const defaultValues = useMemo(() => ({
    title: task?.title ?? "",
    description: task?.description ?? "",
    due_date: task?.due_date ?? today,
    topic: task?.topic ?? "",
    status: task?.status ?? "Todo",
  }), [task, today]);

  const [title, setTitle] = useState(defaultValues.title);
  const [description, setDescription] = useState(defaultValues.description);
  const [status, setStatus] = useState<TaskStatus>(defaultValues.status);
  const [dueDateValue, setDueDateValue] = useState(defaultValues.due_date);
  const [dueDatePreset, setDueDatePreset] = useState(task ? "custom" : "today");
  const [topicMode, setTopicMode] = useState<"select" | "custom">(
    task ? (existingTopics.includes(task.topic) ? "select" : "custom") : "select"
  );
  const [selectedTopic, setSelectedTopic] = useState(
    task && existingTopics.includes(task.topic) ? task.topic : existingTopics[0] ?? ""
  );
  const [customTopicValue, setCustomTopicValue] = useState(
    task && !existingTopics.includes(task.topic) ? task.topic : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(defaultValues.title);
    setDescription(defaultValues.description);
    setStatus(defaultValues.status);
    setDueDateValue(defaultValues.due_date);
    setDueDatePreset(task ? "custom" : "today");
    setTopicMode(task ? (existingTopics.includes(task.topic) ? "select" : "custom") : "select");
    setSelectedTopic(task && existingTopics.includes(task.topic) ? task.topic : existingTopics[0] ?? "");
    setCustomTopicValue(task && !existingTopics.includes(task.topic) ? task.topic : "");
  }, [defaultValues, existingTopics, task]);

  const effectiveTopic = topicMode === "custom" ? customTopicValue.trim() : selectedTopic.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.set("title", title.trim());
    formData.set("description", description.trim());
    formData.set("status", status);
    formData.set("due_date", dueDateValue);
    formData.set("topic", effectiveTopic);

    if (!task) {
      const normalizedTitle = normalize(title);
      const duplicateCandidates = existingTasks.filter((existingTask) => {
        const sameTopic = normalize(existingTask.topic) === normalize(effectiveTopic);
        const sameDueDate = existingTask.due_date === dueDateValue;
        const existingTitle = normalize(existingTask.title);
        const titleSimilar =
          normalizedTitle.length > 0 &&
          (existingTitle === normalizedTitle || existingTitle.includes(normalizedTitle) || normalizedTitle.includes(existingTitle));

        return sameTopic && sameDueDate && titleSimilar;
      });

      if (duplicateCandidates.length > 0) {
        const shouldProceed = window.confirm(
          "This looks similar to an existing task. Save it anyway?"
        );
        if (!shouldProceed) return;
      }
    }

    setIsSubmitting(true);
    try {
      await action(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex min-h-screen items-center justify-center bg-black/55 p-4">
      <dialog open className="mx-auto w-full max-w-xl rounded-[2rem] border border-pink-200 bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
        <header className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {task ? "Edit Task" : "New Task"}
            </h2>
            <p className="text-sm text-zinc-500">All fields are required.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 hover:bg-pink-50 hover:text-pink-700">
            Close
          </button>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {task ? <input type="hidden" name="id" value={task.id} /> : null}

          <input
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
            required
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white"
          />

          <textarea
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            placeholder="Description"
            required
            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-zinc-700">
              Due date
              <select
                value={dueDatePreset}
                onChange={(event) => {
                  const preset = event.target.value;
                  setDueDatePreset(preset);
                  if (preset === "today") {
                    setDueDateValue(today);
                  } else if (preset === "tomorrow") {
                    setDueDateValue(addDays(new Date(), 1));
                  } else if (preset === "week") {
                    setDueDateValue(addDays(new Date(), 7));
                  } else if (preset === "two-weeks") {
                    setDueDateValue(addDays(new Date(), 14));
                  } else {
                    setDueDateValue(dueDateValue || today);
                  }
                }}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white"
              >
                {dueDatePresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
              <input
                name="due_date"
                type="date"
                value={dueDateValue}
                onChange={(event) => setDueDateValue(event.target.value)}
                required
                className={dueDatePreset === "custom" ? "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white" : "hidden"}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-zinc-700">
              Topic
              {topicMode === "custom" ? (
                <input
                  name="topic"
                  value={customTopicValue}
                  onChange={(event) => setCustomTopicValue(event.target.value)}
                  placeholder="Work, Personal, University"
                  required
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white"
                />
              ) : (
                <select
                  name="topic"
                  value={selectedTopic}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === "__new__") {
                      setTopicMode("custom");
                      setSelectedTopic("");
                      setCustomTopicValue("");
                    } else {
                      setSelectedTopic(value);
                    }
                  }}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white"
                >
                  <option value="">Choose a topic</option>
                  {existingTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                  <option value="__new__">Add new topic…</option>
                </select>
              )}
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            Status
            <select
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              required
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:bg-white"
            >
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-600 hover:bg-pink-50 hover:text-pink-700">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60">
              {task ? "Save Task" : "Add Task"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
