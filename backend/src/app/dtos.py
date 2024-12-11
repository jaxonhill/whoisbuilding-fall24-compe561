from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Optional
from app.schemas import UniqueUserFields
from enum import Enum

## data transfer object wrappers for data not represented in database

class GitHubUsername(BaseModel):
    username: str

class GitHubRepository(BaseModel):
    """Repository object
    """
    name: str
    link: str

class GitHubContributions(BaseModel):
    from_date: datetime
    to_date: datetime
    contributions_total: int
    contributions_by_date: List[Dict[str, object]] = []

class GitHubRespositoryResponse(BaseModel):
    active_repos: Optional[List[GitHubRepository]] = None

class GitHubContributionResponse(GitHubUsername):
    yearly_contributions: Optional[int] = None

class GitHubContributionSummaryResponse(GitHubContributionResponse, GitHubRespositoryResponse):
    summary: Optional[GitHubContributions] = None    

class Tags(BaseModel):
    tags: List[str]

class ValidateUserFieldResponse(BaseModel):
    message: str
    field: UniqueUserFields
    exists: bool

class FilterPageBy(Enum):
    MOST_LIKED = "most_liked"
    NEW = "newest"
    OLD = "oldest"