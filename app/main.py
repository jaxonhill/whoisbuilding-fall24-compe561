from fastapi import FastAPI
from .routers import users
from .auth import router as auth_router
from .database import engine
from .models import Base

app = FastAPI()

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Include user router
app.include_router(users.router)
## include auth router
app.include_router(auth_router)
# Define a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to WhoIsBuilding.io API"}
