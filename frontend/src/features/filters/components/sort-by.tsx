"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "top-monthly", label: "Top Monthly" },
  { value: "top-weekly", label: "Top Weekly" },
  { value: "top-daily", label: "Top Daily" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
] as const;

export default function SortBy() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Sort By:</span>
      <Select defaultValue="top-monthly">
        <SelectTrigger className="rounded-full h-8 w-32 text-slate-950 border-slate-300 focus:outline-none focus:ring-0">
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
