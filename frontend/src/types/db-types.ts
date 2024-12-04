export type User = {
    id: number;
    email: string;
    // `hashed_password` is also a column, but this should never make it to the frontend
    first_name: string;
    last_name: string;
    username: string;
    bio: string;
    github_username: string;
    github_avatar_url: string;
    discord_username: string | null;
    linkedin_url: string | null;
    created_at: string;
}

export type Project = {
    id: number;
    title: string;
    live_site_link: string;
	github_link: string;
	description: string;
    contributors: User[];
    tags: string[];
    // Nothing for likes right now, can add later if needed
}