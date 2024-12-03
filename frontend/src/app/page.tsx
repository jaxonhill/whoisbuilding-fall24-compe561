import FiltersContainer from "@/features/filters/components/filters-container";
import SortBy from "@/features/filters/components/sort-by";
import ProjectCard from "@/features/project-card/components/project-card";
import { Project } from "@/features/project-card/types/project-types";

const project: Project = {
	title: "whoisbuilding.io",
	is_editable: true,
	is_liked: true,
	num_of_likes: 5,
	description:
		"WhoIsBuilding is an interactive web platform tailored for computer science students to showcase, explore, and collaborate on projects. The goal of this platform is to create a community-driven space where students can easily upload their academic or personal projects, browse those of others, and find other students to collaborate with.",
	live_site_link: "#",
	github_link: "#",
	contributors: [
		{
			github_username: "jaxonhill",
			avatar_img_url: "https://avatars.githubusercontent.com/u/103388144?v=4",
			whois_username: "jaxon",
		},
		{
			github_username: "Jessica-Chammas",
			avatar_img_url: "https://avatars.githubusercontent.com/u/115599417?v=4",
			whois_username: "jessica",
		},
		{
			github_username: "mhayescs19",
			avatar_img_url: "https://avatars.githubusercontent.com/u/54915859?v=4",
			whois_username: null,
		},
	],
	tags: ["Website", "React", "Next.js", "TypeScript", "FastAPI", "Python"],
};

export default function HomePage() {
	return (
		<div className="grid mt-16 grid-cols-12 gap-8">
			<FiltersContainer />
			<div className="col-span-8 flex flex-col gap-8 overflow-auto">
				<SortBy />
				<ProjectCard project={project} />
				<ProjectCard project={project} />
			</div>
		</div>
	);
}
