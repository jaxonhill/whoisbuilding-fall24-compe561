import { Heart } from "lucide-react";

interface LikesContainerProps {
	isLiked: boolean;
	numberOfLikes: number;
}

export default function LikesContainer({ isLiked, numberOfLikes }: LikesContainerProps) {
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