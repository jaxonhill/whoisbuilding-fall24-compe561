import ProfileInfoCard from "@/features/profile-info-card/profile-info-card";
import { getUserByUsername } from "@/lib/api/users";
import { getGithubActivityByUsername } from "@/lib/api/github";
import { User } from "@/types/db-types";
import GithubChart from "@/features/github/components/github-chart";
import ProjectsContainer from "@/features/project-card/components/projects-container";
import { getProjects } from "@/lib/api/projects";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const user: User = await getUserByUsername(username);
  const githubData: GitHubContributionsResponse = await getGithubActivityByUsername(username);
  
  const paginatedProjects = await getProjects({
    limit: 10,
    page: 1,
    sort_by: "newest",
    username: username,
  });
  const projects = paginatedProjects.projects;

  return (
    <div className="grid gap-8 grid-cols-12">
      <aside className="col-span-3 w-full">
        <ProfileInfoCard user={user} />
      </aside>
      <div className="col-span-9">
        <GithubChart
          chartData={githubData.summary!.contributions_by_date}
          from_date={githubData.summary!.from_date}
          to_date={githubData.summary!.to_date}
          total_contributions_in_date_range={githubData.summary!.contributions_total}
          yearly_contributions={githubData.yearly_contributions!}
          active_repos={githubData.active_repos!}
        />
        <div className="pt-8 w-full flex flex-col gap-6">
          <h1 className="text-2xl">Projects</h1>
          {projects.length > 0 ? <ProjectsContainer projects={projects} /> : <div className="text-center text-slate-500">No projects found</div>}
        </div>
      </div>
    </div>
  )
}