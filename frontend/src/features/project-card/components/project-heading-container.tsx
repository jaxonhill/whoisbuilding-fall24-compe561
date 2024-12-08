import { ArrowUpRight } from "lucide-react";
import Github from "@/components/github-icon";
import { Project } from "@/types/db-types";
import EditButton from "./edit-button";
import { Badge } from "@/components/ui/badge";

interface ProjectHeadingContainerProps {
	project: Project;
}

export default function ProjectHeadingContainer({ project }: ProjectHeadingContainerProps) {
	const is_editable: boolean = false;
	return (
		<div className="w-full flex justify-between h-10 items-center">
			<div className="flex items-center gap-2 w-full">
				<h1 className="text-2xl">{project.title}</h1>
				{is_editable && <EditButton />}
			</div>
			<div className="flex items-center gap-2 flex-shrink-0">
				<a href={project.live_site_link} target="_blank" rel="noopener noreferrer">
					<Badge 
						className="text-sm font-medium flex h-10 pl-3 pr-2 gap-1 items-center group transition-colors duration-200 hover:cursor-pointer hover:bg-slate-200"
						variant={"secondary"}
					>
						Related Link
						<ArrowUpRight className="size-4 stroke-slate-950 transition-colors duration-200" />
					</Badge>
				</a>
				<a href={project.github_link} target="_blank" rel="noopener noreferrer">
					<Badge 
						className="text-sm font-medium flex h-10 px-3 gap-1.5 items-center group transition-colors duration-200 hover:cursor-pointer hover:bg-slate-800"
						variant={"default"}
					>
						Github
						<Github className="size-4 fill-white transition-colors duration-200" />
					</Badge>
				</a>
			</div>
		</div>
	);
}
