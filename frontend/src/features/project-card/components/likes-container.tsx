import { UserDisplay } from "@/types/db-types";
import { Heart } from "lucide-react";

interface LikesContainerProps {
	liked_by: UserDisplay[];
}

export default function LikesContainer({ liked_by }: LikesContainerProps) {
	const isLiked: boolean = true;
	if (liked_by.length === 0) {
		return null;
	}
	const displayedLikers = liked_by.slice(0, 3); // Limit to 3 likers

	return (
		<div className="flex items-center w-full">
			<button className="group">
				<Heart
					className={`w-8 h-8 ${isLiked 
						? "stroke-red-600 fill-red-600 group-hover:stroke-red-500 group-hover:fill-red-500 transition-colors duration-200" 
						: "stroke-slate-950 fill-white group-hover:stroke-slate-950 group-hover:fill-slate-200 transition-colors duration-200"}
					`}
				/>
			</button>
			{/* Add onClick to open the likedBy popup */}
			<button className="flex items-center gap-1 text-slate-950 group py-1 px-2">
				<span className="font-normal text-xl group-hover:underline">{liked_by.length} like{liked_by.length !== 1 ? "s" : ""}</span>
				<div className="flex pr-4">
					{displayedLikers.map((liker) => {
						return (
							<img
								className="border-2 border-white w-8 h-8 rounded-full mr-[-16px]"
								key={liker.username}
								src={liker.profile_image_url}
								alt={`${liker.username}'s profile picture`} 
							/>
						);
					})}
				</div>
			</button>
		</div>
	);
}