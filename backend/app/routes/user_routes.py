from fastapi import APIRouter, HTTPException, Depends
from app.database import users_collection, businesses_collection
from app.schemas.user_schema import UserProfile
from app.core.deps import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/user")


@router.post("/profile")
def create_profile(data: UserProfile, current_user=Depends(get_current_user)):
    email = current_user["email"]

    result = users_collection.update_one(
        {"email": email},
        {"$set": {"profile": data.dict()}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Profile updated"}


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    user_id = current_user.get("user_id")
    doc = users_collection.find_one({"_id": ObjectId(user_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "user_id": str(doc["_id"]),
        "email": doc["email"],
        "full_name": doc.get("full_name", ""),
        "role": doc.get("role", ""),
        "is_verified": doc.get("is_verified", False),
    }


@router.get("/provider/me")
def get_provider_profile(current_user=Depends(get_current_user)):
    """Returns the business profile for the currently logged-in provider."""
    user_id = current_user.get("user_id")

    doc = businesses_collection.find_one({"user_id": user_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Business profile not found")

    doc["id"] = str(doc.pop("_id"))
    return doc
