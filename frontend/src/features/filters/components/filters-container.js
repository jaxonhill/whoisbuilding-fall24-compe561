import SearchBar from "./search-bar";
import SelectSection from "./select-section";

const technologies = [
  {
    label: "React",
    isSelected: false,
  },
  {
    label: "Next.js",
    isSelected: false,
  },
  {
    label: "Python",
    isSelected: false,
  },
  {
    label: "Java",
    isSelected: false,
  },
]

const types = [
  {
    label: "Website",
    isSelected: false,
  },
  {
    label: "Frontend",
    isSelected: false,
  },
  {
    label: "Machine Learning",
    isSelected: false,
  },
]

export default function FiltersContainer() {
  return (
    <aside className="flex flex-col gap-8 w-full col-span-4">
        <h1 className="font-medium text-2xl w-full">Filters</h1>
        <SearchBar />
        <SelectSection headingText={"Technologies"} options={technologies} />
        <SelectSection headingText={"Type"} options={types} />
    </aside>
  )
}
