"use client";

import { fakeUsers } from "@/utils/utils";
import GitHubChart from "@/features/github/components/github-chart";
import ProfileInfoCard from "@/features/profile-info-card/profile-info-card";

export default function UserPage({ params }: { params: { username: string } }) {
  const is_current_user: boolean = params.username === fakeUsers[0].username;

  return (
    <div className="grid gap-8 grid-cols-12">
      <aside className="col-span-3 w-full">
        <ProfileInfoCard
          user={fakeUsers[0]}
          is_editable={is_current_user}
          onEdit={() => {}}
        />
      </aside>
      <div className="col-span-9">
      </div>
    </div>
  )
}
