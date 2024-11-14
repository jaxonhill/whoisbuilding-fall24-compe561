
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    github_username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    socials = Column(String, nullable=False) # JSON object
    expertise = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False)
    disabled = Column(Boolean, nullable=False)

    projects = relationship("Project", back_populates="owner")

##class UserInDB(User):
   ## hashed_password = Column(String, nullable=False)

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    tags = Column(String)  # JSON or comma-separated tags
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="projects")

class Token(BaseModel): ## difference between Base and BaseModel??
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None
