from fastapi import APIRouter, Request, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .. import crud, schemas
from ..database import get_db
from app.schemas import ProjectPageResponse, User
from app import auth
from app.dtos import Tags, ValidateUserFieldResponse, FilterPageBy
from typing import Annotated
from app.config import limiter
import json
from app.services.s3 import upload_image_to_s3

router = APIRouter(prefix="/api")

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
    
    return new_user

@router.post("/users/register", response_model=schemas.UserRegisterResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)): ## session requires injection of current db instance
    try:
        new_user = crud.create_user_registration(db=db, user=user)
    except IntegrityError as e: ## returns first violated column for unique constraint errors
        error_detail = str(e.orig)
        field_violation = error_detail[error_detail.index("(") + 1 : error_detail.index(")")]
        raise HTTPException(status_code=400, detail={
            "error": "Data integrity error",
            "message": f"{error_detail}",
            "field": f"{field_violation}"
        })
    
    return new_user

@router.post("/users/onboard", response_model=schemas.User)
def onboard_user(user_to_onboard: schemas.UserOnboard, current_user: Annotated[User, Depends(auth.get_current_active_user)], db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        onboarded_user = crud.onboard_user(db=db, user=user_to_onboard, user_id=user_id)
    except IntegrityError as e: ## returns first violated column for unique constraint errors
        error_detail = str(e.orig)
        field_violation = error_detail[error_detail.index("(") + 1 : error_detail.index(")")]
        raise HTTPException(status_code=400, detail={
            "error": "Data integrity error",
            "message": f"{error_detail}",
            "field": f"{field_violation}"
        })
    
    return onboarded_user
    
## update a user
@router.put("/users", response_model=schemas.User)
@limiter.limit("10/minute", per_method=True) ## allow only 10 updates to account information per minute
def update_user(request: Request, user: schemas.UserCreate, 
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
    
    return update_user

@router.get("/users/validate")
def validate_user_field(field: schemas.UniqueUserFields, proposed_value: str, db: Session = Depends(get_db)):
    fieldExists: bool = crud.user_field_exists(db=db, field=field, proposed_value=proposed_value)
    if fieldExists:
        return ValidateUserFieldResponse(message=f"{field.value} already exists in the database", field=field.value, exists=fieldExists)
    else:
        return ValidateUserFieldResponse(message=f"{field.value} is unique", field=field.value, exists=fieldExists)
        
@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return crud.get_all_users(db=db)

@router.get("/users/{username}")
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db=db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Endpoint to create a new project
@router.post("/projects", response_model=schemas.Project)
async def create_project(
    current_user: Annotated[User, Depends(auth.get_current_active_user)],
    title: str = Form(...),
    description: str = Form(...),
    github_link: str | None = Form(None),
    live_site_link: str | None = Form(None),
    image: UploadFile | None = File(None),
    collaborators: str | None = Form(None),
    tags: str = Form(...),
    db: Session = Depends(get_db)
):
    try:
        # Convert JSON strings back to lists
        collaborators_list: list[str] = json.loads(collaborators) if collaborators else []
        tags_list: list[str] = json.loads(tags)

        # Process the file and other data
        image_url: str | None = None
        if image and image.file:
            try:
                image_url = upload_image_to_s3(image.file)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")

        print("Making project data")
        project_data = schemas.ProjectCreate(
            title=title,
            description=description,
            tags=tags_list,
            created_by_user_id=current_user.id,
            github_link=github_link,
            live_site_link=live_site_link,
            image_url=image_url,
            collaborator_user_ids=collaborators_list,
        )
        print("About to create project")
        # Error happened here right below
        response = crud.create_project(db=db, project=project_data)
        print("Created project")

        if response is None:
            raise HTTPException(status_code=400, detail="Failed to create project")
        return response
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for collaborators or tags")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/projects", response_model=schemas.Project)
def update_project(project_update: schemas.ProjectBase, 
                project_id: int, 
                db: Session = Depends(get_db)):
    try:
        project_update = crud.update_project(db=db, project_id=project_id, project_update=project_update)
    except IntegrityError as e: ## returns first violated column for unique constraint errors
        error_detail = str(e.orig)
        field_violation = error_detail[error_detail.index("(") + 1 : error_detail.index(")")]
        raise HTTPException(status_code=400, detail={
            "error": "Data integrity error",
            "message": f"{error_detail}",
            "field": f"{field_violation}"
        })
    
    return project_update

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
    return schemas.Project(
        id=db_project.id,
        title=db_project.title,
        description=db_project.description,
        tags=db_project.tags,
        collaborators=[
            schemas.UserDisplay(
                username=collab.user.username,
                profile_image_url=collab.user.profile_image_url
            )
            for collab in db_project.collaborators
        ],
        likes=[
            schemas.UserDisplay(
                username=like.user.username,
                profile_image_url=like.user.profile_image_url
            )
            for like in db_project.liked_by
        ],
        github_link=db_project.github_link,
        live_site_link=db_project.live_site_link,
        image_url=db_project.image_url
    )

@router.get("/projects", response_model=schemas.ProjectPageResponse)
def get_projects_with_filter(sort_by: FilterPageBy, limit: int, page: int, username: str | None = None, tags: str | None = None, db: Session = Depends(get_db)):
    if tags is not None: 
        tagsAsArray: Tags = tags.split(",") 
    else: 
        tagsAsArray = None
    
    db_projects = crud.get_projects_by_page(
        db=db, 
        tags=tagsAsArray, 
        username=username, 
        sort_by=sort_by, 
        limit=limit, 
        page=page
    )
    
    return schemas.ProjectPageResponse(
        projects=db_projects,
        limit=limit,
        page=page
    )
