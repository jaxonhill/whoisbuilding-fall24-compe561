from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
from pydantic import BaseModel

BIO_MAX_CHAR_LENGTH = 140

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    github_username = Column(String, unique=False, nullable=False)
    profile_image_url = Column(String, nullable=False)
    linkedin = Column(String, nullable=True)
    discord = Column(String, nullable=True)
    biography = Column(String(BIO_MAX_CHAR_LENGTH), nullable=False)
    created_at = Column(DateTime, nullable=False)

    projects = relationship("Project", back_populates="owner")
    projects_collaborated_on = relationship("Collaborators", back_populates="user")
    liked_projects = relationship("Likes", back_populates="user")

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    github_link = Column(String, nullable=True)
    live_site_link = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    tags = Column(ARRAY(String), nullable=False)  # postgres array of strings
    created_by_user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="projects")
    collaborators = relationship("Collaborators", back_populates="project")
    liked_by = relationship("Likes", back_populates="project")

class Collaborators(Base):
    __tablename__ = 'collaborators'

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)

    project = relationship("Project", back_populates="collaborators")
    user = relationship("User", back_populates="projects_collaborated_on")

class Likes(Base):
    __tablename__ = 'likes'

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)

    project = relationship("Project", back_populates="liked_by")
    user = relationship("User", back_populates="liked_projects")

class Token(BaseModel): ## difference between Base and BaseModel??
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None
