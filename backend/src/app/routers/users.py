from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .. import crud, schemas
from ..database import get_db
from app.schemas import ProjectPageResponse, User
from app import auth
from app.dtos import Tags
from typing import Annotated

router = APIRouter()

# Endpoint to register a new user
@router.post("/users", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)): ## session requires injection of current db instance
    try:
        new_user = crud.create_user(db=db, user=user)
    except IntegrityError as e: ## returns first violated column for unique constraint errors
        error_detail = str(e.orig)
        field_violation = error_detail[error_detail.index("(") + 1 : error_detail.index(")")]
        raise HTTPException(status_code=400, detail={
            "error": "Data integrity error",
            "message": f"{error_detail}",
            "field": f"{field_violation}"
        })
    
@router.put("/users", response_model=schemas.User)
def update_user(user: schemas.UserCreate, 
                current_user: Annotated[User, Depends(auth.get_current_active_user)], 
                db: Session = Depends(get_db)):
    try:
        update_user = crud.update_user(db=db, user_id=current_user.id, user_update=user)
    except IntegrityError as e: ## returns first violated column for unique constraint errors
        error_detail = str(e.orig)
        field_violation = error_detail[error_detail.index("(") + 1 : error_detail.index(")")]
        raise HTTPException(status_code=400, detail={
            "error": "Data integrity error",
            "message": f"{error_detail}",
            "field": f"{field_violation}"
        })



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

@router.get("/filter")
def get_users_by_username_string_query(search_string: str, db: Session = Depends(get_db)):
    db_users = crud.get_users_by_username(db=db, username_string=search_string)

    ## convert to user schema to keep hashed pass out of repsonse
    response_users = []
    response_users = [schemas.User.model_validate(user) for user in db_users]

    return response_users


# Endpoint to get a project by ID
@router.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db=db, project_id=project_id)

    print(db_project.tags)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.get("/projects", response_model=ProjectPageResponse)
def get_projects_with_filter(tags: str, sort_by: str, limit: int, page: int, user_id: int | None = None, db: Session = Depends(get_db)): ## optional params: https://fastapi.tiangolo.com/tutorial/query-params/#optional-parameters
    tagsAsArray: Tags = tags.split(",")
    db_projects = crud.get_projects_by_page(db=db, tags=tagsAsArray, user_id=user_id, sort_by=sort_by, limit=limit, page=page)
    serialized_projects = [schemas.Project.model_validate(proj) for proj in db_projects]

    return ProjectPageResponse(projects=serialized_projects, limit=limit, page=page)
