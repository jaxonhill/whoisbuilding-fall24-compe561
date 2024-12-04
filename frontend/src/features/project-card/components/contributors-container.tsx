import { User } from "@/types/db-types";
import ContributorCard from "./contributor-card";

interface ContributorsContainerProps {
	contributors: User[];
}

export default function ContributorsContainer({ contributors }: ContributorsContainerProps) {
	return (
		<div className="flex h-8 gap-5 items-center">
			{contributors.map((contributor) => {
				return <ContributorCard key={contributor.github_username} contributor={contributor} />
			})}
		</div>
	);
}