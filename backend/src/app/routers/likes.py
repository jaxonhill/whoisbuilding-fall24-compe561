from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .. import crud, schemas, models
from ..database import get_db
from app.schemas import ProjectPageResponse, User
from app import auth
from typing import Annotated
from pydantic import BaseModel

router = APIRouter(prefix="/api")

class LikeCreate(BaseModel):
    project_id: int
    user_id: int

@router.post("/likes")
def like_project(
    like: LikeCreate,
    current_user: Annotated[User, Depends(auth.get_current_active_user)],
    db: Session = Depends(get_db)
):
    # Verify the authenticated user matches the user_id
    if current_user.id != like.user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to like on behalf of another user"
        )

    # Check if like already exists
    existing_like = db.query(models.Likes).filter(
        models.Likes.project_id == like.project_id,
        models.Likes.user_id == like.user_id
    ).first()

    if existing_like:
        raise HTTPException(
            status_code=400,
            detail="User has already liked this project"
        )

    crud.add_like(db, like.project_id, like.user_id)
    return {"message": "Project liked successfully"}