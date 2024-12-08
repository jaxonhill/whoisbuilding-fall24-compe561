import { Option } from "@/types/common-types";
import SearchBar from "./search-bar";
import SelectSection from "./select-section";
import SortBy from "./sort-by";

const tags: Option[] = [
	{ id: "1", label: "React", isSelected: false },
	{ id: "2", label: "Next.js", isSelected: false },
	{ id: "3", label: "Python", isSelected: false },
	{ id: "4", label: "Java", isSelected: false },
	{ id: "5", label: "Website", isSelected: false },
	{ id: "6", label: "Frontend", isSelected: false },
	{ id: "7", label: "Machine Learning", isSelected: false },
];

export default function FiltersContainer() {
	return (
		<aside className="flex flex-col gap-8 w-full col-span-4 h-fit">
			<SearchBar />
			<SortBy />
			<SelectSection headingText={"Tags"} options={tags} />
		</aside>
	);
}
