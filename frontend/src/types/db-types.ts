export type User = {
    id: number;
    email: string;
    // `hashed_password` is also a column, but this should never make it to the frontend
    first_name: string;
    last_name: string;
    username: string;
    github_username: string;
    discord_username: string | undefined;
    linkedin_url: string | undefined;
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
    // num_of_likes: number;
}