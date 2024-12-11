"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "most_liked", label: "Most Liked" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
] as const;

export type SortByOption = "most_liked" | "newest" | "oldest";

export default function SortBy({ value, onChange }: { value: SortByOption, onChange: (sortOption: SortByOption) => void }) {
  return (
      <Select value={value} onValueChange={(value) => onChange(value as SortByOption)}>
        <SelectTrigger className="h-12 text-base px-4 w-full text-slate-950 border-slate-300 focus:outline-none focus:ring-0">
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem className="text-base py-2" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
}
