from app.schemas import UserCreate, Token
from pydantic import ValidationError
import pytest
from app.schemas import VehicleResponse
from app.models import Vehicle as VehicleModel

def test_user_create_schema():
    # Valid data
    user = UserCreate(name="Kishan", email="kishan@example.com", password="password123")
    assert user.name == "Kishan"

    # Invalid data (missing email)
    with pytest.raises(ValidationError):
        UserCreate(name="Kishan", password="password123")

def test_token_schema():
    token = Token(access_token="test_token", token_type="bearer",is_admin=False)
    assert token.access_token == "test_token"

def test_vehicle_schema_orm_conversion():
    # Simulate a SQLAlchemy model instance
    vehicle_model = VehicleModel(id=1, make="Tesla", model="Model 3", category="EV", price=40000.0, quantity=10)

    # Convert to Pydantic schema
    vehicle_schema = VehicleResponse.model_validate(vehicle_model)

    assert vehicle_schema.id == 1
    assert vehicle_schema.make == "Tesla"
    assert vehicle_schema.price == 40000.0
