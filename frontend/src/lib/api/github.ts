import { API_BASE_URL } from "./locals";

const BEARR_TEMP =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3MzMyMjQ4NTR9.gn2YTDEIeU53ZLSESAraU9Br8vZE4d7YDNKbQHipe7o";

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
        Authorization: `Bearer ${BEARR_TEMP}`,
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
