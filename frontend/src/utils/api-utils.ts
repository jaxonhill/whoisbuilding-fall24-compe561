import { User } from "@/types/db-types";

export async function getUserByUsername(username: string): Promise<User | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`);
    const userData = await response.json();
    return userData as User;
}