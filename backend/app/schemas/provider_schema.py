from pydantic import BaseModel
from typing import Optional, List


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: str
    duration: Optional[str] = None


class AvailabilityUpdate(BaseModel):
    slots: dict  # e.g. { "Monday": ["9:00", "10:00"], ... }


class BookingStatusUpdate(BaseModel):
    status: str  # pending | confirmed | completed | cancelled


class ProfileUpdate(BaseModel):
    businessName: Optional[str] = None
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
    category: Optional[str] = None
