from fastapi import APIRouter, HTTPException, status, Depends
from typing import Annotated

from app.dtos import GitHubUsername, GitHubContributionResponse
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
