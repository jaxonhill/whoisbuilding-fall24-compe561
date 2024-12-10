"use client";

import FiltersContainer from "@/features/filters/components/filters-container";
import { Option } from "@/types/common-types";
import { Project } from "@/types/db-types";
import { useEffect, useReducer, useState } from "react";
import { TAGS } from "@/features/filters/components/filters-container";
import ProjectsContainer from "@/features/project-card/components/projects-container";
import { getProjects } from "@/lib/api/projects";
import { SortByOption } from "@/features/filters/components/sort-by";

// Define the initial state with explicit types
const initialState: {
  searchText: string;
  sortBy: SortByOption;
  tags: Option[];
} = {
  searchText: "",
  sortBy: "newest",
  tags: TAGS.map((tag) => ({...tag, isSelected: false})),
};

// Define the reducer function
function filterReducer(state: typeof initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
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

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects({
        limit: 10,
        page: 1,
        sort_by: state.sortBy,
        tags: state.tags.filter((tag) => tag.isSelected).map((tag) => tag.label),
      });
      setProjects(projects);
    };
    fetchProjects();
  }, [state]);

	return (
    <div className="grid mt-12 mb-16 grid-cols-12 gap-8">
			<FiltersContainer state={state} dispatch={dispatch} />
      <div className="col-span-8">
        <ProjectsContainer projects={projects} />
      </div>
		</div>
	);
}
