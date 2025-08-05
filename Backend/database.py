from pymongo import MongoClient
from .config import MONGODB_URI, DB_NAME

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

users_collection = db["users"]
moods_collection = db["moods"]
