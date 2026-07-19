import pytest
from app.models import User, Vehicle
from app.database import SessionLocal, Base, engine

@pytest.fixture
def db_session():
    # Setup: Create tables and a session
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        # Teardown: Close session and drop tables
        session.close()
        Base.metadata.drop_all(bind=engine)

def test_user_model_has_is_admin(db_session):
    user = User(name="Test", email="test@test.com", hashed_password="pwd")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    assert user.is_admin is False

def test_vehicle_model_schema():
    vehicle = Vehicle(make="Toyota", model="Corolla", category="Sedan", price=25000.0, quantity=5)
    assert vehicle.__tablename__ == "vehicles"
    assert vehicle.make == "Toyota"
    assert vehicle.price == 25000.0
