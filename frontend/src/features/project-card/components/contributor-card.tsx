import { User } from "@/types/db-types";
import { create_profile_page_link } from "@/utils/utils";

interface ContributorCardProps {
	contributor: User;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
	return (
		<a
			href={create_profile_page_link(contributor.username)}
			className="h-full flex items-center gap-2 group rounded-md pr-2"
		>
			<img className="w-8 h-8 rounded-full" src={contributor.github_avatar_url} alt={`${contributor.github_username}'s avatar`} />
			<span className="group-hover:underline">{contributor.username}</span>
		</a>
	);
}