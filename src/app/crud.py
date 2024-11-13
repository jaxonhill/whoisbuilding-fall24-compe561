# app/crud.py
from datetime import datetime

from sqlalchemy.orm import Session
from . import models, schemas
from .auth import get_password_hash

# Create a new user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.UserInDB(
        name=user.name,
        email=user.email,
        github_username=user.github_username,
        socials=user.socials,
        hashed_password=get_password_hash(user.password),  # Remember to hash passwords (i think ugur wants us to)
        expertise=user.expertise,
        created_at=datetime.now(),
        disabled=False
    )
    print(db_user.hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Create a new project
def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    db_project = models.Project(
        title=project.title,
        description=project.description,
        tags=",".join(project.tags),  # Store tags as a comma-separated string for simplicity
        user_id=user_id
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

# Get a user by ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# Get a project by ID
def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()
