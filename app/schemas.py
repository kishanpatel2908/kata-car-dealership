from pydantic import BaseModel, EmailStr
from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class VehicleBase(BaseModel):
    make: str
    model: str
    category: str
    price: float
    quantity: int

class VehicleCreate(VehicleBase):
    pass

class VehicleResponse(VehicleBase):
    id: int

    model_config = ConfigDict(from_attributes=True) # Replaces class Config
