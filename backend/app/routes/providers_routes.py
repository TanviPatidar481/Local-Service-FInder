from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.core.deps import get_current_user
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/providers")

businesses   = db["businesses"]
services_col = db["services"]
reviews_col  = db["reviews"]


def _serialize(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


def _attach_services(doc: dict) -> dict:
    services = list(services_col.find({"provider_user_id": doc.get("user_id", "")}))
    doc["services"] = [_serialize(s) for s in services]
    return doc


@router.get("")
def list_providers(category: str = None, city: str = None, q: str = None):
    query = {}
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    if city:
        query["city"] = {"$regex": city, "$options": "i"}
    if q:
        query["$or"] = [
            {"businessName": {"$regex": q, "$options": "i"}},
            {"description":  {"$regex": q, "$options": "i"}},
        ]
    docs = list(businesses.find(query))
    result = []
    for d in docs:
        d["id"] = str(d.pop("_id"))
        result.append({
            "id":            d["id"],
            "user_id":       d.get("user_id", ""),
            "business_name": d.get("businessName", ""),
            "name":          d.get("businessName", ""),
            "category":      d.get("category", ""),
            "city":          d.get("city", ""),
            "locality":      d.get("locality", ""),
            "location":      f"{d.get('city','')}{ ', ' + d.get('locality','') if d.get('locality') else ''}",
            "serviceMode":   d.get("serviceMode", ""),
            "description":   d.get("description", ""),
        })
    return result


@router.get("/me")
def get_my_profile(current_user=Depends(get_current_user)):
    doc = businesses.find_one({"user_id": current_user["user_id"]})
    if not doc:
        raise HTTPException(status_code=404, detail="Provider not found")
    return _attach_services(_serialize(doc))


@router.get("/{provider_id}/full")
def get_provider_full(provider_id: str, current_user: dict = Depends(get_current_user)):
    """Returns profile + services + posts + isOwner in one call."""
    doc = None
    try:
        doc = businesses.find_one({"_id": ObjectId(provider_id)})
    except InvalidId:
        pass
    if not doc:
        doc = businesses.find_one({"user_id": provider_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Provider not found")

    doc["id"] = str(doc.pop("_id"))
    doc["business_name"] = doc.get("businessName", "")
    doc["service_mode"]  = doc.get("serviceMode", "")

    owner_user_id = doc.get("user_id", "")
    is_owner = str(current_user["user_id"]) == str(owner_user_id)

    svcs = list(services_col.find({"provider_user_id": owner_user_id}))
    for s in svcs:
        s["id"] = str(s.pop("_id"))

    posts = list(db["posts"].find({"provider_user_id": owner_user_id}).sort("created_at", -1))
    for p in posts:
        p["id"] = str(p.pop("_id"))
        if "created_at" in p:
            p["created_at"] = p["created_at"].isoformat()

    reviews = list(reviews_col.find({"provider_user_id": owner_user_id}).sort("created_at", -1))
    for r in reviews:
        r["id"] = str(r.pop("_id"))

    return {
        "profile":  doc,
        "services": svcs,
        "posts":    posts,
        "reviews":  reviews,
        "isOwner":  is_owner,
    }


@router.get("/{provider_id}")
def get_provider(provider_id: str):
    doc = None
    try:
        doc = businesses.find_one({"_id": ObjectId(provider_id)})
    except InvalidId:
        pass

    if not doc:
        doc = businesses.find_one({"user_id": provider_id})

    if not doc:
        raise HTTPException(status_code=404, detail="Provider not found")

    doc["id"] = str(doc.pop("_id"))
    # normalize field names for frontend
    doc["business_name"] = doc.get("businessName", "")
    doc["name"]          = doc.get("businessName", "")
    doc["service_mode"]  = doc.get("serviceMode", "")

    return _attach_services(doc)


@router.get("/{provider_id}/reviews")
def get_provider_reviews(provider_id: str):
    try:
        biz = businesses.find_one({"_id": ObjectId(provider_id)})
    except InvalidId:
        biz = businesses.find_one({"user_id": provider_id})

    if not biz:
        return []

    uid = biz.get("user_id", "")
    docs = list(reviews_col.find({"provider_user_id": uid}).sort("created_at", -1))
    return [_serialize(d) for d in docs]
