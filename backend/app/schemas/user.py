from pydantic import BaseModel, EmailStr

# 📥 Signup
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# 📥 Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# 📤 Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"