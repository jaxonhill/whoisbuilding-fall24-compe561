import { Project } from "../types/project-types";
import ContentSection from "./content-section";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	return (
		<section className="p-8 flex flex-col gap-6 border border-slate-300 rounded-lg">
			<ContentSection project={project} />
		</section>
	);
}
