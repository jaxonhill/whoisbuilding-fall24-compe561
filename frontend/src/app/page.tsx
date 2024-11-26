import FiltersContainer from "@/features/filters/components/filters-container";
import ProjectCard from "@/features/project-card/components/project-card";
import { Project } from "@/features/project-card/types/project-types";

const project: Project = {
	title: "whoisbuilding.io",
	description:
		"WhoIsBuilding is an interactive web platform tailored for computer science students to showcase, explore, and collaborate on projects. The goal of this platform is to create a community-driven space where students can easily upload their academic or personal projects, browse those of others, and find other students to collaborate with.",
	liveSiteLink: "#",
	githubLink: "#",
};

export default function HomePage() {
	return (
		<div className="grid mt-16 grid-cols-12 gap-8">
			<FiltersContainer />
			<div className="col-span-8 flex flex-col gap-8 overflow-auto">
				<ProjectCard project={project} />
				<ProjectCard project={project} />
			</div>
		</div>
	);
}
