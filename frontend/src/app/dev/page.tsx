import GitHubChart from "@/components/github-chart";

export default async function Dev() {
  const API_URL_STUB = "http://127.0.0.1:8000";
  // static bearer token, must be replaced with actively issued jwt
  const BEARER_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3MzMxMjc0ODV9.MrUeDGILMmuG0uUwhjqK7I8Rl2sXGQRiFaTZrcVCfew";

  async function fetchGitHubSummary(
    start_date: string,
    end_date: string
  ): Promise<GitHubContributionsResponse> {
    const queryString = `?start_date=${start_date}&end_date=${end_date}`;
    const url = `${API_URL_STUB}/github/contributions/summary${queryString}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const gitHubSummary: GitHubContributionsResponse = await response.json();

      return gitHubSummary;
    } catch (error) {
      throw error; // make caller handle
    }
  }
  const now = new Date();
  const end_date = now.toLocaleString("en-CA").split(",")[0]; // 2024-12-01, 8:59:33 p.m. -> 2024-12-01
  now.setMonth(now.getMonth() - 1); // set new date to 1 month ago
  const start_date = now.toLocaleString("en-CA").split(",")[0];

  const gitHubStats = await fetchGitHubSummary(start_date, end_date);
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
