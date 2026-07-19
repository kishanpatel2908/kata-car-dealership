from pydantic import BaseModel, EmailStr
from pydantic import BaseModel, ConfigDict,field_validator
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

    @field_validator('make', 'model', 'category')
    @classmethod
    def must_not_be_empty(cls, v: str) -> str:
        if not v or v.strip() == "":
            raise ValueError('Field cannot be empty')
        return v

    @field_validator('price')
    @classmethod
    def price_must_be_positive(cls, v: float) -> float:
        if v <= 0:
            raise ValueError('Price must be greater than zero')
        return v

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
