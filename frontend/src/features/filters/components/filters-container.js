import SearchBar from "./search-bar";

export default function FiltersContainer() {
  return (
    <aside className="flex flex-col gap-8 w-full">
        <h1 className="font-medium text-2xl w-full">Filters</h1>
        <SearchBar />
    </aside>
  )
}
