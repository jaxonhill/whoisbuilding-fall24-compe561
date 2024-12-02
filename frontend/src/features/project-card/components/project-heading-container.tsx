import { Globe, Github } from "lucide-react";
import { Project } from "../types/project-types";
import EditButton from "./edit-button";

interface ProjectHeadingContainerProps {
	project: Project;
}

export default function ProjectHeadingContainer({ project }: ProjectHeadingContainerProps) {
	return (
		<div className="w-full flex justify-between">
			<div className="flex items-center gap-2 w-full">
				<h1 className="text-2xl">{project.title}</h1>
				{project.is_editable && <EditButton />}
			</div>
			<div className="flex items-center gap-2 flex-shrink-0">
				<a href={project.live_site_link}>
					<Globe className="h-6 w-6 stroke-slate-800" />
				</a>
				<a href={project.github_link}>
					<Github className="h-6 w-6 stroke-slate-800" />
				</a>
			</div>
		</div>
	);
}
