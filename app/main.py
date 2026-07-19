from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, auth, database
from .database import engine, get_db,SessionLocal
from .auth import get_current_user, get_current_admin
# Create the tables in PostgreSQL
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS","*"],
    allow_headers=["*"],
)

def seed_admin():
    db = SessionLocal()
    admin_user = db.query(models.User).filter(models.User.email == "admin@admin.com").first()
    if not admin_user:
        hashed_pwd = auth.hash_password("admin123")
        new_admin = models.User(
            name="Super Admin",
            email="admin@admin.com",
            hashed_password=hashed_pwd,
            is_admin=True
        )
        db.add(new_admin)
        db.commit()
    db.close()

seed_admin() # Run the seeder



@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password and save to DB
    hashed_pwd = auth.hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/api/auth/login", response_model=schemas.Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = auth.create_access_token(data={"sub": user.email})
    # Now we also return whether this user is an admin
    return {"access_token": access_token, "token_type": "bearer", "is_admin": user.is_admin}

@app.get("/api/vehicles", response_model=List[schemas.VehicleResponse])
def get_vehicles(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Vehicle).all()

@app.get("/api/vehicles/search", response_model=List[schemas.VehicleResponse])
def search_vehicles(
    make: str = None,
    model: str = None,
    category: str = None,
    min_price: float = None,
    max_price: float = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Vehicle)
    if make: query = query.filter(models.Vehicle.make.ilike(f"%{make}%"))
    if model: query = query.filter(models.Vehicle.model.ilike(f"%{model}%"))
    if category: query = query.filter(models.Vehicle.category == category)
    if min_price is not None: query = query.filter(models.Vehicle.price >= min_price)
    if max_price is not None: query = query.filter(models.Vehicle.price <= max_price)
    return query.all()

@app.post("/api/vehicles", response_model=schemas.VehicleResponse)
def create_vehicle(
    vehicle: schemas.VehicleCreate,
    db: Session = Depends(database.get_db),
    # Ensure this parameter is named 'current_user', NOT 'current_admin'
    current_user: models.User = Depends(auth.get_current_user)
):
    vehicle_data = vehicle.model_dump()

    # Now this will correctly reference the 'current_user' parameter
    if not current_user.is_admin:
        vehicle_data["quantity"] = 0

    new_vehicle = models.Vehicle(**vehicle_data)
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle

@app.post("/api/vehicles/{vehicle_id}/purchase")
def purchase_vehicle(
    vehicle_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    if vehicle.quantity <= 0:
        raise HTTPException(status_code=400, detail="Vehicle out of stock")

    vehicle.quantity -= 1
    db.commit()
    return {"message": "Vehicle purchased successfully", "remaining_stock": vehicle.quantity}

@app.get("/api/users/me")
def get_user_profile(current_user: models.User = Depends(auth.get_current_user)):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "is_admin": current_user.is_admin
    }

# --- UPDATE VEHICLE ENDPOINTS ---

@app.put("/api/vehicles/{vehicle_id}", response_model=schemas.VehicleResponse)
def update_vehicle(
    vehicle_id: int,
    vehicle_update: schemas.VehicleUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    # Use model_dump() instead of dict() for Pydantic V2 compatibility
    update_data = vehicle_update.model_dump(exclude_unset=True)

    # If NOT admin, prevent updating the 'quantity' field
    if not current_user.is_admin and "quantity" in update_data:
        raise HTTPException(status_code=403, detail="Only admins can modify stock quantity")

    # Apply updates
    for key, value in update_data.items():
        setattr(vehicle, key, value)

    db.commit()
    db.refresh(vehicle)
    return vehicle

@app.delete("/api/vehicles/{vehicle_id}")
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(auth.get_current_admin)
):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    db.delete(vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}

@app.post("/api/vehicles/{vehicle_id}/restock")
def restock_vehicle(vehicle_id: int, quantity: int, db: Session = Depends(database.get_db), current_admin: models.User = Depends(auth.get_current_admin)):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    vehicle.quantity += quantity
    db.commit()
    return {"message": "Restocked successfully", "new_quantity": vehicle.quantity}

@app.get("/api/vehicles/search", response_model=List[schemas.VehicleResponse])
def search_vehicles(make: str = None, model: str = None, category: str = None, db: Session = Depends(database.get_db)):
    query = db.query(models.Vehicle)
    if make: query = query.filter(models.Vehicle.make.ilike(f"%{make}%"))
    if model: query = query.filter(models.Vehicle.model.ilike(f"%{model}%"))
    if category: query = query.filter(models.Vehicle.category == category)
    return query.all()
