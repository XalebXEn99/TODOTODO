"use client";

import type { SortOption } from "@/types/task";

interface SortControlsProps {
  activeSort: SortOption;
  onChange: (sortBy: SortOption) => void;
}

const options: Array<{ key: SortOption; label: string }> = [
  { key: "topic", label: "Topic" },
  { key: "status", label: "Status" },
  { key: "due_date", label: "Due Date" },
];

export function SortControls({ activeSort, onChange }: SortControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-zinc-700">Sort by</span>
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            option.key === activeSort
              ? "border-pink-500 bg-pink-600 text-white"
              : "border-zinc-200 bg-white text-zinc-700 hover:border-pink-400 hover:bg-pink-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
