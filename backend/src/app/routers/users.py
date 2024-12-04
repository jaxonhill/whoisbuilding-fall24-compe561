from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from app.schemas import ProjectPageResponse
from app.dtos import Tags

router = APIRouter()

# Endpoint to register a new user
@router.post("/users", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)): ## session requires injection of current db instance
    return crud.create_user(db=db, user=user)

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return crud.get_all_users(db=db)

# Endpoint to create a new project
@router.post("/projects", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_project(db=db, project=project, user_id=user_id)

# Endpoint to get a user by ID
@router.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Endpoint to get a project by ID
@router.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db=db, project_id=project_id)

    print(db_project.tags)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.get("/projects", response_model=ProjectPageResponse)
def get_projects_with_filter(tags: str, sort_by: str, limit: int, page: int, db: Session = Depends(get_db)):
    tagsAsArray: Tags = tags.split(",")
    db_projects = crud.get_projects_by_page(db=db, tags=tagsAsArray, sort_by=sort_by, limit=limit, page=page)
    serialized_projects = [schemas.Project.model_validate(proj) for proj in db_projects]

    return ProjectPageResponse(projects=serialized_projects, limit=limit, page=page)
