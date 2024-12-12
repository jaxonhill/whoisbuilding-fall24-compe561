import { Option } from "@/types/common-types";
import SearchBar from "./search-bar";
import SelectSection from "./select-section";
import SortBy, { SortByOption } from "./sort-by";

export const TAGS: Option[] = [
	{ id: "1", label: "React", isSelected: false },
	{ id: "2", label: "Next.js", isSelected: false },
	{ id: "3", label: "Python", isSelected: false },
	{ id: "4", label: "Java", isSelected: false },
	{ id: "5", label: "Website", isSelected: false },
	{ id: "6", label: "Frontend", isSelected: false },
	{ id: "7", label: "Machine Learning", isSelected: false },
];

interface FiltersContainerProps {
	state: {
		username: string;
		searchText: string;
		sortBy: SortByOption;
		tags: Option[];
	};
	dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

export default function FiltersContainer({ state, dispatch }: FiltersContainerProps) {
	return (
		<aside className="sticky top-28 flex flex-col gap-8 w-full col-span-4 h-fit">
			<SearchBarSection
				value={state.username}
				onChange={(text) => dispatch({ type: 'SET_USERNAME', payload: text })}
			/>
			<SortBySection
				value={state.sortBy}
				onChange={(sortOption) => dispatch({ type: 'SET_SORT_BY', payload: sortOption })}
			/>
			<SelectSection
				headingText={"Filter by tags"}
				options={state.tags}
				onToggleTag={(tag) => dispatch({ type: 'TOGGLE_TAG', payload: tag })}
			/>
		</aside>
	);
}

function SearchBarSection({ value, onChange }: { value: string, onChange: (text: string) => void }) {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="font-medium text-base">Search</h2>
			<SearchBar value={value} onChange={onChange} />
		</div>
	);
}

function SortBySection({ value, onChange }: { value: SortByOption, onChange: (sortOption: SortByOption) => void }) {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="font-medium text-base">Sort By</h2>
			<SortBy value={value} onChange={onChange} />
		</div>
	);
}