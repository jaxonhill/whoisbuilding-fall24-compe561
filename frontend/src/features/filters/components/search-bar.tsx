import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string, onChange: (text: string) => void }) {
	return (
		<div className="flex gap-2 items-center border border-slate-300 rounded-lg px-4 h-12 w-full">
			<Search className="h-5 w-5 stroke-slate-400 flex-shrink-0 stroke-[1.5px]" />
			<input
				type="text"
				placeholder="Search by title or @username"
				className="placeholder-slate-400 w-full focus:outline-none"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
