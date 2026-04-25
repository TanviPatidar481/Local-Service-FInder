from fastapi import APIRouter, HTTPException, Depends
from app.database import businesses_collection
from app.schemas.business_schema import BusinessCreate, BusinessUpdate
from app.core.deps import get_current_user
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/business")


def _serialize(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


@router.post("/create")
def create_business(data: BusinessCreate):
    business = data.dict()
    result = businesses_collection.insert_one(business)
    return {"message": "Business created successfully", "business_id": str(result.inserted_id)}


@router.get("/by-user/{user_id}")
def get_business_by_user(user_id: str):
    doc = businesses_collection.find_one({"user_id": user_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Business not found")
    return _serialize(doc)


@router.get("/{business_id}")
def get_business(business_id: str):
    try:
        obj_id = ObjectId(business_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid business ID")

    doc = businesses_collection.find_one({"_id": obj_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Business not found")
    return _serialize(doc)


@router.put("/{business_id}")
def update_business(business_id: str, data: BusinessUpdate, current_user=Depends(get_current_user)):
    try:
        obj_id = ObjectId(business_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid business ID")

    updates = {k: v for k, v in data.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = businesses_collection.update_one({"_id": obj_id}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Business not found")

    return {"message": "Business updated"}


@router.get("/")
def list_businesses(city: str = None, category: str = None):
    query = {}
    if city:
        query["city"] = {"$regex": city, "$options": "i"}
    if category:
        query["category"] = {"$regex": category, "$options": "i"}

    docs = list(businesses_collection.find(query))
    return [_serialize(d) for d in docs]
