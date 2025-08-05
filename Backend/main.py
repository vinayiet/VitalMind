from fastapi import FastAPI
from uuid import uuid4
from datetime import datetime
from .database import users_collection, moods_collection
from .models import MoodCheck

app = FastAPI()

@app.get("/ping")
async def ping():
    return {"status": "ok", "message": "FastAPI is running!"}

@app.post("/register")
async def register_user():
    """Create an anonymous user with UUID"""
    user_id = str(uuid4())
    users_collection.insert_one({
        "user_id": user_id,
        "created_at": datetime.utcnow(),
        "language": "en",
        "streak": 0
    })
    return {"user_id": user_id}

@app.post("/mood")
async def mood_check(data: MoodCheck):
    """Save mood + note in MongoDB"""
    entry = {
        "user_id": data.user_id,
        "mood": data.mood,
        "note": data.note,
        "timestamp": datetime.utcnow()
    }
    moods_collection.insert_one(entry)

    # Simple response for MVP
    if data.mood in ["😞", "😢"]:
        message = "Tough day 💙. Want to try a 2-min breathing exercise?"
    else:
        message = "Glad to see your mood today 🌸. Keep going strong!"

    return {"status": "saved", "response": message}
