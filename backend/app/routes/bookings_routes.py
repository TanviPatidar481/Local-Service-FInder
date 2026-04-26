from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.core.deps import get_current_user
from pydantic import BaseModel
from typing import Optional
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/bookings")

bookings_col  = db["bookings"]
businesses    = db["businesses"]
services_col  = db["services"]
users_col     = db["users"]


class BookingCreate(BaseModel):
    providerId: str
    serviceId:  str
    date:       str
    time:       str
    message:    Optional[str] = None


class BookingStatus(BaseModel):
    status: str  # accepted | rejected


def _serialize(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    if "created_at" in doc:
        doc["created_at"] = doc["created_at"].isoformat()
    return doc


def _enrich(booking: dict) -> dict:
    """Attach provider name, service name, user name to booking."""
    # providerId is stored as business _id
    try:
        biz = businesses.find_one({"_id": ObjectId(booking.get("providerId", ""))})
    except Exception:
        biz = None
    booking["provider_name"] = biz.get("businessName", "") if biz else ""

    # service name
    try:
        svc = services_col.find_one({"_id": ObjectId(booking.get("serviceId", ""))})
        booking["service_name"] = svc.get("name", "") if svc else ""
    except Exception:
        booking["service_name"] = ""

    # user name
    try:
        user = users_col.find_one({"_id": ObjectId(booking.get("userId", ""))})
        booking["user_name"] = user.get("full_name", "") if user else ""
    except Exception:
        booking["user_name"] = ""

    return booking


# ── Create booking (user) ─────────────────────────────────────────────────────
@router.post("")
def create_booking(data: BookingCreate, current_user=Depends(get_current_user)):
    # Resolve providerId → always store as business _id for consistent querying
    provider_biz_id = data.providerId
    try:
        # If it's a valid ObjectId, check if it's a business _id directly
        obj = ObjectId(data.providerId)
        biz = businesses.find_one({"_id": obj})
        if biz:
            provider_biz_id = str(biz["_id"])
        else:
            # Maybe it's a user_id — look up the business
            biz = businesses.find_one({"user_id": data.providerId})
            if biz:
                provider_biz_id = str(biz["_id"])
    except Exception:
        # Not an ObjectId — treat as user_id
        biz = businesses.find_one({"user_id": data.providerId})
        if biz:
            provider_biz_id = str(biz["_id"])

    doc = {
        "userId":     current_user["user_id"],
        "providerId": provider_biz_id,
        "serviceId":  data.serviceId,
        "date":       data.date,
        "time":       data.time,
        "message":    data.message or "",
        "status":     "pending",
        "created_at": datetime.utcnow(),
    }
    result = bookings_col.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc["created_at"] = doc["created_at"].isoformat()
    doc.pop("_id", None)
    return doc


# ── Debug: see all bookings (temp) ───────────────────────────────────────────
@router.get("/debug/all")
def debug_all_bookings(current_user=Depends(get_current_user)):
    docs = list(bookings_col.find({}).sort("created_at", -1).limit(20))
    return [_serialize(d) for d in docs]


# ── Debug: show provider's biz_id vs stored providerIds ──────────────────────
@router.get("/debug/provider-match")
def debug_provider_match(current_user=Depends(get_current_user)):
    uid = current_user["user_id"]
    biz = businesses.find_one({"user_id": uid})
    biz_id = str(biz["_id"]) if biz else None
    all_bookings = list(bookings_col.find({}).sort("created_at", -1).limit(20))
    return {
        "your_user_id": uid,
        "your_biz_id":  biz_id,
        "bookings": [
            {
                "id":         str(b["_id"]),
                "providerId": b.get("providerId"),
                "userId":     b.get("userId"),
                "status":     b.get("status"),
                "match":      b.get("providerId") in (uid, biz_id),
            }
            for b in all_bookings
        ],
    }


# ── User: view own bookings ───────────────────────────────────────────────────
@router.get("/user/me")
def get_user_bookings(status: str = None, current_user=Depends(get_current_user)):
    uid = current_user["user_id"]
    # Match userId as string (handles both string and ObjectId stored values)
    query = {"userId": uid}
    if status and status.lower() != "all":
        query["status"] = status.lower()
    docs = list(bookings_col.find(query).sort("created_at", -1))
    return [_enrich(_serialize(d)) for d in docs]


# ── User: view bookings by userId param ──────────────────────────────────────
@router.get("/user/{user_id}")
def get_bookings_by_user_id(user_id: str, current_user=Depends(get_current_user)):
    # Only allow users to fetch their own bookings
    if str(current_user["user_id"]) != str(user_id):
        raise HTTPException(status_code=403, detail="Access denied")
    docs = list(bookings_col.find({"userId": user_id}).sort("created_at", -1))
    return [_enrich(_serialize(d)) for d in docs]


# ── Provider: view booking requests ──────────────────────────────────────────
@router.get("/provider/me")
def get_provider_bookings(status: str = None, current_user=Depends(get_current_user)):
    uid = current_user["user_id"]
    biz = businesses.find_one({"user_id": uid})
    if not biz:
        return []
    biz_id = str(biz["_id"])

    # Match by business _id (new) OR user_id (legacy bookings before normalization)
    or_conditions = [{"providerId": biz_id}, {"providerId": uid}]
    query = {"$or": or_conditions}
    if status and status.lower() != "all":
        query["status"] = status.lower()

    docs = list(bookings_col.find(query).sort("created_at", -1))
    return [_enrich(_serialize(d)) for d in docs]


# ── Migrate legacy bookings: normalize providerId to business _id ─────────────
@router.post("/admin/migrate-provider-ids")
def migrate_provider_ids(current_user=Depends(get_current_user)):
    """One-time migration: convert user_id-based providerIds to business _id."""
    updated = 0
    all_bookings = list(bookings_col.find({}))
    for b in all_bookings:
        pid = b.get("providerId", "")
        # Check if this looks like a user_id (not a business _id)
        biz = businesses.find_one({"_id": ObjectId(pid)}) if ObjectId.is_valid(pid) else None
        if not biz:
            # Try to find business by user_id
            biz = businesses.find_one({"user_id": pid})
            if biz:
                bookings_col.update_one(
                    {"_id": b["_id"]},
                    {"$set": {"providerId": str(biz["_id"])}}
                )
                updated += 1
    return {"migrated": updated}


# ── Provider: accept / reject ─────────────────────────────────────────────────
@router.put("/{booking_id}/status")
def update_booking_status(booking_id: str, data: BookingStatus, current_user=Depends(get_current_user)):
    if data.status not in ("accepted", "rejected", "ongoing", "completed", "cancelled"):
        raise HTTPException(status_code=400, detail="Invalid status")
    try:
        obj_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking ID")

    booking = bookings_col.find_one({"_id": obj_id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    uid = current_user["user_id"]
    # providerId is stored as business _id — resolve provider's biz_id
    biz = businesses.find_one({"user_id": uid})
    biz_id = str(biz["_id"]) if biz else None
    stored_pid = booking.get("providerId", "")
    is_provider = biz_id is not None and stored_pid == biz_id
    is_user     = str(booking.get("userId", "")) == str(uid)

    # Provider-only actions
    if data.status in ("accepted", "rejected", "ongoing", "completed"):
        if not is_provider:
            raise HTTPException(status_code=403, detail="Only the provider can perform this action")

    # User can only cancel their own pending/accepted bookings
    if data.status == "cancelled":
        if not is_provider and not is_user:
            raise HTTPException(status_code=403, detail="Not authorised to cancel this booking")
        if is_user and not is_provider:
            if booking.get("status") not in ("pending", "accepted"):
                raise HTTPException(status_code=400, detail="Can only cancel pending or accepted bookings")

    bookings_col.update_one({"_id": obj_id}, {"$set": {"status": data.status}})
    return {"message": f"Booking {data.status}"}
