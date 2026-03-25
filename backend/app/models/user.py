from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    role = Column(String)  # customer / provider

    name = Column(String)
    phone = Column(String)
    location = Column(String)

    # provider fields
    business_name = Column(String, nullable=True)
    category = Column(String, nullable=True)
    description = Column(String, nullable=True)

    is_onboarded = Column(Boolean, default=False)