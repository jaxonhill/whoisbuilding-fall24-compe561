import SearchBar from "./search-bar";

export default function FiltersContainer() {
  return (
    <aside className="flex flex-col gap-8">
        <h1 className="font-medium text-2xl">Filters</h1>
        <SearchBar />
    </aside>
  )
}
