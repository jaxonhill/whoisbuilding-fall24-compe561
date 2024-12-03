import { create_username_link } from "@/utils/utils";
import { Contributor } from "../types/project-types";

interface ContributorCardProps {
	contributor: Contributor;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
	return (
		<div className="h-full flex items-center gap-2">
			<img className="w-8 h-8 rounded-full" src={contributor.avatar_img_url} alt={`${contributor.github_username}'s avatar`} />
			{contributor.whois_username ?
				<a className="text-blue-600 font-medium" href={create_username_link(contributor.whois_username)}>
					{contributor.github_username}
				</a> :
				<span>
					{contributor.github_username}
				</span>}
		</div>
	);
}