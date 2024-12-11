import { Project } from "@/types/db-types";

import ProjectHeadingContainer from "./project-heading-container";
import LikesContainer from "./likes-container";
import ContributorsContainer from "./collaborators-container";
import TagsContainer from "./tags-container";
import { useAuth } from "@/features/auth/context/auth-context";
import { useRouter } from "next/navigation";
import { likeProject } from "@/lib/api/likes";
import { toast } from "@/hooks/use-toast";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const router = useRouter();
	const { user } = useAuth();
	
	let isLiked: boolean = false;
	if (!user) {
		isLiked = false;
	} else {
		isLiked = project.liked_by.some((liker) => liker.username === user?.username);
	}

	const handleLikeClick = () => {
		if (!user) {
			router.push("/login");
		} else {
			try {
				likeProject(project.id, user.id);
				router.refresh();
			} catch (error) {
				console.error("Failed to like project", error);
				toast({
					title: "Failed to like project",
					description: "Please try again later",
					variant: "destructive",
				});
			}
		}
	}

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
				<LikesContainer onLikeClick={handleLikeClick} isLiked={isLiked} liked_by={project.liked_by} />
			</div>
			<p className="text-slate-800 leading-8 pb-2">
				{project.description}
			</p>
			<ContributorsContainer collaborators={project.collaborators} />
			<TagsContainer tags={project.tags} />
		</section>
	);
}