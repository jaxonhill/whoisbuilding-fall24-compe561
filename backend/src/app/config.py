from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict
from slowapi import Limiter
from slowapi.util import get_remote_address

load_dotenv()

limiter = Limiter(
    key_func=get_remote_address,
    strategy="fixed-window",
    storage_uri="memory://",
)

class Settings(BaseSettings):
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache ## cache result in the least recently used cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()