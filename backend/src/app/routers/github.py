from fastapi import APIRouter, Request, HTTPException, status, Depends
from typing import Annotated, List
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import get_db
import app.crud as crud

from app.dtos import GitHubUsername, GitHubRepository, GitHubContributionResponse, GitHubContributionSummaryResponse, GitHubRespositoryResponse, GitHubContributions
from app.services import github as github_service
from app.exceptions import GitHubUsernameException
from app import auth
from app.schemas import User
from app.config import limiter

router = APIRouter(prefix="/api")

@router.get("/contributions/summary/{username}", response_model=GitHubContributionSummaryResponse)
async def contributions_summary_by_username(username: str, start_date: datetime, end_date: datetime, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db=db, username=username)

    try:
        github_service.isValidGitHubUsername(username)
    except GitHubUsernameException as e:
        raise HTTPException(status_code=404, detail=e.message)

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    yearly_contributions: int = github_service.getContributionsInLastYear(username)
    contribution_range_summary = github_service.getRecentContributionHistory(username=username,from_date=start_date, to_date=end_date)
    recent_repositories = github_service.getMostRecentRepositories(username=username)

    return GitHubContributionSummaryResponse(username=username,yearly_contributions=yearly_contributions,summary=contribution_range_summary, active_repos=recent_repositories)

@router.get("/contributions/summary", response_model=GitHubContributionSummaryResponse)
@limiter.limit("5/second", per_method=True) ## limit excessive page loads
async def contributions_summary(request: Request, start_date: datetime, end_date: datetime,
    current_user: Annotated[User, Depends(auth.get_current_active_user)],
):
    github_username = current_user.github_username

    try:
        github_service.isValidGitHubUsername(github_username) ## validate that the username exists
    except GitHubUsernameException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message) 
    
    yearly_contributions: int = github_service.getContributionsInLastYear(github_username)
    contribution_range_summary = github_service.getRecentContributionHistory(github_username=github_username,from_date=start_date, to_date=end_date)
    recent_repositories = github_service.getMostRecentRepositories(github_username=github_username)

    return GitHubContributionSummaryResponse(username=github_username,yearly_contributions=yearly_contributions,summary=contribution_range_summary, active_repos=recent_repositories)


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

    return GitHubContributionResponse(username=github_username,yearly_contributions=contributions)

@router.get("/contributions", response_model=GitHubContributions)
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
    
    contributions = github_service.getRecentContributionHistory(github_username,start_date,end_date)

    return contributions

@router.get("/repositories", response_model=GitHubRespositoryResponse)
def recent_active_repositories(current_user: Annotated[User, Depends(auth.get_current_active_user)]):
    github_username = current_user.github_username

    try:
        github_service.isValidGitHubUsername(github_username) ## validate that the username exists
    except GitHubUsernameException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message)
    
    repos = github_service.getMostRecentRepositories(github_username)

    active_repos = GitHubRespositoryResponse(active_repos=repos)

    return active_repos
