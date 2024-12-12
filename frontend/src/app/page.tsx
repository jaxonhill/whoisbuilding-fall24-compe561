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
import { PrimaryButton } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Debounce the search text with a 300ms delay
  const debouncedSearchText = useDebounce(state.searchText, 300);

  const loadProjects = async (pageNum: number, append: boolean = false) => {
    try {
      setLoading(true);
      const paginationResponse: PaginatedProjects = await getProjects({
        limit: 3,
        page: pageNum,
        sort_by: state.sortBy,
        tags: state.tags.filter((tag) => tag.isSelected).map((tag) => tag.label),
        username: state.username,
        search: debouncedSearchText,
      });

      if (append) {
        setProjects(prev => [...prev, ...paginationResponse.projects]);
      } else {
        setProjects(paginationResponse.projects);
      }
      setHasMore(paginationResponse.projects.length === 3);
    } catch (error) {
      toast({
        title: "Failed to load projects",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadProjects(1, false);
  }, [state.sortBy, state.tags, debouncedSearchText, state.username]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadProjects(nextPage, true);
  };

	return (
    <div className="grid mt-8 mb-16 grid-cols-12 gap-8">
			<FiltersContainer state={state} dispatch={dispatch} />
      <div className="col-span-8">
        <div className="flex flex-col gap-8">
          {(!loading || page > 1) && <ProjectsContainer projects={projects} />}
          {loading && (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          )}
          {!loading && projects.length === 0 ? (
            <div className="text-center text-slate-500">No projects found</div>
          ) : (
            !loading && hasMore && (
              <button
                onClick={handleLoadMore}
                className="w-full py-3 text-center bg-blue-600 rounded-lg text-white hover:bg-blue-600 disabled:bg-slate-50 disabled:text-slate-400"
              >
                Load More
              </button>
            )
          )}
        </div>
      </div>
		</div>
	);
}
