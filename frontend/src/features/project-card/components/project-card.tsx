import { Project } from "@/types/db-types";

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
			{project.image_url && (
				<img
					className="w-full aspect-video rounded-lg"
					src={project.image_url}
					alt={project.title}
				/>
      		)}
			<div className="w-full flex flex-col gap-2">
				<ProjectHeadingContainer project={project} />
				<LikesContainer liked_by={project.liked_by} />
			</div>
			<p className="text-slate-800 leading-8 pb-2">
					{project.description}
			</p>
			<ContributorsContainer contributors={project.contributors} />
			<TagsContainer tags={project.tags} />
		</section>
	);
}