import pytest
from app.auth import create_access_token, hash_password
from app.models import User
from app.database import SessionLocal, Base, engine

@pytest.fixture
def db_session():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def admin_token(db_session):
    admin = User(name="Admin", email="admin@test.com", hashed_password=hash_password("admin123"), is_admin=True)
    db_session.add(admin)
    db_session.commit()
    return create_access_token(data={"sub": admin.email})

@pytest.fixture
def user_token(db_session):
    user = User(name="User", email="user@test.com", hashed_password=hash_password("user123"), is_admin=False)
    db_session.add(user)
    db_session.commit()
    return create_access_token(data={"sub": user.email})
