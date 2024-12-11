import { UserDisplay } from "@/types/db-types";

interface CollaboratorProps {
  collaborator: UserDisplay;
}

export default function Collaborator({ collaborator }: CollaboratorProps) {
  return (
    <a
      href={`/profile/${collaborator.username}`}
      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 rounded-full py-1 px-3"
    >
      <img className="w-6 h-6 rounded-full" src={collaborator.profile_image_url} alt={`@${collaborator.username}'s avatar`} />
      <span className="text-sm font-medium text-slate-800">@{collaborator.username}</span>
    </a>
  );
}