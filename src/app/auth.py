# app/auth.py
from datetime import datetime, timedelta, timezone
from typing import Annotated
from .models import User, UserInDB, Token, TokenData
from .schemas import UserBase

import jwt
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel

from .config import settings

ACCESS_TOKEN_EXPIRY_MINUTES = 30

router = APIRouter(prefix="/auth")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

pass_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

fake_users_db = {
    "johndoe@example.com": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "github_username": "johndoe",
        "socials": '{"twitter": "johndoe"}',  ## JSON object as a string
        "expertise": "Python,FastAPI",
        "created_at": "2023-01-01T00:00:00Z",
        "hashed_password": "$2b$12$ot9nquc3kC0G/0uvbzpyou2u8PlaZKD1dB4TEvVO6qL96uE74mB7u", ## hashed of "secret"
        "disabled": False,
    },
    "alice@example.com": {
        "id": 2,
        "name": "Alice Wonderson",
        "email": "alice@example.com",
        "github_username": "alice",
        "socials": '{"linkedin": "alice"}',  ## JSON object as a string
        "expertise": "JavaScript,React",
        "created_at": "2023-01-01T00:00:00Z",
        "hashed_password": "$2b$12$gV9aNp4s8HdQL7UH3GjSA.U.C5J7JfCW58FW1UmqDBC8U5mw1YLDa", ## hashed of "secret2"
        "disabled": True, ## only active accounts are permitted for log in, will return 400 inactive user
    },
}

def get_user(db, email: str):
    if email in db:
        user_dict = db[email]
        return UserInDB(**user_dict) ## ** unpacks dictionary

def verify_password(plain_password, hashed_password):
    return pass_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pass_context.hash(password)

def authenticate_user(fake_db, email: str, password: str):
    user = get_user(fake_db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fake_users_db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
): ## depends injects current user
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# hash endpoint to generate test passwords for db data
@router.post("/hash")
def hash_pass(password : str):
    password = get_password_hash(password)
    return {"password": password }


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRY_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

## identigfies the current user
@router.get("/me", response_model=UserBase)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user

@router.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}
