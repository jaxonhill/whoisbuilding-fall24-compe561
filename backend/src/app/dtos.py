from pydantic import BaseModel
from datetime import datetime
from typing import List
## data transfer object wrappers for data no represented in database

class GitHubRepository(BaseModel):
    """Repository object
    """
    name: str
    link: str

class GitHubRespositoryResponse(BaseModel):
    active_repos: List[GitHubRepository]

class GitHubUsername(BaseModel):
    username: str

class GitHubContributionResponse(GitHubUsername):
    contributions: int

class GitHubContributionSummaryResponse(GitHubContributionResponse):
    from_date: datetime
    to_date: datetime