from app.schemas import UserCreate, Token
from pydantic import ValidationError
import pytest

def test_user_create_schema():
    # Valid data
    user = UserCreate(name="Kishan", email="kishan@example.com", password="password123")
    assert user.name == "Kishan"

    # Invalid data (missing email)
    with pytest.raises(ValidationError):
        UserCreate(name="Kishan", password="password123")

def test_token_schema():
    token = Token(access_token="test_token", token_type="bearer")
    assert token.access_token == "test_token"
