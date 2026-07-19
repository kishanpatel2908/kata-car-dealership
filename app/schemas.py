from pydantic import BaseModel, EmailStr
from pydantic import BaseModel, ConfigDict
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    is_admin: bool

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

class VehicleUpdate(BaseModel):
    make: Optional[str] = None
    model: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

VehicleBase.model_rebuild()
VehicleUpdate.model_rebuild()
VehicleResponse.model_rebuild()
