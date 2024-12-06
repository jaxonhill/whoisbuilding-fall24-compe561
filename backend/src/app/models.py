
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
    github_username = Column(String, unique=True, nullable=False)
    github_avatar_url = Column(String, nullable=False)
    linkedin = Column(String, nullable=True)
    discord = Column(String, nullable=True)
    biography = Column(String(BIO_MAX_CHAR_LENGTH), nullable=False)
    expertise = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False)
    disabled = Column(Boolean, nullable=False)

    projects = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    tags = Column(ARRAY(String), nullable=False)  # postgres array of strings
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="projects")

class Token(BaseModel): ## difference between Base and BaseModel??
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None
