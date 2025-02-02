from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, github, likes
from .auth import router as auth_router
from .database import engine
from .models import Base
import logging

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add all routers to app
app.include_router(users.router, tags=["Users"])
app.include_router(auth_router, tags=["Auth"])
app.include_router(github.router, prefix="/api/github", tags=["GitHub"])
app.include_router(likes.router, tags=["Likes"])

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

# Define a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to WhoIsBuilding.io API"}
