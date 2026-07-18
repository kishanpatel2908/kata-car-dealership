from app.models import User
from sqlalchemy.orm import Session
from app.database import Base, engine
from app.models import User, Vehicle


def test_user_model_creation():
    # Verify the User table schema is recognized
    assert User.__tablename__ == "users"
    assert hasattr(User, "email")
    assert hasattr(User, "hashed_password")
    assert hasattr(User, "name")

def test_user_model_has_is_admin():
    user = User(name="Test", email="test@test.com", hashed_password="pwd")
    assert user.is_admin is False

def test_vehicle_model_schema():
    vehicle = Vehicle(make="Toyota", model="Corolla", category="Sedan", price=25000.0, quantity=5)
    assert vehicle.__tablename__ == "vehicles"
    assert vehicle.make == "Toyota"
    assert vehicle.price == 25000.0
