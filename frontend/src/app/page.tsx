"use client";

import FiltersContainer from "@/features/filters/components/filters-container";
import { Option } from "@/types/common-types";
import { PaginatedProjects, Project } from "@/types/db-types";
import { useEffect, useReducer, useState, useMemo } from "react";
import { TAGS } from "@/features/filters/components/filters-container";
import ProjectsContainer from "@/features/project-card/components/projects-container";
import { getProjects } from "@/lib/api/projects";
import { SortByOption } from "@/features/filters/components/sort-by";
import ProjectCardSkeleton from "@/features/project-card/components/project-card-skeleton";
import { useDebounce } from "@/hooks/use-debounce";

// Define the initial state with explicit types
const initialState: {
  searchText: string;
  sortBy: SortByOption;
  tags: Option[];
  username: string | null;
} = {
  searchText: "",
  sortBy: "newest",
  tags: TAGS.map((tag) => ({...tag, isSelected: false})),
  username: null,
};

// Define the reducer function
function filterReducer(state: typeof initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'TOGGLE_TAG':
      console.log(action.payload);
      return {...state, tags: state.tags.map((tag) => {
        if (tag.label === action.payload.label) {
          return {...tag, isSelected: !tag.isSelected};
        }
        return tag;
      })}
    default:
      return state;
  }
}

export default function HomePage() {
	const [state, dispatch] = useReducer(filterReducer, initialState);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounce the search text with a 300ms delay
  const debouncedSearchText = useDebounce(state.searchText, 300);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const paginationResponse: PaginatedProjects = await getProjects({
          limit: 10,
          page: 1,
          sort_by: state.sortBy,
          tags: state.tags.filter((tag) => tag.isSelected).map((tag) => tag.label),
          username: state.username,
          search: debouncedSearchText,
        });
        setProjects(paginationResponse.projects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [state.sortBy, state.tags, debouncedSearchText, state.username]);

	return (
    <div className="grid mt-8 mb-16 grid-cols-12 gap-8">
			<FiltersContainer state={state} dispatch={dispatch} />
      <div className="col-span-8">
        {loading ? (
          <div className="flex flex-col gap-6 w-full">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        ) : projects.length > 0 ? (
          <ProjectsContainer projects={projects} />
        ) : (
          <div className="text-center text-slate-500">No projects found</div>
        )}
      </div>
		</div>
	);
}
