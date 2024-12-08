import { fakeUsers } from "@/utils/utils";
import GitHubChart from "@/features/github/components/github-chart";
import ProfileInfoCard from "@/features/profile-info-card/profile-info-card";
import { getUserByUsername } from "@/lib/api/users";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  return (
    <div className="grid gap-8 grid-cols-12">
      <aside className="col-span-3 w-full">
        <ProfileInfoCard user={user} />
      </aside>
      <div className="col-span-9">
      </div>
    </div>
  )
}
