import FiltersContainer from "@/features/filters/components/filters-container";
import SortBy from "@/features/filters/components/sort-by";
import ProjectCard from "@/features/project-card/components/project-card";
import { Project, User } from "@/types/db-types";

export const TEST_USER_1: User = {
    id: 1,
    email: "jaxoncharleshill@gmail.com",
    first_name: "Jaxon",
    last_name: "Hill",
    username: "jaxon",
    bio: "Hey I'm Jaxon.",
    github_username: "jaxonhill",
    github_avatar_url: "https://avatars.githubusercontent.com/u/103388144?v=4",
    discord_username: "jaxon10x",
    linkedin_url: "https://www.linkedin.com/in/jaxon-c-hill",
    created_at: "2024-12-03T10:00:00Z",
};

const TEST_USER_2: User = {
    id: 2,
    email: "michael@gmail.com",
    first_name: "Michael",
    last_name: "Hayes",
    username: "mhayes",
    bio: "Test",
    github_username: "mhayescs19",
    github_avatar_url: "https://avatars.githubusercontent.com/u/54915859?v=4",
    discord_username: null,
    linkedin_url: "https://www.linkedin.com/in/michael-hayes-cs/",
    created_at: "2024-12-03T11:00:00Z",
};

const TEST_USER_3: User = {
    id: 3,
    email: "jessica@gmail.com",
    first_name: "Jessica",
    last_name: "Chammas",
    username: "jessica",
    bio: "Test",
    github_username: "Jessica-Chammas",
    github_avatar_url: "https://avatars.githubusercontent.com/u/115599417?v=4",
    discord_username: null,
    linkedin_url: null,
    created_at: "2024-12-03T12:00:00Z",
};

const TEST_PROJECT: Project = {
	id: 1,
	title: "whoisbuilding.io",
	description: "WhoIsBuilding is an interactive web platform tailored for computer science students to showcase, explore, and collaborate on projects. The goal of this platform is to create a community-driven space where students can easily upload their academic or personal projects, browse those of others, and find other students to collaborate with.",
	live_site_link: "#",
	github_link: "#",
	contributors: [TEST_USER_1, TEST_USER_2, TEST_USER_3],
	tags: ["Website", "React", "Next.js", "TypeScript", "FastAPI", "Python"],
};

export default function HomePage() {
	return (
		<div className="grid mt-16 grid-cols-12 gap-8">
			<FiltersContainer />
			<div className="col-span-8 flex flex-col gap-8 overflow-auto">
				<SortBy />
				<ProjectCard project={TEST_PROJECT} />
				<ProjectCard project={TEST_PROJECT} />
			</div>
		</div>
	);
}
