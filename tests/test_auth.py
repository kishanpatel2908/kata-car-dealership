from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base, engine

# Setup database for testing
Base.metadata.create_all(bind=engine)

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
