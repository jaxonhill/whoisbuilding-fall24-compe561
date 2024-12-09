from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum
from fastapi import UploadFile

# Base schema for User
class UserBase(BaseModel):
    email: str
    

# Schema for creating a new user
class UserCreate(UserBase):
    password: str

class UserRegisterResponse(UserBase):
    id: int
    created_at: datetime
    is_onboarding_complete: bool

class UserAuth(BaseModel):
    email: str
    id: int
    created_at: datetime
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None
    github_username: Optional[str] = None
    linkedin: Optional[str] = None
    discord: Optional[str] = None
    biography: Optional[str]
    is_onboarding_complete: bool
    profile_image_url: Optional[str] = None
    expertise: Optional[str] = None
    disabled: bool

## Schema for filling out onboarding
class UserOnboard(BaseModel):
    first_name: str
    last_name: str
    username: str
    github_username: str
    linkedin: Optional[str] = None
    discord: Optional[str] = None
    biography: str
    is_onboarding_complete: bool

    class Config:
        from_attributes = True

# Schema for returning a user
class User(UserBase, UserOnboard):
    id: int
    created_at: datetime
    profile_image_url: str
    expertise: Optional[str] = None
    disabled: bool
    
    class Config:
        from_attributes = True
    
class UniqueUserFields(Enum):
    EMAIL = "email"
    USERNAME = "username"
    GITHUB_USERNAME = "github_username"


# Base schema for Project
class ProjectBase(BaseModel):
    title: str
    description: str
    tags: List[str]
    created_by_user_id: int
    github_link: Optional[str] = None
    live_site_link: Optional[str] = None

    class Config:
        from_attributes = True

# Schema for creating a new project
class ProjectCreate(ProjectBase):
    image_url: str | None = None
    collaborator_user_ids: List[int]

class Collaborator(BaseModel):
    id: int
    user_id: int
    project_id: int

    class Config:
        from_attributes = True

class Like(BaseModel):
    id: int
    user_id: int
    project_id: int

    class Config:
        from_attributes = True

# Schema for returning a project
class Project(ProjectBase):
    id: int
    created_at: datetime
    likes: List[Like]
    collaborators: List[Collaborator]
    image_url: Optional[str] = None
    
    class Config:
        from_attributes = True

class ProjectPageResponse(BaseModel):
    projects: List[Project]
    limit: int
    page: int

    class Config:
        from_attributes = True  # Enables compatibility with SQLAlchemy ORM