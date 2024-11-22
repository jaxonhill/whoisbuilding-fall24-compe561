from fastapi import APIRouter, HTTPException, status, Depends
from typing import Annotated
from datetime import datetime

from app.dtos import GitHubUsername, GitHubContributionResponse, GitHubContributionSummaryResponse
from app.services import github as github_service
from app.exceptions import GitHubUsernameException
from app import auth
from app.schemas import User



router = APIRouter()

@router.get("/contributions/past-year", response_model=GitHubContributionResponse)
async def contributions_in_past_year(
    current_user: Annotated[User, Depends(auth.get_current_active_user)],
):
    github_username = current_user.github_username

    try:
        github_service.isValidGitHubUsername(github_username) ## validate that the username exists
    except GitHubUsernameException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message) 
    
    contributions: int = github_service.getContributionsInLastYear(github_username)

    return GitHubContributionResponse(username=github_username,contributions=contributions)

@router.get("/contributions", response_model=GitHubContributionSummaryResponse)
def contribution_activity_in_date_range(start_date: datetime, end_date: datetime,
        current_user: Annotated[User, Depends(auth.get_current_active_user)],
):
    """obtain the contributions in a given date range from the user's github profile

    Args:
        start (datetime): beginning of date range
        end (datetime): end of date range

    Returns:
        GitHubContributionSummaryResponse: github username, contribution count, and date range
    """
    github_username = current_user.github_username

    try:
        github_service.isValidGitHubUsername(github_username) ## validate that the username exists
    except GitHubUsernameException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message)
    
    contributions: int = github_service.getRecentContributionHistory(github_username,start_date,end_date)

    return GitHubContributionSummaryResponse(username=github_username,contributions=contributions,from_date=start_date,to_date=end_date)
