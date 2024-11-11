# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    github_username = Column(String, unique=True, nullable=False)
    ## password not present in User base, only UserInDB for security
    socials = Column(String, nullable=False) # JSON object
    expertise = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    disabled = Column(Boolean, nullable=False)

    projects = relationship("Project", back_populates="owner")


# app/models.py
class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    tags = Column(String)  # JSON or comma-separated tags
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="projects")
