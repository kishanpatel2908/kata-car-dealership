import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models import User, Base
from app.database import engine, SessionLocal

@pytest.fixture(autouse=True)
def clean_db():
    # Drop and recreate tables before each test to ensure a clean state
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

client = TestClient(app)

def test_register_and_login():
    # 1. Register
    reg_response = client.post("/api/auth/register", json={
        "name": "Kishan",
        "email": "test@example.com",
        "password": "password123"
    })
    assert reg_response.status_code == 201

    # 2. Login
    login_response = client.post("/api/auth/login", data={
        "username": "test@example.com",
        "password": "password123"
    })
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()
