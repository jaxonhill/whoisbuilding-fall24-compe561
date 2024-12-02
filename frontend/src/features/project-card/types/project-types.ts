export type Project = {
    title: string;
    is_editable: boolean;
    is_liked: boolean;
    num_of_likes: number;
	description: string;
    live_site_link: string;
	github_link: string;
    contributors: Contributor[];
    tags: string[];
}

export type Contributor = {
	github_username: string;
	avatar_img_url: string;
    whois_username: string | null;      // If the Github links to an account on our site, then get their internal username
}