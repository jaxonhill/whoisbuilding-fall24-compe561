import { API_BASE_URL } from "./locals";

export async function likeProject(projectId: number, userId: number) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ project_id: projectId, user_id: userId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to like project");
    }

    return response.json();
}

export async function unlikeProject(projectId: number, userId: number) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ project_id: projectId, user_id: userId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to unlike project");
    }

    return response.json();
}