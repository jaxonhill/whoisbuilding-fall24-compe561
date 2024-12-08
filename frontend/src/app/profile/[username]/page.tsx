"use client";

import { fakeUsers } from "@/utils/utils";
import GitHubChart from "@/features/github/components/github-chart";
import GitHubSkeleton from "@/features/github/components/github-skeleton";
import ProfileInfoCard from "@/features/profile-info-card/profile-info-card";
import { useAuth } from "@/features/auth/context/auth-context";
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/utils/api-utils";
import React from "react";
import { fetchGitHubInfo } from "@/lib/api/github";

export default function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const [gitHubStats, setGitHubStats] = useState<GitHubContributionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  // Change to fetch user by username
  const { user, token } = useAuth();

  // const user = fakeUsers[0]; // This should be replaced with actual user fetching logic

  const unwrappedParams = React.use(params);
  const is_current_user: boolean = unwrappedParams.username === user?.username;

  useEffect(() => {
    const now = new Date();
    const end_date = now.toLocaleString("en-CA").split(",")[0];
    now.setMonth(now.getMonth() - 1);
    const start_date = now.toLocaleString("en-CA").split(",")[0];

    async function updateWithFetch() {
      try {
        const summary = await fetchGitHubInfo(start_date, end_date, token!);
        setGitHubStats(summary);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }

    updateWithFetch();
  }, [token]);

  if (loading) {
    return (
      <div className="w-25 h-auto">
        <GitHubSkeleton />
      </div>
    );
  }

  if (!gitHubStats) {
    return <div>error</div>;
  }

  return (
    <div className="grid gap-8 grid-cols-12">
      <aside className="col-span-3 w-full">
        {user && (
          <ProfileInfoCard
            user={user}
          is_editable={is_current_user}
          onEdit={() => {}}
          />
        )}
      </aside>
      <div className="col-span-9">
        <GitHubChart
          gitHubUsername={gitHubStats.username}
          chartData={gitHubStats.summary!.contributions_by_date}
          to_date={gitHubStats.summary!.to_date}
          from_date={gitHubStats.summary!.from_date}
          total_contributions_in_date_range={gitHubStats.summary!.contributions_total}
          yearly_contributions={gitHubStats.yearly_contributions!}
          active_repos={gitHubStats.active_repos!}
        />
      </div>
    </div>
  );
}
