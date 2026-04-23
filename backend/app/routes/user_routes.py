from fastapi import APIRouter, HTTPException, Depends
from app.database import users_collection
from app.schemas.user_schema import UserProfile
from app.core.deps import get_current_user

router = APIRouter(prefix="/user")

@router.post("/profile")
def create_profile(
    data: UserProfile,
    current_user = Depends(get_current_user)
):
    email = current_user["email"]   # 🔥 from JWT

    result = users_collection.update_one(
        {"email": email},
        {"$set": {"profile": data.dict()}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Profile updated"}