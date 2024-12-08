import { User } from "@/types/db-types";
import Contributor from "./contributor";

interface ContributorsContainerProps {
  contributors?: User[];
}

export default function ContributorsContainer({ contributors }: ContributorsContainerProps) {
  if (!contributors || contributors.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {contributors.map((contributor) => (
        <Contributor key={contributor.id} contributor={contributor} />
      ))}
    </div>
  );
}