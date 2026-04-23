# from fastapi import APIRouter
# from app.database import businesses_collection
# from app.schemas.business_schema import BusinessCategory, BusinessBasicInfo, BusinessLocation

# router = APIRouter(prefix="/business")

# @router.post("/category")
# def set_category(data: BusinessCategory):
#     businesses_collection.insert_one({"category": data.category})
#     return {"message": "Category saved"}

# @router.post("/basic-info")
# def set_basic_info(data: BusinessBasicInfo):
#     businesses_collection.update_one({}, {"$set": data.dict()}, upsert=True)
#     return {"message": "Basic info saved"}

# @router.post("/location")
# def set_location(data: BusinessLocation):
#     businesses_collection.update_one({}, {"$set": {"location": data.dict()}}, upsert=True)
#     return {"message": "Location saved"}
from fastapi import APIRouter, HTTPException
from app.database import businesses_collection
from bson import ObjectId

router = APIRouter(prefix="/business")

@router.post("/create")
def create_business(data: dict):

    if "user_id" not in data:
        raise HTTPException(status_code=400, detail="user_id is required")

    business = {
        "user_id": data["user_id"],
        "business_name": data.get("businessName"),
        "category": data.get("category"),
        "contact_person": data.get("contactPerson"),
        "phone": data.get("phoneNumber"),
        "service_mode": data.get("serviceMode"),
        "description": data.get("description"),
        "city": data.get("city"),
        "location": data.get("location"),
    }

    businesses_collection.insert_one(business)

    return {"message": "Business created successfully"}