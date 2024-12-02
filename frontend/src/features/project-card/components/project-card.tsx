import { Project } from "../types/project-types";

import ProjectHeadingContainer from "./project-heading-container";
import LikesContainer from "./likes-container";
import ContributorsContainer from "./contributors-container";
import TagsContainer from "./tags-container";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	return (
		<section className="p-8 flex flex-col gap-6 border border-slate-300 rounded-lg">
			<div className="w-full flex flex-col gap-4">
				<ProjectHeadingContainer project={project} />
				<LikesContainer isLiked={project.is_liked} numberOfLikes={project.num_of_likes} />
				<p className="text-slate-700 leading-8">
					{project.description}
				</p>
			</div>
			<ContributorsContainer contributors={project.contributors} />
			<TagsContainer tags={project.tags} />
		</section>
	);
}