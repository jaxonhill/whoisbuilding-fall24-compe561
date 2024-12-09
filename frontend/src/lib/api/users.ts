import { User } from "@/types/db-types";
import { API_BASE_URL } from "./locals";

export async function getUserByUsername(username: string) {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    return response.json();
}