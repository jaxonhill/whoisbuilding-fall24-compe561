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

export async function getGithubActivityByUsername(username: string, start_date?: string, end_date?: string) {
  if (!start_date || !end_date) {
    const now = new Date();
    end_date = now.toLocaleString("en-CA").split(",")[0];
    now.setMonth(now.getMonth() - 1);
    start_date = now.toLocaleString("en-CA").split(",")[0];
  }

  const queryString = `?start_date=${start_date}&end_date=${end_date}`;
  console.log(queryString);
  const response = await fetch(
    `${API_BASE_URL}/github/contributions/summary/${username}${queryString}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    const result: GitHubContributionsResponse = await response.json();
    return result;
  }

  throw new Error(`Response status: ${response.status}`);
}

export async function checkIfUsernameExistsOnGitHub(
  username: string
): Promise<Boolean> {
  const queryString = `?username=${username}`;
  const response = await fetch(
    `${API_BASE_URL}/github/validate${queryString}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const github_username_valid_on_site = response.status == 200;

  return github_username_valid_on_site;
}
