"use client";

import GitHubChart from "@/features/github/components/github-chart";
import GitHubSkeleton from "@/features/github/components/github-skeleton";
import { fetchGitHubInfo } from "@/lib/api/github";
import { useAuth } from "@/features/auth/context/auth-context";

import { useEffect, useState } from "react";

export default function Dev() {
  const [gitHubStats, setGitHubStats] =
    useState<GitHubContributionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const now = new Date();
    const end_date = now.toLocaleString("en-CA").split(",")[0]; // 2024-12-01, 8:59:33 p.m. -> 2024-12-01
    now.setMonth(now.getMonth() - 1); // set new date to 1 month ago
    const start_date = now.toLocaleString("en-CA").split(",")[0];

    async function updateWithFetch() {
      try {
        const summary = await fetchGitHubInfo(start_date, end_date, token!);
        setGitHubStats(summary);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    updateWithFetch();
  }, []);

  if (loading)
    return (
      <div className="w-25 h-auto">
        <GitHubSkeleton />
      </div>
    );
  if (!gitHubStats) return <div>error</div>;

  return (
    <div className="w-25 h-auto">
      <GitHubChart
        gitHubUsername={gitHubStats.username}
        chartData={gitHubStats.summary!.contributions_by_date}
        to_date={gitHubStats.summary!.to_date}
        from_date={gitHubStats.summary!.from_date}
        total_contributions_in_date_range={
          gitHubStats.summary!.contributions_total
        }
        yearly_contributions={gitHubStats.yearly_contributions!}
        active_repos={gitHubStats.active_repos!}
      ></GitHubChart>
    </div>
  );
}
