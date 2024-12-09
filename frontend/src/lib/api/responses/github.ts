// github api response model
interface GitHubContributionsResponse {
  active_repos?: ActiveRepos[];
  username: string;
  yearly_contributions?: number;
  summary?: Summary;
}

interface ActiveRepos {
  name: string;
  link: string;
}

interface Summary {
  from_date: string;
  to_date: string;
  contributions_total: number;
  contributions_by_date: ContributionByDate[];
}

interface ContributionByDate {
  date: Date;
  contributions: number;
}
