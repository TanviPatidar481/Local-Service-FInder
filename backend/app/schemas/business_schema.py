from pydantic import BaseModel

class BusinessCategory(BaseModel):
    category: str

class BusinessBasicInfo(BaseModel):
    name: str
    description: str

class BusinessLocation(BaseModel):
    address: str
    lat: float
    lng: float