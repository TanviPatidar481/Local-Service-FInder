from pydantic import BaseModel
from typing import Optional


class BusinessCreate(BaseModel):
    user_id: str
    businessName: Optional[str] = None
    category: Optional[str] = None
    contactPerson: Optional[str] = None
    phoneNumber: Optional[str] = None
    alternatePhone: Optional[str] = None
    serviceMode: Optional[str] = None
    description: Optional[str] = None
    city: Optional[str] = None
    locality: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None
    landmark: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None


class BusinessUpdate(BaseModel):
    businessName: Optional[str] = None
    category: Optional[str] = None
    contactPerson: Optional[str] = None
    phoneNumber: Optional[str] = None
    alternatePhone: Optional[str] = None
    serviceMode: Optional[str] = None
    description: Optional[str] = None
    city: Optional[str] = None
    locality: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None
    landmark: Optional[str] = None
