from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserLogin, TokenResponse
from app.database import user_collection
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()


# ---------------- SIGNUP ----------------
@router.post("/signup")
def signup(user: UserCreate):

    # check if user exists
    existing_user = user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # hash password
    hashed_password = hash_password(user.password)

    # create user
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    user_collection.insert_one(new_user)

    return {"message": "User registered successfully"}


# ---------------- LOGIN ----------------
@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin):

    db_user = user_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # verify password
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # create JWT token
    access_token = create_access_token(
        data={"sub": db_user["email"]}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }