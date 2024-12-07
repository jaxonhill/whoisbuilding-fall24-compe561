# app/crud.py
from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql.operators import OVERLAP
from sqlalchemy import desc, func
from . import models, schemas
from .auth import get_password_hash
from typing import List

# Create a new user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        username=user.username,
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
        db_user.username = user_update.username
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

## get list of users in search by partial or full username string
def get_users_by_username(db: Session, username_string: str):
    ## build pattern so that query results will return potential users with case insenstive alpha characters in order
    regex_pattern = f"{username_string[0]}" ## first letter must exist in pattern as an anchor
    
    for letter in username_string[1:]: ## list comprehension to go from index 1 to end
        regex_pattern += f".*{letter}?" ## .* zero or many instances of letter ? optionally

    print(regex_pattern)
    ## '~*' is postgres regex operator
    return db.query(models.User).filter(models.User.username.op('~*')(regex_pattern)).all()

def get_all_users(db: Session):
    return db.query(models.User)

# Get a project by ID
def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

# Get all projects for a specific user
def get_projects_by_user(db: Session, user_id: int):
    return db.query(models.Project).filter(models.Project.user_id == user_id).all()


def get_projects_by_page(db: Session, tags: List[str], sort_by: str, limit: int, page: int, user_id: int | None):
    offset = limit * (page-1)
    ## todo build query based on specifications

    if sort_by == "new":
        if user_id:
            ## get n number of items starting at the nth page in based on newest project first, '&&' is postgres overlap so find at least one commonality
            objs = db.query(models.Project).order_by(desc(models.Project.created_at)).filter(models.Project.tags.op('&&')(tags), models.Project.user_id == user_id).limit(limit).offset(offset).all()
            print(objs)
            return objs
        else:
            objs = db.query(models.Project).order_by(desc(models.Project.created_at)).filter(models.Project.tags.op('&&')(tags)).limit(limit).offset(offset).all()
            print(objs)
            return objs
    else:
        objs = db.query(models.Project).order_by(models.Project.title.asc()).limit(limit).offset(offset).all()
        return objs

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
