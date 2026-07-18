from app.models import User
from sqlalchemy.orm import Session
from app.database import Base, engine

def test_user_model_creation():
    # Verify the User table schema is recognized
    assert User.__tablename__ == "users"
    assert hasattr(User, "email")
    assert hasattr(User, "hashed_password")
    assert hasattr(User, "name")
