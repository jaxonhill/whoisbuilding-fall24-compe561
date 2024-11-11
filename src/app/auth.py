# app/auth.py
from typing import Annotated

from fastapi import Depends, FastAPI, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .schemas import User

router = APIRouter(prefix="/auth")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

fake_users_db = {
    "johndoe@example.com": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "github_username": "johndoe",
        "socials": '{"twitter": "johndoe"}',  # JSON object as a string
        "expertise": "Python,FastAPI",
        "created_at": "2023-01-01T00:00:00Z",  # ISO format date
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice@example.com": {
        "id": 2,
        "name": "Alice Wonderson",
        "email": "alice@example.com",
        "github_username": "alice",
        "socials": '{"linkedin": "alice"}',  # JSON object as a string
        "expertise": "JavaScript,React",
        "created_at": "2023-01-01T00:00:00Z",  # ISO format date
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

def fake_hash_password(password: str):
    return "fakehashed" + password

class UserInDB(User):
    hashed_password: str


def get_user(db, email: str):
    if email in db:
        user_dict = db[email]
        return UserInDB(**user_dict)


def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = get_user(fake_users_db, token)
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    return {"access_token": user.email, "token_type": "bearer"}


@router.get("/users/me")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user

@router.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}

"""from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)"""
