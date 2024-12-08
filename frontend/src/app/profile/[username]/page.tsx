import ProfileInfoCard from "@/features/profile-info-card/profile-info-card";
import { getUserByUsername } from "@/lib/api/users";
import { getGithubActivityByUsername } from "@/lib/api/github";
import { User } from "@/types/db-types";
import GithubChart from "@/features/github/components/github-chart";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const user: User = await getUserByUsername(username);
  const githubData: GitHubContributionsResponse = await getGithubActivityByUsername(username);
  
  return (
    <div className="grid gap-8 grid-cols-12">
      <aside className="col-span-3 w-full">
        <ProfileInfoCard user={user} />
      </aside>
      <div className="col-span-9">
        <GithubChart 
          gitHubUsername={githubData.username} 
          chartData={githubData.summary!.contributions_by_date}
          from_date={githubData.summary!.from_date}
          to_date={githubData.summary!.to_date}
          total_contributions_in_date_range={githubData.summary!.contributions_total}
          yearly_contributions={githubData.yearly_contributions!}
          active_repos={githubData.active_repos!}
        />
      </div>
    </div>
  )
}