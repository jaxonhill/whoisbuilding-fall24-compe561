from pydantic import BaseModel
from datetime import datetime
## data transfer object wrappers for data no represented in database

class GitHubRepository(BaseModel):
    """Repository object
    """
    name: str
    link: str

class GitHubUsername(BaseModel):
    username: str

class GitHubContributionResponse(GitHubUsername):
    contributions: int

class GitHubContributionSummaryResponse(GitHubContributionResponse):
    from_date: datetime
    to_date: datetime