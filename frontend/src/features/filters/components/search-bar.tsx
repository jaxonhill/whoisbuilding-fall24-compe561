import { Search } from "lucide-react";

export default function SearchBar() {
	return (
		<div className="flex gap-2 items-center border border-slate-300 rounded-lg px-4 h-12 w-full">
			<Search className="h-5 w-5 stroke-slate-400 flex-shrink-0 stroke-[1.5px]" />
			<input
				type="text"
				placeholder="Search"
				className="placeholder-slate-400 w-full focus:outline-none"
			/>
		</div>
	);
}
