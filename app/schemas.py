# app/schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Base schema for User
class UserBase(BaseModel):
    name: str
    email: str
    expertise: Optional[str] = None

# Schema for creating a new user
class UserCreate(UserBase):
    password: str

# Schema for returning a user
class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Base schema for Project
class ProjectBase(BaseModel):
    title: str
    description: str
    tags: Optional[List[str]] = []

# Schema for creating a new project
class ProjectCreate(ProjectBase):
    pass

# Schema for returning a project
class Project(ProjectBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True
