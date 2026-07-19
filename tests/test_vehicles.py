import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_vehicle_as_admin(admin_token):
    response = client.post(
        "/api/vehicles",
        json={"make": "Tesla", "model": "Model S", "category": "EV", "price": 80000.0, "quantity": 1},
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert response.status_code == 200
    assert response.json()["make"] == "Tesla"

def test_create_vehicle_as_non_admin(user_token):
    # If your test file doesn't already import client globally, you can import it here:
    from fastapi.testclient import TestClient
    from app.main import app
    client = TestClient(app)

    response = client.post(
        "/api/vehicles",
        json={"make": "Ford", "model": "Mustang", "category": "Sports", "price": 30000.0, "quantity": 1},
        headers={"Authorization": f"Bearer {user_token}"}
    )

    # 1. Expect a 200 OK success instead of a 403 Forbidden
    assert response.status_code == 200

    # 2. Verify that the backend forced the quantity to 0 for the non-admin user
    data = response.json()
    assert data["make"] == "Ford"
    assert data["quantity"] == 0
