import pytest
from app.auth import get_current_user, create_access_token
from app.models import User

@pytest.fixture
def test_user(db_session):
    # Check if user exists first to prevent UniqueViolation
    existing_user = db_session.query(User).filter_by(email="test@example.com").first()
    if existing_user:
        return existing_user

    user = models.User(name="Kishan", email="test@example.com", hashed_password="hashed_pwd")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

def test_get_current_user_valid_token(test_user, db_session):
    token = create_access_token(data={"sub": test_user.email})

    # Simulate the dependency call
    user = get_current_user(token=token, db=db_session)
    assert user.email == test_user.email
    assert user.id == test_user.id
