from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.core.deps import get_current_user
from pydantic import BaseModel
from typing import Optional
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/posts")
posts_col = db["posts"]


class PostCreate(BaseModel):
    content: str
    image: Optional[str] = None  # base64 or URL


def _serialize(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    if "created_at" in doc:
        doc["created_at"] = doc["created_at"].isoformat()
    return doc


@router.post("")
def create_post(data: PostCreate, current_user=Depends(get_current_user)):
    if not data.content.strip():
        raise HTTPException(status_code=400, detail="Content is required")
    doc = {
        "content":        data.content,
        "image":          data.image,
        "provider_user_id": current_user["user_id"],
        "created_at":     datetime.utcnow(),
    }
    result = posts_col.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc["created_at"] = doc["created_at"].isoformat()
    doc.pop("_id", None)
    return doc


@router.get("/{user_id}")
def get_posts(user_id: str):
    docs = list(posts_col.find({"provider_user_id": user_id}).sort("created_at", -1))
    return [_serialize(d) for d in docs]


@router.delete("/{post_id}")
def delete_post(post_id: str, current_user=Depends(get_current_user)):
    try:
        obj_id = ObjectId(post_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid post ID")
    result = posts_col.delete_one({"_id": obj_id, "provider_user_id": current_user["user_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted"}


@router.put("/{post_id}")
def edit_post(post_id: str, data: PostCreate, current_user=Depends(get_current_user)):
    try:
        obj_id = ObjectId(post_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid post ID")
    result = posts_col.update_one(
        {"_id": obj_id, "provider_user_id": current_user["user_id"]},
        {"$set": {"content": data.content, "image": data.image}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post updated"}
