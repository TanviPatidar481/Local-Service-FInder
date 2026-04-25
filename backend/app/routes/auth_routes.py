from fastapi import APIRouter, HTTPException
from app.database import users_collection
from app.schemas.user_schema import UserSignup, UserLogin, UserOnboarding
from app.core.security import get_password_hash, verify_password, create_access_token
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/auth")


@router.post("/signup")
def signup(user: UserSignup):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = get_password_hash(user.password)

    result = users_collection.insert_one({
        "full_name": user.full_name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "is_verified": False,
    })

    user_id = str(result.inserted_id)

    token = create_access_token({
        "user_id": user_id,
        "email": user.email,
        "role": user.role,
    })

    return {
        "message": "Signup successful",
        "user_id": user_id,
        "access_token": token,
    }


@router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({
        "user_id": str(db_user["_id"]),
        "email": db_user["email"],
        "role": db_user["role"],
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": str(db_user["_id"]),
        "role": db_user["role"],
    }


@router.put("/onboarding/{user_id}")
def update_user_onboarding(user_id: str, data: UserOnboarding):
    try:
        obj_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    result = users_collection.update_one(
        {"_id": obj_id},
        {"$set": data.dict()}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User onboarding saved"}
