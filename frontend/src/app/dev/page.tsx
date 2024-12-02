import GitHubChart from "@/components/github-chart";

export default async function Dev() {
  const API_URL_STUB = "http://127.0.0.1:8000";
  const BEARER_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3MzMxMDk0MDd9.xDiQ3hIfaWDH0zjHtPx34mmQz0eiIwIVRooVF9pdnXM";

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

  const gitHubStats = await fetchGitHubSummary("2024-11-20", "2024-12-01");
  return (
    <>
      <GitHubChart
        gitHubUsername="mhayescs19"
        chartData={gitHubStats.summary!.contributions_by_date}
      ></GitHubChart>
    </>
  );
}
