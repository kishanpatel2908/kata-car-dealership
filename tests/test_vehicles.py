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
    response = client.post(
        "/api/vehicles",
        json={"make": "Ford", "model": "Mustang", "category": "Sports", "price": 30000.0, "quantity": 1},
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code == 403 # Should be forbidden
