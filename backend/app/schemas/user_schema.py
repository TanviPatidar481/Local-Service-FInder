from pydantic import BaseModel, EmailStr,  constr
from typing import List, Optional

class UserSignup(BaseModel):
    full_name: str
    email: EmailStr
    password: constr(min_length=6, max_length=72)  # 🔥 enforce limit
    role: str

class VerifyEmail(BaseModel):
    email: EmailStr
    otp: str

class UserProfile(BaseModel):
    name: str
    phone: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOnboarding(BaseModel):
    city: str
    locality: str
    preferences: List[str]
    pincode: Optional[str] = None
    language: Optional[str] = None
    budget: Optional[str] = None

