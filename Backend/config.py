import os
from dotenv import load_dotenv
from huggingface_hub import login
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://<username>:<password>@cluster0.mongodb.net/")
DB_NAME = "mental_health_app"
HF_TOKEN = os.getenv("HF_TOKEN")
if HF_TOKEN:
    login(token=HF_TOKEN)