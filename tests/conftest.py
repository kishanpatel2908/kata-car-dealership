# tests/conftest.py
import pytest
from app.database import SessionLocal, Base, engine

@pytest.fixture
def db_session():
    # Setup
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        # Teardown
        session.close()
        Base.metadata.drop_all(bind=engine)
