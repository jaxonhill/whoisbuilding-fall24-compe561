import pytest
from fastapi.testclient import TestClient
from main import app
from database import get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the get_db dependency for testing
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_and_teardown():
    # Create tables before the test suite
    Base.metadata.create_all(bind=engine)
    yield
    # Drop tables after the test suite
    Base.metadata.drop_all(bind=engine)

def test_register_user():
    response = client.post(
        "/users",
        json={
            "name": "Test User",
            "email": "testuser@example.com",
            "github_username": "testuser",
            "socials": '{"twitter": "testuser"}',
            "expertise": "Python",
            "password": "securepassword",
            "disabled": False,
            "created_at": "2023-01-01T00:00:00"
        }
    )
    assert response.status_code == 200
    assert response.json()["email"] == "testuser@example.com"

def test_get_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_project():
    user_response = client.post(
        "/users",
        json={
            "name": "Test User",
            "email": "testuser@example.com",
            "github_username": "testuser",
            "socials": '{"twitter": "testuser"}',
            "expertise": "Python",
            "password": "securepassword",
            "disabled": False,
            "created_at": "2023-01-01T00:00:00"
        }
    )
    user_id = user_response.json()["id"]
    response = client.post(
        "/projects",
        json={
            "title": "Test Project",
            "description": "A test project",
            "tags": "Python,FastAPI"
        },
        params={"user_id": user_id}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Project"

def test_auth_token():
    client.post(
        "/users",
        json={
            "name": "Auth User",
            "email": "authuser@example.com",
            "github_username": "authuser",
            "socials": '{"twitter": "authuser"}',
            "expertise": "Python",
            "password": "securepassword",
            "disabled": False,
            "created_at": "2023-01-01T00:00:00"
        }
    )
    response = client.post(
        "/auth/token",
        data={"username": "authuser@example.com", "password": "securepassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_get_current_user():
    auth_response = client.post(
        "/auth/token",
        data={"username": "authuser@example.com", "password": "securepassword"}
    )
    token = auth_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/auth/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "authuser@example.com"
