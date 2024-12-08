import { User } from "@/types/db-types";

interface ContributorProps {
  contributor: User;
}

export default function Contributor({ contributor }: ContributorProps) {
  return (
    <a
      href={`/profile/${contributor.username}`}
      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 rounded-full py-1 px-3"
    >
      <img className="w-6 h-6 rounded-full" src={contributor.avatar_url} alt={`@${contributor.username}'s avatar`} />
      <span className="text-sm font-medium text-slate-800">@{contributor.username}</span>
    </a>
  );
}