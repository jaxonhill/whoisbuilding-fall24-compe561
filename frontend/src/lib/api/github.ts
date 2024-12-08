import { API_BASE_URL } from "./locals";

export async function fetchGitHubInfo(
  start_date: string,
  end_date: string,
  token: string
): Promise<GitHubContributionsResponse> {
  const queryString = `?start_date=${start_date}&end_date=${end_date}`;
  const response = await fetch(
    `${API_BASE_URL}/github/contributions/summary${queryString}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const result: GitHubContributionsResponse = await response.json();
    return result;
  }

  throw new Error(`Response status: ${response.status}`);
}

export async function getGithubActivityByUsername(username: string, start_date: string, end_date: string, token: string) {
  const queryString = `?start_date=${start_date}&end_date=${end_date}`;
  const response = await fetch(
    `${API_BASE_URL}/github/contributions/summary/${username}${queryString}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const result: GitHubContributionsResponse = await response.json();
    return result;
  }

  throw new Error(`Response status: ${response.status}`);
}
