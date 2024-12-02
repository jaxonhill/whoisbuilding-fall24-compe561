import { User } from "@/types/common-types";

export const CURRENT_TEST_USER: User = {
    name: "Jaxon",
    email: "jaxoncharleshill@gmail.com",
    github_username: "jaxonhill",
    avatar_img_url: "https://avatars.githubusercontent.com/u/103388144?v=4",
    whois_username: "jaxon",
    discord_username: "jaxon10x",
    linkedin_url: "https://www.linkedin.com/in/jaxon-c-hill/",
}

export function create_username_link(whois_username: string): string {
    return `/user/${whois_username}`;
}