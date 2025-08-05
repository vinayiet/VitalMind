from pydantic import BaseModel
from typing import Optional

class MoodCheck(BaseModel):
    user_id: str
    mood: str
    note: Optional[str] = None


class CrisisCheck(BaseModel):
    message: str
