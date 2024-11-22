from fastapi import FastAPI
from .routers import users
from .auth import router as auth_router
from app.routers.github import router as github_router
from .database import engine
from .models import Base
import logging

app = FastAPI()

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# add all routers to app
app.include_router(users.router,tags=["Users"])
app.include_router(auth_router, tags=["Auth"])
app.include_router(github_router,prefix="/github", tags=["GitHub"])


logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)
# Define a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to WhoIsBuilding.io API"}
