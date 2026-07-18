from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_redirect():
    # follow_redirects=False lets us test the redirect status itself
    response = client.get("/", follow_redirects=False)
    assert response.status_code == 307
    # Assuming your frontend login is at /login
    assert response.headers["location"] == "/login"

def test_user_login():
    # First, register a user to test login
    client.post(
        "/register",
        json={"email": "login_test@example.com", "password": "testpassword"}
    )

    # Test login using OAuth2 form data standard
    response = client.post(
        "/login",
        data={"username": "login_test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
