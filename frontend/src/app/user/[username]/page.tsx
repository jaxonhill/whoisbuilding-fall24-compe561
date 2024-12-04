"use client";

import { TEST_USER_1 } from "@/app/page";
import ProfileInfoCard from "@/features/profile-info-card/profile-info-card";

export default function UserPage({  }) {
  const is_current_user: boolean = true;

  return (
    <div className="grid gap-8 grid-cols-12">
      <aside className="col-span-3 w-full">
        <ProfileInfoCard
          first_name={TEST_USER_1.first_name}
          last_name={TEST_USER_1.last_name}
          username={TEST_USER_1.username}
          bio={TEST_USER_1.bio}
          github_username={TEST_USER_1.github_username}
          github_avatar_url={TEST_USER_1.github_avatar_url}
          linkedin_url={TEST_USER_1.linkedin_url}
          discord_username={TEST_USER_1.discord_username}
          is_editable={is_current_user}
          onEdit={() => {}}
        />
      </aside>
      <div className="col-span-9"></div>
    </div>
  )
}
