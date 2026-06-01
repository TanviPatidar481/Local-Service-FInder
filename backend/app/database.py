from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)

db = client["lrf_db"]
users_collection = db["users"]
businesses_collection = db["businesses"]
messages_collection = db["messages"]