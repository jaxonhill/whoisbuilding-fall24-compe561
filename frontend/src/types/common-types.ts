export type Option = {
    id: string;
    label: string;
    isSelected: boolean;
}

export type User = {
    name: string;
    email: string;
	github_username: string;
	avatar_img_url: string;
    whois_username: string;
    discord_username: string | null;
    linkedin_url: string | null;
}