import { UserDisplay } from "@/types/db-types";
import Collaborator from "./collaborator";

interface CollaboratorsContainerProps {
  collaborators?: UserDisplay[];
}

export default function CollaboratorsContainer({ collaborators }: CollaboratorsContainerProps) {
  if (!collaborators || collaborators.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {collaborators.map((collaborator) => (
        <Collaborator key={collaborator.username} collaborator={collaborator} />
      ))}
    </div>
  );
}