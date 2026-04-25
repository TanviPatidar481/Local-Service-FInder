from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.core.deps import get_current_user
from app.schemas.provider_schema import (
    ServiceCreate, AvailabilityUpdate, BookingStatusUpdate, ProfileUpdate
)
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime

router = APIRouter(prefix="/provider")

businesses   = db["businesses"]
services_col = db["services"]
bookings_col = db["bookings"]
reviews_col  = db["reviews"]
avail_col    = db["availability"]
convos_col   = db["conversations"]
messages_col = db["messages"]


def _id(doc):
    doc["id"] = str(doc.pop("_id"))
    return doc


def _get_business(user_id: str):
    biz = businesses.find_one({"user_id": user_id})
    if not biz:
        raise HTTPException(status_code=404, detail="Business profile not found")
    return biz


# ── Profile ──────────────────────────────────────────────────────────────────

@router.get("/me")
def get_profile(current_user=Depends(get_current_user)):
    biz = _get_business(current_user["user_id"])
    return _id(biz)


@router.put("/profile")
def update_profile(data: ProfileUpdate, current_user=Depends(get_current_user)):
    updates = {k: v for k, v in data.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    businesses.update_one({"user_id": current_user["user_id"]}, {"$set": updates})
    return {"message": "Profile updated"}


# ── Stats ─────────────────────────────────────────────────────────────────────

@router.get("/stats")
def get_stats(current_user=Depends(get_current_user)):
    uid = current_user["user_id"]
    total     = bookings_col.count_documents({"provider_user_id": uid})
    pending   = bookings_col.count_documents({"provider_user_id": uid, "status": "pending"})
    completed = bookings_col.count_documents({"provider_user_id": uid, "status": "completed"})

    reviews   = list(reviews_col.find({"provider_user_id": uid}))
    avg_rating = (
        round(sum(r["rating"] for r in reviews) / len(reviews), 1)
        if reviews else None
    )

    return {
        "totalBookings": total,
        "pending":       pending,
        "completed":     completed,
        "avgRating":     avg_rating,
    }


# ── Services ──────────────────────────────────────────────────────────────────

@router.get("/services")
def get_services(current_user=Depends(get_current_user)):
    docs = list(services_col.find({"provider_user_id": current_user["user_id"]}))
    return [_id(d) for d in docs]


@router.post("/services")
def add_service(data: ServiceCreate, current_user=Depends(get_current_user)):
    doc = {**data.dict(), "provider_user_id": current_user["user_id"], "created_at": datetime.utcnow()}
    result = services_col.insert_one(doc)
    return {"message": "Service added", "service_id": str(result.inserted_id)}


@router.delete("/services/{service_id}")
def delete_service(service_id: str, current_user=Depends(get_current_user)):
    try:
        obj_id = ObjectId(service_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service ID")
    result = services_col.delete_one({"_id": obj_id, "provider_user_id": current_user["user_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted"}


# ── Bookings ──────────────────────────────────────────────────────────────────

@router.get("/bookings")
def get_bookings(status: str = None, current_user=Depends(get_current_user)):
    query = {"provider_user_id": current_user["user_id"]}
    if status:
        query["status"] = status
    docs = list(bookings_col.find(query).sort("created_at", -1))
    return [_id(d) for d in docs]


@router.put("/bookings/{booking_id}/status")
def update_booking_status(booking_id: str, data: BookingStatusUpdate, current_user=Depends(get_current_user)):
    try:
        obj_id = ObjectId(booking_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid booking ID")
    result = bookings_col.update_one(
        {"_id": obj_id, "provider_user_id": current_user["user_id"]},
        {"$set": {"status": data.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking status updated"}


# ── Reviews ───────────────────────────────────────────────────────────────────

@router.get("/reviews")
def get_reviews(current_user=Depends(get_current_user)):
    docs = list(reviews_col.find({"provider_user_id": current_user["user_id"]}).sort("created_at", -1))
    return [_id(d) for d in docs]


# ── Availability ──────────────────────────────────────────────────────────────

@router.get("/availability")
def get_availability(current_user=Depends(get_current_user)):
    doc = avail_col.find_one({"provider_user_id": current_user["user_id"]})
    if not doc:
        return {"slots": {}}
    return {"slots": doc.get("slots", {})}


@router.put("/availability")
def update_availability(data: AvailabilityUpdate, current_user=Depends(get_current_user)):
    avail_col.update_one(
        {"provider_user_id": current_user["user_id"]},
        {"$set": {"slots": data.slots, "updated_at": datetime.utcnow()}},
        upsert=True
    )
    return {"message": "Availability updated"}


# ── Messages ──────────────────────────────────────────────────────────────────

@router.get("/conversations")
def get_conversations(current_user=Depends(get_current_user)):
    docs = list(convos_col.find({"provider_user_id": current_user["user_id"]}).sort("updated_at", -1))
    return [_id(d) for d in docs]


@router.get("/conversations/{convo_id}")
def get_messages(convo_id: str, current_user=Depends(get_current_user)):
    try:
        obj_id = ObjectId(convo_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid conversation ID")
    convo = convos_col.find_one({"_id": obj_id, "provider_user_id": current_user["user_id"]})
    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")
    msgs = list(messages_col.find({"conversation_id": convo_id}).sort("created_at", 1))
    return [_id(m) for m in msgs]
