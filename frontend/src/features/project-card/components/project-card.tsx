import { Project } from "../types/project-types";
import { Globe, Github, Heart } from "lucide-react";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	return (
		<section className="p-8 flex flex-col gap-6 border border-slate-300 rounded-lg">
			<div className="w-full flex flex-col gap-4">
				<TopContainer project={project} />
				<LikesContainer isLiked={project.isLiked} numberOfLikes={project.numberOfLikes} />
				<p className="text-slate-700 leading-8">
					{project.description}
				</p>
			</div>
		</section>
	);
}

interface TopContainerProps {
	project: Project;
}

function TopContainer({ project }: TopContainerProps) {
	return (
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
	);
}

interface LikesContainerProps {
	isLiked: boolean;
	numberOfLikes: number;
}

function LikesContainer({ isLiked, numberOfLikes }: LikesContainerProps) {
	return (
		<div className="flex gap-2 items-center pb-2 w-full">
			<button className="group">
				<Heart
					className={`w-8 h-8 ${isLiked 
						? "stroke-red-600 fill-red-600 group-hover:stroke-red-500 group-hover:fill-red-500" 
						: "stroke-slate-950 fill-white group-hover:stroke-slate-950 group-hover:fill-slate-200"}
					`}
				/>
			</button>
			<span className="font-medium text-xl">{numberOfLikes} like{numberOfLikes !== 1 ? "s" : ""}</span>
		</div>
	);
}