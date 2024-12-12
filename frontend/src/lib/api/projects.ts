import { PaginatedProjects, Project } from "@/types/db-types";
import { API_BASE_URL } from "./locals";
import { ProjectFormValues } from "@/app/add/page";
import { SortByOption } from "@/features/filters/components/sort-by";

export async function createProject(project: ProjectFormValues, token: string) {
    const formData = new FormData();
    
    formData.append("title", project.title);
    formData.append("description", project.description);
    if (project.github_link) {
        formData.append("github_link", project.github_link);
    }
    if (project.live_site_link) {
        formData.append("live_site_link", project.live_site_link);
    }
    if (project.image) {
        formData.append("image", project.image);
    }
    if (project.collaborators) {
        formData.append("collaborators", JSON.stringify(project.collaborators));
    }
    if (project.tags) {
        formData.append("tags", JSON.stringify(project.tags));
    }

    console.log(formData);

    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}

interface GetProjectsParams {
    limit: number;
    page: number;
    sort_by: SortByOption;
    tags?: string[];
    username?: string;
    search?: string;
}

export async function getProjects({limit, page, sort_by, tags, username, search}: GetProjectsParams): Promise<PaginatedProjects> {
    // Add short delay to simulate loading if needed
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const url = new URL(`${API_BASE_URL}/projects?limit=${limit}&page=${page}&sort_by=${sort_by}`);
    if (tags && tags.length > 0) {
        url.searchParams.set("tags", tags.join(","));
    }
    if (username && username.length > 0) {
        url.searchParams.set("username", username);
    }
    if (search && search.length > 0) {
        url.searchParams.set("project_name", search);
    }
    const response = await fetch(url.toString());
    return response.json() as Promise<PaginatedProjects>;
}

export async function getProject(projectId: string) {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
}

export async function updateProject(projectId: string, data: ProjectFormValues, token: string) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}