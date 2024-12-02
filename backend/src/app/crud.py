# app/crud.py
from datetime import datetime

from sqlalchemy.orm import Session
from . import models, schemas
from .auth import get_password_hash

# Create a new user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
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

# Get a user by ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# Get a user by email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# Update a user's information
def update_user(db: Session, user_id: int, user_update: schemas.UserBase):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.name = user_update.name
        db_user.email = user_update.email
        db_user.expertise = user_update.expertise
        db.commit()
        db.refresh(db_user)
    return db_user

# Delete a user by ID
def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

# Create a new project
def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    print(project.tags)
    db_project = models.Project(
        title=project.title,
        description=project.description,
        tags=project.tags,
        user_id=user_id
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    ## return schema instead of db model; is that the best practice?
    project_response = schemas.Project(
        id=db_project.id,
        title=project.title,
        description=project.description,
        tags=project.tags,
        user_id=user_id,
        created_at=db_project.created_at
    )

    return project_response

# Get a user by ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_all_users(db: Session):
    return db.query(models.User)

# Get a project by ID
def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

# Get all projects for a specific user
def get_projects_by_user(db: Session, user_id: int):
    return db.query(models.Project).filter(models.Project.user_id == user_id).all()

# Update a project's information
def update_project(db: Session, project_id: int, project_update: schemas.ProjectBase):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db_project.title = project_update.title
        db_project.description = project_update.description
        db_project.tags = ",".join(project_update.tags)
        db.commit()
        db.refresh(db_project)
    return db_project

# Delete a project by ID
def delete_project(db: Session, project_id: int):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project
