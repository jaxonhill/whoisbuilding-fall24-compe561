"use client";

import { Project } from "@/types/db-types";
import ProjectHeadingContainer from "./project-heading-container";
import LikesContainer from "./likes-container";
import ContributorsContainer from "./collaborators-container";
import TagsContainer from "./tags-container";
import { useAuth } from "@/features/auth/context/auth-context";
import { useRouter } from "next/navigation";
import { likeProject, unlikeProject } from "@/lib/api/likes";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const router = useRouter();
	const { user } = useAuth();
	const [optimisticLikedBy, setOptimisticLikedBy] = useState(project.liked_by);
	
	const isLiked = user ? optimisticLikedBy.some((liker) => liker.username === user?.username) : false;

	const handleLikeClick = async () => {
		if (!user) {
			router.push("/login");
			return;
		}

		// Optimistically update the UI
		const updatedLikedBy = isLiked
			? optimisticLikedBy.filter(liker => liker.username !== user.username)
			: [...optimisticLikedBy, { username: user.username, profile_image_url: user.profile_image_url }];
		
		setOptimisticLikedBy(updatedLikedBy);

		try {
			if (isLiked) {
				await unlikeProject(project.id, user.id);
			} else {
				await likeProject(project.id, user.id);
			}
			router.refresh();
		} catch (error) {
			// Revert optimistic update on error
			setOptimisticLikedBy(optimisticLikedBy);
			toast({
				title: `Failed to ${isLiked ? "unlike" : "like"} project: ${project.title}`,
				description: "Please try again later",
				variant: "destructive",
			});
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
				<LikesContainer 
					onLikeClick={handleLikeClick} 
					isLiked={isLiked} 
					liked_by={optimisticLikedBy} 
				/>
			</div>
			<p className="text-slate-800 leading-8 pb-2">
				{project.description}
			</p>
			<ContributorsContainer collaborators={project.collaborators} />
			<TagsContainer tags={project.tags} />
		</section>
	);
}