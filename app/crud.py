# app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

# Create a new user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password,  # Remember to hash passwords (i think ugur wants us to)
        expertise=user.expertise
    )
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
