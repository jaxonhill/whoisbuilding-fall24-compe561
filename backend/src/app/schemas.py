from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Base schema for User
class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    github_username: str
    github_avatar_url: str
    linkedin: Optional[str] = None
    discord: Optional[str] = None
    biography: str
    disabled: bool
    expertise: str
    created_at: datetime
    disabled: bool

# Schema for creating a new user
class UserCreate(UserBase):
    password: str

# Schema for returning a user
class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Base schema for Project
class ProjectBase(BaseModel):
    title: str
    description: str
    tags: List[str]

    class Config:
        from_attributes = True

# Schema for creating a new project
class ProjectCreate(ProjectBase):
    pass


# Schema for returning a project
class Project(ProjectBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectPageResponse(BaseModel):
    projects: List[Project]
    limit: int
    page: int

    class Config:
        from_attributes = True  # Enables compatibility with SQLAlchemy ORM