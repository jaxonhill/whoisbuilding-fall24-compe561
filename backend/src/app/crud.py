# app/crud.py
from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql.operators import OVERLAP
from sqlalchemy import desc, func, and_
from . import models, schemas
from .auth import get_password_hash
from typing import List
from app.services import github
from app.services.s3 import upload_image_to_s3

# Create a new user
def create_user(db: Session, user: schemas.UserCreate):
    print("Creating user")
    db_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        username=user.username,
        hashed_password=get_password_hash(user.password),
        github_username=user.github_username,
        profile_image_url=github.get_avatar_image_url(user.github_username),
        linkedin=user.linkedin,
        discord=user.discord,
        biography=user.biography,
        created_at=datetime.now(),
    )
    print("User created")
    db.add(db_user)
    print("User added")
    db.commit()
    print("User committed")
    db.refresh(db_user)
    print("User refreshed")
    return db_user

# Get a user by ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# Get a user by username
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# Get a user by email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# Update a user's information
def update_user(db: Session, user_id: int, user_update: schemas.UserBase):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.first_name = user_update.first_name
        db_user.last_name = user_update.last_name
        db_user.username = user_update.username
        db_user.email = user_update.email
        db_user.github_username = user_update.github_username
        db_user.profile_image_url = user_update.profile_image_url
        db_user.linkedin = user_update.linkedin
        db_user.discord = user_update.discord
        db_user.biography = user_update.biography
        db_user.hashed_password = get_password_hash(user_update.password)  # Remember to hash passwords (i think ugur wants us to)
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
def create_project(db: Session, project: schemas.ProjectCreate) -> schemas.Project | None:
    # Create the project
    db_project = models.Project(
        title=project.title,
        description=project.description,
        github_link=project.github_link,
        live_site_link=project.live_site_link,
        image_url=project.image_url,
        tags=project.tags,
        created_by_user_id=project.created_by_user_id,
    )
    db.add(db_project)
    db.commit()

    collaborators = []
    liked_by = []

    for collaborator_user_id in project.collaborator_user_ids:
        # For each collaborator, add them to the project
        db_collaborator = models.Collaborators(project_id=db_project.id, user_id=collaborator_user_id)
        db.add(db_collaborator)
        db.commit()
        collaborators.append(db_collaborator)

        # Add collaborator as likers of the project
        db_like = models.Likes(project_id=db_project.id, user_id=collaborator_user_id)
        db.add(db_like)
        db.commit()
        liked_by.append(db_like)
    
    # Add the like for the user adding the project
    db_like = models.Likes(project_id=db_project.id, user_id=db_project.created_by_user_id)
    db.add(db_like)
    liked_by.append(db_like)

    # Commit the changes to the database
    db.commit()
    db.refresh(db_project)

    return schemas.Project(
        id=db_project.id,
        title=db_project.title,
        description=db_project.description,
        tags=db_project.tags,
        created_by_user_id=db_project.created_by_user_id,
        created_at=db_project.created_at,
        collaborators=collaborators,
        likes=liked_by,
        github_link=db_project.github_link,
        live_site_link=db_project.live_site_link,
        image_url=db_project.image_url
    )

def update_project(db: Session, project_update: schemas.ProjectBase, project_id: int):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()

    if db_project:
        db_project.title = project_update.title
        db_project.description = project_update.description
        db_project.tags = project_update.tags
    
    db.commit()
    db.refresh(db_project)

    ## return schema instead of db model; is that the best practice?
    project_response = schemas.Project(
        id=db_project.id,
        title=db_project.title,
        description=db_project.description,
        tags=db_project.tags,
        user_id=db_project.user_id,
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


def get_projects_by_page(db: Session, tags: List[str], sort_by: str, limit: int, page: int, username: str | None):
    offset = limit * (page-1)
    
    # Get user_id from username
    user = get_user_by_username(db, username)
    if not user:
        return []  # or handle the case where the user is not found

    # Get project_ids where the user is a collaborator
    project_ids = db.query(models.Collaborators.project_id).filter(models.Collaborators.user_id == user.id).subquery()

    # Build the query based on specifications
    if sort_by == "new":
        objs = db.query(models.Project).order_by(desc(models.Project.created_at)).filter(
            and_(
                models.Project.tags.op('&&')(tags),
                models.Project.id.in_(project_ids)
            )
        ).limit(limit).offset(offset).all()
    else:
        objs = db.query(models.Project).order_by(models.Project.title.asc()).filter(
            models.Project.id.in_(project_ids)
        ).limit(limit).offset(offset).all()

    return objs

# Delete a project by ID
def delete_project(db: Session, project_id: int):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project


# Add a collaborator to a project
def add_collaborator(db: Session, project_id: int, user_id: int):
    db_collaborator = models.Collaborators(project_id=project_id, user_id=user_id)
    db.add(db_collaborator)
    db.commit()
    db.refresh(db_collaborator)
    return db_collaborator

# Remove a collaborator from a project
def remove_collaborator(db: Session, project_id: int, user_id: int):
    db_collaborator = db.query(models.Collaborators).filter(models.Collaborators.project_id == project_id, models.Collaborators.user_id == user_id).first()
    if db_collaborator:
        db.delete(db_collaborator)
        db.commit()
    return db_collaborator

# Add a like to a project
def add_like(db: Session, project_id: int, user_id: int):
    db_like = models.Likes(project_id=project_id, user_id=user_id)
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like

# Remove a like from a project
def remove_like(db: Session, project_id: int, user_id: int):
    db_like = db.query(models.Likes).filter(models.Likes.project_id == project_id, models.Likes.user_id == user_id).first()
    if db_like:
        db.delete(db_like)
        db.commit()
    return db_like