import { User, UserDisplay } from "@/types/db-types";
import { API_BASE_URL } from "./locals";

export async function getUserByUsername(username: string) {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  return response.json();
}

export async function searchUsers(searchText: string): Promise<UserDisplay[]> {
  if (!searchText || searchText === "@") return [];

  const response = await fetch(
    `${API_BASE_URL}/users?search_text=${searchText}`
  );
  if (!response.ok) {
    throw new Error("Failed to search users");
  }
  return response.json();
}
