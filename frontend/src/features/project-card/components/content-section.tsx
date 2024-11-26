import { Globe, Github } from "lucide-react";
import { Project } from "../types/project-types";

interface ContentSectionProps {
	project: Project;
}

export default function ContentSection({ project }: ContentSectionProps) {
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex justify-between">
				<h1 className="text-2xl">{project.title}</h1>
				<div className="flex items-center gap-2">
					<a href={project.liveSiteLink}>
						<Globe className="h-6 w-6 stroke-slate-800" />
					</a>
					<a href={project.githubLink}>
						<Github className="h-6 w-6 stroke-slate-800" />
					</a>
				</div>
			</div>
			<p className="text-slate-700 leading-8">{project.description}</p>
		</div>
	);
}
