import { Project } from "@/types/db-types";
import { API_BASE_URL } from "./locals";
import { ProjectFormValues } from "@/app/add/page";

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

    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}

type SortByOption = "top_all_time" | "top_monthly" | "top_weekly" | "top_daily" | "newest" | "oldest";

type GetProjectsParams = {
    limit: number;
    page: number;
    sort_by: SortByOption;
    tags?: string[];
    username?: string;
}

export async function getProjects({limit, page, sort_by, tags, username}: GetProjectsParams): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/projects?limit=${limit}&page=${page}&sort_by=${sort_by}&tags=${tags}&username=${username}`);
    return response.json() as Promise<Project[]>;
}